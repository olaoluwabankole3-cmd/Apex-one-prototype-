export type EventCategory =
  | "Executive Decision"
  | "Customer Meeting"
  | "Renewal"
  | "Strategy"
  | "Operations"
  | "Compliance"
  | "Review"
  | "Workflow"
  | "Internal";

export interface DecisionIntellEvent {
  id: string;
  title: string;
  date: string; // e.g. "Aug 18, 2026"
  dayNumber: number; // e.g. 18
  time: string;
  category: EventCategory;
  status: "completed" | "upcoming";
  participants: string[];
  relatedCustomer: string;
  relatedDepartment: "Strategic Accounts" | "Enterprise Operations" | "Commercial Operations" | "Customer Operations";
  relatedWorkflow: string;
  relatedContract: string;
  previousMeetings: string[];
  relevantDocuments: string[];
  decisionRequired: string;
  businessImpact: string; // formatted currency value
  dependencies: string[];
  executiveBrief: {
    currentContractValue: string;
    revenueHistory: string;
    lastInteraction: string;
    openSupportIssues: number;
    renewalProbability: string;
    outstandingRisks: string;
    expansionOpportunity: string;
    recommendedDiscussionPoints: string[];
  };
  decisionCapture?: {
    decisionsMade: string[];
    actionItems: { task: string; owner: string; deadline: string }[];
    relatedWorkflows: string[];
    followUpDate: string;
  };
}

