export interface Bottleneck {
  id: string;
  process: string;
  department: string;
  delayDays: number;
  cases: number;
  costImpactNaira: number; // in Millions/month
  recommendedAction: string;
  status: "stuck" | "optimizing" | "resolved";
}

export interface CapacityMetric {
  id: string;
  category: "People" | "Technology" | "Facilities" | "Operations";
  available: number; // percentage
  used: number; // percentage
  unused: number; // percentage
  overloaded: number; // percentage
}

export interface IncidentDetail {
  id: string;
  title: string;
  subsidiary: string;
  severity: "critical" | "high" | "medium";
  whatHappened: string;
  whyItHappened: string;
  systemsInvolved: string[];
  whoIsAffected: string;
  financialImpactNaira: number; // in Millions
  recommendedAction: string;
  status: "open" | "investigating" | "resolved";
}

export const demoBottlenecks: Bottleneck[] = [
  {
    id: "bot-1",
    process: "Claims Review",
    department: "Customer Operations Claims",
    delayDays: 2.8,
    cases: 1842,
    costImpactNaira: 3.8,
    recommendedAction: "Deploy Claims Automation Phase 2 Vetting Module to bypass manual signature triggers.",
    status: "stuck"
  },
  {
    id: "bot-2",
    process: "Compliance KYC Scans",
    department: "Enterprise Operations Risk division",
    delayDays: 4.2,
    cases: 142,
    costImpactNaira: 6.1,
    recommendedAction: "Auto-ingest KYC files using digital registry scraper to eliminate CSV backlogs.",
    status: "stuck"
  },
  {
    id: "bot-3",
    process: "Portfolio Settlement Lock",
    department: "Strategic Accounts Custody",
    delayDays: 1.5,
    cases: 89,
    costImpactNaira: 2.4,
    recommendedAction: "Upgrade settlement queue worker concurrency to 16 threads.",
    status: "optimizing"
  }
];

export const demoCapacityMetrics: CapacityMetric[] = [
  { id: "cap-people", category: "People", available: 100, used: 68, unused: 32, overloaded: 12 },
  { id: "cap-tech", category: "Technology", available: 100, used: 35, unused: 65, overloaded: 5 },
  { id: "cap-facilities", category: "Facilities", available: 100, used: 42, unused: 58, overloaded: 0 },
  { id: "cap-ops", category: "Operations", available: 100, used: 74, unused: 26, overloaded: 18 }
];

export interface SubsidiaryOpsItem {
  subsidiary: string;
  slaCompliance: number;
  reconciliationStatus: "complete" | "pending" | "delayed";
  openIncidents: number;
  avgResolutionHours: number;
  automationCoverage: number;
  trend: number[];
}

export interface AutomationOpportunityItem {
  id: string;
  subsidiary: string;
  process: string;
  description: string;
  impact: string;
  effort: "low" | "medium" | "high";
}

export interface SlaTrendPoint {
  month: string;
  compliance: number;
  target: number;
}

export interface SubsidiaryPerformanceItem {
  subsidiary: string;
  portfolioValue: number;
  customers: number;
  growthPct: number;
  slaCompliance: number;
}

export const demoIncidents: IncidentDetail[] = [
  {
    id: "inc-1",
    title: "Clearing Batch Ingestion Latency",
    subsidiary: "Commercial Operations",
    severity: "high",
    whatHappened: "Inter-bank batch clearing window experienced 45-minute processing delay during peak morning window.",
    whyItHappened: "Upstream gateway connection throttled concurrent webhooks due to connection pool limits.",
    systemsInvolved: ["Clearing Gateway", "Treasury Hub"],
    whoIsAffected: "Commercial logistics clients awaiting real-time clearing confirmations",
    financialImpactNaira: 1.2,
    recommendedAction: "Increase gateway connection pool and deploy automatic fallback retry queue.",
    status: "investigating"
  },
  {
    id: "inc-2",
    title: "KYC Registry Sync Disconnect",
    subsidiary: "Enterprise Operations",
    severity: "medium",
    whatHappened: "Automated identity registry scraper failed to sync for 6 hours due to upstream API certificate rotation.",
    whyItHappened: "Certificate bundle was not auto-renewed in staging cluster.",
    systemsInvolved: ["KYC Portal", "Compliance Engine"],
    whoIsAffected: "Enterprise onboarding queue",
    financialImpactNaira: 0.8,
    recommendedAction: "Deploy automated certificate manager and configure webhook alert.",
    status: "resolved"
  }
];

export const demoSubsidiaryOps: SubsidiaryOpsItem[] = [

  { subsidiary: "Enterprise Operations", slaCompliance: 99.1, reconciliationStatus: "complete", openIncidents: 1, avgResolutionHours: 2.1, automationCoverage: 91.2, trend: [97, 98, 98.5, 99.1] },
  { subsidiary: "Commercial Operations", slaCompliance: 97.4, reconciliationStatus: "complete", openIncidents: 1, avgResolutionHours: 3.4, automationCoverage: 84.6, trend: [95, 96, 96.8, 97.4] },
  { subsidiary: "Strategic Accounts", slaCompliance: 99.8, reconciliationStatus: "complete", openIncidents: 0, avgResolutionHours: 1.2, automationCoverage: 96.0, trend: [98, 98.9, 99.4, 99.8] },
  { subsidiary: "Customer Operations", slaCompliance: 96.2, reconciliationStatus: "pending", openIncidents: 2, avgResolutionHours: 4.8, automationCoverage: 76.5, trend: [94, 95, 95.5, 96.2] },
];

export const demoAutomationOpportunities: AutomationOpportunityItem[] = [
  { id: "ao-1", subsidiary: "Customer Operations", process: "Claims Intake & Triage", description: "Automated classification of Tier 1 claims to reduce 2.8-day queue latency.", impact: "₦14.2M / yr", effort: "medium" },
  { id: "ao-2", subsidiary: "Enterprise Operations", process: "KYC Registry Sync", description: "Direct API integration with national identity database to eliminate manual verification.", impact: "₦8.4M / yr", effort: "low" },
  { id: "ao-3", subsidiary: "Commercial Operations", process: "Clearing Batch Scheduling", description: "Dynamic trigger sweeping scripts to prevent queue throttling during peak morning windows.", impact: "₦18.4M / yr", effort: "low" },
];

export const demoSlaTrend: SlaTrendPoint[] = [
  { month: "Jan", compliance: 95.2, target: 98.0 },
  { month: "Feb", compliance: 95.8, target: 98.0 },
  { month: "Mar", compliance: 96.4, target: 98.0 },
  { month: "Apr", compliance: 96.9, target: 98.0 },
  { month: "May", compliance: 97.6, target: 98.0 },
  { month: "Jun", compliance: 98.4, target: 98.0 },
];

export const demoSubsidiaryPerformance: SubsidiaryPerformanceItem[] = [
  { subsidiary: "Enterprise Operations", portfolioValue: 812, customers: 14200, growthPct: 16.4, slaCompliance: 99.1 },
  { subsidiary: "Commercial Operations", portfolioValue: 524, customers: 18400, growthPct: 14.8, slaCompliance: 97.4 },
  { subsidiary: "Strategic Accounts", portfolioValue: 398, customers: 2410, growthPct: 24.2, slaCompliance: 99.8 },
  { subsidiary: "Customer Operations", portfolioValue: 186, customers: 13200, growthPct: 12.1, slaCompliance: 96.2 },
];

