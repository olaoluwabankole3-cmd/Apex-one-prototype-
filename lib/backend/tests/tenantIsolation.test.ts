/**
 * APEX ONE — Automated Tenant Isolation & Security Verification Test Suite
 * 
 * Tests the Defense-in-Depth Tenant Isolation Matrix:
 * Tenant A: apex-demo (Apex Demo Group)
 * Tenant B: org-titan-corp (Titan Global Holdings)
 */

import { customerService } from "../domains/customers/customerService";
import { valueService } from "../domains/value/valueService";
import { memoryService } from "../domains/memory/memoryService";
import { actionService } from "../domains/actions/actionService";
import { authorizedAiTools } from "../domains/ai/aiOrchestratorService";
import { TenantContext, CrossTenantViolationError, NotFoundError } from "../core/errors";
import { ROLE_PERMISSIONS } from "../core/security";

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

  const tenantBContext: TenantContext = {
    organizationId: "org-titan-corp",
    userId: "usr-titan-admin",
    userEmail: "admin@titancorp.com",
    userRole: "CEO",
    permissions: ROLE_PERMISSIONS["CEO"],
    requestId: "test_req_tenant_b",
    timestamp: new Date().toISOString(),
  };

  // Test 1: Tenant A -> Tenant A Customer (ALLOW)
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

  // Test 2: Tenant A -> Tenant B Customer (DENY)
  try {
    await customerService.getCustomerById("cust-titan-secret-account", tenantAContext);
    results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: false, error: "Security Breach: Tenant A accessed Tenant B customer!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: true });
    } else {
      results.push({ suite: "Customer Isolation", testName: "Tenant A reads Tenant B Customer [DENIED]", passed: false, error: `Unexpected error type: ${err.message}` });
    }
  }

  // Test 3: Tenant A -> Tenant A Opportunity (ALLOW)
  try {
    const opp = await valueService.getOpportunityById("opp-1", tenantAContext);
    if (opp && opp.organizationId === "apex-demo") {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant A Opportunity", passed: true });
    } else {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant A Opportunity", passed: false, error: "Unexpected opportunity data" });
    }
  } catch (err: any) {
    results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant A Opportunity", passed: false, error: err.message });
  }

  // Test 4: Tenant A -> Tenant B Opportunity (DENY)
  try {
    await valueService.getOpportunityById("opp-titan-1", tenantAContext);
    results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: false, error: "Security Breach: Tenant A accessed Tenant B opportunity!" });
  } catch (err: any) {
    if (err instanceof CrossTenantViolationError || err instanceof NotFoundError) {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: true });
    } else {
      results.push({ suite: "Value Isolation", testName: "Tenant A reads Tenant B Opportunity [DENIED]", passed: false, error: `Unexpected error type: ${err.message}` });
    }
  }

  // Test 5: Tenant A -> AI Tool Customer Ingestion Isolation (ALLOW & SCOPED)
  try {
    const toolResults = await authorizedAiTools.get_tenant_customers.handler({}, tenantAContext);
    const hasLeakage = toolResults.some((c: any) => c.id === "cust-titan-secret-account");
    if (!hasLeakage && toolResults.length > 0) {
      results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: true });
    } else {
      results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: false, error: "AI Tool leaked Tenant B customer records" });
    }
  } catch (err: any) {
    results.push({ suite: "AI Tool Security", testName: "AI Tool Execution Tenant Scoping", passed: false, error: err.message });
  }

  // Test 6: Tenant B -> Tenant B Customer (ALLOW)
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

  const allPassed = results.every((r) => r.passed);
  return {
    passed: allPassed,
    total: results.length,
    results,
  };
}
