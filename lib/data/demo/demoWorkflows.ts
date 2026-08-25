import { WorkflowDef } from "@/lib/types";

export interface ContextAwareLog {
  trigger: { label: string; details: string; active: boolean; done: boolean };
  context: { label: string; details: string; active: boolean; done: boolean };
  aiReasoning: { label: string; details: string; active: boolean; done: boolean; content: string };
  decision: { label: string; details: string; active: boolean; done: boolean; content: string };
  action: { label: string; details: string; active: boolean; done: boolean; content: string; approvalRequired: boolean };
  outcome: { label: string; details: string; active: boolean; done: boolean; content: string };
}

export interface HistoricalRun {
  id: string;
  status: "success" | "failed" | "escalated" | "modified";
  timestamp: string;
  duration: string;
  triggeredBy: string;
  outcomeText: string;
  logs: string[];
}

export interface CustomWorkflowDef extends WorkflowDef {
  businessUnit: "Enterprise Operations" | "Commercial Operations" | "Strategic Accounts" | "Customer Operations";
  contextAwareDetails: ContextAwareLog;
  history: HistoricalRun[];
}

export const demoWorkflows: CustomWorkflowDef[] = [
  {
    id: "wf-1",
    name: "Strategic Accounts — Context-Aware Churn Prevention",
    description: "Monitors account metrics and triggers AI retention routing on decline signals.",
    subsidiary: "Strategic Accounts",
    businessUnit: "Strategic Accounts",
    status: "active",
    successRate: 95.8,
    runsPerWeek: 48,
    lastRun: "2 hours ago",
    nodes: [
      { id: "n1", type: "trigger", label: "Customer Usage Declines", subtitle: "Usage dropped >15% over 30d", x: 40, y: 50 },
      { id: "n2", type: "context", label: "Multi-Signal Context Evaluator", subtitle: "Renewal < 90d AND Tickets > 3", x: 280, y: 50 },
      { id: "n3", type: "ai_analyze", label: "AI Analyze Account Health", subtitle: "Correlate financial exposure metrics", x: 520, y: 50 },
      { id: "n4", type: "ai_predict", label: "AI Predict Churn Risk", subtitle: "Calculated risk score: 92% probability", x: 760, y: 50 },
      { id: "n5", type: "ai_recommend", label: "AI Recommend RM Routing", subtitle: "Suggest route to Elena Cho", x: 760, y: 180 },
      { id: "n6", type: "ai_decide_approval", label: "AI Decide RM Assignment", subtitle: "Awaiting Senior Sign-Off", x: 520, y: 180 },
      { id: "n7", type: "action", label: "Human Approval Desk", subtitle: "RM review & verification of proposal", x: 280, y: 180 },
      { id: "n8", type: "ai_generate", label: "AI Generate Retention Dossier", subtitle: "Create alignment briefing & script", x: 40, y: 180 },
      { id: "n9", type: "integration", label: "Google Calendar Sync", subtitle: "Auto-schedule client strategic review", x: 40, y: 310 }
    ],
    connections: [
      { id: "c1", from: "n1", to: "n2" },
      { id: "c2", from: "n2", to: "n3" },
      { id: "c3", from: "n3", to: "n4" },
      { id: "c4", from: "n4", to: "n5" },
      { id: "c5", from: "n5", to: "n6" },
      { id: "c6", from: "n6", to: "n7" },
      { id: "c7", from: "n7", to: "n8" },
      { id: "c8", from: "n8", to: "n9" }
    ],
    contextAwareDetails: {
      trigger: {
        label: "Usage Contraction Signal",
        details: "Meridian Logistics Group transaction throughput dropped 38% vs trailing 30d benchmark.",
        active: true,
        done: true
      },
      context: {
        label: "Organizational Telemetry Mapping",
        details: "Cross-referenced with CRM (Sponsor departed June 14) and Document store (Contract expires in 45 days).",
        active: true,
        done: true
      },
      aiReasoning: {
        label: "Neural Churn Assessment",
        details: "Assessed 94% churn vulnerability if unaddressed before Aug 25.",
        active: true,
        done: true,
        content: "Account shows classic onboarding transition friction combined with clearing latency bottlenecks. High recovery probability if executive sponsor outreach is scheduled immediately."
      },
      decision: {
        label: "Intervention Routing Decision",
        details: "Selected high-touch executive sponsor re-alignment path.",
        active: true,
        done: true,
        content: "Escalated to Elena Cho with pre-populated retention dossier and custom pricing matrix addendum."
      },
      action: {
        label: "Human Review Gate",
        details: "Executive dossier submitted to RM desk for sign-off.",
        active: true,
        done: false,
        content: "Awaiting Elena Cho's one-click approval to dispatch calendar invitations and retention package.",
        approvalRequired: true
      },
      outcome: {
        label: "Anticipated Resolution",
        details: "Protect ₦1.20B base ARR and unlock ₦610M automated clearing expansion.",
        active: false,
        done: false,
        content: "Scheduled client alignment session, renewal proposal delivered, automated clearing module staged."
      }
    },
    history: [
      {
        id: "run-101",
        status: "success",
        timestamp: "Aug 18, 2026 09:14 AM",
        duration: "1.2s",
        triggeredBy: "Telemetry Engine (Meridian Logistics)",
        outcomeText: "Successfully generated retention dossier and routed to Elena Cho.",
        logs: [
          "09:14:01 - Trigger detected: Throughput drop -38%",
          "09:14:01 - Context parsed: Contract expires in 45 days",
          "09:14:02 - AI reasoning generated: 84% churn risk",
          "09:14:02 - Task dispatched to RM Approval Desk"
        ]
      },
      {
        id: "run-100",
        status: "success",
        timestamp: "Aug 15, 2026 02:30 PM",
        duration: "0.9s",
        triggeredBy: "Scheduled Sweep (Halden & Cross)",
        outcomeText: "Completed quarterly portfolio audit alignment workflow.",
        logs: [
          "14:30:00 - Scheduled trigger initiated",
          "14:30:00 - Portfolio telemetry matched against benchmark",
          "14:30:01 - Dossier created and delivered to Priya Nair"
        ]
      }
    ]
  },
  {
    id: "wf-2",
    name: "Enterprise Operations — Automatic Volatility Multiplier Indexation",
    description: "Monitors currency exchange fluctuations and applies clause 4.2 price indexation.",
    subsidiary: "Enterprise Operations",
    businessUnit: "Enterprise Operations",
    status: "active",
    successRate: 99.2,
    runsPerWeek: 12,
    lastRun: "1 day ago",
    nodes: [
      { id: "n10", type: "trigger", label: "CBN Volatility Threshold Breached", subtitle: "30-day FX deviation >3.5%", x: 40, y: 50 },
      { id: "n11", type: "context", label: "Active Contract Clause Parser", subtitle: "Identify Clause 4.2 treaties", x: 280, y: 50 },
      { id: "n12", type: "ai_analyze", label: "AI Calculate Pricing Multiplier", subtitle: "Generate indexed rate adjustment", x: 520, y: 50 },
      { id: "n13", type: "action", label: "Automated Billing Addendum", subtitle: "Apply multiplier to invoice queue", x: 760, y: 50 }
    ],
    connections: [
      { id: "c10", from: "n10", to: "n11" },
      { id: "c11", from: "n11", to: "n12" },
      { id: "c12", from: "n12", to: "n13" }
    ],
    contextAwareDetails: {
      trigger: {
        label: "Currency Volatility Trigger",
        details: "Central Bank 30-day volatility index exceeded 3.5% threshold.",
        active: true,
        done: true
      },
      context: {
        label: "Contract Clause 4.2 Matching",
        details: "Identified 42 active enterprise agreements containing dynamic indexation clauses.",
        active: true,
        done: true
      },
      aiReasoning: {
        label: "Rate Adjustment Modeling",
        details: "Calculated optimal +4.8% price indexation multiplier to preserve 74% gross margins.",
        active: true,
        done: true,
        content: "Indexation protects ₦15.2M in annual recurring revenue from currency degradation with zero contractual disputes."
      },
      decision: {
        label: "Auto-Execution Decision",
        details: "Verified compliance with pre-approved treasury mandate.",
        active: true,
        done: true,
        content: "Dispatched indexation notices to finance leads and updated ERP billing tables."
      },
      action: {
        label: "Invoice Multiplier Applied",
        details: "Updated next billing cycle invoices across matched contracts.",
        active: true,
        done: true,
        content: "Billing tables synchronized across Enterprise Operations sub-ledgers.",
        approvalRequired: false
      },
      outcome: {
        label: "Value Protected",
        details: "₦15.2M revenue yield protected for current fiscal cycle.",
        active: true,
        done: true,
        content: "Margin stability verified by Treasury Desk."
      }
    },
    history: [
      {
        id: "run-201",
        status: "success",
        timestamp: "Aug 17, 2026 08:00 AM",
        duration: "0.8s",
        triggeredBy: "CBN FX Data Feed",
        outcomeText: "Applied indexation to 42 enterprise accounts; protected ₦15.2M.",
        logs: [
          "08:00:00 - FX Deviation parsed: +3.8%",
          "08:00:00 - 42 contracts matched for Clause 4.2",
          "08:00:01 - Multipliers written to ERP invoice queue"
        ]
      }
    ]
  }
];
