import { ValueOpportunity, LeakageEvent, CustomerValueMetric, CapacityMetric, ExecutionPlay, CapturedLedgerEntry } from "@/components/value-engine/ValueEngineContext";
import { isDemoMode } from "@/lib/demo";

export interface ValueRepository {
  getOpportunities(organizationId?: string): Promise<ValueOpportunity[]>;
  getLeakageEvents(organizationId?: string): Promise<LeakageEvent[]>;
  getCustomerValues(organizationId?: string): Promise<CustomerValueMetric[]>;
  getCapacityMetrics(organizationId?: string): Promise<CapacityMetric[]>;
  getPlays(organizationId?: string): Promise<ExecutionPlay[]>;
  getCapturedLedger(organizationId?: string): Promise<CapturedLedgerEntry[]>;
}

export class MockValueRepository implements ValueRepository {
  async getOpportunities(organizationId?: string): Promise<ValueOpportunity[]> {
    if (!isDemoMode()) return [];
    return [
      {
        id: "opp-1",
        title: "DORMANT ENTERPRISE CUSTOMERS",
        category: "Customer Reactivation",
        description: "137 previously active customers have not purchased within their expected purchasing cycle.",
        sourceSystem: "Salesforce & Billing",
        valueAmount: 42300000,
        status: "discovered",
        confidence: 91,
        probability: 85,
        businessReason: "137 previously active customers have not purchased within their expected purchasing cycle.",
        recommendedAction: "Prioritize 34 high-value accounts for targeted reactivation.",
        responsibleDepartment: "Sales & Client Relations",
        expectedCaptureDate: "2026-10-15",
        impactTier: "High",
      },
      {
        id: "opp-2",
        title: "INTER-BANK SETTLEMENT FLOAT OPTIMIZATION",
        category: "Treasury Management",
        description: "Optimizing settlement batch windows across commercial accounts reduces intermediate clearing overhead.",
        sourceSystem: "Treasury Clearing Hub",
        valueAmount: 68400000,
        status: "validated",
        confidence: 94,
        probability: 90,
        businessReason: "Daily inter-bank sweeping schedules allow intermediate funds to clear quicker, optimizing yield margins.",
        recommendedAction: "Deploy automated liquidity clearing sweeping logic before the CBN daily cut-off.",
        responsibleDepartment: "Treasury Office",
        expectedCaptureDate: "2026-09-30",
        impactTier: "High",
      },
      {
        id: "opp-3",
        title: "SAAS LICENSE CALIBRATION",
        category: "Software Optimization",
        description: "340 staff members are provisioned on Enterprise packages but active system telemetry shows they only use basic modules.",
        sourceSystem: "Operations (SaaS ERP)",
        valueAmount: 12400000,
        status: "in_execution",
        confidence: 87,
        probability: 80,
        businessReason: "License tier mismatches are causing excess monthly billing for dormant client seats.",
        recommendedAction: "Automate user activity monitoring and auto-downgrade inactive licenses.",
        responsibleDepartment: "Information Technology",
        expectedCaptureDate: "2026-11-01",
        impactTier: "Medium",
      },
      {
        id: "opp-4",
        title: "TELECOM WAN INVOICE AUDIT",
        category: "Procurement",
        description: "Double-billing on redundant fiber-optic lease contracts across southern zone branches.",
        sourceSystem: "Procurement & Telecoms Link",
        valueAmount: 18700000,
        status: "discovered",
        confidence: 95,
        probability: 88,
        businessReason: "Carrier bills redundant backup connections after active migration to cloud nodes.",
        recommendedAction: "De-provision redundant secondary backup lines.",
        responsibleDepartment: "Procurement & Admin",
        expectedCaptureDate: "2026-12-15",
        impactTier: "Medium",
      },
      {
        id: "opp-5",
        title: "UNDERPRICED TREASURY ADVISORY AGREEMENTS",
        category: "Contract Expansion",
        description: "Historic corporate treasury consulting contracts remain flat despite a 180% surge in consulting volume.",
        sourceSystem: "Sales & Client Accounts",
        valueAmount: 42900000,
        status: "pending",
        confidence: 89,
        probability: 82,
        businessReason: "Ecosystem corporate clients obtaining consulting volume far beyond base SLA thresholds.",
        recommendedAction: "Conduct advisory fee realignment and migration to a value-tiered advisory package.",
        responsibleDepartment: "Treasury Advisory",
        expectedCaptureDate: "2026-11-15",
        impactTier: "High",
      },
    ].map(o => ({ ...o, organizationId: organizationId || "apex-demo" })) as any;
  }