export const demoCalendarEvents: DecisionIntellEvent[] = [
  {
    id: "dec-1",
    title: "Meridian Logistics — Renewal & Strategic Pricing Alignment",
    date: "Aug 18, 2026",
    dayNumber: 18,
    time: "10:00 AM",
    category: "Renewal",
    status: "upcoming",
    participants: ["Elena Cho", "Marcus Fenwick", "Sarah Below"],
    relatedCustomer: "Meridian Logistics Group",
    relatedDepartment: "Commercial Operations",
    relatedWorkflow: "Context-Aware Churn Prevention",
    relatedContract: "ML-SLA-2024-RENEW",
    previousMeetings: [
      "Jul 14 - Performance Alignment Review",
      "Jun 02 - Usage Baseline Assessment"
    ],
    relevantDocuments: [
      "Commercial Operations — Master Logistics Clearing SLA.pdf",
      "Meridian_Logistics_SLA_Variance_Report.pdf"
    ],
    decisionRequired: "Approve custom Naira-indexed pricing matrix to offset the 4.2% mid-market consumer contraction and lock 2-year retention.",
    businessImpact: "₦18.4M",
    dependencies: [
      "Finance approval on clearing gateway volume tiers",
      "Legal sign-off on SLA addendum"
    ],
    executiveBrief: {
      currentContractValue: "₦1.20B ARR ($1.84M USD)",
      revenueHistory: "-12.4% YoY contraction due to clearing friction",
      lastInteraction: "Elena Cho via Executive Call on Aug 11",
      openSupportIssues: 18,
      renewalProbability: "68% (Elevates to 94% with automated clearing module)",
      outstandingRisks: "Contract expires in 45 days; sponsor departure in June",
      expansionOpportunity: "₦610M ARR automated clearing upgrade",
      recommendedDiscussionPoints: [
        "Review automated clearing milestone benchmarks",
        "Present customized Net-30 payment flexibility options",
        "Lock 2-year renewal with automated clearing upgrade package"
      ]
    }
  },
  {
    id: "dec-2",
    title: "Halden & Cross — Q2 Portfolio Discretionary Mandate Review",
    date: "Aug 19, 2026",
    dayNumber: 19,
    time: "02:00 PM",
    category: "Executive Decision",
    status: "upcoming",
    participants: ["Priya Nair", "Sarah Below", "Marcus Thorne"],
    relatedCustomer: "Halden & Cross Partners",
    relatedDepartment: "Strategic Accounts",
    relatedWorkflow: "Context-Aware Churn Prevention",
    relatedContract: "HCP-SLA-2026-INV",
    previousMeetings: [
      "May 20 - Strategic Accounts Q1 Review",
      "Feb 01 - Mandate Signing"
    ],
    relevantDocuments: [
      "Strategic Accounts — Q2 Investment Management Agreement.pdf"
    ],
    decisionRequired: "Approve allocation parameters for Fund III carbon-neutral index rebalancing.",
    businessImpact: "₦32.0M",
    dependencies: [
      "ESG Compliance scoring verification",
      "Custody bank liquidity confirmation"
    ],
    executiveBrief: {
      currentContractValue: "₦2.03B ARR ($3.12M USD)",
      revenueHistory: "-8.1% temporary contraction pending mandate expansion",
      lastInteraction: "Priya Nair in-person meeting on Jul 28",
      openSupportIssues: 9,
      renewalProbability: "82%",
      outstandingRisks: "Interim Ops Director evaluating alternative platforms",
      expansionOpportunity: "₦1,170M ARR structured treasury yield module",
      recommendedDiscussionPoints: [
        "Present carbon-neutral portfolio performance benchmark",
        "Demonstrate automated LP reporting tools",
        "Finalize Fund III onboarding schedule"
      ]
    }
  },
  {
    id: "dec-3",
    title: "Dangote Industrial — Capacity Overflow Realignment Session",
    date: "Aug 20, 2026",
    dayNumber: 20,
    time: "11:30 AM",
    category: "Customer Meeting",
    status: "upcoming",
    participants: ["Priya Nair", "Alhaji Bello Sani", "Amina Yusuf"],
    relatedCustomer: "Dangote Industrial Consortium",
    relatedDepartment: "Enterprise Operations",
    relatedWorkflow: "Automatic Volatility Multiplier Indexation",
    relatedContract: "DIC-MSA-2024-V4",
    previousMeetings: [
      "Jun 10 - Multi-Year SLA Review",
      "Mar 15 - Q1 Capacity Audit"
    ],
    relevantDocuments: [
      "Enterprise Operations — Dangote Industrial Multi-Year Master Service Agreement.pdf"
    ],
    decisionRequired: "Execute capacity tier upgrade addendum for 41% usage burst over base contracted bounds.",
    businessImpact: "₦23.5M",
    dependencies: [
      "Infrastructure capacity provisioning lock"
    ],
    executiveBrief: {
      currentContractValue: "₦2.80B ARR ($4.31M USD)",
      revenueHistory: "+28.4% YoY rapid expansion",
      lastInteraction: "Priya Nair quarterly briefing on Aug 05",
      openSupportIssues: 3,
      renewalProbability: "97%",
      outstandingRisks: "None; relationship is pristine",
      expansionOpportunity: "₦1,300M ARR capacity tier upgrade",
      recommendedDiscussionPoints: [
        "Review 41% month-over-month volume expansion metrics",
        "Confirm enterprise infrastructure dedicated burst tier",
        "Sign Q4 capacity realignment addendum"
      ]
    }
  },
  {
    id: "dec-4",
    title: "Solace Insurance — Claims Automation Phase 2 Go-Live Sign-Off",
    date: "Aug 22, 2026",
    dayNumber: 22,
    time: "03:30 PM",
    category: "Operations",
    status: "upcoming",
    participants: ["Jordan Lee", "Anita Brooks", "David Chen"],
    relatedCustomer: "Solace Home Insurance Co.",
    relatedDepartment: "Customer Operations",
    relatedWorkflow: "Claims Intake Triage Automation",
    relatedContract: "SHI-SLA-2025-C1",
    previousMeetings: [
      "Jul 22 - Claims Latency Audit",
      "Jun 18 - Phase 1 Pilot Review"
    ],
    relevantDocuments: [
      "Customer Operations — Solace Insurance Claims Processing SLA.pdf"
    ],
    decisionRequired: "Authorize Phase 2 automated claims triage engine deployment to clear 2.8-day queue backlog.",
    businessImpact: "₦14.2M",
    dependencies: [
      "Customer sign-off on exception routing criteria"
    ],
    executiveBrief: {
      currentContractValue: "₦625M ARR ($0.96M USD)",
      revenueHistory: "+2.1% growth with operational bottlenecks",
      lastInteraction: "Jordan Lee technical sync on Aug 12",
      openSupportIssues: 24,
      renewalProbability: "74%",
      outstandingRisks: "SLA latency penalty risk (₦3.8M monthly exposure)",
      expansionOpportunity: "₦325M ARR claims triage engine upgrade",
      recommendedDiscussionPoints: [
        "Demonstrate Phase 2 triage module accuracy (98.4%)",
        "Confirm bypass of manual signature triggers for low-risk claims",
        "Set 24-hour turnaround target validation date"
      ]
    }
  }
];
