import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/contact/inquiry-schema";
import { sendInquiryNotificationEmail } from "@/lib/contact/send-inquiry-email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company?.trim() ? data.company.trim() : null,
        projectType: data.projectType,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        message: data.message,
        locale: data.locale,
        source: data.source?.trim() ? data.source.trim() : "contact-form",
      },
    });

    await sendInquiryNotificationEmail({ ...data, id: inquiry.id });

    return NextResponse.json(
      { ok: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to save inquiry. Please try email or Telegram." },
      { status: 500 }
    );
  }
}
