export type PipelineStatus = "discovered" | "validated" | "in_execution" | "pending" | "captured";

export interface DemoValueOpportunity {
  id: string;
  title: string;
  category: "Customer expansion" | "Dormant customers" | "Contract optimization" | "Revenue recovery" | "Process optimization" | "Capacity utilization";
  description: string;
  sourceSystem: string;
  valueAmount: number; // in Naira (e.g. 42300000 = ₦42.3M)
  status: PipelineStatus;
  confidence: number;
  probability: number;
  businessReason: string;
  recommendedAction: string;
  expectedOutcome: string;
  responsibleDepartment: string;
  expectedCaptureDate: string;
  impactTier: "High" | "Medium" | "Low";
  realizationSpeed: "Fastest" | "Medium" | "Long-Term";
  strategicImportance: "High" | "Medium" | "Low";
  risk: "Low" | "Medium" | "High";
  evidence: string;
}

export interface DemoLeakageSource {
  id: string;
  title: string;
  category: "Missed renewals" | "Billing errors" | "Underutilized contracts" | "SLA-related credits" | "Failed collections" | "Unbilled services" | "Pricing inconsistencies";
  estimatedValue: number; // in Naira
  rootCause: string;
  evidence: string;
  confidence: number;
  recoveryAction: string;
  expectedOutcome: string;
  systemAffected: string;
  status: "unplugged" | "monitoring" | "plugged";
  recovered: boolean;
  isRecovering?: boolean;
}

export interface DemoCustomerValueMetric {
  id: string;
  name: string;
  category: "High Value / High Potential" | "High Value / Low Risk" | "Low Value / High Potential" | "At Risk" | "Dormant";
  tier: "Enterprise" | "Mid-Market" | "SMB";
  currentRevenue: number;
  potentialValue: number;
  expansionPotential: number;
  renewalValue: number;
  lifetimeValue: number;
  unusedOpportunitiesValue: number;
  purchaseFrequency: string;
  contractHistory: string;
  interactionsCount: number;
  openSupportTickets: number;
  sentimentScore: number;
  renewalDaysRemaining: number;
  retentionProbability: number;
  riskIndex: number;
  usageGrowthPercentage: number;
  aiRecommendationText: string;
}

export interface DemoCapacityCategory {
  name: string;
  wasteValue: number;
  available: string;
  utilized: number;
  unused: number;
  submetrics: { label: string; value: string; percentage: number }[];
}

export interface DemoExecutionPlay {
  id: string;
  recommendation: string;
  owner: string;
  deadline: string;
  expectedValue: number;
  status: "Ready" | "Approved" | "In Progress" | "Completed" | "Measured";
  confidence: number;
  automationType: "Manual" | "AI-assisted" | "Automated" | "Awaiting approval";
  requiresHumanApproval: boolean;
  insightSource: string;
  decisionDetail: string;
  resultMetric: string;
  logs: string[];
}

export interface DemoCapturedValueEvent {
  id: string;
  opportunity: string;
  category: "Revenue recovered" | "Revenue generated" | "Cost avoided" | "Capacity recovered" | "Time saved";
  capturedValue: number;
  evidenceType: "Invoice Link" | "Contract Clause" | "Customer transaction log" | "Workflow completion" | "Before/after metric" | "Financial ledger record";
  evidenceDescription: string;
  originalEstimate: number;
  realizationDate: string;
  auditTrail: string[];
  verifiedBy: string;
}

