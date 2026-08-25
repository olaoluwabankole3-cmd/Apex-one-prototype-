import { Role } from "@/lib/types";
import { demoSuggestedPrompts } from "@/lib/data/demo";
import { isDemoMode } from "@/lib/demo";

export const executiveSummaryByRole: Record<Role, string> = {
  CEO: "Revenue is up 12.4% quarter over quarter, led by Strategic Accounts institutional rebalancing. Portfolio value crossed $1.92B (₦2.84T equivalent), and risk exposure continues to trend down. ₦184.7M in net value opportunities identified across 4 business units.",
  Operations: "Nightly reconciliation completed cleanly across all 4 business units. Overall SLA compliance sits at 98.4%, up 0.6 points. Claims processing bottleneck in Customer Operations identified for Phase 2 automation.",
  "Relationship Manager": "8 core enterprise accounts monitored with ₦18.4M retention opportunity in Commercial Operations. 3 accounts due for renewal review within 90 days. Average health score across active tier is 88/100.",
  Compliance: "Risk exposure index improved to 3.1/10, down from 4.2 last quarter. 2 transaction alerts reviewed and resolved in Enterprise Operations. Zero regulatory filings overdue.",
  "Customer Service": "SLA compliance holds at 98.4% with average resolution time down 9% this month. Claims intake triage automation recommended to clear 1,842 queued tickets.",
  "Customer / Investor": "Private portfolio value stands at ₦16.2B ($10.48M USD). Quarterly return sits at a secure +4.8% with zero outstanding KYC document reviews or compliance requirements.",
};

export interface IntelligenceRepository {
  getExecutiveSummary(role: Role, organizationId?: string): Promise<string>;
  getSuggestedPrompts(role: Role, organizationId?: string): Promise<string[]>;
}

export class MockIntelligenceRepository implements IntelligenceRepository {
  async getExecutiveSummary(role: Role, organizationId?: string): Promise<string> {
    if (!isDemoMode()) {
      return "Organizational memory not connected. Connect enterprise data sources to enable live executive briefings.";
    }
    return executiveSummaryByRole[role] || "Strategic summary is being synthesized.";
  }

  async getSuggestedPrompts(role: Role, organizationId?: string): Promise<string[]> {
    if (!isDemoMode()) return [];
    return demoSuggestedPrompts
      .filter(p => p.roles.includes(role))
      .map(p => p.label);
  }
}

export const intelligenceRepository = new MockIntelligenceRepository();
