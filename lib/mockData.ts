import {
  ActivityItem,
  ArticleCategory,
  AtRiskCustomer,
  AutomationOpportunity,
  CalendarEvent,
  Customer,
  CustomerFile,
  CustomerGrowthPoint,
  CustomerMeeting,
  CustomerNote,
  CustomerTask,
  DocumentItem,
  Incident,
  IntegrationItem,
  KnowledgeArticle,
  KpiDatum,
  NotificationItem,
  PortfolioSlice,
  QuickAction,
  ReportSection,
  RevenueBySubsidiaryPoint,
  RevenuePoint,
  Role,
  SegmentBreakdown,
  SlaPoint,
  SubsidiaryOps,
  SubsidiaryPerformance,
  SuggestedPrompt,
  TimelineEvent,
  WorkflowDef,
} from "./types";

export const company = {
  name: "Apex Sync",
  subsidiaries: ["Enterprise Operations", "Commercial Operations", "Strategic Accounts", "Customer Operations"],
};

export const roles: Role[] = [
  "CEO",
  "Operations",
  "Relationship Manager",
  "Compliance",
  "Customer Service",
  "Customer / Investor",
];

export const kpis: KpiDatum[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 284.6,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    delta: 12.4,
    deltaLabel: "vs last quarter",
    trend: "up",
    sparkline: [210, 218, 225, 231, 240, 252, 261, 270, 284.6],
    roles: ["CEO", "Operations"],
  },
  {
    id: "growth",
    label: "YoY Growth",
    value: 18.2,
    suffix: "%",
    decimals: 1,
    delta: 3.1,
    deltaLabel: "vs last year",
    trend: "up",
    sparkline: [9, 10.5, 11, 13, 14.5, 15.8, 16.9, 17.4, 18.2],
    roles: ["CEO", "Operations"],
  },
  {
    id: "customers",
    label: "Active Customers",
    value: 48210,
    decimals: 0,
    delta: 6.7,
    deltaLabel: "new this quarter",
    trend: "up",
    sparkline: [39000, 41200, 42800, 44000, 45100, 46200, 47100, 47800, 48210],
    roles: ["CEO", "Relationship Manager", "Customer Service"],
  },
  {
    id: "portfolio",
    label: "Portfolio Value",
    value: 1.92,
    prefix: "$",
    suffix: "B",
    decimals: 2,
    delta: 4.2,
    deltaLabel: "AUM growth",
    trend: "up",
    sparkline: [1.6, 1.65, 1.7, 1.74, 1.79, 1.83, 1.87, 1.9, 1.92],
    roles: ["CEO", "Relationship Manager"],
  },
  {
    id: "risk-exposure",
    label: "Risk Exposure Index",
    value: 3.1,
    suffix: "/10",
    decimals: 1,
    delta: -0.4,
    deltaLabel: "improved this month",
    trend: "down",
    sparkline: [4.2, 4.0, 3.9, 3.7, 3.6, 3.4, 3.3, 3.2, 3.1],
    roles: ["Compliance", "Operations"],
  },
  {
    id: "sla",
    label: "Service SLA Compliance",
    value: 98.4,
    suffix: "%",
    decimals: 1,
    delta: 0.6,
    deltaLabel: "vs last month",
    trend: "up",
    sparkline: [95.2, 95.8, 96.4, 96.9, 97.2, 97.6, 97.9, 98.1, 98.4],
    roles: ["Customer Service", "Operations"],
  },
];

export const revenueSeries: RevenuePoint[] = [
  { month: "Nov", revenue: 231, target: 225 },
  { month: "Dec", revenue: 240, target: 232 },
  { month: "Jan", revenue: 252, target: 240 },
  { month: "Feb", revenue: 261, target: 248 },
  { month: "Mar", revenue: 270, target: 256 },
  { month: "Apr", revenue: 266, target: 264 },
  { month: "May", revenue: 278, target: 270 },
  { month: "Jun", revenue: 284.6, target: 278 },
];

export const portfolioBreakdown: PortfolioSlice[] = [
  { name: "Enterprise Operations", value: 812, color: "#C9A961" },
  { name: "Commercial Operations", value: 524, color: "#3FBF8F" },
  { name: "Strategic Accounts", value: 398, color: "#E0A845" },
  { name: "Customer Operations", value: 186, color: "#8A7EE8" },
];