  async getLeakageEvents(organizationId?: string): Promise<LeakageEvent[]> {
    if (!isDemoMode()) return [];
    return [
      {
        id: "leak-1",
        title: "UNBILLED PROFESSIONAL SERVICES",
        description: "87 engagements currently have completed deliverables but no corresponding invoice generated, representing unbilled efforts.",
        category: "Unbilled Services",
        leakAmount: 18700000,
        occurrence: "Recurring Quarterly",
        riskScore: 78,
        status: "unplugged",
        systemAffected: "Billing & JIRA Workflows",
        recommendedAction: "Create Finance review queue and trigger immediate batch billing.",
      },
      {
        id: "leak-2",
        title: "MISSED SLA SUPPORT RENEWALS",
        description: "15 enterprise clients are past their support renewal SLA periods, but support tickets continue to be resolved without billing.",
        category: "Missed Renewals",
        leakAmount: 31800000,
        occurrence: "Annual",
        riskScore: 84,
        status: "monitoring",
        systemAffected: "Zendesk & ERP Link",
        recommendedAction: "Lock support desk tickets auto-triggering when SLAs expire.",
      },
      {
        id: "leak-3",
        title: "FAILED CREDIT CARD PASSIVE CHURN",
        description: "Failed credit card transactions for SaaS accounts with billing values between ₦50,000 and ₦200,000 are silently marked inactive.",
        category: "Dunning Leakage",
        leakAmount: 16800000,
        occurrence: "Monthly Recurring",
        riskScore: 65,
        status: "unplugged",
        systemAffected: "Billing Proxy (Stripe Gateway)",
        recommendedAction: "Auto-enable intelligent retry logic and in-app updates.",
      },
    ].map(l => ({ ...l, organizationId: organizationId || "apex-demo" })) as any;
  }

  async getCustomerValues(organizationId?: string): Promise<CustomerValueMetric[]> {
    if (!isDemoMode()) return [];
    return [
      {
        id: "cust-v-1",
        name: "ACME CORPORATION",
        tier: "Gold",
        contractValue: 12400000,
        potentialValue: 27800000,
        expansionOpportunity: 15400000,
        confidence: 87,
        recommended: "Corporate Compliance + Advisory Package",
        churnRisk: "Low",
        lastAuditDate: "Aug 02, 2026",
      },
      {
        id: "cust-v-2",
        name: "DANGOTE INDUSTRIAL CONSORTIUM",
        tier: "Enterprise",
        contractValue: 45000000,
        potentialValue: 68500000,
        expansionOpportunity: 23500000,
        confidence: 92,
        recommended: "Custom Liquidity Hedging Suite",
        churnRisk: "Low",
        lastAuditDate: "Jul 28, 2026",
      },
      {
        id: "cust-v-3",
        name: "OANDO ENERGY NETWORKS",
        tier: "Gold",
        contractValue: 28000000,
        potentialValue: 38000000,
        expansionOpportunity: 10000000,
        confidence: 89,
        recommended: "Cross-border Asset Clearing Integration",
        churnRisk: "Medium",
        lastAuditDate: "Aug 05, 2026",
      },
      {
        id: "cust-v-4",
        name: "ACCESS DIGITAL HOLDINGS",
        tier: "Enterprise",
        contractValue: 60000000,
        potentialValue: 75000000,
        expansionOpportunity: 15000000,
        confidence: 94,
        recommended: "Automated Reconciliation Pipeline",
        churnRisk: "Low",
        lastAuditDate: "Aug 06, 2026",
      },
    ].map(cv => ({ ...cv, organizationId: organizationId || "apex-demo" })) as any;
  }

