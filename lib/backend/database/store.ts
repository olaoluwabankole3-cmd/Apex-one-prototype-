/**
 * APEX ONE — Multi-Tenant Backend Database Store
 * 
 * Provides atomic, tenant-isolated data access with defense-in-depth boundaries.
 */

import {
  OrganizationRecord,
  UserRecord,
  OrganizationMembershipRecord,
  CustomerRecord,
  ContractRecord,
  TransactionRecord,
  DocumentRecord,
  KnowledgeItemRecord,
  OrganizationalMemoryRecord,
  EventRecord,
  SignalRecord,
  ValueOpportunityRecord,
  ValueCapturedRecord,
  WorkflowRecord,
  ActionRecord,
  AuditLogRecord,
} from "./schema";
import { TenantContext, CrossTenantViolationError, NotFoundError } from "../core/errors";

class DatabaseStore {
  public organizations: Map<string, OrganizationRecord> = new Map();
  public users: Map<string, UserRecord> = new Map();
  public memberships: Map<string, OrganizationMembershipRecord> = new Map();
  public customers: Map<string, CustomerRecord> = new Map();
  public contracts: Map<string, ContractRecord> = new Map();
  public transactions: Map<string, TransactionRecord> = new Map();
  public documents: Map<string, DocumentRecord> = new Map();
  public knowledge: Map<string, KnowledgeItemRecord> = new Map();
  public memory: Map<string, OrganizationalMemoryRecord> = new Map();
  public events: Map<string, EventRecord> = new Map();
  public signals: Map<string, SignalRecord> = new Map();
  public opportunities: Map<string, ValueOpportunityRecord> = new Map();
  public valueCaptured: Map<string, ValueCapturedRecord> = new Map();
  public workflows: Map<string, WorkflowRecord> = new Map();
  public actions: Map<string, ActionRecord> = new Map();
  public auditLogs: AuditLogRecord[] = [];

  constructor() {
    this.seedInitialTenants();
  }

