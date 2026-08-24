import { NextRequest, NextResponse } from "next/server";
import { runTenantIsolationTestSuite } from "@/lib/backend/tests/tenantIsolation.test";
import { db } from "@/lib/backend/database/store";

export async function GET(req: NextRequest) {
  const testResults = await runTenantIsolationTestSuite();

  return NextResponse.json({
    status: "healthy",
    version: "v1.0.0",
    service: "APEX ONE Enterprise Backend",
    timestamp: new Date().toISOString(),
    multiTenancy: {
      status: "enforced",
      activeTenantsCount: db.organizations.size,
      isolationTestSuite: {
        passed: testResults.passed,
        testsRun: testResults.total,
      },
    },
    database: {
      type: "relational_store",
      tablesLoaded: [
        "organizations",
        "users",
        "memberships",
        "customers",
        "contracts",
        "transactions",
        "documents",
        "knowledge",
        "memory",
        "opportunities",
        "valueCaptured",
        "actions",
        "auditLogs",
      ],
      recordsCount: {
        customers: db.customers.size,
        opportunities: db.opportunities.size,
        memory: db.memory.size,
        actions: db.actions.size,
        auditLogs: db.auditLogs.length,
      },
    },
  });
}