export const activity: ActivityItem[] = [
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

export const quickActions: QuickAction[] = [
  {
    id: "qa1",
    label: "Generate Executive Report",
    description: "Compile a board-ready summary across all business units",
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

export const executiveSummary: Record<Role, string> = {
  CEO: "Revenue is up 12.4% quarter over quarter, led by Strategic Accounts' institutional rebalancing activity. Portfolio value crossed $1.92B, and risk exposure continues to trend down. Recommend reviewing the Commercial Operations leadership meeting notes before Thursday's board sync.",
  Operations: "Nightly reconciliation completed cleanly across all four business units. SLA compliance sits at 98.4%, up 0.6 points. One workflow bottleneck detected in Customer Operations claims processing — automation candidate identified.",
  "Relationship Manager": "48,210 active customers, with strongest growth in the mid-market segment. Three enterprise accounts are due for renewal review this week, and portfolio value per client is trending upward across Strategic Accounts.",
  Compliance: "Risk exposure index improved to 3.1, down from 4.2 three months ago. Three transactions are currently flagged for manual review in Enterprise Operations. No regulatory filings are overdue this cycle.",
  "Customer Service": "SLA compliance holds at 98.4% with average resolution time down 9% this month. A support queue escalation is recommended for Customer Operations during peak claims hours.",
  "Customer / Investor": "Private portfolio stands at $10.48M (₦16.2B equivalent). Your quarterly return sits at a secure +4.8% with zero outstanding KYC document reviews or compliance requirements.",
};

// ── Customer Relationship Workspace ─────────────────────────────────────

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Meridian Logistics Group",
    subsidiary: "Commercial Operations",
    tier: "Enterprise",
    status: "at-risk",
    healthScore: 34,
    arr: 1.84,
    owner: "Elena Cho",
    contactName: "Marcus Fenwick",
    contactRole: "VP of Finance",
    contactEmail: "m.fenwick@meridianlogistics.com",
    since: "Mar 2023",
    tags: ["Renewal Due", "Usage Decline"],
  },
  {
    id: "cust-2",
    name: "Halden & Cross Partners",
    subsidiary: "Strategic Accounts",
    tier: "Enterprise",
    status: "at-risk",
    healthScore: 41,
    arr: 3.12,
    owner: "Priya Nair",
    contactName: "Sarah Below",
    contactRole: "Interim Ops Director",
    contactEmail: "s.below@haldencross.com",
    since: "Jan 2022",
    tags: ["Sponsor Change", "High Value"],
  },
  {
    id: "cust-3",
    name: "Solace Home Insurance Co.",
    subsidiary: "Customer Operations",
    tier: "Mid-Market",
    status: "at-risk",
    healthScore: 52,
    arr: 0.96,
    owner: "Jordan Lee",
    contactName: "Anita Brooks",
    contactRole: "Claims Director",
    contactEmail: "a.brooks@solacehome.com",
    since: "Jul 2023",
    tags: ["Support Escalation"],
  },
  {
    id: "cust-4",
    name: "Brightwell Regional Bank",
    subsidiary: "Enterprise Operations",
    tier: "Mid-Market",
    status: "at-risk",
    healthScore: 58,
    arr: 2.4,
    owner: "Elena Cho",
    contactName: "Tom Reyes",
    contactRole: "Chief Operating Officer",
    contactEmail: "t.reyes@brightwellbank.com",
    since: "Sep 2021",
    tags: ["Flat Growth"],
  },
  {
    id: "cust-5",
    name: "Ashford & Vale Wealth",
    subsidiary: "Strategic Accounts",
    tier: "Enterprise",
    status: "active",
    healthScore: 88,
    arr: 4.6,
    owner: "Priya Nair",
    contactName: "Diane Okoro",
    contactRole: "Chief Financial Officer",
    contactEmail: "d.okoro@ashfordvale.com",
    since: "Feb 2020",
    tags: ["Champion", "Expansion Opportunity"],
  },
  {
    id: "cust-6",
    name: "Union Harbor Credit",
    subsidiary: "Enterprise Operations",
    tier: "Mid-Market",
    status: "active",
    healthScore: 91,
    arr: 1.5,
    owner: "Jordan Lee",
    contactName: "Felix Grant",
    contactRole: "Head of Operations",
    contactEmail: "f.grant@unionharbor.com",
    since: "Nov 2022",
    tags: ["Advocate"],
  },
  {
    id: "cust-7",
    name: "Sterling & Ives Underwriters",
    subsidiary: "Customer Operations",
    tier: "SMB",
    status: "onboarding",
    healthScore: 70,
    arr: 0.42,
    owner: "Elena Cho",
    contactName: "Nora Kim",
    contactRole: "Founder",
    contactEmail: "nora@sterlingives.com",
    since: "Jun 2026",
    tags: ["New Account", "Onboarding"],
  },
];

export const customerTimeline: TimelineEvent[] = [
  { id: "t1", customerId: "cust-1", type: "system", title: "Usage alert triggered", description: "Platform activity down 34% over trailing 60 days.", date: "Jul 18, 2026", actor: "Apex Intelligence" },
  { id: "t2", customerId: "cust-1", type: "support", title: "Escalation opened", description: "Reconciliation delays reported by finance team.", date: "Jul 10, 2026", actor: "Support Team" },
  { id: "t3", customerId: "cust-1", type: "meeting", title: "Quarterly business review", description: "Reviewed Q2 usage trends and renewal timeline.", date: "Jun 22, 2026", actor: "Elena Cho" },
  { id: "t4", customerId: "cust-1", type: "deal", title: "Renewal — $1.84M ARR", description: "12-month renewal signed for the current term.", date: "Mar 14, 2023", actor: "Elena Cho" },

  { id: "t5", customerId: "cust-2", type: "system", title: "Executive sponsor departed", description: "Primary sponsor left the organization; no replacement assigned yet.", date: "Jul 14, 2026", actor: "Apex Intelligence" },
  { id: "t6", customerId: "cust-2", type: "note", title: "Internal risk note logged", description: "Flagged for proactive outreach given leadership gap.", date: "Jul 15, 2026", actor: "Priya Nair" },
  { id: "t7", customerId: "cust-2", type: "meeting", title: "Relationship check-in", description: "Discussed continuity plan with interim contact.", date: "Jul 2, 2026", actor: "Priya Nair" },
  { id: "t8", customerId: "cust-2", type: "deal", title: "Expansion — Strategic Accounts advisory tier", description: "Upsell to advisory tier closed at $3.12M ARR.", date: "Jan 9, 2022", actor: "Priya Nair" },

  { id: "t9", customerId: "cust-3", type: "support", title: "Second escalation this month", description: "Claims processing delay reported for the second time.", date: "Jul 17, 2026", actor: "Support Team" },
  { id: "t10", customerId: "cust-3", type: "support", title: "Initial escalation", description: "Claims turnaround time exceeded SLA by 2 days.", date: "Jul 3, 2026", actor: "Support Team" },
  { id: "t11", customerId: "cust-3", type: "meeting", title: "Onboarding retrospective", description: "Reviewed rollout of claims automation module.", date: "May 20, 2026", actor: "Jordan Lee" },

  { id: "t12", customerId: "cust-4", type: "system", title: "Growth flatlined", description: "Account has shown flat usage for three consecutive quarters.", date: "Jul 12, 2026", actor: "Apex Intelligence" },
  { id: "t13", customerId: "cust-4", type: "meeting", title: "Annual strategy session", description: "Discussed digital transformation roadmap for branch operations.", date: "Jun 4, 2026", actor: "Elena Cho" },
  { id: "t14", customerId: "cust-4", type: "deal", title: "Renewal — $2.4M ARR", description: "Standard renewal signed, no expansion.", date: "Sep 8, 2021", actor: "Elena Cho" },

  { id: "t15", customerId: "cust-5", type: "deal", title: "Expansion — Family office desk", description: "Added family office advisory module, +$1.1M ARR.", date: "Jun 28, 2026", actor: "Priya Nair" },
  { id: "t16", customerId: "cust-5", type: "meeting", title: "Executive dinner", description: "Relationship-building session with CFO and board liaison.", date: "May 30, 2026", actor: "Priya Nair" },
  { id: "t17", customerId: "cust-5", type: "note", title: "Reference customer confirmed", description: "Agreed to serve as a reference for prospective Strategic Accounts clients.", date: "Apr 11, 2026", actor: "Priya Nair" },

  { id: "t18", customerId: "cust-6", type: "meeting", title: "Product roadmap preview", description: "Early access session for upcoming lending automation features.", date: "Jul 8, 2026", actor: "Jordan Lee" },
  { id: "t19", customerId: "cust-6", type: "deal", title: "Renewal + seat expansion", description: "Renewed with 15 additional operator seats.", date: "Nov 19, 2025", actor: "Jordan Lee" },

  { id: "t20", customerId: "cust-7", type: "system", title: "Onboarding kicked off", description: "Implementation team assigned, kickoff scheduled.", date: "Jul 5, 2026", actor: "Apex Intelligence" },
  { id: "t21", customerId: "cust-7", type: "deal", title: "New account — $420K ARR", description: "Signed as a new SMB account under Customer Operations.", date: "Jun 15, 2026", actor: "Elena Cho" },
];

export const customerNotes: CustomerNote[] = [
  { id: "n1", customerId: "cust-1", author: "Elena Cho", content: "Finance team lead mentioned budget review is happening internally — renewal decision likely tied to that outcome. Worth checking in before end of month.", date: "Jul 16, 2026", pinned: true },
  { id: "n2", customerId: "cust-1", author: "Elena Cho", content: "Usage decline appears concentrated in the reconciliation module specifically, not platform-wide. May be a training gap rather than dissatisfaction.", date: "Jul 8, 2026" },

  { id: "n3", customerId: "cust-2", author: "Priya Nair", content: "Interim contact Sarah Below is engaged but doesn't have budget authority. Need to identify who signs off on renewal.", date: "Jul 15, 2026", pinned: true },
  { id: "n4", customerId: "cust-2", author: "Priya Nair", content: "Historically a very healthy account under the previous sponsor — this is a continuity risk, not a product risk.", date: "Jul 3, 2026" },

  { id: "n5", customerId: "cust-3", author: "Jordan Lee", content: "Recommend looping in product team on claims automation module — this is the second SLA miss tied to the same workflow.", date: "Jul 17, 2026", pinned: true },

  { id: "n6", customerId: "cust-4", author: "Elena Cho", content: "COO is open to a digital transformation initiative but needs board buy-in first. Good expansion angle for next quarter.", date: "Jun 5, 2026" },

  { id: "n7", customerId: "cust-5", author: "Priya Nair", content: "Strongest relationship in the Strategic Accounts book. CFO has personally referred two prospects this year.", date: "Apr 12, 2026", pinned: true },

  { id: "n8", customerId: "cust-6", author: "Jordan Lee", content: "Ops team has fully adopted the platform — a good candidate for a case study.", date: "Jul 9, 2026" },

  { id: "n9", customerId: "cust-7", author: "Elena Cho", content: "Founder-led account, very responsive. Onboarding is ahead of schedule.", date: "Jul 6, 2026" },
];

export const customerTasks: CustomerTask[] = [
  { id: "k1", customerId: "cust-1", title: "Send renewal proposal ahead of budget review", dueDate: "Jul 24, 2026", done: false, assignee: "Elena Cho", priority: "high" },
  { id: "k2", customerId: "cust-1", title: "Schedule reconciliation module training refresh", dueDate: "Jul 28, 2026", done: false, assignee: "Elena Cho", priority: "medium" },

  { id: "k3", customerId: "cust-2", title: "Identify new budget-holding sponsor", dueDate: "Jul 25, 2026", done: false, assignee: "Priya Nair", priority: "high" },
  { id: "k4", customerId: "cust-2", title: "Send continuity briefing deck", dueDate: "Jul 22, 2026", done: true, assignee: "Priya Nair", priority: "medium" },

  { id: "k5", customerId: "cust-3", title: "Loop in product team on claims automation bug", dueDate: "Jul 23, 2026", done: false, assignee: "Jordan Lee", priority: "high" },
  { id: "k6", customerId: "cust-3", title: "Follow up on SLA credit request", dueDate: "Jul 26, 2026", done: false, assignee: "Jordan Lee", priority: "medium" },

  { id: "k7", customerId: "cust-4", title: "Prepare digital transformation proposal", dueDate: "Aug 4, 2026", done: false, assignee: "Elena Cho", priority: "medium" },

  { id: "k8", customerId: "cust-5", title: "Draft case study outline", dueDate: "Aug 1, 2026", done: false, assignee: "Priya Nair", priority: "low" },

  { id: "k9", customerId: "cust-6", title: "Coordinate case study interview", dueDate: "Jul 30, 2026", done: false, assignee: "Jordan Lee", priority: "low" },

  { id: "k10", customerId: "cust-7", title: "Confirm week 4 onboarding milestones", dueDate: "Jul 27, 2026", done: false, assignee: "Elena Cho", priority: "medium" },
];

export const customerMeetings: CustomerMeeting[] = [
  { id: "m1", customerId: "cust-1", title: "Renewal discussion", date: "Jul 25, 2026", time: "10:00 AM", attendees: ["Elena Cho", "Marcus Fenwick"], status: "upcoming" },
  { id: "m2", customerId: "cust-1", title: "Quarterly business review", date: "Jun 22, 2026", time: "2:00 PM", attendees: ["Elena Cho", "Marcus Fenwick"], status: "completed", notes: "Reviewed Q2 usage trends; agreed to revisit reconciliation workflow training." },

  { id: "m3", customerId: "cust-2", title: "Sponsor continuity call", date: "Jul 24, 2026", time: "11:30 AM", attendees: ["Priya Nair", "Sarah Below"], status: "upcoming" },
  { id: "m4", customerId: "cust-2", title: "Relationship check-in", date: "Jul 2, 2026", time: "9:00 AM", attendees: ["Priya Nair", "Sarah Below"], status: "completed", notes: "Discussed continuity plan given sponsor departure." },

  { id: "m5", customerId: "cust-3", title: "Claims automation review", date: "Jul 23, 2026", time: "3:00 PM", attendees: ["Jordan Lee", "Anita Brooks"], status: "upcoming" },

  { id: "m6", customerId: "cust-4", title: "Digital transformation workshop", date: "Aug 5, 2026", time: "1:00 PM", attendees: ["Elena Cho", "Tom Reyes"], status: "upcoming" },

  { id: "m7", customerId: "cust-5", title: "Executive relationship dinner", date: "May 30, 2026", time: "6:30 PM", attendees: ["Priya Nair", "Diane Okoro"], status: "completed", notes: "Strong engagement; confirmed reference customer status." },

  { id: "m8", customerId: "cust-6", title: "Roadmap preview session", date: "Jul 8, 2026", time: "10:00 AM", attendees: ["Jordan Lee", "Felix Grant"], status: "completed", notes: "Positive reception to lending automation preview." },

  { id: "m9", customerId: "cust-7", title: "Week 2 onboarding sync", date: "Jul 22, 2026", time: "9:30 AM", attendees: ["Elena Cho", "Nora Kim"], status: "upcoming" },
];

export const customerFiles: CustomerFile[] = [
  { id: "f1", customerId: "cust-1", name: "Renewal Proposal — Meridian Q3.pdf", type: "pdf", size: "1.2 MB", uploadedBy: "Elena Cho", date: "Jul 16, 2026" },
  { id: "f2", customerId: "cust-1", name: "Usage Trend Analysis.xlsx", type: "xlsx", size: "480 KB", uploadedBy: "Apex Intelligence", date: "Jul 18, 2026" },

  { id: "f3", customerId: "cust-2", name: "Continuity Briefing Deck.pdf", type: "pdf", size: "2.1 MB", uploadedBy: "Priya Nair", date: "Jul 22, 2026" },
  { id: "f4", customerId: "cust-2", name: "Master Services Agreement.doc", type: "doc", size: "340 KB", uploadedBy: "Priya Nair", date: "Jan 9, 2022" },

  { id: "f5", customerId: "cust-3", name: "SLA Credit Request.doc", type: "doc", size: "210 KB", uploadedBy: "Jordan Lee", date: "Jul 19, 2026" },
  { id: "f6", customerId: "cust-3", name: "Claims Workflow Diagram.image", type: "image", size: "890 KB", uploadedBy: "Jordan Lee", date: "May 20, 2026" },

  { id: "f7", customerId: "cust-4", name: "Digital Transformation Proposal — Draft.pdf", type: "pdf", size: "1.6 MB", uploadedBy: "Elena Cho", date: "Jul 12, 2026" },

  { id: "f8", customerId: "cust-5", name: "Family Office Desk — SOW.pdf", type: "pdf", size: "990 KB", uploadedBy: "Priya Nair", date: "Jun 28, 2026" },
  { id: "f9", customerId: "cust-5", name: "Case Study Outline.doc", type: "doc", size: "150 KB", uploadedBy: "Priya Nair", date: "Aug 1, 2026" },

  { id: "f10", customerId: "cust-6", name: "Seat Expansion Order Form.pdf", type: "pdf", size: "310 KB", uploadedBy: "Jordan Lee", date: "Nov 19, 2025" },

  { id: "f11", customerId: "cust-7", name: "Onboarding Plan.xlsx", type: "xlsx", size: "220 KB", uploadedBy: "Elena Cho", date: "Jun 16, 2026" },
  { id: "f12", customerId: "cust-7", name: "Welcome Kit.pdf", type: "pdf", size: "1.0 MB", uploadedBy: "Elena Cho", date: "Jun 15, 2026" },
];

// ── Operations ───────────────────────────────────────────────────────────

export const subsidiaryOps: SubsidiaryOps[] = [
  {
    subsidiary: "Enterprise Operations",
    slaCompliance: 97.8,
    reconciliationStatus: "complete",
    openIncidents: 3,
    avgResolutionHours: 4.2,
    automationCoverage: 62,
    trend: [96.1, 96.8, 97.0, 97.4, 97.2, 97.6, 97.8],
  },
  {
    subsidiary: "Commercial Operations",
    slaCompliance: 98.9,
    reconciliationStatus: "complete",
    openIncidents: 1,
    avgResolutionHours: 2.1,
    automationCoverage: 71,
    trend: [97.9, 98.1, 98.4, 98.5, 98.6, 98.8, 98.9],
  },
  {
    subsidiary: "Strategic Accounts",
    slaCompliance: 99.4,
    reconciliationStatus: "complete",
    openIncidents: 0,
    avgResolutionHours: 1.5,
    automationCoverage: 68,
    trend: [98.8, 99.0, 99.1, 99.2, 99.3, 99.3, 99.4],
  },
  {
    subsidiary: "Customer Operations",
    slaCompliance: 95.6,
    reconciliationStatus: "delayed",
    openIncidents: 6,
    avgResolutionHours: 7.8,
    automationCoverage: 44,
    trend: [97.2, 96.9, 96.5, 96.0, 95.8, 95.9, 95.6],
  },
];

export const incidents: Incident[] = [
  { id: "i1", subsidiary: "Customer Operations", title: "Claims processing queue backlog", severity: "high", status: "investigating", opened: "Jul 17, 2026", owner: "Marcus Webb" },
  { id: "i2", subsidiary: "Customer Operations", title: "SLA breach — claims turnaround", severity: "critical", status: "open", opened: "Jul 19, 2026", owner: "Marcus Webb" },
  { id: "i3", subsidiary: "Customer Operations", title: "Support queue understaffed during peak hours", severity: "high", status: "open", opened: "Jul 16, 2026", owner: "Marcus Webb" },
  { id: "i4", subsidiary: "Enterprise Operations", title: "API timeout — payments gateway", severity: "medium", status: "investigating", opened: "Jul 18, 2026", owner: "Nina Torres" },
  { id: "i5", subsidiary: "Enterprise Operations", title: "Nightly reconciliation delay", severity: "medium", status: "resolved", opened: "Jul 15, 2026", owner: "Nina Torres" },
  { id: "i6", subsidiary: "Enterprise Operations", title: "Duplicate transaction flagged", severity: "low", status: "resolved", opened: "Jul 12, 2026", owner: "Adebayo Falana" },
  { id: "i7", subsidiary: "Commercial Operations", title: "Data sync lag — CRM integration", severity: "low", status: "open", opened: "Jul 20, 2026", owner: "Priya Shah" },
  { id: "i8", subsidiary: "Strategic Accounts", title: "Minor UI bug in portfolio export", severity: "low", status: "resolved", opened: "Jul 10, 2026", owner: "Priya Shah" },
];

export const automationOpportunities: AutomationOpportunity[] = [
  {
    id: "ao1",
    subsidiary: "Customer Operations",
    process: "Claims intake triage",
    description: "Auto-route incoming claims by type and urgency instead of manual assignment.",
    impact: "Est. 35% reduction in average resolution time.",
    effort: "medium",
  },
  {
    id: "ao2",
    subsidiary: "Enterprise Operations",
    process: "Reconciliation exception handling",
    description: "Auto-flag and resolve common mismatch patterns before human review.",
    impact: "Est. 2 hours saved per nightly reconciliation run.",
    effort: "high",
  },
  {
    id: "ao3",
    subsidiary: "Commercial Operations",
    process: "Renewal reminder workflow",
    description: "Automatically notify relationship managers 45 days ahead of contract renewal.",
    impact: "Projected 20% reduction in late renewals.",
    effort: "low",
  },
  {
    id: "ao4",
    subsidiary: "Strategic Accounts",
    process: "Portfolio report generation",
    description: "Auto-generate weekly portfolio summaries for relationship manager review.",
    impact: "Frees up an estimated 6 hours per week across the team.",
    effort: "low",
  },
];

export const slaTrend: SlaPoint[] = [
  { month: "Dec", compliance: 96.4, target: 98 },
  { month: "Jan", compliance: 96.9, target: 98 },
  { month: "Feb", compliance: 97.2, target: 98 },
  { month: "Mar", compliance: 97.5, target: 98 },
  { month: "Apr", compliance: 97.3, target: 98 },
  { month: "May", compliance: 97.8, target: 98 },
  { month: "Jun", compliance: 98.1, target: 98 },
  { month: "Jul", compliance: 98.4, target: 98 },
];

// ── AI Workspace ─────────────────────────────────────────────────────────

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "sp1",
    label: "Summarize today's business performance",
    roles: ["CEO", "Operations", "Relationship Manager", "Compliance", "Customer Service"],
  },
  {
    id: "sp2",
    label: "Generate executive report",
    roles: ["CEO", "Operations"],
  },
  {
    id: "sp3",
    label: "Show customers at risk",
    roles: ["CEO", "Relationship Manager", "Customer Service"],
  },
  {
    id: "sp4",
    label: "Summarize this week's compliance flags",
    roles: ["Compliance", "Operations"],
  },
  {
    id: "sp5",
    label: "Draft a note to Strategic Accounts leadership",
    roles: ["CEO", "Relationship Manager"],
  },
  {
    id: "sp6",
    label: "Where are support SLAs slipping?",
    roles: ["Customer Service", "Operations"],
  },
];

