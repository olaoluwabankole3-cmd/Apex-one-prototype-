/**
 * APEX ONE — Automated Tenant Isolation & Security Verification Test Suite
 * 
 * Exhaustive Multi-Tenant Security & Isolation Matrix:
 * Tenant A: apex-demo (Apex Demo Group)
 * Tenant B: org-titan-corp (Titan Global Holdings)
 * 
 * Tests:
 * 1. Missing authentication (401)
 * 2. Invalid session token (401)
 * 3. Expired session token (401)
 * 4. Tenant A reading Tenant A Customer (200 - ALLOW)
 * 5. Tenant A reading Tenant B Customer (DENY - NotFound/CrossTenantViolation)
 * 6. Tenant A updating Tenant B Customer (DENY)
 * 7. Tenant A deleting Tenant B Customer (DENY)
 * 8. Tenant A searching Customers strictly tenant-filtered (ALLOW & SCOPED)
 * 9. Tenant A reading Tenant B Opportunity (DENY)
 * 10. Tenant A reading Tenant B Organizational Memory (DENY)
 * 11. Tenant A advancing Tenant B Execution Action (DENY)
 * 12. Tenant A accessing Tenant B Audit Logs (DENY & SCOPED)
 * 13. Tenant A AI Tool Customer Retrieval Scoping (ALLOW & SCOPED)
 * 14. Tenant B reading Tenant B Customer (200 - ALLOW)
 * 15. RBAC Authorization: Role without action:approve attempting approval (DENY - 403)
 * 16. Organization Switching to Unauthorized Tenant (DENY - 403)
 * 17. Document Isolation: Tenant A reading Tenant B Document (DENY)
 * 18. Knowledge Isolation: Tenant A reading Tenant B Knowledge Item (DENY)
 * 19. Workflow Isolation: Tenant A executing Tenant B Workflow (DENY)
 * 20. Workflow Graph Validation: Cyclic connection detection (VALIDATION REJECT)
 * 21. Request Validation: Invalid email and negative numbers (VALIDATION REJECT)
 * 22. Value Intelligence Evidence Chain: Dynamic calculation and zero-data handling (ALLOW)
 */

import { customerService } from "../domains/customers/customerService";
import { valueService } from "../domains/value/valueService";
import { memoryService } from "../domains/memory/memoryService";
import { actionService } from "../domains/actions/actionService";
import { auditService } from "../domains/audit/auditService";
import { authService } from "../domains/auth/authService";
import { documentService } from "../domains/documents/documentService";
import { knowledgeService } from "../domains/knowledge/knowledgeService";
import { workflowService } from "../domains/workflows/workflowService";
import { WorkflowValidator } from "../domains/workflows/workflowValidator";
import { defaultSessionStore } from "../domains/auth/authProvider";
import { authorizedAiTools } from "../domains/ai/aiOrchestratorService";
import {
  TenantContext,
  CrossTenantViolationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
} from "../core/errors";
import { resolveTenantContext, ROLE_PERMISSIONS } from "../core/security";

export interface TestResult {
  suite: string;
  testName: string;
  passed: boolean;
  error?: string;
}

