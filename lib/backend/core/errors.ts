/**
 * APEX ONE — Backend Core Security, Errors, and Tenant Context
 * 
 * Strict Multi-Tenancy Rules:
 * 1. The client-provided tenantId is NEVER trusted.
 * 2. Authenticated identity establishes the Tenant Context.
 * 3. Every service and repository MUST accept and enforce TenantContext.
 */

export interface TenantContext {
  organizationId: string;
  userId: string;
  userEmail: string;
  userRole: string;
  permissions: string[];
  isSuperAdmin?: boolean;
  requestId: string;
  timestamp: string;
}

export type PermissionCapability =
  | "org:read"
  | "org:write"
  | "org:admin"
  | "customer:read"
  | "customer:write"
  | "customer:delete"
  | "financial:read"
  | "financial:write"
  | "document:read"
  | "document:write"
  | "workflow:read"
  | "workflow:write"
  | "workflow:execute"
  | "ai:execute"
  | "value:read"
  | "value:write"
  | "value:approve"
  | "action:approve"
  | "audit:read";

export class BackendError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, statusCode: number = 500, code: string = "INTERNAL_SERVER_ERROR", details?: any) {
    super(message);
    this.name = "BackendError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class UnauthorizedError extends BackendError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends BackendError {
  constructor(message: string = "You do not have permission to perform this action in this tenant") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends BackendError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found or does not belong to your organization`, 404, "NOT_FOUND");
  }
}

export class ValidationError extends BackendError {
  constructor(message: string, details?: any) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class CrossTenantViolationError extends BackendError {
  constructor(attemptedOrgId: string, actualOrgId: string) {
    super(
      `Cross-tenant access violation detected. Authenticated org: ${actualOrgId}, attempted org: ${attemptedOrgId}`,
      403,
      "CROSS_TENANT_VIOLATION"
    );
  }
}
