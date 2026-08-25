import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { resolveTenantContext } from "@/lib/backend/core/security";
import { db } from "@/lib/backend/database/store";

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    let ctx;
    try {
      ctx = await resolveTenantContext(req.headers);
    } catch {
      // If unauthenticated, reject gracefully
      return NextResponse.json(
        { error: "Authentication required: Missing or invalid Bearer token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const org = db.organizations.get(ctx.organizationId);
    const orgName = org?.name || "Apex Demo Group";
    const currency = org?.currencySymbol || "₦";

    // Dynamic ground context from tenant data
    const customers = await db.customersRepo.findMany(ctx);
    const opps = await db.opportunitiesRepo.findMany(ctx);
    const totalArr = customers.reduce((sum, c) => sum + (c.arr || 0), 0);
    const totalOpps = opps.reduce((sum, o) => sum + (o.potentialValue || 0), 0);

    let ai;
    try {
      ai = getAiClient();
    } catch {
      return NextResponse.json({
        text: `The **Apex Value Analyst** for **${orgName}** is ready. Monitored ARR: ${currency}${totalArr.toLocaleString()}, Active Opportunities: ${currency}${totalOpps.toLocaleString()}. However, the \`GEMINI_API_KEY\` is not currently set in the **Settings > Secrets** panel. Once provided, I will deliver live intelligence scans, contract audit logic, and system recommendation evaluations. How can I assist you in configuring your value engine parameters today?`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are Apex Value Analyst, a premium enterprise value capture assistant for ${orgName}.
Monitored Organization Context:
- Currency: ${currency}
- Monitored Accounts: ${customers.length} (Total ARR: ${currency}${totalArr.toLocaleString()})
- Identified Value Opportunities: ${opps.length} (Total: ${currency}${totalOpps.toLocaleString()})

When replying to queries about opportunities, analysis, audits, or recommendations, ALWAYS provide a highly detailed, scannable response with:
1. **INSIGHT**: Clear qualitative and analytical summary.
2. **FINANCIAL IMPACT**: Structured calculation in ${currency}.
3. **REASON**: Underlying operational or telemetry cause.
4. **RECOMMENDED ACTION**: Specific play to deploy.
5. **CONFIDENCE**: Numerical percentage confidence bound based strictly on available evidence.
6. **NEXT STEP**: Immediate tactical move.

Speak with professional composure, board-level eloquence, and precise financial terminology. Never fabricate data outside the organization's verified operational domain.`,
      },
    });

    return NextResponse.json({ text: response.text || "No response received." });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during generation." },
      { status: 500 }
    );
  }
}