  /**
   * Seed baseline multi-tenant records for development and testing.
   * Tenant A: apex-demo (Apex Demo Group)
   * Tenant B: org-titan-corp (Titan Global Holdings - for tenant isolation testing)
   */
  private seedInitialTenants() {
    // 1. Organizations
    this.organizations.set("apex-demo", {
      id: "apex-demo",
      name: "Apex Demo Group",
      displayName: "Apex Demo",
      slug: "apex-demo",
      industry: "financial_services",
      plan: "enterprise",
      currency: "NGN",
      currencySymbol: "₦",
      timezone: "Africa/Lagos",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-08-01T00:00:00Z",
    });

    this.organizations.set("org-titan-corp", {
      id: "org-titan-corp",
      name: "Titan Global Holdings",
      displayName: "Titan Corp",
      slug: "titan-corp",
      industry: "telecom_energy",
      plan: "enterprise",
      currency: "USD",
      currencySymbol: "$",
      timezone: "America/New_York",
      createdAt: "2026-02-15T00:00:00Z",
      updatedAt: "2026-08-10T00:00:00Z",
    });

    // 2. Users
    this.users.set("usr-marcus-thorne", {
      id: "usr-marcus-thorne",
      email: "m.thorne@apexsync.ai",
      name: "Marcus Thorne",
      title: "Chief Executive Officer",
      status: "active",
      createdAt: "2026-01-01T00:00:00Z",
    });

    this.users.set("usr-elena-cho", {
      id: "usr-elena-cho",
      email: "e.cho@apexsync.ai",
      name: "Elena Cho",
      title: "VP of Strategic Relationships",
      status: "active",
      createdAt: "2026-01-02T00:00:00Z",
    });

    this.users.set("usr-titan-admin", {
      id: "usr-titan-admin",
      email: "admin@titancorp.com",
      name: "Alexander Vance",
      title: "Managing Director",
      status: "active",
      createdAt: "2026-02-15T00:00:00Z",
    });

    // 3. Memberships
    this.memberships.set("mem-1", {
      id: "mem-1",
      organizationId: "apex-demo",
      userId: "usr-marcus-thorne",
      role: "CEO",
      department: "Executive",
      joinedAt: "2026-01-01T00:00:00Z",
    });

    this.memberships.set("mem-2", {
      id: "mem-2",
      organizationId: "apex-demo",
      userId: "usr-elena-cho",
      role: "Relationship Manager",
      department: "Strategic Accounts",
      joinedAt: "2026-01-02T00:00:00Z",
    });

    this.memberships.set("mem-3", {
      id: "mem-3",
      organizationId: "org-titan-corp",
      userId: "usr-titan-admin",
      role: "CEO",
      department: "Executive",
      joinedAt: "2026-02-15T00:00:00Z",
    });

    // 4. Customers - Tenant A (Apex)
    const apexCustomers: Omit<CustomerRecord, "organizationId">[] = [
      {
        id: "cust-dangote",
        name: "Dangote Industrial Consortium",
        subsidiary: "Customer Operations",
        tier: "Enterprise",
        status: "active",
        healthScore: 94,
        arr: 45000000,
        owner: "Elena Cho",
        contactName: "Alhaji A. Dangote",
        contactRole: "Group Treasury Director",
        contactEmail: "treasury@dangote-group.com",
        since: "Jan 2023",
        tags: ["Strategic", "Multi-Year", "High Margin"],
        createdAt: "2023-01-10T00:00:00Z",
        updatedAt: "2026-08-14T00:00:00Z",
      },
      {
        id: "cust-access",
        name: "Access Digital Holdings",
        subsidiary: "Enterprise Operations",
        tier: "Enterprise",
        status: "active",
        healthScore: 88,
        arr: 60000000,
        owner: "Marcus Thorne",
        contactName: "Amina Yusuf",
        contactRole: "Chief Risk Officer",
        contactEmail: "amina.y@accessholdings.ng",
        since: "Mar 2022",
        tags: ["Banking", "SLA Tier 5"],
        createdAt: "2022-03-15T00:00:00Z",
        updatedAt: "2026-08-10T00:00:00Z",
      },
      {
        id: "cust-oando",
        name: "Oando Energy Networks",
        subsidiary: "Commercial Operations",
        tier: "Mid-Market",
        status: "at-risk",
        healthScore: 52,
        arr: 28000000,
        owner: "Elena Cho",
        contactName: "Jubril Tinubu",
        contactRole: "Commercial VP",
        contactEmail: "j.tinubu@oandonetworks.com",
        since: "Nov 2024",
        tags: ["Energy", "Price Sensitive"],
        createdAt: "2024-11-01T00:00:00Z",
        updatedAt: "2026-08-18T00:00:00Z",
      },
      {
        id: "cust-meridian",
        name: "Meridian Logistics",
        subsidiary: "Customer Operations",
        tier: "Mid-Market",
        status: "at-risk",
        healthScore: 61,
        arr: 18400000,
        owner: "Elena Cho",
        contactName: "Tariq Adeleke",
        contactRole: "Logistics Lead",
        contactEmail: "t.adeleke@meridianlogistics.ng",
        since: "Feb 2024",
        tags: ["Logistics", "SLA Dispute"],
        createdAt: "2024-02-14T00:00:00Z",
        updatedAt: "2026-08-12T00:00:00Z",
      },
    ];

    for (const c of apexCustomers) {
      this.customers.set(c.id, { ...c, organizationId: "apex-demo" });
    }

    // Customer - Tenant B (Titan) - STRICTLY ISOLATED
    this.customers.set("cust-titan-secret-account", {
      id: "cust-titan-secret-account",
      organizationId: "org-titan-corp",
      name: "Omega Satellite Systems",
      subsidiary: "Space Division",
      tier: "Enterprise",
      status: "active",
      healthScore: 99,
      arr: 120000000,
      owner: "Alexander Vance",
      contactName: "Dr. Sarah Miller",
      contactRole: "CTO",
      contactEmail: "s.miller@omegasat.io",
      since: "Apr 2025",
      tags: ["Confidential", "Government Contract"],
      createdAt: "2025-04-01T00:00:00Z",
      updatedAt: "2026-08-01T00:00:00Z",
    });

    // 5. Value Opportunities (Apex)
    this.opportunities.set("opp-1", {
      id: "opp-1",
      organizationId: "apex-demo",
      title: "Dormant Enterprise Customer Reactivation",
      category: "Dormant customers",
      potentialValue: 42300000,
      confidence: 91,
      evidence: "Customer historically purchases every 45–60 days but has remained completely inactive for 137 days.",
      recommendedAction: "Initiate targeted reactivation campaign with custom pricing structures.",
      expectedOutcome: "Re-establish active transactional revenue pipeline, securing trailing contract projections.",
      realizationSpeed: "Fastest",
      strategicImportance: "High",
      risk: "Low",
      status: "Identified",
      createdAt: "2026-08-01T00:00:00Z",
      updatedAt: "2026-08-18T00:00:00Z",
    });

    this.opportunities.set("opp-2", {
      id: "opp-2",
      organizationId: "apex-demo",
      title: "Technical Integration Gateway Upsell",
      category: "Customer expansion",
      potentialValue: 18400000,
      confidence: 94,
      evidence: "Uptime SLA compliance logs average 99.98% performance, exceeding legacy tier constraints.",
      recommendedAction: "Offer automated gateway up-charge upgrade to secure premium SLA bounds.",
      expectedOutcome: "Immediate ₦18.4M contract expansion ARR with minimal operational overhead.",
      realizationSpeed: "Medium",
      strategicImportance: "Medium",
      risk: "Low",
      status: "Validated",
      createdAt: "2026-08-02T00:00:00Z",
      updatedAt: "2026-08-15T00:00:00Z",
    });

    // Opportunity (Titan) - STRICTLY ISOLATED
    this.opportunities.set("opp-titan-1", {
      id: "opp-titan-1",
      organizationId: "org-titan-corp",
      title: "Titan North Sea Telecom Expansion",
      category: "Customer expansion",
      potentialValue: 85000000,
      confidence: 97,
      evidence: "Exclusive maritime broadband licenses acquired.",
      recommendedAction: "Roll out Ku-band roaming terminals.",
      expectedOutcome: "$85M annual expansion.",
      realizationSpeed: "Fastest",
      strategicImportance: "High",
      risk: "Low",
      status: "Validated",
      createdAt: "2026-08-01T00:00:00Z",
      updatedAt: "2026-08-01T00:00:00Z",
    });

    // 6. Organizational Memory (Apex)
    this.memory.set("mem-101", {
      id: "mem-101",
      organizationId: "apex-demo",
      type: "history",
      title: "Q2 2026 Claims Reversal Root Cause",
      content: "Claims processing duration reversed from 2.8 days to 3.4 days following manual override policy introduced for reinsurance verification.",
      source: "Operations Committee Audit Report 2026-Q2",
      sourceReference: "doc-audit-2026-02",
      confidence: 98,
      effectiveAt: "2026-06-30T00:00:00Z",
      verified: true,
      createdAt: "2026-07-05T00:00:00Z",
    });

    // 7. Value Captured (Apex)
    this.valueCaptured.set("cap-1", {
      id: "cap-1",
      organizationId: "apex-demo",
      opportunityTitle: "Clearing Sweep Float Optimization",
      category: "Revenue recovered",
      capturedValue: 8200000,
      evidenceType: "Financial ledger record",
      evidenceDescription: "CBN daily clearing sweeping ledger reference txn-sweeps-881A. Float latency reduced to 30 minutes.",
      realizationDate: "2026-08-12",
      certifiedBy: "Marcus Thorne (CEO)",
      auditTrail: [
        "Sweeping script deployed and validated by Treasury Management",
        "General Ledger sweep matched by Marcus Thorne (CFO Office)",
      ],
      createdAt: "2026-08-12T00:00:00Z",
    });

    // 8. Actions (Apex)
    this.actions.set("act-1", {
      id: "act-1",
      organizationId: "apex-demo",
      recommendation: "Reactivate Dormant Enterprise Customer",
      owner: "Customer Success Team",
      deadline: "2026-08-25",
      expectedValue: 42300000,
      status: "Ready",
      confidence: 91,
      automationType: "AI-assisted",
      requiresHumanApproval: true,
      insightSource: "Dangote Industrial purchase latency exceeds 137-day average limits.",
      decisionDetail: "Dispatched direct custom-pricing reactivation outbound suite.",
      resultMetric: "Recovered active purchasing cycles; closes potential value leakage gap.",
      logs: [
        "Insight Node generated: Dormant relation detected",
        "Decision Matrix built: Activation pricing generated",
        "Awaiting Executive Approval to Dispatch Campaign",
      ],
      createdAt: "2026-08-10T00:00:00Z",
      updatedAt: "2026-08-14T00:00:00Z",
    });
  }