export const demoValueOpportunities: DemoValueOpportunity[] = [
  {
    id: "opp-1",
    title: "Dormant Enterprise Customer Reactivation",
    category: "Dormant customers",
    description: "137 previously active institutional accounts have not transacted within their expected purchasing cycle.",
    sourceSystem: "Salesforce CRM & Billing Sub-Ledger",
    valueAmount: 42300000,
    status: "discovered",
    confidence: 91,
    probability: 85,
    businessReason: "Historical purchasing velocity averages every 45–60 days, but accounts have remained idle for >120 days.",
    recommendedAction: "Initiate targeted executive outreach with custom Naira-indexed pricing packages.",
    expectedOutcome: "Re-establish active transactional volume pipeline, protecting trailing contract projections.",
    responsibleDepartment: "Commercial Operations",
    expectedCaptureDate: "2026-10-15",
    impactTier: "High",
    realizationSpeed: "Fastest",
    strategicImportance: "High",
    risk: "Low",
    evidence: "Customer transaction logs indicate zero API clearing requests over the trailing 137 days."
  },
  {
    id: "opp-2",
    title: "Inter-Bank Settlement Float Optimization",
    category: "Process optimization",
    description: "Clearing sweep transaction log latency averages 210 minutes post CBN cut-offs. Aligning scripts eliminates intermediate clearing overhead.",
    sourceSystem: "Treasury Clearing Hub",
    valueAmount: 68400000,
    status: "validated",
    confidence: 94,
    probability: 90,
    businessReason: "Daily automated inter-bank sweeping schedules allow funds to clear faster, optimizing overnight cash float yield.",
    recommendedAction: "Deploy automated sweeping logic triggered exactly 30 minutes before official CBN daily ledger sweeps.",
    expectedOutcome: "Immediate recovery of overnight float interest margin across commercial treasury pools.",
    responsibleDepartment: "Treasury Management",
    expectedCaptureDate: "2026-09-30",
    impactTier: "High",
    realizationSpeed: "Fastest",
    strategicImportance: "High",
    risk: "Low",
    evidence: "CBN inter-bank batch reconciliation logs show 3.5 hours of idle settlement float daily."
  },
  {
    id: "opp-3",
    title: "Underpriced Corporate Advisory Contracts",
    category: "Contract optimization",
    description: "Telemetry logs average 18.5 consulting hours monthly against standard contracted cap of 5.0 hours across strategic enterprise accounts.",
    sourceSystem: "Strategic Accounts Time & SLA Telemetry",
    valueAmount: 42900000,
    status: "in_execution",
    confidence: 89,
    probability: 82,
    businessReason: "Ecosystem corporate clients consuming advisory and restructuring volume far beyond base SLA thresholds.",
    recommendedAction: "Trigger automatic advisory fee realignment and migration to value-tiered advisory packages.",
    expectedOutcome: "Full recovery of unbilled consulting advisory labor overhead.",
    responsibleDepartment: "Strategic Accounts Advisory",
    expectedCaptureDate: "2026-11-15",
    impactTier: "High",
    realizationSpeed: "Medium",
    strategicImportance: "High",
    risk: "Medium",
    evidence: "12 strategic enterprise accounts exceed monthly advisory quota by an average of 13.5 hours."
  },
  {
    id: "opp-4",
    title: "Enterprise Capacity Realignment & Gateway Upsell",
    category: "Customer expansion",
    description: "Dangote Industrial Consortium usage expanded by 41% while contracted capacity remains on baseline tier.",
    sourceSystem: "Enterprise Operations Infrastructure Telemetry",
    valueAmount: 23500000,
    status: "discovered",
    confidence: 95,
    probability: 92,
    businessReason: "Customer transaction throughput consistently exceeds base tier threshold during weekly peaks.",
    recommendedAction: "Submit formal capacity realignment addendum for Q4 billing lock.",
    expectedOutcome: "Immediate ₦23.5M expansion ARR with dedicated enterprise burst SLA tier.",
    responsibleDepartment: "Enterprise Operations",
    expectedCaptureDate: "2026-10-31",
    impactTier: "High",
    realizationSpeed: "Medium",
    strategicImportance: "High",
    risk: "Low",
    evidence: "Peak transaction requests logged at 1,420 req/sec vs 1,000 req/sec tier limit."
  },
  {
    id: "opp-5",
    title: "Redundant Cloud CDN Node Decommissioning",
    category: "Capacity utilization",
    description: "Redundant edge CDN and staging nodes have remained active with zero route mappings for two consecutive quarters.",
    sourceSystem: "DevOps Cloud Infrastructure Inventory",
    valueAmount: 7600000,
    status: "in_execution",
    confidence: 98,
    probability: 95,
    businessReason: "Legacy staging clusters running without attached DNS endpoints continue generating monthly cloud hosting bills.",
    recommendedAction: "Safely decommission unutilized staging clusters and update infrastructure lease sheets.",
    expectedOutcome: "Immediate recurring cloud hosting and infrastructure savings.",
    responsibleDepartment: "Operations Engineering",
    expectedCaptureDate: "2026-09-15",
    impactTier: "Medium",
    realizationSpeed: "Fastest",
    strategicImportance: "Medium",
    risk: "Low",
    evidence: "AWS & local datacenter invoices show 14 idle compute instances."
  }
];

