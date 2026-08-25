/**
 * APEX ONE — Auth & Identity Domain Service
 */

import { db } from "../../database/store";
import { defaultAuthProvider, defaultSessionStore } from "./authProvider";
import { createSessionToken, revokeSession, AuthSession } from "../../core/security";
import { TenantContext, UnauthorizedError, NotFoundError, ForbiddenError, ValidationError } from "../../core/errors";

export interface LoginDto {
  email: string;
  password?: string;
  targetOrganizationId?: string;
}

export class AuthService {
  /**
   * Authenticate a user, verify organization membership, and issue a tenant-scoped session token.
   */
  public async login(dto: LoginDto, requestId: string): Promise<{ session: AuthSession; availableOrganizations: any[] }> {
    if (!dto.email) {
      throw new ValidationError("Email address is required");
    }

    const authResult = await defaultAuthProvider.authenticateCredentials(
      dto.email,
      dto.password,
      dto.targetOrganizationId
    );

    db.recordAuditLog({
      organizationId: authResult.session.organizationId,
      actorId: authResult.session.userId,
      actorEmail: authResult.session.userEmail,
      action: "auth:login",
      resource: "Session",
      resourceId: authResult.session.token.substring(0, 10) + "...",
      requestId,
      status: "success",
      metadata: { role: authResult.session.role, organization: authResult.session.organizationName },
    });

    return authResult;
  }

  public async getCurrentSession(ctx: TenantContext): Promise<any> {
    const user = db.users.get(ctx.userId);
    const org = db.organizations.get(ctx.organizationId);
    return {
      user: {
        id: ctx.userId,
        email: ctx.userEmail,
        name: user?.name || ctx.userEmail,
        role: ctx.userRole,
        permissions: ctx.permissions,
      },
      organization: {
        id: ctx.organizationId,
        name: org?.name || ctx.organizationId,
        currency: org?.currency || "NGN",
        currencySymbol: org?.currencySymbol || "₦",
      },
    };
  }

  public async switchOrganization(targetOrgId: string, ctx: TenantContext): Promise<AuthSession> {
    const memberships = Array.from(db.memberships.values()).filter((m) => m.userId === ctx.userId);
    const match = memberships.find((m) => m.organizationId === targetOrgId);
    if (!match) {
      db.recordAuditLog({
        organizationId: ctx.organizationId,
        actorId: ctx.userId,
        actorEmail: ctx.userEmail,
        action: "auth:switch_organization_denied",
        resource: "Organization",
        resourceId: targetOrgId,
        requestId: ctx.requestId,
        status: "denied",
        metadata: { attemptedOrg: targetOrgId },
      });
      throw new ForbiddenError(`Cannot switch to organization ${targetOrgId}: user is not an authorized member.`);
    }

    const org = db.organizations.get(targetOrgId);
    if (!org) {
      throw new NotFoundError("Target organization");
    }

    const user = db.users.get(ctx.userId)!;
    const session = await createSessionToken(
      { id: user.id, email: user.email, name: user.name },
      { id: org.id, name: org.name },
      match.role
    );

    db.recordAuditLog({
      organizationId: targetOrgId,
      actorId: user.id,
      actorEmail: user.email,
      action: "auth:switch_organization",
      resource: "Organization",
      resourceId: targetOrgId,
      requestId: ctx.requestId,
      status: "success",
      metadata: { previousOrg: ctx.organizationId, newRole: match.role },
    });

    return session;
  }

  public async logout(token: string, ctx: TenantContext): Promise<boolean> {
    await revokeSession(token);
    db.recordAuditLog({
      organizationId: ctx.organizationId,
      actorId: ctx.userId,
      actorEmail: ctx.userEmail,
      action: "auth:logout",
      resource: "Session",
      resourceId: token.substring(0, 10) + "...",
      requestId: ctx.requestId,
      status: "success",
    });
    return true;
  }
}

export const authService = new AuthService();