export const atRiskCustomers: AtRiskCustomer[] = [
  {
    id: "c1",
    name: "Meridian Logistics Group",
    subsidiary: "Commercial Operations",
    arr: 1.84,
    riskScore: 82,
    reason: "Usage down 34% over 60 days, renewal in 21 days",
  },
  {
    id: "c2",
    name: "Halden & Cross Partners",
    subsidiary: "Strategic Accounts",
    arr: 3.12,
    riskScore: 76,
    reason: "Executive sponsor departed, no replacement contact",
  },
  {
    id: "c3",
    name: "Solace Home Insurance Co.",
    subsidiary: "Customer Operations",
    arr: 0.96,
    riskScore: 68,
    reason: "Two unresolved support escalations this month",
  },
  {
    id: "c4",
    name: "Brightwell Regional Bank",
    subsidiary: "Enterprise Operations",
    arr: 2.4,
    riskScore: 61,
    reason: "Flat growth for 3 consecutive quarters",
  },
];

export const reportSections: ReportSection[] = [
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

const genericResponses = [
  "Pulling that together from live data across all four business units now — here's the short version.",
  "Here's what the data across Apex Sync shows on that.",
  "Checked across Enterprise Operations, Commercial Operations, Strategic Accounts, and Customer Operations — here's the summary.",
];

export function getAiResponse(
  prompt: string,
  role: Role
): { content: string; richContent?: "performance-stats" | "executive-report" | "at-risk-customers" } {
  const p = prompt.toLowerCase();

  if (p.includes("summarize") && (p.includes("performance") || p.includes("today"))) {
    return {
      content: executiveSummary[role],
      richContent: "performance-stats",
    };
  }

  if (p.includes("executive report") || (p.includes("generate") && p.includes("report"))) {
    return {
      content:
        "Here's a board-ready executive report compiled across all four business units, generated just now.",
      richContent: "executive-report",
    };
  }

  if (p.includes("at risk") || p.includes("at-risk") || (p.includes("customer") && p.includes("risk"))) {
    return {
      content:
        "I found 4 enterprise accounts with elevated churn signals this month, concentrated in Commercial Operations and Strategic Accounts.",
      richContent: "at-risk-customers",
    };
  }

  if (p.includes("compliance")) {
    return {
      content:
        "Compliance flagged 3 transactions for manual review in Enterprise Operations this week. Risk exposure index improved to 3.1, down from 3.3 last week. No regulatory filings are currently overdue across the enterprise.",
    };
  }

  if (p.includes("sla") || (p.includes("support") && p.includes("slip"))) {
    return {
      content:
        "Service SLA compliance is holding at 98.4% enterprise-wide. The one soft spot is Customer Operations claims processing during peak hours — average resolution time there is up 6% this month, and it's the top automation candidate on the Workflows roadmap.",
    };
  }

  if (p.includes("draft") && p.includes("strategic accounts")) {
    return {
      content:
        "Draft ready: \"Hi team — sharing a quick update ahead of Thursday's sync. Strategic Accounts' institutional rebalancing activity is the single biggest driver of this quarter's revenue growth, and portfolio value per client continues trending upward. Flagging Halden & Cross Partners for a proactive check-in given the recent sponsor change. Happy to walk through the numbers live.\"",
    };
  }

  const fallback = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  return {
    content: `${fallback} ${executiveSummary[role]}`,
  };
}

// ── Document Intelligence ────────────────────────────────────────────────

export const documents: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Strategic Accounts — Q2 Investment Management Agreement.pdf",
    fileType: "pdf",
    category: "Contract",
    subsidiary: "Strategic Accounts",
    uploadedBy: "Priya Nair",
    date: "Jul 15, 2026",
    size: "2.4 MB",
    pages: 18,
    status: "processed",
    aiSummary:
      "A 3-year investment management agreement between Strategic Accounts and Ashford & Vale Wealth covering discretionary portfolio management, quarterly reporting obligations, and a tiered fee schedule. Includes a 90-day termination notice clause and an automatic renewal provision.",
    extractedFields: [
      { label: "Client", value: "Ashford & Vale Wealth" },
      { label: "Effective Date", value: "Feb 1, 2026" },
      { label: "Term", value: "3 years, auto-renewing" },
      { label: "AUM Commitment", value: "$210M" },
      { label: "Fee Structure", value: "0.85% base + 10% performance above benchmark" },
      { label: "Termination Notice", value: "90 days" },
    ],
    suggestedQuestions: [
      "What is the termination notice period?",
      "What's the fee structure?",
      "When does this agreement renew?",
    ],
  },
  {
    id: "doc-2",
    name: "Meridian Logistics — Renewal Contract Draft.doc",
    fileType: "doc",
    category: "Contract",
    subsidiary: "Commercial Operations",
    uploadedBy: "Elena Cho",
    date: "Jul 16, 2026",
    size: "640 KB",
    pages: 9,
    status: "processed",
    aiSummary:
      "Draft 12-month renewal for Meridian Logistics Group at the current ARR, with no material changes to scope. Includes a standard 60-day termination clause and a proposed 3% price escalation not yet accepted by the client.",
    extractedFields: [
      { label: "Client", value: "Meridian Logistics Group" },
      { label: "Proposed ARR", value: "$1.84M (+3%)" },
      { label: "Renewal Date", value: "Sep 14, 2026" },
      { label: "Termination Notice", value: "60 days" },
      { label: "Auto-renewal", value: "No — requires signature" },
    ],
    suggestedQuestions: [
      "What's the proposed price change?",
      "When is the renewal date?",
      "Does this auto-renew?",
    ],
  },
  {
    id: "doc-3",
    name: "Enterprise Operations — Q2 2026 Financial Statement.xlsx",
    fileType: "xlsx",
    category: "Financial Statement",
    subsidiary: "Enterprise Operations",
    uploadedBy: "Nina Torres",
    date: "Jul 10, 2026",
    size: "1.1 MB",
    pages: 6,
    status: "processed",
    aiSummary:
      "Q2 2026 financial statement showing total assets up 4.1% quarter over quarter, driven by growth in the commercial lending book. Net income improved on lower loan loss provisions, though provisioning remains elevated versus the prior year.",
    extractedFields: [
      { label: "Total Assets", value: "$18.6B" },
      { label: "Net Income", value: "$142M" },
      { label: "Q/Q Asset Growth", value: "+4.1%" },
      { label: "Loan Loss Provision", value: "$21M" },
    ],
    suggestedQuestions: [
      "What was net income this quarter?",
      "How much are loan loss provisions?",
      "What drove asset growth?",
    ],
  },
  {
    id: "doc-4",
    name: "Customer Operations — Claims Audit Report.pdf",
    fileType: "pdf",
    category: "Claims Report",
    subsidiary: "Customer Operations",
    uploadedBy: "Marcus Webb",
    date: "Jul 12, 2026",
    size: "3.0 MB",
    pages: 24,
    status: "processed",
    aiSummary:
      "Quarterly internal audit of 340 claims processed in Q2. Overall compliance score of 91/100, with the primary finding being turnaround-time misses concentrated in the claims triage step — consistent with the automation opportunity already flagged in Operations.",
    extractedFields: [
      { label: "Audit Period", value: "Q2 2026" },
      { label: "Claims Reviewed", value: "340" },
      { label: "Compliance Score", value: "91 / 100" },
      { label: "Primary Finding", value: "Triage turnaround-time misses" },
    ],
    suggestedQuestions: [
      "What was the compliance score?",
      "What was the primary finding?",
      "How many claims were reviewed?",
    ],
  },
  {
    id: "doc-5",
    name: "Commercial Operations — AML Compliance Filing.pdf",
    fileType: "pdf",
    category: "Compliance Filing",
    subsidiary: "Commercial Operations",
    uploadedBy: "Priya Shah",
    date: "Jul 8, 2026",
    size: "1.8 MB",
    pages: 14,
    status: "processed",
    aiSummary:
      "Routine anti-money-laundering filing covering Q2 2026 transaction monitoring. 12 transactions were flagged for manual review, all resolved with no regulatory escalation required. Filing status is current with no outstanding items.",
    extractedFields: [
      { label: "Filing Period", value: "Q2 2026" },
      { label: "Transactions Flagged", value: "12" },
      { label: "Regulator", value: "FinCEN" },
      { label: "Status", value: "Filed, no escalation" },
    ],
    suggestedQuestions: [
      "How many transactions were flagged?",
      "Was there a regulatory escalation?",
      "Who is the regulator?",
    ],
  },
  {
    id: "doc-6",
    name: "Halden & Cross — Master Services Agreement.doc",
    fileType: "doc",
    category: "Contract",
    subsidiary: "Strategic Accounts",
    uploadedBy: "Priya Nair",
    date: "Jul 20, 2026",
    size: "980 KB",
    pages: 22,
    status: "processing",
    aiSummary: "",
    extractedFields: [],
    suggestedQuestions: [],
  },
];

