import type { InquiryInput } from "./inquiry-schema";

export async function sendInquiryNotificationEmail(
  inquiry: InquiryInput & { id: number }
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ?? "onboarding@resend.dev";

  if (!apiKey || !notifyEmail) {
    return;
  }

  const subject = `New inquiry #${inquiry.id} — ${inquiry.name}`;
  const text = [
    `New contact inquiry (#${inquiry.id})`,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company || "—"}`,
    `Project: ${inquiry.projectType}`,
    `Budget: ${inquiry.budgetRange}`,
    `Timeline: ${inquiry.timeline}`,
    `Locale: ${inquiry.locale}`,
    `Source: ${inquiry.source || "contact-form"}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        reply_to: inquiry.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend notification failed:", await response.text());
    }
  } catch (error) {
    console.error("Failed to send inquiry notification email:", error);
  }
}
