export type InstitutionalCategory =
  | "Policies"
  | "Playbooks"
  | "Contracts"
  | "Customer Knowledge"
  | "Operations"
  | "Compliance"
  | "Strategy"
  | "Decisions"
  | "Historical Intelligence";

export interface KnowledgeSynapse {
  id: string;
  title: string;
  category: InstitutionalCategory;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: number;
  pinned?: boolean;
}

export interface GraphNode {
  id: string;
  label: string;
  type: "Customer" | "Contract" | "Meeting" | "Support" | "Renewal" | "Decision" | "Revenue" | "Policy";
  details: string;
  connections: string[];
}

export interface HistoricalEvent {
  year: string;
  title: string;
  category: string;
  description: string;
  evidence: string;
  impactValue: string;
}

export const demoSynapses: KnowledgeSynapse[] = [
  {
    id: "syn-1",
    title: "Enterprise Revenue Margin Volatility & Escalation Protocol",
    category: "Policies",
    excerpt: "Official policy governing minimum operating margin triggers and Naira pricing adjustment margins.",
    content: [
      "In events where extreme macroeconomic fluctuations cause a direct operational margin degradation of >3%, Relationship Managers must invoke the Naira pricing indexation formula specified in Clause 4.2 of client contracts.",
      "Under no circumstances should legacy flat rates be maintained if the 30-day volatility index crosses standard deviation boundaries.",
      "All price indexation adjustments must be logged in the ERP general sub-ledger with matching Treasury sign-off."
    ],
    author: "Chief Financial Officer Desk",
    date: "Aug 02, 2026",
    readTime: 4,
    pinned: true
  },
  {
    id: "syn-2",
    title: "Strategic Account Churn Triage & Executive Intervention Playbook",
    category: "Playbooks",
    excerpt: "Operational guidelines for responding to accounts flagged with elevated churn risk scores.",
    content: [
      "When an enterprise account's health score drops below 45 or usage contracts by >15% over 30 days, the AI Workspace automatically drafts a retention dossier.",
      "The designated Relationship Manager must conduct an initial outreach within 48 hours.",
      "If the account is due for renewal within 90 days, the Chief of Staff or executive sponsor must be looped into the alignment review."
    ],
    author: "Commercial Operations Leadership",
    date: "Jul 18, 2026",
    readTime: 5,
    pinned: true
  },
  {
    id: "syn-3",
    title: "Inter-Bank Float Optimization & Settlement Protocol",
    category: "Operations",
    excerpt: "Technical standard operating procedure for automated liquidity clearing sweeping schedules.",
    content: [
      "Daily clearing sweeps are scheduled 30 minutes prior to official Central Bank daily ledger sweeps.",
      "Automated scripts consolidate pending batch settlements to minimize intermediate overnight float latency.",
      "Yield gains are verified against general ledger float accounts daily."
    ],
    author: "Treasury Management Engineering",
    date: "Jun 24, 2026",
    readTime: 6
  }
];

export const demoGraphNodes: GraphNode[] = [
  {
    id: "node-meridian",
    label: "Meridian Logistics Group",
    type: "Customer",
    details: "Enterprise Tier · ARR ₦1.20B · Health 34",
    connections: ["node-contract-ml", "node-dec-meridian", "node-wf-churn"]
  },
  {
    id: "node-contract-ml",
    label: "Master Logistics Clearing SLA",
    type: "Contract",
    details: "ML-SLA-2024-RENEW · 45 Days to Renewal",
    connections: ["node-meridian", "node-policy-volatility"]
  },
  {
    id: "node-dec-meridian",
    label: "Meridian Strategic Alignment",
    type: "Decision",
    details: "Scheduled Aug 18 · ₦18.4M Value Impact",
    connections: ["node-meridian", "node-contract-ml"]
  },
  {
    id: "node-wf-churn",
    label: "Context-Aware Churn Prevention",
    type: "Renewal",
    details: "Automated AI Retention Workflow · Active",
    connections: ["node-meridian"]
  },
  {
    id: "node-policy-volatility",
    label: "Margin Volatility Policy",
    type: "Policy",
    details: "Clause 4.2 Indexation Framework",
    connections: ["node-contract-ml"]
  }
];

export const demoHistoricalEvents: HistoricalEvent[] = [
  {
    year: "2026",
    title: "Full Operational Memory & Value Intelligence Activation",
    category: "System",
    description: "Consolidated all enterprise telemetries, document repositories, and predictive revenue models.",
    evidence: "Unified general ledgers, 8 core enterprise customer profiles, and 4 business units active.",
    impactValue: "₦184.7M Total Identified Value"
  },
  {
    year: "2025",
    title: "Claims Automation & Workflow Modernization",
    category: "Operations",
    description: "Implemented automated claims classification and SLA monitoring engines.",
    evidence: "Deployed Phase 1 claims engine across Customer Operations.",
    impactValue: "₦34.2M Reclaimed Capacity"
  },
  {
    year: "2024",
    title: "Strategic Accounts Wealth Management Launch",
    category: "Expansion",
    description: "Expanded institutional advisory services and launched discretionary AUM placement mandates.",
    evidence: "Closed Halden & Cross and Vertex Holdings multi-year agreements.",
    impactValue: "₦5.13B Consolidated ARR"
  }
];
