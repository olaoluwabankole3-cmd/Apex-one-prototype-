import { KnowledgeSynapse, GraphNode, HistoricalEvent, demoSynapses, demoGraphNodes, demoHistoricalEvents } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export interface KnowledgeRepository {
  getSynapses(organizationId?: string): Promise<KnowledgeSynapse[]>;
  getGraphNodes(organizationId?: string): Promise<GraphNode[]>;
  getHistoricalEvents(organizationId?: string): Promise<HistoricalEvent[]>;
}

export class MockKnowledgeRepository implements KnowledgeRepository {
  async getSynapses(organizationId?: string): Promise<KnowledgeSynapse[]> {
    if (!isDemoMode()) return [];
    return demoSynapses;
  }

  async getGraphNodes(organizationId?: string): Promise<GraphNode[]> {
    if (!isDemoMode()) return [];
    return demoGraphNodes;
  }

  async getHistoricalEvents(organizationId?: string): Promise<HistoricalEvent[]> {
    if (!isDemoMode()) return [];
    return demoHistoricalEvents;
  }
}

export const knowledgeRepository = new MockKnowledgeRepository();