const genericDocResponses = [
  "Based on the extracted data, here's what I found in this document.",
  "Pulling that from the document's extracted fields now.",
  "Here's what this document says on that.",
];

export function getDocumentAnswer(question: string, doc: DocumentItem): string {
  const q = question.toLowerCase();

  const match = doc.extractedFields.find((f) => q.includes(f.label.toLowerCase().split(" ")[0]));
  if (match) {
    return `${match.label}: ${match.value}.`;
  }

  if (q.includes("summar") || q.includes("about")) {
    return doc.aiSummary;
  }

  if (q.includes("termination") || q.includes("notice")) {
    const field = doc.extractedFields.find((f) => f.label.toLowerCase().includes("termination"));
    if (field) return `${field.label}: ${field.value}.`;
  }

  if (q.includes("renew")) {
    const field = doc.extractedFields.find((f) => f.label.toLowerCase().includes("renew"));
    if (field) return `${field.label}: ${field.value}.`;
  }

  const fallback = genericDocResponses[Math.floor(Math.random() * genericDocResponses.length)];
  return `${fallback} ${doc.aiSummary || "This document is still processing — check back shortly for extracted details."}`;
}

// ── Analytics ────────────────────────────────────────────────────────────

export const revenueBySubsidiary: RevenueBySubsidiaryPoint[] = [
  { month: "Nov", enterpriseOps: 78.5, commercialOps: 43.9, strategicAccounts: 69.3, customerOps: 39.3 },
  { month: "Dec", enterpriseOps: 81.6, commercialOps: 45.6, strategicAccounts: 74.4, customerOps: 38.4 },
  { month: "Jan", enterpriseOps: 88.2, commercialOps: 50.4, strategicAccounts: 78.1, customerOps: 35.3 },
  { month: "Feb", enterpriseOps: 91.4, commercialOps: 52.2, strategicAccounts: 83.5, customerOps: 33.9 },
  { month: "Mar", enterpriseOps: 97.2, commercialOps: 54.0, strategicAccounts: 86.4, customerOps: 32.4 },
  { month: "Apr", enterpriseOps: 95.8, commercialOps: 55.9, strategicAccounts: 85.1, customerOps: 29.3 },
  { month: "May", enterpriseOps: 102.9, commercialOps: 58.4, strategicAccounts: 89.0, customerOps: 27.8 },
  { month: "Jun", enterpriseOps: 105.3, commercialOps: 59.8, strategicAccounts: 93.9, customerOps: 25.6 },
];

