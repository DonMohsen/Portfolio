import { NextRequest, NextResponse } from "next/server";
import { computeEstimate } from "@/lib/tools/estimator-logic";
import { estimateRequestSchema } from "@/lib/tools/lead-schema";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = estimateRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid estimate input.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = computeEstimate(parsed.data);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json(
      { error: "Unable to compute estimate." },
      { status: 500 }
    );
  }
}
