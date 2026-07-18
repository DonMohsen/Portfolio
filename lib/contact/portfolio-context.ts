/**
 * Client-safe chat UI constants only.
 *
 * The actual prompt builders (buildAdvisorSystemPrompt, etc.) live in
 * ./rag-context and pull in case-study/service data + Prisma types — they
 * must stay server-only and are imported directly by the chat API route,
 * not re-exported here, or that whole graph leaks into the browser bundle.
 */
export const SUGGESTED_CHAT_PROMPTS = {
  en: [
    "Can you build a SaaS MVP in 90 days?",
    "What's your Next.js performance audit process?",
    "I need a fractional CTO for my startup — is that a fit?",
  ],
  fa: [
    "آیا می‌توانید SaaS MVP در ۹۰ روز بسازید؟",
    "فرآیند ممیزی performance در Next.js چگونه است؟",
    "به fractional CTO برای استارتاپ نیاز دارم — fit هست؟",
  ],
} as const;

export const CHAT_QUICK_ACTIONS = {
  en: [
    { id: "schedule", label: "Book a call", hrefSuffix: "?tab=schedule&source=ai-advisor" },
    { id: "brief", label: "Send brief", hrefSuffix: "?tab=brief&source=ai-advisor" },
    { id: "estimator", label: "Cost estimator", hrefSuffix: "/tools/project-estimator" },
    { id: "work", label: "Case studies", hrefSuffix: "/work" },
  ],
  fa: [
    { id: "schedule", label: "رزرو تماس", hrefSuffix: "?tab=schedule&source=ai-advisor" },
    { id: "brief", label: "ارسال brief", hrefSuffix: "?tab=brief&source=ai-advisor" },
    { id: "estimator", label: "برآورد هزینه", hrefSuffix: "/tools/project-estimator" },
    { id: "work", label: "case studyها", hrefSuffix: "/work" },
  ],
} as const;

/** Trim case study HTML for optional debug — exported for tests */
export function summarizeCaseStudyProblem(html: string, max = 120): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
