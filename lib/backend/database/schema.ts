/**
 * APEX ONE — Domain Entities & Database Schema Types
 */

export interface OrganizationRecord {
  id: string;
  name: string;
  displayName: string;
  slug: string;
  industry: string;
  plan: "standard" | "enterprise";
  currency: string;
  currencySymbol: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  title: string;
  avatarUrl?: string;
  status: "active" | "suspended" | "pending";
  createdAt: string;
}

export interface OrganizationMembershipRecord {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  department?: string;
  joinedAt: string;
}

export interface CustomerRecord {
  id: string;
  organizationId: string;
  name: string;
  subsidiary: string;
  tier: "Enterprise" | "Mid-Market" | "SMB";
  status: "active" | "at-risk" | "onboarding" | "dormant";
  healthScore: number;
  arr: number;
  owner: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  since: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContractRecord {
  id: string;
  organizationId: string;
  customerId: string;
  title: string;
  contractValue: number;
  startDate: string;
  endDate: string;
  renewalDaysRemaining: number;
  status: "active" | "expiring_soon" | "expired" | "renewed";
  slaCompliance: number;
  volatilityIndexationClause: boolean;
  createdAt: string;
}

export interface TransactionRecord {
  id: string;
  organizationId: string;
  customerId: string;
  type: "revenue" | "cost" | "credit" | "reconciliation";
  amount: number;
  currency: string;
  status: "cleared" | "pending" | "failed" | "disputed";
  reference: string;
  category: string;
  date: string;
  createdAt: string;
}

export interface DocumentRecord {
  id: string;
  organizationId: string;
  customerId?: string;
  name: string;
  fileType: "pdf" | "doc" | "xlsx" | "image";
  category: string;
  size: string;
  uploadedBy: string;
  storageKey: string;
  status: "processing" | "processed" | "failed";
  aiSummary?: string;
  extractedFields?: { label: string; value: string }[];
  createdAt: string;
}

export interface KnowledgeItemRecord {
  id: string;
  organizationId: string;
  title: string;
  category: "Playbook" | "Policy" | "Onboarding" | "Product" | "Financial Regulation";
  content: string;
  author: string;
  sourceDocId?: string;
  tags: string[];
  createdAt: string;
}

export interface OrganizationalMemoryRecord {
  id: string;
  organizationId: string;
  type: "fact" | "history" | "decision" | "insight" | "policy";
  title: string;
  content: string;
  source: string;
  sourceReference: string;
  confidence: number;
  effectiveAt: string;
  verified: boolean;
  createdAt: string;
}

export interface EventRecord {
  id: string;
  organizationId: string;
  eventType: string;
  entityType: string;
  entityId: string;
  actor: string;
  payload: any;
  timestamp: string;
}

export interface SignalRecord {
  id: string;
  organizationId: string;
  category: "revenue" | "customer" | "operation" | "capacity" | "compliance";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  evidence: string;
  status: "active" | "investigating" | "resolved";
  detectedAt: string;
}

export interface ValueOpportunityRecord {
  id: string;
  organizationId: string;
  title: string;
  category: "Customer expansion" | "Dormant customers" | "Contract optimization" | "Revenue recovery" | "Process optimization" | "Capacity utilization";
  potentialValue: number;
  confidence: number;
  evidence: string;
  recommendedAction: string;
  expectedOutcome: string;
  realizationSpeed: "Fastest" | "Medium" | "Long-Term";
  strategicImportance: "High" | "Medium" | "Low";
  risk: "Low" | "Medium" | "High";
  status: "Identified" | "Validated" | "Approved" | "Executing" | "Captured";
  createdAt: string;
  updatedAt: string;
}

export interface ValueCapturedRecord {
  id: string;
  organizationId: string;
  opportunityId?: string;
  opportunityTitle: string;
  category: "Revenue recovered" | "Revenue generated" | "Cost avoided" | "Capacity recovered" | "Time saved";
  capturedValue: number;
  evidenceType: string;
  evidenceDescription: string;
  realizationDate: string;
  certifiedBy: string;
  auditTrail: string[];
  createdAt: string;
}

export interface WorkflowRecord {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  subsidiary: string;
  status: "active" | "draft" | "paused";
  nodes: any[];
  connections: any[];
  runsCount: number;
  successRate: number;
  createdAt: string;
}

export interface ActionRecord {
  id: string;
  organizationId: string;
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
  approvedBy?: string;
  logs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogRecord {
  id: string;
  organizationId: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  requestId: string;
  status: "success" | "denied" | "error";
  metadata?: any;
  timestamp: string;
}
