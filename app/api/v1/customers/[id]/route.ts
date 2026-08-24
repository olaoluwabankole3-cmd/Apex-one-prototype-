import { NextRequest, NextResponse } from "next/server";
import { resolveTenantContext } from "@/lib/backend/core/security";
import { customerService } from "@/lib/backend/domains/customers/customerService";
import { BackendError } from "@/lib/backend/core/errors";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = resolveTenantContext(req.headers);
    const customer = await customerService.getCustomerById(params.id, ctx);
    return NextResponse.json({ success: true, data: customer });
  } catch (err: any) {
    if (err instanceof BackendError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