  /**
   * Defense-in-depth tenant verification guard.
   * Ensures target entity strictly belongs to ctx.organizationId.
   */
  public verifyTenantOwnership<T extends { organizationId: string }>(
    entity: T | undefined,
    ctx: TenantContext,
    resourceName: string = "Resource"
  ): T {
    if (!entity) {
      throw new NotFoundError(resourceName);
    }
    if (entity.organizationId !== ctx.organizationId) {
      // Record security audit violation
      this.recordAuditLog({
        organizationId: ctx.organizationId,
        actorId: ctx.userId,
        actorEmail: ctx.userEmail,
        action: `security:cross_tenant_violation`,
        resource: resourceName,
        resourceId: (entity as any).id || "unknown",
        requestId: ctx.requestId,
        status: "denied",
        metadata: { attemptedOrg: (entity as any).organizationId, actualOrg: ctx.organizationId },
      });
      throw new CrossTenantViolationError((entity as any).organizationId, ctx.organizationId);
    }
    return entity;
  }

  public recordAuditLog(log: Omit<AuditLogRecord, "id" | "timestamp">) {
    const record: AuditLogRecord = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...log,
    };
    this.auditLogs.unshift(record);
    return record;
  }
}

// Export singleton database instance
export const db = new DatabaseStore();
