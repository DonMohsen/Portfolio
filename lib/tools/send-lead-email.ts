import type { EstimatorResult } from "@/lib/tools/estimator-logic";
import type { ToolLeadInput } from "@/lib/tools/lead-schema";

export async function sendToolLeadEmails(payload: {
  lead: ToolLeadInput;
  leadId: number;
  breakdownText?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ?? "onboarding@resend.dev";

  if (!apiKey) return;

  const { lead, leadId, breakdownText } = payload;
  const isFa = lead.locale === "fa";
  const userEmail = lead.email?.trim();

  if (notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notifyEmail],
          ...(userEmail ? { reply_to: userEmail } : {}),
          subject: `Tool lead #${leadId} — ${lead.toolSlug}`,
          text: [
            `New tool lead (#${leadId})`,
            `Tool: ${lead.toolSlug}`,
            `Email: ${userEmail ?? "—"}`,
            `Locale: ${lead.locale}`,
            `Source: ${lead.source ?? "tool"}`,
            "",
            "Inputs:",
            JSON.stringify(lead.inputs, null, 2),
            "",
            "Result:",
            JSON.stringify(lead.result ?? {}, null, 2),
          ].join("\n"),
        }),
      });
    } catch (error) {
      console.error("Tool lead notify email failed:", error);
    }
  }

  if (breakdownText && userEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [userEmail],
          subject: isFa
            ? "جزئیات برآورد پروژه — محسن خجسته‌نژاد"
            : "Your project estimate breakdown — Mohsen Khojasteh Nezhad",
          text: breakdownText,
        }),
      });
    } catch (error) {
      console.error("Tool lead user email failed:", error);
    }
  }
}

export function buildEstimatorBreakdownEmail(
  locale: string,
  result: EstimatorResult
): string {
  const isFa = locale === "fa";
  const lines = isFa
    ? [
        "سلام،",
        "",
        "خلاصه برآورد پروژه شما:",
        result.summaryFa,
        "",
        `بازه قیمت: ${result.priceMin.toLocaleString()} – ${result.priceMax.toLocaleString()} ${result.currency}`,
        `زمان: ${result.weeksMin} – ${result.weeksMax} هفته`,
        "",
        `پروژه مشابه: ${result.matchedCaseStudy.name} (${result.matchedCaseStudy.outcomeMetric})`,
        "",
        "جزئیات خط‌به‌خط:",
        ...result.breakdown.map(
          (row) =>
            `• ${row.labelFa}: ${row.min.toLocaleString()} – ${row.max.toLocaleString()} ${result.currency}`
        ),
        "",
        "برای پیشنهاد دقیق‌تر: https://mohsen.info/fa/contact?tab=schedule",
        "",
        "— محسن خجسته‌نژاد",
      ]
    : [
        "Hi,",
        "",
        "Your project estimate summary:",
        result.summaryEn,
        "",
        `Price range: ${result.priceMin.toLocaleString()} – ${result.priceMax.toLocaleString()} ${result.currency}`,
        `Timeline: ${result.weeksMin} – ${result.weeksMax} weeks`,
        "",
        `Similar project: ${result.matchedCaseStudy.name} (${result.matchedCaseStudy.outcomeMetric})`,
        "",
        "Line items:",
        ...result.breakdown.map(
          (row) =>
            `• ${row.labelEn}: ${row.min.toLocaleString()} – ${row.max.toLocaleString()} ${result.currency}`
        ),
        "",
        "Book a discovery call: https://mohsen.info/en/contact?tab=schedule",
        "",
        "— Mohsen Khojasteh Nezhad",
      ];

  return lines.join("\n");
}
