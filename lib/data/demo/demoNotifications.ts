import { ActivityItem, NotificationItem } from "@/lib/types";

export type SignalCategory =
  | "Critical"
  | "Risks"
  | "Opportunities"
  | "Decisions"
  | "Customer Signals"
  | "Revenue Signals"
  | "Operations"
  | "Workflow"
  | "AI Insights";

export interface IntelligenceSignal {
  id: string;
  category: SignalCategory;
  title: string;
  timestamp: string;
  source: string;
  businessArea: string;
  urgency: "Critical" | "Urgent" | "Normal";
  confidence: number; // Percentage
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "active" | "investigating" | "understood" | "assigned";
  assignee?: string;
  whatHappened: string;
  whyItMatters: string;
  potentialImpact: string;
  recommendedAction: string;
  evidenceLogs: string[];
}

export const demoActivity: ActivityItem[] = [
  {
    id: "a1",
    actor: "Strategic Accounts",
    action: "closed a portfolio rebalance worth",
    target: "$42.3M",
    time: "12 min ago",
    type: "deal",
  },
  {
    id: "a2",
    actor: "Compliance Engine",
    action: "flagged 3 transactions for review in",
    target: "Enterprise Operations",
    time: "38 min ago",
    type: "compliance",
  },
  {
    id: "a3",
    actor: "Amara Osei",
    action: "onboarded a new enterprise account at",
    target: "Customer Operations",
    time: "1 hr ago",
    type: "customer",
  },
  {
    id: "a4",
    actor: "Risk Engine",
    action: "identified elevated churn signals in",
    target: "Mid-Market Segment",
    time: "2 hr ago",
    type: "risk",
  },
  {
    id: "a5",
    actor: "System",
    action: "completed nightly reconciliation across",
    target: "all business units",
    time: "6 hr ago",
    type: "system",
  },
  {
    id: "a6",
    actor: "Daniel Reyes",
    action: "scheduled an executive review with",
    target: "Commercial Operations leadership",
    time: "8 hr ago",
    type: "deal",
  },
];

export const demoNotifications: NotificationItem[] = [
  {
    id: "note-1",
    type: "alert",
    severity: "critical",
    title: "SLA breach — claims turnaround",
    description: "Customer Operations claims processing has exceeded its SLA threshold. Immediate attention recommended.",
    time: "2 hours ago",
    read: false,
    source: "Operations",
  },
  {
    id: "note-2",
    type: "alert",
    severity: "warning",
    title: "Meridian Logistics usage down 34%",
    description: "Platform activity has declined significantly over the last 60 days. Renewal is in 21 days.",
    time: "5 hours ago",
    read: false,
    source: "Apex Intelligence",
  },
  {
    id: "note-3",
    type: "mention",
    severity: "warning",
    title: "Priya Nair mentioned you",
    description: "In a note on Halden & Cross Partners: \"Need to identify who signs off on renewal.\"",
    time: "6 hours ago",
    read: false,
    source: "Customers",
  },
  {
    id: "note-4",
    type: "system",
    severity: "info",
    title: "Nightly reconciliation completed",
    description: "Reconciliation finished cleanly for Enterprise Operations, Commercial Operations, and Strategic Accounts.",
    time: "10 hours ago",
    read: true,
    source: "Operations",
  },
  {
    id: "note-5",
    type: "alert",
    severity: "critical",
    title: "Customer Operations reconciliation delayed",
    description: "The nightly reconciliation run for Customer Operations did not complete on schedule.",
    time: "12 hours ago",
    read: false,
    source: "Operations",
  },
];

export const demoSignals: IntelligenceSignal[] = [

  {
    id: "sig-1",
    category: "Risks",
    title: "Meridian Logistics Purchasing Decline Detected",
    timestamp: "Aug 18, 2026 09:42 AM",
    source: "Context-Aware Churn Engine",
    businessArea: "Commercial Operations",
    urgency: "Critical",
    confidence: 94,
    priority: "HIGH",
    status: "active",
    whatHappened: "Meridian Logistics Group's purchasing activity has declined 38% against its historical monthly pattern.",
    whyItMatters: "Consistent drop indicates severe onboarding churn risk, compounded by the departure of the key regional stakeholder.",
    potentialImpact: "₦18.4M",
    recommendedAction: "Schedule relationship review within 48 hours and assign Elena Cho as interim RM.",
    evidenceLogs: [
      "API Request count declined from 12,400/hr to 7,600/hr.",
      "Zero support tickets updated in last 14 days.",
      "Sponsor departure detected on system registry on Aug 11."
    ]
  },
  {
    id: "sig-2",
    category: "Opportunities",
    title: "Failover Automated Upsell Path Eligible",
    timestamp: "Aug 18, 2026 08:15 AM",
    source: "Revenue Intelligence Engine",
    businessArea: "Strategic Accounts",
    urgency: "Normal",
    confidence: 91,
    priority: "MEDIUM",
    status: "active",
    whatHappened: "Halden & Cross Partners transaction volume exceeded tier bounds by 24% for two consecutive billing cycles.",
    whyItMatters: "Client qualifies for automated enterprise tier upgrade with high renewal lock propensity.",
    potentialImpact: "₦32.0M",
    recommendedAction: "Dispatch automated tier upgrade notification and schedule account review.",
    evidenceLogs: [
      "Monthly transaction volume reached 1.24M vs 1.0M tier cap.",
      "Zero failed settlement records in 90 days."
    ]
  },
  {
    id: "sig-3",
    category: "Operations",
    title: "Solace Insurance Claims Backlog Alert",
    timestamp: "Aug 17, 2026 04:30 PM",
    source: "Operations Capacity Monitor",
    businessArea: "Customer Operations",
    urgency: "Urgent",
    confidence: 88,
    priority: "HIGH",
    status: "investigating",
    assignee: "Jordan Lee",
    whatHappened: "Claims processing turnaround time reached 2.8 days against contracted 1.0-day SLA.",
    whyItMatters: "Breach of SLA thresholds triggers potential monthly service credit penalties.",
    potentialImpact: "₦3.8M",
    recommendedAction: "Deploy Claims Automation Phase 2 triage module to bypass manual queues.",
    evidenceLogs: [
      "Queue depth increased to 1,842 pending claims.",
      "35% increase in customer support escalations this week."
    ]
  },
  {
    id: "sig-4",
    category: "Decisions",
    title: "Central Bank Volatility Threshold Triggered",
    timestamp: "Aug 17, 2026 08:00 AM",
    source: "Treasury Risk Desk",
    businessArea: "Enterprise Operations",
    urgency: "Normal",
    confidence: 96,
    priority: "MEDIUM",
    status: "assigned",
    assignee: "Marcus Thorne",
    whatHappened: "CBN 30-day foreign exchange rate deviation crossed 3.5% threshold, activating Clause 4.2 indexation.",
    whyItMatters: "Protects contract yield margins across 42 active enterprise agreements.",
    potentialImpact: "₦15.2M",
    recommendedAction: "Execute automated price indexation multiplier across ERP billing queues.",
    evidenceLogs: [
      "CBN official index updated at 07:30 AM.",
      "42 enterprise contracts parsed and validated for Clause 4.2 eligibility."
    ]
  }
];