export const customerGrowth: CustomerGrowthPoint[] = [
  { month: "Aug", customers: 35400 },
  { month: "Sep", customers: 36900 },
  { month: "Oct", customers: 38200 },
  { month: "Nov", customers: 39000 },
  { month: "Dec", customers: 41200 },
  { month: "Jan", customers: 42800 },
  { month: "Feb", customers: 44000 },
  { month: "Mar", customers: 45100 },
  { month: "Apr", customers: 46200 },
  { month: "May", customers: 47100 },
  { month: "Jun", customers: 47800 },
  { month: "Jul", customers: 48210 },
];

export const subsidiaryPerformance: SubsidiaryPerformance[] = [
  { subsidiary: "Enterprise Operations", portfolioValue: 812, customers: 20393, growthPct: 34.1, slaCompliance: 97.8 },
  { subsidiary: "Commercial Operations", portfolioValue: 524, customers: 13161, growthPct: 36.2, slaCompliance: 98.9 },
  { subsidiary: "Strategic Accounts", portfolioValue: 398, customers: 9980, growthPct: 35.5, slaCompliance: 99.4 },
  { subsidiary: "Customer Operations", portfolioValue: 186, customers: 4676, growthPct: -34.9, slaCompliance: 95.6 },
];

export const segmentBreakdown: SegmentBreakdown[] = [
  { segment: "Enterprise", arr: 612, customers: 1240, color: "#C9A961" },
  { segment: "Mid-Market", arr: 890, customers: 18900, color: "#3FBF8F" },
  { segment: "SMB", arr: 418, customers: 28070, color: "#8A7EE8" },
];