export const demoLeakageSources: DemoLeakageSource[] = [
  {
    id: "leak-1",
    title: "Missed Support SLA Renewal",
    category: "Missed renewals",
    estimatedValue: 31800000,
    rootCause: "15 enterprise customers are past their contracted support period but support desk queues continue resolving tickets, bypassing billing blocks.",
    evidence: "15 enterprise customer profiles are categorized as past-contract but continue receiving unresolved ticket completions.",
    confidence: 84,
    recoveryAction: "Enforce automated ticket queue locking immediately upon underlying SLA agreement expiration.",
    expectedOutcome: "Immediate recovery of unbilled support retainer agreements and expedited renewals.",
    systemAffected: "Support Ticketing & Billing Link",
    status: "unplugged",
    recovered: false
  },
  {
    id: "leak-2",
    title: "Unbilled Completed Professional Deliverables",
    category: "Unbilled services",
    estimatedValue: 18700000,
    rootCause: "Completed project milestones fail to trigger invoice creation in the legacy ERP pipeline due to manual reconciliation delay.",
    evidence: "87 completed strategic account delivery nodes found without matched invoice records in Salesforce.",
    confidence: 78,
    recoveryAction: "Automate delivery milestone syncing directly into ERP invoice routing triggers.",
    expectedOutcome: "Direct acceleration of operating cash flow and decreased bill-to-invoice latency.",
    systemAffected: "ERP Invoicing Pipeline",
    status: "unplugged",
    recovered: false
  },
  {
    id: "leak-3",
    title: "Passive Churn & Failed Collections",
    category: "Failed collections",
    estimatedValue: 16800000,
    rootCause: "Failed corporate transaction nodes lack active follow-up schedules, drifting subscriptions out of active billing bounds.",
    evidence: "134 transactional dunning failures flagged over the trailing 30 days with zero automated follow-up triggers.",
    confidence: 65,
    recoveryAction: "Activate automated dynamic retries with integrated credit auto-updaters.",
    expectedOutcome: "Immediate containment of silent, involuntary subscriber drop-off metrics.",
    systemAffected: "Payment Gateway Dunning Engine",
    status: "monitoring",
    recovered: false
  },
  {
    id: "leak-4",
    title: "Naira Price Volatility Inconsistencies",
    category: "Pricing inconsistencies",
    estimatedValue: 15200000,
    rootCause: "Active contracts utilize legacy flat exchange pricing, ignoring updated Central Bank currency rate bands.",
    evidence: "30-day foreign exchange variance triggers indexation Clause 4.2 parameters across active contract bounds.",
    confidence: 95,
    recoveryAction: "Apply active Nigerian Naira volatility multiplier parameters across billing cycles.",
    expectedOutcome: "Protects contract yield margins from structural local currency exchange depreciation.",
    systemAffected: "Contract Management & Billing Engine",
    status: "plugged",
    recovered: true
  }
];

