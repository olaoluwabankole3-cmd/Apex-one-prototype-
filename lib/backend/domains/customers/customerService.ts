/**
 * APEX ONE — Customer Domain Service with Defense-in-Depth Tenant Isolation
 */

import { db } from "../../database/store";
import { CustomerRecord } from "../../database/schema";
import { TenantContext, requirePermission, ValidationError } from "../../core/security";

export interface CreateCustomerDto {
  name: string;
  subsidiary: string;
  tier: "Enterprise" | "Mid-Market" | "SMB";
  status?: "active" | "at-risk" | "onboarding" | "dormant";
  healthScore?: number;
  arr: number;
  owner: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  tags?: string[];
}

export class CustomerService {
  /**
   * List all customers belonging STRICTLY to the authenticated tenant.
   */
  public async getCustomers(
    ctx: TenantContext,
    filters?: { tier?: string; status?: string; search?: string }
  ): Promise<CustomerRecord[]> {
    requirePermission(ctx, "customer:read");

    let list = Array.from(db.customers.values()).filter((c) => c.organizationId === ctx.organizationId);

    if (filters?.tier && filters.tier !== "all") {
      list = list.filter((c) => c.tier === filters.tier);
    }
    if (filters?.status && filters.status !== "all") {
      list = list.filter((c) => c.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.contactName.toLowerCase().includes(q) ||
          c.contactEmail.toLowerCase().includes(q) ||
          c.subsidiary.toLowerCase().includes(q)
      );
    }

    return list;
  }

  /**
   * Fetch a single customer by ID, rigorously verifying tenant ownership.
   */
  public async getCustomerById(id: string, ctx: TenantContext): Promise<CustomerRecord> {
    requirePermission(ctx, "customer:read");
    const raw = db.customers.get(id);
    return db.verifyTenantOwnership(raw, ctx, "Customer");
  }

  /**
   * Create a new customer anchored irrevocably to the authenticated tenant.
   */
  public async createCustomer(dto: CreateCustomerDto, ctx: TenantContext): Promise<CustomerRecord> {
    requirePermission(ctx, "customer:write");

    if (!dto.name || !dto.contactEmail) {
      throw new ValidationError("Customer name and contactEmail are required");
    }

    const id = `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const record: CustomerRecord = {
      id,
      organizationId: ctx.organizationId, // Injected securely from authenticated context
      name: dto.name,
      subsidiary: dto.subsidiary || "General Operations",
      tier: dto.tier || "Enterprise",
      status: dto.status || "active",
      healthScore: dto.healthScore ?? 85,
      arr: dto.arr || 0,
      owner: dto.owner || ctx.userEmail,
      contactName: dto.contactName,
      contactRole: dto.contactRole || "Primary Contact",
      contactEmail: dto.contactEmail,
      since: "Aug 2026",
      tags: dto.tags || ["New Account"],
      createdAt: now,
      updatedAt: now,
    };

    db.customers.set(id, record);

    db.recordAuditLog({
      organizationId: ctx.organizationId,
      actorId: ctx.userId,
      actorEmail: ctx.userEmail,
      action: "customer:create",
      resource: "Customer",
      resourceId: id,
      requestId: ctx.requestId,
      status: "success",
      metadata: { customerName: record.name, arr: record.arr },
    });

    return record;
  }
}

export const customerService = new CustomerService();
