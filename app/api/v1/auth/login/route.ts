import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/backend/domains/auth/authService";
import { BackendError } from "@/lib/backend/core/errors";
import { generateRequestId } from "@/lib/backend/core/security";

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await authService.login(
      {
        email: body.email,
        password: body.password,
        targetOrganizationId: body.organizationId,
      },
      requestId
    );

    return NextResponse.json({
      success: true,
      token: result.session.token,
      user: {
        id: result.session.userId,
        email: result.session.userEmail,
        name: result.session.userName,
        role: result.session.role,
        permissions: result.session.permissions,
      },
      organization: {
        id: result.session.organizationId,
        name: result.session.organizationName,
      },
      availableOrganizations: result.availableOrganizations,
      expiresAt: result.session.expiresAt,
    });
  } catch (err: any) {
    if (err instanceof BackendError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