export function sliceByRange<T>(data: T[], range: "30D" | "90D" | "YTD" | "12M"): T[] {
  const counts: Record<string, number> = { "30D": 1, "90D": 3, YTD: 7, "12M": data.length };
  const count = Math.min(counts[range] ?? data.length, data.length);
  return data.slice(data.length - count);
}

// ── Workflow Builder ─────────────────────────────────────────────────────

export const workflows: WorkflowDef[] = [
  {
    id: "wf-1",
    name: "Claims Intake Triage",
    description: "Auto-classifies and routes incoming claims by urgency, replacing manual assignment.",
    subsidiary: "Customer Operations",
    status: "active",
    successRate: 94.2,
    runsPerWeek: 186,
    lastRun: "2 hours ago",
    nodes: [
      { id: "n1", type: "trigger", label: "New Claim Submitted", subtitle: "Customer Operations intake API", x: 40, y: 180 },
      { id: "n2", type: "ai", label: "Classify Urgency & Type", subtitle: "Apex Intelligence auto-triage", x: 280, y: 180 },
      { id: "n3", type: "condition", label: "Urgent?", subtitle: "Severity threshold check", x: 520, y: 180 },
      { id: "n4", type: "action", label: "Escalate to Senior Adjuster", subtitle: "Priority queue, SLA 2h", x: 760, y: 70 },
      { id: "n5", type: "action", label: "Standard Queue Assignment", subtitle: "Round-robin adjuster pool", x: 760, y: 290 },
      { id: "n6", type: "integration", label: "Update Claims CRM", subtitle: "Sync status + assignment", x: 1000, y: 180 },
    ],
    connections: [
      { id: "c1", from: "n1", to: "n2" },
      { id: "c2", from: "n2", to: "n3" },
      { id: "c3", from: "n3", to: "n4", branchLabel: "Yes" },
      { id: "c4", from: "n3", to: "n5", branchLabel: "No" },
      { id: "c5", from: "n4", to: "n6" },
      { id: "c6", from: "n5", to: "n6" },
    ],
  },
  {
    id: "wf-2",
    name: "Renewal Reminder Workflow",
    description: "Notifies relationship managers ahead of contract renewal and escalates if there's no response.",
    subsidiary: "Commercial Operations",
    status: "active",
    successRate: 88.5,
    runsPerWeek: 42,
    lastRun: "1 day ago",
    nodes: [
      { id: "n1", type: "trigger", label: "45 Days Before Renewal", subtitle: "Contract date monitor", x: 40, y: 180 },
      { id: "n2", type: "ai", label: "Draft Renewal Email", subtitle: "Personalized to account context", x: 280, y: 180 },
      { id: "n3", type: "action", label: "Notify Relationship Manager", subtitle: "Slack + email alert", x: 520, y: 180 },
      { id: "n4", type: "delay", label: "Wait 3 Days", subtitle: "Grace period for RM response", x: 760, y: 180 },
      { id: "n5", type: "condition", label: "RM Responded?", subtitle: "Check CRM activity log", x: 1000, y: 180 },
      { id: "n6", type: "action", label: "Send Client Reminder", subtitle: "Auto-send drafted email", x: 1240, y: 70 },
      { id: "n7", type: "action", label: "Mark as In Progress", subtitle: "RM is handling manually", x: 1240, y: 290 },
    ],
    connections: [
      { id: "c1", from: "n1", to: "n2" },
      { id: "c2", from: "n2", to: "n3" },
      { id: "c3", from: "n3", to: "n4" },
      { id: "c4", from: "n4", to: "n5" },
      { id: "c5", from: "n5", to: "n6", branchLabel: "No" },
      { id: "c6", from: "n5", to: "n7", branchLabel: "Yes" },
    ],
  },
  {
    id: "wf-3",
    name: "Reconciliation Exception Handling",
    description: "Auto-flags and resolves common nightly reconciliation mismatches before human review.",
    subsidiary: "Enterprise Operations",
    status: "draft",
    successRate: 76.0,
    runsPerWeek: 7,
    lastRun: "6 days ago",
    nodes: [
      { id: "n1", type: "trigger", label: "Nightly Reconciliation Run", subtitle: "00:00 UTC batch job", x: 40, y: 220 },
      { id: "n2", type: "condition", label: "Mismatch Detected?", subtitle: "Ledger vs. statement diff", x: 280, y: 220 },
      { id: "n3", type: "action", label: "Mark Reconciled", subtitle: "No further action needed", x: 520, y: 340 },
      { id: "n4", type: "ai", label: "Pattern Match Exception", subtitle: "Compare to known exception types", x: 520, y: 100 },
      { id: "n5", type: "condition", label: "High Confidence Match?", subtitle: "Model confidence score", x: 760, y: 100 },
      { id: "n6", type: "action", label: "Auto-Resolve", subtitle: "Apply matched correction", x: 1000, y: 20 },
      { id: "n7", type: "action", label: "Flag for Manual Review", subtitle: "Unmatched pattern", x: 1000, y: 180 },
      { id: "n8", type: "integration", label: "Update Ledger", subtitle: "Write back to core banking system", x: 1240, y: 100 },
    ],
    connections: [
      { id: "c1", from: "n1", to: "n2" },
      { id: "c2", from: "n2", to: "n3", branchLabel: "No" },
      { id: "c3", from: "n2", to: "n4", branchLabel: "Yes" },
      { id: "c4", from: "n4", to: "n5" },
      { id: "c5", from: "n5", to: "n6", branchLabel: "Yes" },
      { id: "c6", from: "n5", to: "n7", branchLabel: "No" },
      { id: "c7", from: "n6", to: "n8" },
      { id: "c8", from: "n7", to: "n8" },
    ],
  },
  {
    id: "wf-4",
    name: "Portfolio Report Generation",
    description: "Auto-generates weekly portfolio summaries for relationship manager review.",
    subsidiary: "Strategic Accounts",
    status: "active",
    successRate: 99.1,
    runsPerWeek: 1,
    lastRun: "3 days ago",
    nodes: [
      { id: "n1", type: "trigger", label: "Weekly Schedule — Mon 6AM", subtitle: "Cron trigger", x: 40, y: 180 },
      { id: "n2", type: "integration", label: "Pull Portfolio Data", subtitle: "Strategic Accounts data warehouse", x: 280, y: 180 },
      { id: "n3", type: "ai", label: "Generate Summary", subtitle: "Apex Intelligence report draft", x: 520, y: 180 },
      { id: "n4", type: "action", label: "Send to RM Team", subtitle: "Email distribution list", x: 760, y: 180 },
      { id: "n5", type: "integration", label: "Archive to Knowledge Hub", subtitle: "Store for reference", x: 1000, y: 180 },
    ],
    connections: [
      { id: "c1", from: "n1", to: "n2" },
      { id: "c2", from: "n2", to: "n3" },
      { id: "c3", from: "n3", to: "n4" },
      { id: "c4", from: "n4", to: "n5" },
    ],
  },
];

