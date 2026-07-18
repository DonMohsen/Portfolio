import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { EstimatorResult } from "@/lib/tools/estimator-logic";
import { toolLeadSchema } from "@/lib/tools/lead-schema";
import {
  buildEstimatorBreakdownEmail,
  sendToolLeadEmails,
} from "@/lib/tools/send-lead-email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = toolLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead data.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const source =
      data.source?.trim() ||
      (data.toolSlug === "project-estimator"
        ? "tool:estimator"
        : `tool:${data.toolSlug}`);

    const lead = await prisma.toolLead.create({
      data: {
        toolSlug: data.toolSlug,
        locale: data.locale,
        email: data.email?.trim() ? data.email.trim() : null,
        inputsJson: data.inputs as Prisma.InputJsonValue,
        resultJson:
          data.result != null
            ? (data.result as Prisma.InputJsonValue)
            : undefined,
        source,
      },
    });

    let breakdownText: string | undefined;
    if (data.email && data.toolSlug === "project-estimator" && data.result) {
      breakdownText = buildEstimatorBreakdownEmail(
        data.locale,
        data.result as EstimatorResult
      );
    }

    await sendToolLeadEmails({
      lead: { ...data, email: data.email ?? "", source },
      leadId: lead.id,
      breakdownText,
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Tool lead error:", error);
    return NextResponse.json(
      { error: "Unable to save lead." },
      { status: 500 }
    );
  }
}