export const demoCustomerValues: DemoCustomerValueMetric[] = [
  {
    id: "cust-dangote",
    name: "Dangote Industrial Consortium",
    category: "High Value / High Potential",
    tier: "Enterprise",
    currentRevenue: 2800000000, // ₦2.80B
    potentialValue: 4100000000, // ₦4.10B
    expansionPotential: 1300000000, // ₦1.30B
    renewalValue: 2800000000,
    lifetimeValue: 19400000000,
    unusedOpportunitiesValue: 1300000000,
    purchaseFrequency: "Every 12 days",
    contractHistory: "Active Multi-Year SLA with Volatility Multipliers",
    interactionsCount: 18,
    openSupportTickets: 3,
    sentimentScore: 0.94,
    renewalDaysRemaining: 180,
    retentionProbability: 97,
    riskIndex: 1.2,
    usageGrowthPercentage: 41,
    aiRecommendationText: "Expansion opportunity detected. Customer usage has increased 41% while contracted capacity has remained on base tier."
  },
  {
    id: "cust-vertex",
    name: "Vertex Holdings Corp.",
    category: "High Value / Low Risk",
    tier: "Enterprise",
    currentRevenue: 3100000000, // ₦3.10B
    potentialValue: 4200000000,
    expansionPotential: 1100000000,
    renewalValue: 3100000000,
    lifetimeValue: 21500000000,
    unusedOpportunitiesValue: 1100000000,
    purchaseFrequency: "Every 7 days",
    contractHistory: "Multi-Year Lock (2028), Standard Renewal Clause Enabled",
    interactionsCount: 22,
    openSupportTickets: 2,
    sentimentScore: 0.96,
    renewalDaysRemaining: 540,
    retentionProbability: 98,
    riskIndex: 0.8,
    usageGrowthPercentage: 24.6,
    aiRecommendationText: "Pristine relationship health. Propose international trade desk cross-border currency hedging integration."
  },
  {
    id: "cust-meridian",
    name: "Meridian Logistics Group",
    category: "At Risk",
    tier: "Enterprise",
    currentRevenue: 1200000000, // ₦1.20B
    potentialValue: 1810000000,
    expansionPotential: 610000000,
    renewalValue: 1200000000,
    lifetimeValue: 8400000000,
    unusedOpportunitiesValue: 610000000,
    purchaseFrequency: "Every 30 days (Contracted)",
    contractHistory: "Expiring in 45 Days (Oct 2026)",
    interactionsCount: 8,
    openSupportTickets: 18,
    sentimentScore: 0.34,
    renewalDaysRemaining: 45,
    retentionProbability: 68,
    riskIndex: 8.4,
    usageGrowthPercentage: -12.4,
    aiRecommendationText: "High churn risk detected. Transaction clearing friction causing ticket escalations. Schedule executive alignment session."
  },
  {
    id: "cust-halden",
    name: "Halden & Cross Partners",
    category: "High Value / High Potential",
    tier: "Enterprise",
    currentRevenue: 2030000000, // ₦2.03B
    potentialValue: 3200000000,
    expansionPotential: 1170000000,
    renewalValue: 2030000000,
    lifetimeValue: 14200000000,
    unusedOpportunitiesValue: 1170000000,
    purchaseFrequency: "Every 15 days",
    contractHistory: "Auto-Renewal in 90 Days",
    interactionsCount: 14,
    openSupportTickets: 9,
    sentimentScore: 0.68,
    renewalDaysRemaining: 90,
    retentionProbability: 82,
    riskIndex: 6.8,
    usageGrowthPercentage: -8.1,
    aiRecommendationText: "Account undergoing management transition. Present structured treasury yield hedging modules to unlock ₦1,170M expansion ARR."
  }
];

export const demoCapacityCategories: DemoCapacityCategory[] = [
  {
    name: "People Capacity",
    wasteValue: 9600000,
    available: "100%",
    utilized: 68,
    unused: 32,
    submetrics: [
      { label: "Available Engineers/Consultants", value: "120 Seats", percentage: 100 },
      { label: "Utilized SLA Allocations", value: "81.6 Seats", percentage: 68 },
      { label: "Unused Support Hours", value: "38.4 Seats", percentage: 32 }
    ]
  },
  {
    name: "Technology Capacity",
    wasteValue: 14200000,
    available: "100%",
    utilized: 35,
    unused: 65,
    submetrics: [
      { label: "Infrastructure Utilization", value: "35% Active Peak", percentage: 35 },
      { label: "Unused Enterprise Licenses", value: "450 Seats Idle", percentage: 45 },
      { label: "Unused Legacy Systems", value: "2 Redundant Hubs", percentage: 20 }
    ]
  },
  {
    name: "Facilities",
    wasteValue: 4800000,
    available: "100%",
    utilized: 42,
    unused: 58,
    submetrics: [
      { label: "Available Workspace Capacity", value: "300 Floor Seats", percentage: 100 },
      { label: "Used Corporate Physical Seats", value: "126 Active Seats", percentage: 42 }
    ]
  },
  {
    name: "Operations",
    wasteValue: 5600000,
    available: "100%",
    utilized: 74,
    unused: 26,
    submetrics: [
      { label: "Execution Throughput Rate", value: "74% Peak Flow", percentage: 74 },
      { label: "Queue Bottlenecks Rate", value: "12% Queue Idle", percentage: 12 },
      { label: "Idle Clearing Floats Capacity", value: "14% Float Latency", percentage: 14 }
    ]
  }
];

