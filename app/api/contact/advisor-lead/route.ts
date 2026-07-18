import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const advisorLeadSchema = z.object({
  sessionId: z.string().trim().min(8).max(64),
  locale: z.enum(["fa", "en"]),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(24),
  suggestedServiceSlug: z.string().max(64).optional(),
  suggestedCaseStudySlug: z.string().max(64).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = advisorLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid advisor lead payload." },
        { status: 400 }
      );
    }

    const { sessionId, locale, messages, suggestedServiceSlug, suggestedCaseStudySlug } =
      parsed.data;

    const existing = await prisma.toolLead.findFirst({
      where: {
        toolSlug: "ai-advisor",
        source: "ai-advisor",
        inputsJson: {
          path: ["sessionId"],
          equals: sessionId,
        },
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ ok: true, id: existing.id, duplicate: true });
    }

    const lead = await prisma.toolLead.create({
      data: {
        toolSlug: "ai-advisor",
        locale,
        email: null,
        source: "ai-advisor",
        inputsJson: {
          sessionId,
          messages: messages.slice(-8),
          suggestedServiceSlug: suggestedServiceSlug ?? null,
          suggestedCaseStudySlug: suggestedCaseStudySlug ?? null,
        },
        resultJson: {
          loggedAt: new Date().toISOString(),
          messageCount: messages.length,
        },
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Advisor lead error:", error);
    return NextResponse.json(
      { error: "Unable to log advisor session." },
      { status: 500 }
    );
  }
}
