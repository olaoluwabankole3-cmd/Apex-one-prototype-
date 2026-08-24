import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize client lazily and safely
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return a mock-fallback client or throw a descriptive error on first request
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
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    let ai;
    try {
      ai = getAiClient();
    } catch (e: any) {
      // Graceful response if API Key is not set yet in environment
      return NextResponse.json({
        text: "The **Apex Value Analyst** is ready. However, the `GEMINI_API_KEY` is not currently set in the **Settings > Secrets** panel. Once provided, I will deliver live intelligence scans, contract audit logic, and system recommendation evaluations. How can I assist you in configuring your value engine parameters today?",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are Apex Value Analyst, a premium enterprise value capture assistant at APEX ONE. Your purpose is to analyze revenue leakages, SaaS capacity optimization, contract pricing calibration, and capital reclamation opportunities using realistic simulated Nigerian enterprise data in Naira (₦).

Key Metrics:
- Total Active Backlog Potential Value: ₦184.7M
- Total Ongoing Active Leakage: ₦67.3M
- Average Global Capacity Utilization: 58%
- Completed Captures (Verified Ledger): ₦47.2M (composed of Revenue Recovered: ₦21.4M, New Revenue: ₦15.7M, Cost Avoided: ₦10.1M)
- Engine ROI: 11.4x

When replying to queries about opportunities, analysis, audits, or recommendations, you MUST ALWAYS provide a highly detailed, scannable response with these six specific sections:
1. **INSIGHT**: Clear qualitative and analytical summary.
2. **FINANCIAL IMPACT**: Structured calculation in Nigerian Naira (₦).
3. **REASON**: Underlying operational or telemetry cause.
4. **RECOMMENDED ACTION**: Specific play to deploy.
5. **CONFIDENCE**: Numerical percentage confidence bound.
6. **NEXT STEP**: Immediate tactical move.

Speak with professional composure, board-level eloquence, and precise financial terminology.`,
      },
    });

    return NextResponse.json({ text: response.text || "No response received." });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: error.message || "An error occurred during generation." }, { status: 500 });
  }
}