  async getCapacityMetrics(organizationId?: string): Promise<CapacityMetric[]> {
    if (!isDemoMode()) return [];
    return [
      {
        name: "Lagos Dev Center Cluster",
        allocated: 100,
        utilized: 42,
        wasteValue: 18500000,
        department: "Engineering",
        unusedHours: 460,
        potentialBillableHours: 250,
      },
      {
        name: "Custom Client Advisory Desk",
        allocated: 100,
        utilized: 68,
        wasteValue: 9600000,
        department: "Customer Success",
        unusedHours: 190,
        potentialBillableHours: 110,
      },
      {
        name: "West Africa CDN Node Storage",
        allocated: 100,
        utilized: 35,
        wasteValue: 14200000,
        department: "Operations",
        unusedHours: 650,
        potentialBillableHours: 0,
      },
      {
        name: "Regional Treasury Back-office Desk",
        allocated: 100,
        utilized: 74,
        wasteValue: 31100000,
        department: "Finance",
        unusedHours: 240,
        potentialBillableHours: 180,
      },
    ].map(cm => ({ ...cm, organizationId: organizationId || "apex-demo" })) as any;
  }

  async getPlays(organizationId?: string): Promise<ExecutionPlay[]> {
    if (!isDemoMode()) return [];
    return [
      {
        id: "play-1",
        title: "Activate Stripe Smart Dunning & CC Recovery",
        description: "Auto-enable intelligent retry logic, card updater proxy, and interactive billing updates to stop passive churn.",
        targetId: "leak-3",
        type: "leakage",
        estimatedGain: 16800000,
        status: "available",
        stepsCompleted: 0,
        totalSteps: 4,
        logs: [
          "Play initialized.",
          "Target identified: Billing leakage from failed credit cards.",
          "Integration proxy ready for deployment."
        ],
      },
      {
        id: "play-2",
        title: "Auto-Reclaim Orphaned West Africa CDN Assets",
        description: "Deploy automated cleanup scripts to snapshot and tear down idle staging server blocks.",
        targetId: "cdn-waste",
        type: "capacity",
        estimatedGain: 14200000,
        status: "available",
        stepsCompleted: 0,
        totalSteps: 3,
        logs: [
          "Play initialized.",
          "Target identified: Excess storage and computing overhead in WA zones.",
          "Teardown templates verified."
        ],
      },
      {
        id: "play-3",
        title: "Deploy CBN Daily Liquidity sweeping",
        description: "Establish fast settlement triggers sweep matching CBN clearing schedules before daily closing.",
        targetId: "opp-2",
        type: "opportunity",
        estimatedGain: 68400000,
        status: "in_progress",
        stepsCompleted: 1,
        totalSteps: 4,
        logs: [
          "Play initialized.",
          "Audited daily commercial float margins.",
          "Mapping sweeps API gateway configuration."
        ],
      },
    ].map(p => ({ ...p, organizationId: organizationId || "apex-demo" })) as any;
  }

  async getCapturedLedger(organizationId?: string): Promise<CapturedLedgerEntry[]> {
    if (!isDemoMode()) return [];
    return [
      {
        id: "cap-1",
        date: "2026-08-01",
        playTitle: "Revenue Recovered from Licensing Reclamation",
        category: "Revenue Recovered",
        amountCaptured: 21400000,
        impactMetrics: "Downgraded unutilized premium SaaS seats and reclaimed contract fees.",
        verifiedBy: "Yusuf Alao (CFO Office)",
      },
      {
        id: "cap-2",
        date: "2026-07-15",
        playTitle: "New Revenue from High-Value Client Cross-sell",
        category: "New Revenue",
        amountCaptured: 15700000,
        impactMetrics: "Successfully migrated corporate client to advisory package.",
        verifiedBy: "Amina Yusuf (VP Business Development)",
      },
      {
        id: "cap-3",
        date: "2026-06-10",
        playTitle: "Cost Avoided through WAN Connection Consolidation",
        category: "Cost Avoided",
        amountCaptured: 10100000,
        impactMetrics: "Successfully eliminated duplicate vendor telecom fiber lines.",
        verifiedBy: "Marcus Thorne (Security & Infrastructure)",
      },
    ].map(l => ({ ...l, organizationId: organizationId || "apex-demo" })) as any;
  }
}

export const valueRepository = new MockValueRepository();
