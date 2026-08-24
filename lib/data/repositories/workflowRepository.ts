import { WorkflowDef, IntegrationItem } from "@/lib/types";
import { workflows, integrations } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface WorkflowRepository {
  getWorkflows(organizationId?: string): Promise<WorkflowDef[]>;
  getIntegrations(organizationId?: string): Promise<IntegrationItem[]>;
}

export class MockWorkflowRepository implements WorkflowRepository {
  async getWorkflows(organizationId?: string): Promise<WorkflowDef[]> {
    if (!isDemoMode()) return [];
    return workflows.map(w => ({ ...w, organizationId: organizationId || "apex-demo" }));
  }
  async getIntegrations(organizationId?: string): Promise<IntegrationItem[]> {
    if (!isDemoMode()) return [];
    return integrations;
  }
}

export const workflowRepository = new MockWorkflowRepository();
