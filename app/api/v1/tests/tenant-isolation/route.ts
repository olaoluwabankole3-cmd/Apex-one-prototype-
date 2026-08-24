import { NextRequest, NextResponse } from "next/server";
import { runTenantIsolationTestSuite } from "@/lib/backend/tests/tenantIsolation.test";

export async function GET(req: NextRequest) {
  const results = await runTenantIsolationTestSuite();
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status: results.passed ? "ALL_PASSED" : "FAILED",
    passed: results.passed,
    totalTests: results.total,
    details: results.results,
  });
}
