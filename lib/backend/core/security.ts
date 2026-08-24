/**
 * APEX ONE — Security, Authentication Tokens, and Context Resolver
 */

import {
  type TenantContext,
  type PermissionCapability,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  CrossTenantViolationError,
} from "./errors";

export type { TenantContext, PermissionCapability };
export {
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  CrossTenantViolationError,
};

// Role-to-Permission capabilities matrix
export const ROLE_PERMISSIONS: Record<string, PermissionCapability[]> = {
  CEO: [
    "org:read",
    "org:write",
    "org:admin",
    "customer:read",
    "customer:write",
    "financial:read",
    "financial:write",
    "document:read",
    "document:write",
    "workflow:read",
    "workflow:write",
    "workflow:execute",
    "ai:execute",
    "value:read",
    "value:write",
    "value:approve",
    "action:approve",
    "audit:read",
  ],
  Operations: [
    "org:read",
    "customer:read",
    "customer:write",
    "document:read",
    "document:write",
    "workflow:read",
    "workflow:write",
    "workflow:execute",
    "ai:execute",
    "value:read",
    "value:write",
    "audit:read",
  ],
  "Relationship Manager": [
    "org:read",
    "customer:read",
    "customer:write",
    "document:read",
    "document:write",
    "ai:execute",
    "value:read",
  ],
  Compliance: [
    "org:read",
    "customer:read",
    "financial:read",
    "document:read",
    "audit:read",
    "ai:execute",
    "value:read",
  ],
  "Customer Service": [
    "org:read",
    "customer:read",
    "document:read",
    "ai:execute",
  ],
  "Customer / Investor": [
    "customer:read",
    "document:read",
    "value:read",
  ],
  Administrator: [
    "org:read",
    "org:write",
    "org:admin",
    "customer:read",
    "customer:write",
    "customer:delete",
    "financial:read",
    "financial:write",
    "document:read",
    "document:write",
    "workflow:read",
    "workflow:write",
    "workflow:execute",
    "ai:execute",
    "value:read",
    "value:write",
    "value:approve",
    "action:approve",
    "audit:read",
  ],
};

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export interface AuthSession {
  token: string;
  userId: string;
  userEmail: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  role: string;
  permissions: PermissionCapability[];
  createdAt: string;
  expiresAt: string;
}

// In-memory or Redis-backed session token store for active tokens
const activeSessions: Map<string, AuthSession> = new Map();

export function createSessionToken(
  user: { id: string; email: string; name: string },
  org: { id: string; name: string },
  role: string
): AuthSession {
  const token = `apex_jwt_${Math.random().toString(36).substring(2)}_${Date.now()}`;
  const permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["Operations"];
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

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

  activeSessions.set(token, session);
  return session;
}

export function getSession(token: string): AuthSession | undefined {
  const session = activeSessions.get(token);
  if (!session) return undefined;

  // Check expiration
  if (new Date(session.expiresAt) < new Date()) {
    activeSessions.delete(token);
    return undefined;
  }
  return session;
}

export function revokeSession(token: string): boolean {
  return activeSessions.delete(token);
}

/**
 * Resolve the authenticated Tenant Context from request headers.
 * 
 * Never trusts client `x-organization-id` without validating that the authenticated
 * user belongs to that organization.
 */
export function resolveTenantContext(headers: Headers | Record<string, string | string[] | undefined>): TenantContext {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();

  // Extract authorization header
  let authHeader: string | undefined;
  if (headers instanceof Headers) {
    authHeader = headers.get("authorization") || undefined;
  } else {
    const raw = headers["authorization"] || headers["Authorization"];
    authHeader = Array.isArray(raw) ? raw[0] : raw;
  }

  // Support demo / fallback credentials for initial development if no token provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Default development context for unauthenticated requests in demo
    return {
      organizationId: "apex-demo",
      userId: "usr-marcus-thorne",
      userEmail: "m.thorne@apexsync.ai",
      userRole: "CEO",
      permissions: ROLE_PERMISSIONS["CEO"],
      requestId,
      timestamp,
    };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const session = getSession(token);

  if (!session) {
    throw new UnauthorizedError("Invalid or expired authentication session");
  }

  return {
    organizationId: session.organizationId,
    userId: session.userId,
    userEmail: session.userEmail,
    userRole: session.role,
    permissions: session.permissions,
    requestId,
    timestamp,
  };
}

/**
 * Verify that the TenantContext possesses a required permission capability.
 */
export function requirePermission(ctx: TenantContext, permission: PermissionCapability) {
  if (!ctx.permissions.includes(permission)) {
    throw new ForbiddenError(`Missing required capability '${permission}' for role '${ctx.userRole}'`);
  }
}
