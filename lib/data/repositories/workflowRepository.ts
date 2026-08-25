import { WorkflowDef, IntegrationItem } from "@/lib/types";
import { demoWorkflows, CustomWorkflowDef } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface WorkflowRepository {
  getWorkflows(organizationId?: string): Promise<WorkflowDef[]>;
  getCustomWorkflows(organizationId?: string): Promise<CustomWorkflowDef[]>;
  getWorkflow(id: string): Promise<CustomWorkflowDef | undefined>;
  getIntegrations(organizationId?: string): Promise<IntegrationItem[]>;
}

export class MockWorkflowRepository implements WorkflowRepository {
  async getWorkflows(organizationId?: string): Promise<WorkflowDef[]> {
    if (!isDemoMode()) return [];
    return demoWorkflows.map(w => ({
      id: w.id,
      name: w.name,
      description: w.description,
      subsidiary: w.businessUnit,
      status: w.status,
      successRate: w.successRate,
      runsPerWeek: w.runsPerWeek,
      lastRun: w.lastRun,
      nodes: w.nodes,
      connections: w.connections
    }));
  }

  async getCustomWorkflows(organizationId?: string): Promise<CustomWorkflowDef[]> {
    if (!isDemoMode()) return [];
    return demoWorkflows;
  }

  async getWorkflow(id: string): Promise<CustomWorkflowDef | undefined> {
    if (!isDemoMode()) return undefined;
    return demoWorkflows.find(w => w.id === id);
  }

  async getIntegrations(organizationId?: string): Promise<IntegrationItem[]> {
    if (!isDemoMode()) return [];
    return [
      { id: "int-1", name: "Core Banking Engine", category: "Core", status: "connected", lastSync: "2 min ago", eventsToday: 14200, icon: "Database" },
      { id: "int-2", name: "Salesforce CRM", category: "CRM", status: "connected", lastSync: "5 min ago", eventsToday: 8320, icon: "Users" },
      { id: "int-3", name: "Treasury Clearing Hub", category: "Settlement", status: "connected", lastSync: "Just now", eventsToday: 3410, icon: "DollarSign" },
      { id: "int-4", name: "Central Bank FX Feed", category: "Compliance", status: "connected", lastSync: "12 min ago", eventsToday: 120, icon: "ShieldCheck" }
    ];
  }
}

export const workflowRepository = new MockWorkflowRepository();