// ── Notifications ────────────────────────────────────────────────────────

export const notifications: NotificationItem[] = [
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
  {
    id: "note-6",
    type: "workflow",
    severity: "success",
    title: "Claims Intake Triage — 186 runs this week",
    description: "The automation completed its weekly run cycle at a 94.2% success rate.",
    time: "1 day ago",
    read: true,
    source: "Workflows",
  },
  {
    id: "note-7",
    type: "mention",
    severity: "info",
    title: "Elena Cho assigned you a task",
    description: "On Brightwell Regional Bank: \"Prepare digital transformation proposal.\"",
    time: "1 day ago",
    read: true,
    source: "Customers",
  },
  {
    id: "note-8",
    type: "workflow",
    severity: "success",
    title: "Portfolio Report Generation completed",
    description: "The weekly report was generated and sent to the Strategic Accounts RM team.",
    time: "3 days ago",
    read: true,
    source: "Workflows",
  },
  {
    id: "note-9",
    type: "system",
    severity: "success",
    title: "Sterling & Ives onboarding milestone reached",
    description: "Week 2 onboarding milestones completed ahead of schedule.",
    time: "3 days ago",
    read: true,
    source: "Customers",
  },
  {
    id: "note-10",
    type: "workflow",
    severity: "warning",
    title: "Reconciliation Exception Handling still in draft",
    description: "This automation has run 7 times this week at a 76% success rate and is not yet published.",
    time: "4 days ago",
    read: true,
    source: "Workflows",
  },
];

// ── Calendar ─────────────────────────────────────────────────────────────

export const calendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Weekly Portfolio Report Generation",
    date: "Jul 21, 2026",
    time: "6:00 AM",
    type: "workflow",
    attendees: ["Automated"],
    subsidiary: "Strategic Accounts",
  },
  {
    id: "cal-2",
    title: "Week 2 Onboarding Sync — Sterling & Ives",
    date: "Jul 22, 2026",
    time: "9:30 AM",
    type: "meeting",
    attendees: ["Elena Cho", "Nora Kim"],
    subsidiary: "Customer Operations",
  },
  {
    id: "cal-3",
    title: "Claims Automation Review — Solace Home",
    date: "Jul 23, 2026",
    time: "3:00 PM",
    type: "meeting",
    attendees: ["Jordan Lee", "Anita Brooks"],
    subsidiary: "Customer Operations",
  },
  {
    id: "cal-4",
    title: "Sponsor Continuity Call — Halden & Cross",
    date: "Jul 24, 2026",
    time: "11:30 AM",
    type: "meeting",
    attendees: ["Priya Nair", "Sarah Below"],
    subsidiary: "Strategic Accounts",
  },
  {
    id: "cal-5",
    title: "Renewal Discussion — Meridian Logistics",
    date: "Jul 25, 2026",
    time: "10:00 AM",
    type: "renewal",
    attendees: ["Elena Cho", "Marcus Fenwick"],
    subsidiary: "Commercial Operations",
  },
  {
    id: "cal-6",
    title: "Workflow Review — Reconciliation Exception Handling",
    date: "Jul 26, 2026",
    time: "2:00 PM",
    type: "workflow",
    attendees: ["Nina Torres", "Ops Team"],
    subsidiary: "Enterprise Operations",
  },
  {
    id: "cal-7",
    title: "Quarterly Compliance Review",
    date: "Jul 27, 2026",
    time: "11:00 AM",
    type: "review",
    attendees: ["Compliance Team"],
  },
  {
    id: "cal-8",
    title: "Q3 Board Sync",
    date: "Jul 28, 2026",
    time: "9:00 AM",
    type: "review",
    attendees: ["Leadership Team"],
  },
  {
    id: "cal-9",
    title: "Executive Relationship Dinner — Ashford & Vale",
    date: "Aug 1, 2026",
    time: "6:30 PM",
    type: "meeting",
    attendees: ["Priya Nair", "Diane Okoro"],
    subsidiary: "Strategic Accounts",
  },
  {
    id: "cal-10",
    title: "Digital Transformation Workshop — Brightwell",
    date: "Aug 5, 2026",
    time: "1:00 PM",
    type: "meeting",
    attendees: ["Elena Cho", "Tom Reyes"],
    subsidiary: "Enterprise Operations",
  },
];