export const demoExecutionPlays: DemoExecutionPlay[] = [
  {
    id: "play-dormant",
    recommendation: "Reactivate Dormant Enterprise Accounts",
    owner: "Commercial Operations Team",
    deadline: "2026-08-25",
    expectedValue: 42300000,
    status: "Ready",
    confidence: 91,
    automationType: "AI-assisted",
    requiresHumanApproval: true,
    insightSource: "137 dormant enterprise customer nodes detected past their standard re-order cycle.",
    decisionDetail: "Dispatched direct custom-pricing reactivation outbound campaign.",
    resultMetric: "Reclaim active purchasing cycles; closes potential value leakage gap.",
    logs: [
      "Insight Node generated: Dormant relation detected",
      "Decision Matrix built: Activation pricing generated",
      "Awaiting Executive Approval to Dispatch Campaign"
    ]
  },
  {
    id: "play-volatility",
    recommendation: "Apply Naira Volatility Indexation Multipliers",
    owner: "Treasury Operations Desk",
    deadline: "2026-08-20",
    expectedValue: 15200000,
    status: "Approved",
    confidence: 95,
    automationType: "Automated",
    requiresHumanApproval: false,
    insightSource: "30-day CBN volatility boundary breach triggers Clause 4.2 parameters.",
    decisionDetail: "Execute billing multipliers on trailing monthly corporate contracts.",
    resultMetric: "Protected contract yield from foreign exchange local currency drop.",
    logs: [
      "Volatility indices parsed: Deviation found",
      "Trigger conditions satisfied for active indexation",
      "Multiplier staged and ready for auto-dispatch"
    ]
  },
  {
    id: "play-triage",
    recommendation: "Deploy Claims Intake Triage Automation Node",
    owner: "Operations Engineering",
    deadline: "2026-08-30",
    expectedValue: 8600000,
    status: "In Progress",
    confidence: 92,
    automationType: "Automated",
    requiresHumanApproval: false,
    insightSource: "Peak claims latency bottlenecks trigger SLA exception penalties.",
    decisionDetail: "Route inbound claims directly into AI triage classification queues.",
    resultMetric: "Reclaimed manual overhead and avoided exception penalties.",
    logs: [
      "Latency triggers analyzed across 1,842 queued cases",
      "Triage classification logic passed validation tests",
      "Deployment in progress across Customer Operations"
    ]
  }
];

export const demoCapturedLedger: DemoCapturedValueEvent[] = [
  {
    id: "cap-1",
    opportunity: "Clearing Sweep Float Optimization",
    category: "Revenue recovered",
    capturedValue: 8200000,
    evidenceType: "Financial ledger record",
    evidenceDescription: "CBN daily clearing sweeping ledger reference txn-sweeps-881A. Float latency reduced to exactly 30 minutes.",
    originalEstimate: 9600000,
    realizationDate: "2026-08-12",
    auditTrail: [
      "Sweeping script deployed and validated by Treasury Management",
      "General Ledger sweep matched by Marcus Thorne (CFO Office)"
    ],
    verifiedBy: "Marcus Thorne"
  },
  {
    id: "cap-2",
    opportunity: "Enterprise Capacity Realignment Milestone",
    category: "Revenue generated",
    capturedValue: 4500000,
    evidenceType: "Invoice Link",
    evidenceDescription: "Active Invoice record INV-2026-091A. Capacity usage overflow SLA tier adjustment billing executed.",
    originalEstimate: 5000000,
    realizationDate: "2026-08-01",
    auditTrail: [
      "Capacity overflow billing locks triggered dynamically",
      "Invoice approved and validated by Amina Yusuf (Accounts)"
    ],
    verifiedBy: "Amina Yusuf"
  },
  {
    id: "cap-3",
    opportunity: "Redundant Cloud CDN Node Decommission",
    category: "Cost avoided",
    capturedValue: 3200000,
    evidenceType: "Before/after metric",
    evidenceDescription: "Staging cluster lease bills. AWS Regional usage bill lowered from $4,100 to $1,800 monthly.",
    originalEstimate: 3500000,
    realizationDate: "2026-07-20",
    auditTrail: [
      "Unutilized CDN staging servers safely snapshot and destroyed",
      "Infrastructure billing update confirmed by Yusuf Alao"
    ],
    verifiedBy: "Yusuf Alao"
  },
  {
    id: "cap-4",
    opportunity: "Claims Processing Queue Automation",
    category: "Time saved",
    capturedValue: 2500000,
    evidenceType: "Workflow completion",
    evidenceDescription: "Phase 1 claims triage automated 64% of Tier 1 claims, saving 280 hours of manual verification monthly.",
    originalEstimate: 2800000,
    realizationDate: "2026-07-05",
    auditTrail: [
      "Automated queue triage validated against 1,200 sample tickets",
      "SLA compliance improved from 92.4% to 98.4%"
    ],
    verifiedBy: "Jordan Lee"
  }
];
