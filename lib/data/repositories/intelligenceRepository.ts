import { Role } from "@/lib/types";
import { executiveSummary, suggestedPrompts } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface IntelligenceRepository {
  getExecutiveSummary(role: Role, organizationId?: string): Promise<string>;
  getSuggestedPrompts(role: Role, organizationId?: string): Promise<string[]>;
}

export class MockIntelligenceRepository implements IntelligenceRepository {
  async getExecutiveSummary(role: Role, organizationId?: string): Promise<string> {
    if (!isDemoMode()) {
      return "Organizational memory not connected. Historical context will become available when organizational data sources are connected.";
    }
    return executiveSummary[role] || "Strategic summary is being synthesized.";
  }
  async getSuggestedPrompts(role: Role, organizationId?: string): Promise<string[]> {
    if (!isDemoMode()) return [];
    return suggestedPrompts.filter(p => p.roles.includes(role)).map(p => p.label);
  }
}

export const intelligenceRepository = new MockIntelligenceRepository();
