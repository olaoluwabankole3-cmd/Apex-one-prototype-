/**
 * APEX ONE — Authentication Provider & Session Store Interfaces
 * 
 * Implements a production-pluggable identity abstraction with:
 * 1. Cryptographically secure random session tokens (crypto.randomBytes)
 * 2. Secure salted PBKDF2 password verification
 * 3. Session lifecycle & revocation
 */

import { AuthSession, PermissionCapability, ROLE_PERMISSIONS } from "../../core/security";
import { generateSecureToken, verifyPassword } from "../../core/crypto";
import { db } from "../../database/store";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "../../core/errors";

export interface ISessionStore {
  createSession(
    user: { id: string; email: string; name: string },
    org: { id: string; name: string },
    role: string,
    permissions: PermissionCapability[],
    ttlSeconds?: number
  ): Promise<AuthSession>;
  getSession(token: string): Promise<AuthSession | undefined>;
  revokeSession(token: string): Promise<boolean>;
  cleanupExpiredSessions(): Promise<number>;
}

export class InMemorySessionStore implements ISessionStore {
  private sessions: Map<string, AuthSession> = new Map();

  public async createSession(
    user: { id: string; email: string; name: string },
    org: { id: string; name: string },
    role: string,
    permissions: PermissionCapability[],
    ttlSeconds: number = 86400 // 24 hours
  ): Promise<AuthSession> {
    const token = generateSecureToken("apex_sec");
    const now = new Date();
    const expires = new Date(now.getTime() + ttlSeconds * 1000);

    const session: AuthSession = {
      token,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      organizationId: org.id,
      organizationName: org.name,
      role,
      permissions,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };

    this.sessions.set(token, session);
    return session;
  }

  public async getSession(token: string): Promise<AuthSession | undefined> {
    const session = this.sessions.get(token);
    if (!session) return undefined;

    if (new Date(session.expiresAt) < new Date()) {
      this.sessions.delete(token);
      return undefined;
    }

    return session;
  }

  public async revokeSession(token: string): Promise<boolean> {
    return this.sessions.delete(token);
  }

  public async cleanupExpiredSessions(): Promise<number> {
    const now = new Date();
    let cleaned = 0;
    for (const [token, session] of this.sessions.entries()) {
      if (new Date(session.expiresAt) < now) {
        this.sessions.delete(token);
        cleaned++;
      }
    }
    return cleaned;
  }
}

export interface IAuthenticationProvider {
  authenticateCredentials(
    email: string,
    password?: string,
    targetOrganizationId?: string
  ): Promise<{
    session: AuthSession;
    availableOrganizations: { id: string; name: string; role: string }[];
  }>;
}

export class LocalAuthenticationProvider implements IAuthenticationProvider {
  constructor(private readonly sessionStore: ISessionStore) {}

  public async authenticateCredentials(
    email: string,
    password?: string,
    targetOrganizationId?: string
  ): Promise<{
    session: AuthSession;
    availableOrganizations: { id: string; name: string; role: string }[];
  }> {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const user = Array.from(db.users.values()).find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      throw new UnauthorizedError("Invalid credentials or user does not exist");
    }

    if (user.status !== "active") {
      throw new ForbiddenError(`User account is ${user.status}. Access denied.`);
    }

    // Password verification if password hash is present
    if (user.passwordHash && user.passwordSalt) {
      if (!password) {
        throw new UnauthorizedError("Password is required for authentication");
      }
      const isValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
      if (!isValid) {
        throw new UnauthorizedError("Invalid credentials or incorrect password");
      }
    }

    // Resolve tenant memberships
    const memberships = Array.from(db.memberships.values()).filter((m) => m.userId === user.id);
    if (memberships.length === 0) {
      throw new ForbiddenError("User is not associated with any active organization tenant");
    }

    let chosenMembership = memberships[0];
    if (targetOrganizationId) {
      const match = memberships.find((m) => m.organizationId === targetOrganizationId);
      if (!match) {
        throw new ForbiddenError(`User is not a verified member of organization ${targetOrganizationId}`);
      }
      chosenMembership = match;
    }

    const org = db.organizations.get(chosenMembership.organizationId);
    if (!org) {
      throw new NotFoundError("Organization");
    }

    const permissions = ROLE_PERMISSIONS[chosenMembership.role] || ROLE_PERMISSIONS["Operations"];

    const session = await this.sessionStore.createSession(
      { id: user.id, email: user.email, name: user.name },
      { id: org.id, name: org.name },
      chosenMembership.role,
      permissions
    );

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
}

export const defaultSessionStore = new InMemorySessionStore();
export const defaultAuthProvider = new LocalAuthenticationProvider(defaultSessionStore);