// ── Knowledge Hub ────────────────────────────────────────────────────────

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "kb-1",
    title: "Handling At-Risk Account Escalations",
    category: "Playbook",
    excerpt: "A step-by-step playbook for relationship managers when an account shows churn signals.",
    content: [
      "When an account's health score drops or usage declines sharply, the first step is always to understand why before reaching out — check the timeline for recent support escalations, sponsor changes, or contract milestones.",
      "Reach out within 48 hours of a risk flag. Lead with a genuine check-in rather than a renewal pitch — the goal is to understand what changed, not to defend the relationship.",
      "Loop in your manager if the account has no clear budget-holding contact, or if the risk driver is outside your control (e.g. a departed sponsor). Continuity risk requires a different plan than a product or pricing issue.",
      "Log every touchpoint in the account timeline so the next person picking up the account has full context.",
    ],
    author: "Priya Nair",
    date: "Jun 12, 2026",
    readTime: 4,
    pinned: true,
  },
  {
    id: "kb-2",
    title: "Customer Operations Claims Triage SOP",
    category: "Playbook",
    excerpt: "Standard operating procedure for triaging and routing incoming insurance claims.",
    content: [
      "All incoming claims are auto-classified by Apex Intelligence for urgency and type before human review. Claims flagged urgent are routed to a senior adjuster with a 2-hour SLA.",
      "Standard claims are assigned round-robin across the adjuster pool. If a claim sits unassigned for more than 4 hours, it auto-escalates to the shift lead.",
      "The current bottleneck is triage-step turnaround during peak hours — this is the top automation candidate on the Workflows roadmap (see: Claims Intake Triage workflow).",
    ],
    author: "Marcus Webb",
    date: "Jul 5, 2026",
    readTime: 3,
  },
  {
    id: "kb-3",
    title: "AML Compliance Filing Checklist",
    category: "Policy",
    excerpt: "What to check before submitting a quarterly anti-money-laundering filing.",
    content: [
      "Confirm all flagged transactions from the quarter have a documented resolution before filing. Unresolved flags must be escalated to Compliance leadership, not filed as pending.",
      "Cross-check the flagged transaction count against the reconciliation logs for the same period — discrepancies usually mean a sync issue, not a missed transaction.",
      "Filings are submitted to FinCEN on the 10th business day of the following quarter. Late filings require a written justification attached to the record.",
    ],
    author: "Priya Shah",
    date: "Jul 8, 2026",
    readTime: 3,
  },
  {
    id: "kb-4",
    title: "New Relationship Manager Onboarding Guide",
    category: "Onboarding",
    excerpt: "Everything a new RM needs in their first two weeks at Apex Sync.",
    content: [
      "Week one is about context: shadow at least two account reviews, read the timeline on your top five accounts by ARR, and get comfortable navigating the Customer Relationship Workspace.",
      "Week two is about ownership: take the lead on one low-risk account check-in with your manager observing, and start logging your own notes and tasks.",
      "Apex Intelligence in the AI Workspace can summarize any account's recent activity on request — use it before every first call with a new account.",
    ],
    author: "Elena Cho",
    date: "May 20, 2026",
    readTime: 5,
  },
  {
    id: "kb-5",
    title: "Apex Intelligence Prompting Best Practices",
    category: "Product",
    excerpt: "How to get sharper, more useful answers out of the AI Workspace.",
    content: [
      "Be specific about scope — \"summarize this quarter's performance for Strategic Accounts\" returns a far more useful answer than \"how are we doing.\"",
      "Ask for a specific artifact when you need one: \"generate an executive report\" produces a structured document; open-ended questions produce a conversational summary instead.",
      "Apex Intelligence has live context across all four business units, so cross-entity questions (\"which business unit has the highest churn risk right now\") are fair game.",
    ],
    author: "Apex Sync Product Team",
    date: "Jun 30, 2026",
    readTime: 3,
    pinned: true,
  },
  {
    id: "kb-6",
    title: "Data Retention & Privacy Policy",
    category: "Policy",
    excerpt: "What data Apex Sync retains, for how long, and who can access it.",
    content: [
      "Customer account data is retained for the duration of the client relationship plus seven years, in line with financial services record-keeping requirements.",
      "Access to sensitive account data (financials, compliance flags) is scoped by role — Relationship Managers see their own book of business by default; Compliance has group-wide read access.",
      "Data deletion requests are handled by the Compliance team and require sign-off from both Legal and the account owner.",
    ],
    author: "Compliance Team",
    date: "Apr 2, 2026",
    readTime: 4,
  },
  {
    id: "kb-7",
    title: "Workflow Builder: Getting Started",
    category: "Product",
    excerpt: "A quick guide to building your first automation in Workflow Builder.",
    content: [
      "Every workflow starts with a Trigger node — an event, schedule, or condition that kicks off the automation. Drag one in from the Node Palette to begin.",
      "Condition nodes create branches: connect two downstream paths and label them (e.g. \"Yes\" / \"No\") so the logic is legible to anyone reviewing the workflow later.",
      "Use Run Workflow to test execution before publishing — it animates the path the automation will take, including which branch conditions resolve to.",
    ],
    author: "Apex Sync Product Team",
    date: "Jul 1, 2026",
    readTime: 3,
  },
  {
    id: "kb-8",
    title: "SMB Onboarding Playbook",
    category: "Onboarding",
    excerpt: "How to get a new SMB account live within 30 days.",
    content: [
      "SMB accounts follow a lighter-weight onboarding than Enterprise: a single kickoff call, self-serve setup guides, and a 30-day implementation window rather than a dedicated project team.",
      "Standard support tier applies unless the account has explicitly negotiated a custom SLA. Set expectations on this during the kickoff call to avoid confusion later.",
      "Check in at day 7 and day 21 — most SMB onboarding issues surface in the first week or right before go-live, rarely in between.",
    ],
    author: "Elena Cho",
    date: "Jun 18, 2026",
    readTime: 3,
  },
];

// ── Settings ─────────────────────────────────────────────────────────────

export const integrations: IntegrationItem[] = [
  { id: "int-1", name: "Salesforce", description: "Sync customer records and opportunity data.", connected: true, category: "CRM" },
  { id: "int-2", name: "Slack", description: "Send alerts and workflow notifications to channels.", connected: true, category: "Communication" },
  { id: "int-3", name: "Outlook", description: "Calendar and email sync for meetings and reminders.", connected: true, category: "Communication" },
  { id: "int-4", name: "Snowflake", description: "Data warehouse connection for analytics and reporting.", connected: true, category: "Data" },
  { id: "int-5", name: "Okta", description: "Single sign-on and identity management.", connected: true, category: "Security" },
  { id: "int-6", name: "DocuSign", description: "E-signature for contracts and renewals.", connected: false, category: "Documents" },
  { id: "int-7", name: "Zapier", description: "Connect Apex One to 5,000+ external apps.", connected: false, category: "Automation" },
  { id: "int-8", name: "Looker", description: "Push analytics data to external BI dashboards.", connected: false, category: "Data" },
];