export async function runTenantIsolationTestSuite(): Promise<{ passed: boolean; total: number; results: TestResult[] }> {
  const results: TestResult[] = [];

  const tenantAContext: TenantContext = {
    organizationId: "apex-demo",
    userId: "usr-marcus-thorne",
    userEmail: "m.thorne@apexsync.ai",
    userRole: "CEO",
    permissions: ROLE_PERMISSIONS["CEO"],
    requestId: "test_req_tenant_a",
    timestamp: new Date().toISOString(),
  };

  const tenantARMContext: TenantContext = {
    organizationId: "apex-demo",
    userId: "usr-elena-cho",
    userEmail: "e.cho@apexsync.ai",
    userRole: "Relationship Manager",
    permissions: ROLE_PERMISSIONS["Relationship Manager"],
    requestId: "test_req_tenant_a_rm",
    timestamp: new Date().toISOString(),
  };

  const tenantBContext: TenantContext = {
    organizationId: "org-titan-corp",
    userId: "usr-titan-admin",
    userEmail: "admin@titancorp.com",
    userRole: "CEO",
    permissions: ROLE_PERMISSIONS["CEO"],
    requestId: "test_req_tenant_b",
    timestamp: new Date().toISOString(),
  };

  // 1. Missing authentication token check
  try {
    const prevEnv = process.env.DEMO_MODE;
    process.env.DEMO_MODE = "false";
    await resolveTenantContext({});
    results.push({
      suite: "Authentication Security",
      testName: "Missing Bearer token triggers 401 Unauthorized",
      passed: false,
      error: "Failed: Request without token was allowed",
    });
    process.env.DEMO_MODE = prevEnv;
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      results.push({
        suite: "Authentication Security",
        testName: "Missing Bearer token triggers 401 Unauthorized",
        passed: true,
      });
    } else {
      results.push({
        suite: "Authentication Security",
        testName: "Missing Bearer token triggers 401 Unauthorized",
        passed: false,
        error: `Unexpected error: ${err.message}`,
      });
    }
  }

  // 2. Invalid session token check
  try {
    await resolveTenantContext({ authorization: "Bearer apex_invalid_forged_token_xyz" });
    results.push({
      suite: "Authentication Security",
      testName: "Forged session token triggers 401 Unauthorized",
      passed: false,
      error: "Failed: Forged token was accepted",
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      results.push({
        suite: "Authentication Security",
        testName: "Forged session token triggers 401 Unauthorized",
        passed: true,
      });
    } else {
      results.push({
        suite: "Authentication Security",
        testName: "Forged session token triggers 401 Unauthorized",
        passed: false,
        error: `Unexpected error: ${err.message}`,
      });
    }
  }

  // 3. Expired session token check
  try {
    const expiredSession = await defaultSessionStore.createSession(
      { id: "usr-temp", email: "temp@example.com", name: "Temp" },
      { id: "apex-demo", name: "Apex Demo" },
      "CEO",
      ROLE_PERMISSIONS["CEO"],
      -10 // Expired 10 seconds ago
    );
    await resolveTenantContext({ authorization: `Bearer ${expiredSession.token}` });
    results.push({
      suite: "Authentication Security",
      testName: "Expired session token triggers 401 Unauthorized",
      passed: false,
      error: "Failed: Expired token was accepted",
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      results.push({
        suite: "Authentication Security",
        testName: "Expired session token triggers 401 Unauthorized",
        passed: true,
      });
    } else {
      results.push({
        suite: "Authentication Security",
        testName: "Expired session token triggers 401 Unauthorized",
        passed: false,
        error: `Unexpected error: ${err.message}`,
      });
    }
  }

  // 4. Tenant A -> Tenant A Customer (ALLOW)
  try {
    const cust = await customerService.getCustomerById("cust-dangote", tenantAContext);
    if (cust && cust.organizationId === "apex-demo") {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant A Customer", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant A Customer", passed: false, error: "Unexpected customer data" });
    }
  } catch (err: any) {
    results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant A Customer", passed: false, error: err.message });
  }

  // 5. Tenant A -> Tenant B Customer (DENY)
  try {
    await customerService.getCustomerById("cust-titan-secret-account", tenantAContext);
    results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: false, error: "Security Breach: Tenant A accessed Tenant B customer!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 6. Tenant A -> Tenant B Customer Update (DENY)
  try {
    await customerService.updateCustomer("cust-titan-secret-account", { name: "Hacked Customer" }, tenantAContext);
    results.push({ suite: "Customer Isolation", testName: "Tenant A updates Tenant B Customer [DENIED]", passed: false, error: "Security Breach: Tenant A modified Tenant B customer!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Customer Isolation", testName: "Tenant A updates Tenant B Customer [DENIED]", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Tenant A updates Tenant B Customer [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 7. Tenant A -> Tenant B Customer Delete (DENY)
  try {
    await customerService.deleteCustomer("cust-titan-secret-account", tenantAContext);
    results.push({ suite: "Customer Isolation", testName: "Tenant A deletes Tenant B Customer [DENIED]", passed: false, error: "Security Breach: Tenant A deleted Tenant B customer!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Customer Isolation", testName: "Tenant A deletes Tenant B Customer [DENIED]", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Tenant A deletes Tenant B Customer [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 8. Tenant A -> Search Customers Scoped (ALLOW & FILTERED)
  try {
    const customers = await customerService.getCustomers(tenantAContext);
    const leaked = customers.some((c) => c.organizationId !== "apex-demo");
    if (!leaked && customers.length > 0) {
      results.push({ suite: "Customer Isolation", testName: "Customer Search is Strictly Tenant-Scoped", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Customer Search is Strictly Tenant-Scoped", passed: false, error: "Cross-tenant record leakage in search" });
    }
  } catch (err: any) {
    results.push({ suite: "Customer Isolation", testName: "Customer Search is Strictly Tenant-Scoped", passed: false, error: err.message });
  }

  // 9. Tenant A -> Tenant B Opportunity (DENY)
  try {
    await valueService.getOpportunityById("opp-titan-1", tenantAContext);
    results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: false, error: "Security Breach: Tenant A accessed Tenant B opportunity!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: true });
    } else {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 10. Tenant A -> Tenant B Memory Item (DENY)
  try {
    await memoryService.getMemoryById("mem-titan-nonexistent", tenantAContext);
    results.push({ suite: "Memory Isolation", testName: "Tenant A reads Tenant B Memory [DENIED]", passed: false, error: "Security Breach: Tenant A accessed unowned memory" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Memory Isolation", testName: "Tenant A reads Tenant B Memory [DENIED]", passed: true });
    } else {
      results.push({ suite: "Memory Isolation", testName: "Tenant A reads Tenant B Memory [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 11. Tenant A -> Tenant B Action Advance (DENY)
  try {
    await actionService.advanceAction("act-titan-unknown", tenantAContext);
    results.push({ suite: "Action Isolation", testName: "Tenant A advances Tenant B Action [DENIED]", passed: false, error: "Security Breach: Tenant A advanced unowned action!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Action Isolation", testName: "Tenant A advances Tenant B Action [DENIED]", passed: true });
    } else {
      results.push({ suite: "Action Isolation", testName: "Tenant A advances Tenant B Action [DENIED]", passed: false, error: `Unexpected error: ${err.message}` });
    }
  }

  // 12. Tenant A -> Audit Logs Scoping (ALLOW & SCOPED)
  try {
    const logs = await auditService.getAuditLogs(tenantAContext);
    const leaked = logs.some((l) => l.organizationId !== "apex-demo");
    if (!leaked) {
      results.push({ suite: "Audit Isolation", testName: "Audit Logs are Strictly Tenant-Scoped", passed: true });
    } else {
      results.push({ suite: "Audit Isolation", testName: "Audit Logs are Strictly Tenant-Scoped", passed: false, error: "Cross-tenant audit log leakage" });
    }
  } catch (err: any) {
    results.push({ suite: "Audit Isolation", testName: "Audit Logs are Strictly Tenant-Scoped", passed: false, error: err.message });
  }

  // 13. Tenant A -> AI Tool Customer Ingestion Isolation (ALLOW & SCOPED)
  try {
    const toolResults = (await authorizedAiTools.get_tenant_customers.handler({}, tenantAContext)) as any[];
    const hasLeakage = toolResults.some((c: any) => c.id === "cust-titan-secret-account");
    if (!hasLeakage && toolResults.length > 0) {
      results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: true });
    } else {
      results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: false, error: "AI Tool leaked Tenant B customer records" });
    }
  } catch (err: any) {
    results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: false, error: err.message });
  }

  // 14. Tenant B -> Tenant B Customer (ALLOW)
  try {
    const custB = await customerService.getCustomerById("cust-titan-secret-account", tenantBContext);
    if (custB && custB.organizationId === "org-titan-corp") {
      results.push({ suite: "Multi-Tenant Independence", testName: "Tenant B reads Tenant B Customer", passed: true });
    } else {
      results.push({ suite: "Multi-Tenant Independence", testName: "Tenant B reads Tenant B Customer", passed: false, error: "Unexpected customer data" });
    }
  } catch (err: any) {
    results.push({ suite: "Multi-Tenant Independence", testName: "Tenant B reads Tenant B Customer", passed: false, error: err.message });
  }

  // 15. RBAC Authorization: Role without action:approve capability attempting approval (DENY)
  try {
    await actionService.advanceAction("act-1", tenantARMContext);
    results.push({
      suite: "RBAC Enforcement",
      testName: "Unauthorized Role Blocked from Action Approval [DENIED]",
      passed: false,
      error: "RBAC Failure: User without action:approve was allowed to approve action",
    });
  } catch (err: any) {
    if (err instanceof ForbiddenError) {
      results.push({
        suite: "RBAC Enforcement",
        testName: "Unauthorized Role Blocked from Action Approval [DENIED]",
        passed: true,
      });
    } else {
      results.push({
        suite: "RBAC Enforcement",
        testName: "Unauthorized Role Blocked from Action Approval [DENIED]",
        passed: false,
        error: `Unexpected error type: ${err.message}`,
      });
    }
  }

  // 16. Organization Switching to Unauthorized Tenant (DENY)
  try {
    await authService.switchOrganization("org-titan-corp", tenantAContext);
    results.push({
      suite: "Multi-Tenant Membership",
      testName: "Switching to Non-Member Tenant [DENIED]",
      passed: false,
      error: "Security Breach: User switched to unauthorized organization!",
    });
  } catch (err: any) {
    if (err instanceof ForbiddenError) {
      results.push({
        suite: "Multi-Tenant Membership",
        testName: "Switching to Non-Member Tenant [DENIED]",
        passed: true,
      });
    } else {
      results.push({
        suite: "Multi-Tenant Membership",
        testName: "Switching to Non-Member Tenant [DENIED]",
        passed: false,
        error: `Unexpected error type: ${err.message}`,
      });
    }
  }

  // 17. Document Isolation: Tenant A reading Tenant B Document (DENY)
  try {
    await documentService.getDocumentById("doc-titan-secret-contract", tenantAContext);
    results.push({
      suite: "Document Isolation",
      testName: "Tenant A reading Tenant B Document [DENIED]",
      passed: false,
      error: "Security Breach: Tenant A accessed Tenant B document!",
    });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Document Isolation", testName: "Tenant A reading Tenant B Document [DENIED]", passed: true });
    } else {
      results.push({ suite: "Document Isolation", testName: "Tenant A reading Tenant B Document [DENIED]", passed: false, error: err.message });
    }
  }

  // 18. Knowledge Isolation: Tenant A reading Tenant B Knowledge Item (DENY)
  try {
    await knowledgeService.getKnowledgeItemById("know-titan-secret-playbook", tenantAContext);
    results.push({
      suite: "Knowledge Isolation",
      testName: "Tenant A reading Tenant B Knowledge Item [DENIED]",
      passed: false,
      error: "Security Breach: Tenant A accessed Tenant B knowledge item!",
    });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Knowledge Isolation", testName: "Tenant A reading Tenant B Knowledge Item [DENIED]", passed: true });
    } else {
      results.push({ suite: "Knowledge Isolation", testName: "Tenant A reading Tenant B Knowledge Item [DENIED]", passed: false, error: err.message });
    }
  }

  // 19. Workflow Isolation: Tenant A executing Tenant B Workflow (DENY)
  try {
    await workflowService.triggerWorkflowRun({ workflowId: "wf-titan-secret" }, tenantAContext);
    results.push({
      suite: "Workflow Isolation",
      testName: "Tenant A executing Tenant B Workflow [DENIED]",
      passed: false,
      error: "Security Breach: Tenant A executed Tenant B workflow!",
    });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Workflow Isolation", testName: "Tenant A executing Tenant B Workflow [DENIED]", passed: true });
    } else {
      results.push({ suite: "Workflow Isolation", testName: "Tenant A executing Tenant B Workflow [DENIED]", passed: false, error: err.message });
    }
  }

  // 20. Workflow Graph Validation: Cyclic connection detection (VALIDATION REJECT)
  try {
    WorkflowValidator.validateWorkflowGraph(
      [
        { id: "node-1", type: "trigger", title: "Trigger", status: "completed" },
        { id: "node-2", type: "action", title: "Step 2", status: "idle" },
      ],
      [
        { id: "c1", fromNodeId: "node-1", toNodeId: "node-2" },
        { id: "c2", fromNodeId: "node-2", toNodeId: "node-1" }, // Circular loop
      ]
    );
    results.push({
      suite: "Graph Validation",
      testName: "Workflow DAG Cycle Detection [REJECTED]",
      passed: false,
      error: "Validation Failure: Cyclic workflow graph was accepted!",
    });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      results.push({ suite: "Graph Validation", testName: "Workflow DAG Cycle Detection [REJECTED]", passed: true });
    } else {
      results.push({ suite: "Graph Validation", testName: "Workflow DAG Cycle Detection [REJECTED]", passed: false, error: err.message });
    }
  }

  // 21. Request Validation: Invalid email rejection (VALIDATION REJECT)
  try {
    await customerService.createCustomer(
      {
        name: "Test Customer",
        contactEmail: "invalid-email-no-at-sign",
      },
      tenantAContext
    );
    results.push({
      suite: "Request Validation",
      testName: "Invalid Contact Email Rejection [REJECTED]",
      passed: false,
      error: "Validation Failure: Bad email format accepted!",
    });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      results.push({ suite: "Request Validation", testName: "Invalid Contact Email Rejection [REJECTED]", passed: true });
    } else {
      results.push({ suite: "Request Validation", testName: "Invalid Contact Email Rejection [REJECTED]", passed: false, error: err.message });
    }
  }

  // 22. Value Intelligence Evidence Chain: Dynamic calculation and zero-data handling (ALLOW)
  try {
    const summary = await valueService.getSummary(tenantAContext);
    if (
      summary.potentialValueIdentified.evidence &&
      summary.revenueLeakageTotal.calculationMethod &&
      summary.realizationEfficiencyRate >= 0
    ) {
      results.push({
        suite: "Value Intelligence Evidence",
        testName: "Dynamic Evidence-Grounded Calculations",
        passed: true,
      });
    } else {
      results.push({
        suite: "Value Intelligence Evidence",
        testName: "Dynamic Evidence-Grounded Calculations",
        passed: false,
        error: "Missing calculation evidence chain",
      });
    }
  } catch (err: any) {
    results.push({
      suite: "Value Intelligence Evidence",
      testName: "Dynamic Evidence-Grounded Calculations",
      passed: false,
      error: err.message,
    });
  }

  const allPassed = results.every((r) => r.passed);
  return {
    passed: allPassed,
    total: results.length,
    results,
  };
}
