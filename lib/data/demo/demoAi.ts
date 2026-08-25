import { SuggestedPrompt, QuickAction, ReportSection, Role } from "@/lib/types";

export const demoQuickActions: QuickAction[] = [
  {
    id: "qa1",
    label: "Generate Executive Brief",
    description: "Multi-subsidiary performance and risk overview",
    icon: "FileText",
    roles: ["CEO", "Operations"],
  },
  {
    id: "qa2",
    label: "Review At-Risk Accounts",
    description: "Surface customers with elevated churn signals",
    icon: "ShieldAlert",
    roles: ["CEO", "Relationship Manager", "Customer Service"],
  },
  {
    id: "qa3",
    label: "Run Compliance Sweep",
    description: "Scan flagged transactions across Enterprise Operations",
    icon: "ScanSearch",
    roles: ["Compliance", "Operations"],
  },
  {
    id: "qa4",
    label: "Draft Investor Update",
    description: "Summarize growth and portfolio performance",
    icon: "TrendingUp",
    roles: ["CEO"],
  },
  {
    id: "qa5",
    label: "Escalate Support Queue",
    description: "Reassign priority tickets to available agents",
    icon: "Headset",
    roles: ["Customer Service", "Operations"],
  },
];

export const demoReportSections: ReportSection[] = [
  {
    id: "r1",
    title: "Financial Performance",
    summary:
      "Revenue reached $284.6M this quarter, up 12.4%, driven primarily by Strategic Accounts' institutional rebalancing activity.",
  },
  {
    id: "r2",
    title: "Portfolio & Risk",
    summary:
      "Assets under management crossed $1.92B. Risk exposure index improved to 3.1, its lowest reading in three quarters.",
  },
  {
    id: "r3",
    title: "Customer Health",
    summary:
      "48,210 active customers group-wide. 4 enterprise accounts are flagged at elevated churn risk, concentrated in Commercial Operations and Strategic Accounts.",
  },
  {
    id: "r4",
    title: "Operational Integrity",
    summary:
      "Nightly reconciliation completed cleanly across all business units. Service SLA compliance holds at 98.4%, up 0.6 points month over month.",
  },
];

export const demoExecutiveSummary: Record<Role, string> = {
  CEO: "Revenue is up 12.4% quarter over quarter, led by Strategic Accounts' institutional rebalancing activity. Portfolio value crossed $1.92B, and risk exposure continues to trend down. Recommend reviewing the Commercial Operations leadership meeting notes before Thursday's board sync.",
  Operations: "Nightly reconciliation completed cleanly across all four business units. SLA compliance sits at 98.4%, up 0.6 points. One workflow bottleneck detected in Customer Operations claims processing — automation candidate identified.",
  "Relationship Manager": "48,210 active customers, with strongest growth in the mid-market segment. Three enterprise accounts are due for renewal review this week, and portfolio value per client is trending upward across Strategic Accounts.",
  Compliance: "Risk exposure index improved to 3.1, down from 4.2 three months ago. Three transactions are currently flagged for manual review in Enterprise Operations. No regulatory filings are overdue this cycle.",
  "Customer Service": "SLA compliance holds at 98.4% with average resolution time down 9% this month. A support queue escalation is recommended for Customer Operations during peak claims hours.",
  "Customer / Investor": "Private portfolio stands at $10.48M (₦16.2B equivalent). Your quarterly return sits at a secure +4.8% with zero outstanding KYC document reviews or compliance requirements.",
};

export const demoSuggestedPrompts: SuggestedPrompt[] = [
  {
    id: "sp1",
    label: "Analyze churn risk across our top 5 enterprise accounts",
    prompt: "Provide a detailed churn risk analysis for our top 5 enterprise accounts, highlighting renewal dates, health scores, and recommended interventions.",
    roles: ["CEO", "Relationship Manager", "Operations"],
  },
  {
    id: "sp2",
    label: "Summarize value leakage sources across business units",
    prompt: "Break down the top value leakage sources across all four business units, including root causes, estimated value exposure, and plug status.",
    roles: ["CEO", "Operations", "Compliance"],
  },
  {
    id: "sp3",
    label: "Explain the Meridian Logistics churn prevention play",
    prompt: "Walk me through the Meridian Logistics churn prevention strategy, including the contract timeline, stakeholder changes, and proposed pricing adjustments.",
    roles: ["Relationship Manager", "Operations", "CEO"],
  },
  {
    id: "sp4",
    label: "Draft executive brief for Halden & Cross review meeting",
    prompt: "Generate an executive brief for the upcoming Halden & Cross review meeting on Aug 19, focusing on portfolio rebalancing, ESG mandates, and expansion opportunities.",
    roles: ["Relationship Manager", "CEO"],
  },
  {
    id: "sp5",
    label: "Evaluate capacity bottlenecks in Customer Operations",
    prompt: "Analyze the current claims processing bottlenecks in Customer Operations, including delay metrics, ticket volumes, and expected impact of Phase 2 automation.",
    roles: ["Operations", "Customer Service", "CEO"],
  },
];

export function demoGetAiResponse(
  prompt: string,
  role: Role
): { content: string; richContent?: "performance-stats" | "executive-report" | "at-risk-customers" } {
  const p = prompt.toLowerCase();

  if (p.includes("summarize") && (p.includes("performance") || p.includes("today"))) {
    return {
      content: demoExecutiveSummary[role] || "Performance metrics synchronized across business units.",
      richContent: "performance-stats",
    };
  }

  if (p.includes("executive report") || (p.includes("generate") && p.includes("report"))) {
    return {
      content: "Here is your multi-subsidiary Executive Briefing generated from current telemetry:",
      richContent: "executive-report",
    };
  }

  if (p.includes("at-risk") || p.includes("churn") || p.includes("risk")) {
    return {
      content: "Identified 4 enterprise accounts exhibiting elevated risk signals:",
      richContent: "at-risk-customers",
    };
  }

  return {
    content: `Analysis complete for "${prompt}". System operating within standard risk and SLA parameters.`,
  };
}

