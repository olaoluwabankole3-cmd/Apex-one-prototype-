/**
 * APEX ONE — Organizational Memory Domain Service
 * 
 * Provides long-term institutional memory with strict source provenance.
 */

import { db } from "../../database/store";
import { OrganizationalMemoryRecord } from "../../database/schema";
import { TenantContext, requirePermission, ValidationError } from "../../core/security";

export interface CreateMemoryDto {
  type: "fact" | "history" | "decision" | "insight" | "policy";
  title: string;
  content: string;
  source: string;
  sourceReference: string;
  confidence?: number;
  effectiveAt?: string;
  verified?: boolean;
}

export class MemoryService {
  /**
   * List organizational memory items for the tenant.
   */
  public async getMemoryItems(
    ctx: TenantContext,
    filters?: { type?: string; search?: string }
  ): Promise<OrganizationalMemoryRecord[]> {
    requirePermission(ctx, "org:read");

    let list = Array.from(db.memory.values()).filter((m) => m.organizationId === ctx.organizationId);

    if (filters?.type && filters.type !== "all") {
      list = list.filter((m) => m.type === filters.type);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q));
    }

    return list;
  }

  /**
   * Retrieve a specific memory record, enforcing tenant isolation.
   */
  public async getMemoryById(id: string, ctx: TenantContext): Promise<OrganizationalMemoryRecord> {
    requirePermission(ctx, "org:read");
    const raw = db.memory.get(id);
    return db.verifyTenantOwnership(raw, ctx, "OrganizationalMemory");
  }

  /**
   * Ingest a new verified memory record with provenance.
   */
  public async addMemory(dto: CreateMemoryDto, ctx: TenantContext): Promise<OrganizationalMemoryRecord> {
    requirePermission(ctx, "org:write");

    if (!dto.title || !dto.content || !dto.source) {
      throw new ValidationError("title, content, and source are required for memory records");
    }

    const id = `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const record: OrganizationalMemoryRecord = {
      id,
      organizationId: ctx.organizationId,
      type: dto.type || "fact",
      title: dto.title,
      content: dto.content,
      source: dto.source,
      sourceReference: dto.sourceReference || "manual_entry",
      confidence: dto.confidence ?? 95,
      effectiveAt: dto.effectiveAt || new Date().toISOString(),
      verified: dto.verified ?? true,
      createdAt: new Date().toISOString(),
    };

    db.memory.set(id, record);

    db.recordAuditLog({
      organizationId: ctx.organizationId,
      actorId: ctx.userId,
      actorEmail: ctx.userEmail,
      action: "memory:record",
      resource: "OrganizationalMemory",
      resourceId: id,
      requestId: ctx.requestId,
      status: "success",
      metadata: { title: record.title, source: record.source },
    });

    return record;
  }
}

export const memoryService = new MemoryService();
