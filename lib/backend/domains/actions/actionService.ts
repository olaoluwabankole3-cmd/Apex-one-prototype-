/**
 * APEX ONE — Execution Engine & Actions Domain Service
 * 
 * First-class action entities, human-approval gating, execution state transitions, and audit logs.
 */

import { db } from "../../database/store";
import { ActionRecord } from "../../database/schema";
import { TenantContext, requirePermission, ValidationError, ForbiddenError } from "../../core/security";

export class ActionService {
  /**
   * List execution actions for tenant.
   */
  public async getActions(ctx: TenantContext, status?: string): Promise<ActionRecord[]> {
    requirePermission(ctx, "value:read");
    let list = Array.from(db.actions.values()).filter((a) => a.organizationId === ctx.organizationId);
    if (status && status !== "all") {
      list = list.filter((a) => a.status === status);
    }
    return list;
  }

  /**
   * Fetch a single action, checking tenant ownership.
   */
  public async getActionById(id: string, ctx: TenantContext): Promise<ActionRecord> {
    requirePermission(ctx, "value:read");
    const raw = db.actions.get(id);
    return db.verifyTenantOwnership(raw, ctx, "Action");
  }

  /**
   * Approve or execute an action through its lifecycle: Ready -> Approved -> In Progress -> Completed -> Measured.
   */
  public async advanceAction(id: string, ctx: TenantContext): Promise<ActionRecord> {
    const raw = db.actions.get(id);
    const action = db.verifyTenantOwnership(raw, ctx, "Action");

    const pipelineOrder: ActionRecord["status"][] = ["Ready", "Approved", "In Progress", "Completed", "Measured"];
    const currentIndex = pipelineOrder.indexOf(action.status);
    if (currentIndex >= pipelineOrder.length - 1) {
      return action; // Already at final stage
    }

    const nextStatus = pipelineOrder[currentIndex + 1];

    // If advancing from Ready to Approved, verify permission
    if (nextStatus === "Approved" && action.requiresHumanApproval) {
      requirePermission(ctx, "action:approve");
    }

    const updatedLogs = [...action.logs];
    if (nextStatus === "Approved") {
      updatedLogs.push(`Approved by ${ctx.userEmail} (${ctx.userRole})`);
      action.approvedBy = ctx.userEmail;
    } else if (nextStatus === "In Progress") {
      updatedLogs.push(`Execution engine initiated automated workflows`);
    } else if (nextStatus === "Completed") {
      updatedLogs.push(`Execution tasks verified and completed successfully`);
    } else if (nextStatus === "Measured") {
      updatedLogs.push(`Certified yield logged in organizational ledger`);
    }

    action.status = nextStatus;
    action.logs = updatedLogs;
    action.updatedAt = new Date().toISOString();
    db.actions.set(id, action);

    db.recordAuditLog({
      organizationId: ctx.organizationId,
      actorId: ctx.userId,
      actorEmail: ctx.userEmail,
      action: `action:advance_${nextStatus.toLowerCase().replace(" ", "_")}`,
      resource: "Action",
      resourceId: id,
      requestId: ctx.requestId,
      status: "success",
      metadata: { newStatus: nextStatus, recommendation: action.recommendation },
    });

    return action;
  }
}

export const actionService = new ActionService();
