/**
 * APEX ONE — Auth & Identity Domain Service
 */

import { db } from "../../database/store";
import { createSessionToken, revokeSession, AuthSession } from "../../core/security";
import { TenantContext, UnauthorizedError, NotFoundError, ForbiddenError } from "../../core/errors";

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
    const user = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === dto.email.toLowerCase());
    if (!user) {
      throw new UnauthorizedError("Invalid credentials or user does not exist");
    }

    // Resolve memberships for this user
    const memberships = Array.from(db.memberships.values()).filter((m) => m.userId === user.id);
    if (memberships.length === 0) {
      throw new ForbiddenError("User is not associated with any active organization tenant");
    }

    // Determine target organization
    let chosenMembership = memberships[0];
    if (dto.targetOrganizationId) {
      const match = memberships.find((m) => m.organizationId === dto.targetOrganizationId);
      if (!match) {
        throw new ForbiddenError(`User is not a member of organization ${dto.targetOrganizationId}`);
      }
      chosenMembership = match;
    }

    const org = db.organizations.get(chosenMembership.organizationId);
    if (!org) {
      throw new NotFoundError("Organization");
    }

    const session = createSessionToken(
      { id: user.id, email: user.email, name: user.name },
      { id: org.id, name: org.name },
      chosenMembership.role
    );

    db.recordAuditLog({
      organizationId: org.id,
      actorId: user.id,
      actorEmail: user.email,
      action: "auth:login",
      resource: "Session",
      resourceId: session.token.substring(0, 12) + "...",
      requestId,
      status: "success",
      metadata: { role: chosenMembership.role, organization: org.name },
    });

    const availableOrganizations = memberships.map((m) => {
      const o = db.organizations.get(m.organizationId);
      return {
        id: m.organizationId,
        name: o?.name || m.organizationId,
        role: m.role,
      };
    });

    return { session, availableOrganizations };
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
      throw new ForbiddenError(`Cannot switch to organization ${targetOrgId}: user is not an authorized member.`);
    }

    const org = db.organizations.get(targetOrgId);
    if (!org) {
      throw new NotFoundError("Target organization");
    }

    const user = db.users.get(ctx.userId)!;
    const session = createSessionToken(
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
    revokeSession(token);
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
