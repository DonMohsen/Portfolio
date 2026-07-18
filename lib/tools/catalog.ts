import type { LocalizedText } from "@/lib/services/types";

export type ToolSlug =
  | "project-estimator"
  | "website-cost-calculator"
  | "saas-idea-validator"
  | "tech-stack-picker"
  | "speed-scorecard"
  | "mvp-prioritizer"
  | "i18n-checker";

export type ToolCatalogEntry = {
  slug: ToolSlug;
  live: boolean;
  title: LocalizedText;
  description: LocalizedText;
  keyword: LocalizedText;
  leadMechanic: LocalizedText;
};

export const TOOL_CATALOG: ToolCatalogEntry[] = [
  {
    slug: "project-estimator",
    live: true,
    title: {
      en: "Project Estimator",
      fa: "برآورد هزینه پروژه",
    },
    description: {
      en: "3-step wizard for MVP / SaaS build cost and timeline — with a matched case study.",
      fa: "ویزارد ۳ مرحله‌ای برای برآورد هزینه و زمان ساخت MVP یا SaaS — همراه case study مشابه.",
    },
    keyword: {
      en: "mvp cost calculator",
      fa: "هزینه ساخت اپلیکیشن",
    },
    leadMechanic: {
      en: "Email → full breakdown",
      fa: "ایمیل → جزئیات کامل",
    },
  },
  {
    slug: "website-cost-calculator",
    live: true,
    title: {
      en: "Website Cost Calculator",
      fa: "محاسبه هزینه طراحی سایت",
    },
    description: {
      en: "Scope a custom marketing or content site with page count, CMS, and integrations.",
      fa: "برآورد سایت اختصاصی با تعداد صفحه، CMS و یکپارچه‌سازی‌ها.",
    },
    keyword: {
      en: "website development cost",
      fa: "هزینه طراحی سایت اختصاصی",
    },
    leadMechanic: {
      en: "Email → PDF",
      fa: "ایمیل → PDF",
    },
  },
  {
    slug: "speed-scorecard",
    live: true,
    title: {
      en: "Speed Scorecard",
      fa: "تست سرعت سایت",
    },
    description: {
      en: "Paste a URL for Core Web Vitals signals and fix recommendations.",
      fa: "آدرس سایت را وارد کنید — سیگنال‌های CWV و پیشنهاد بهبود.",
    },
    keyword: {
      en: "website speed test",
      fa: "تست سرعت سایت",
    },
    leadMechanic: {
      en: "URL → audit offer",
      fa: "URL → پیشنهاد ممیزی",
    },
  },
  {
    slug: "saas-idea-validator",
    live: true,
    title: {
      en: "SaaS Idea Validator",
      fa: "اعتبارسنجی ایده استارتاپ",
    },
    description: {
      en: "AI-grounded feedback on fit, risks, and MVP scope for your SaaS idea.",
      fa: "بازخورد مبتنی بر داده درباره fit، ریسک و scope MVP ایده SaaS شما.",
    },
    keyword: {
      en: "is my saas idea good",
      fa: "ایده استارتاپم خوبه؟",
    },
    leadMechanic: {
      en: "AI feedback + CTA",
      fa: "بازخورد AI + تماس",
    },
  },
  {
    slug: "tech-stack-picker",
    live: true,
    title: {
      en: "Tech Stack Picker",
      fa: "انتخاب تکنولوژی",
    },
    description: {
      en: "Answer a few questions — get a recommended stack with trade-offs.",
      fa: "چند سؤال پاسخ دهید — stack پیشنهادی با trade-offها.",
    },
    keyword: {
      en: "best tech stack for my app",
      fa: "بهترین تکنولوژی برای اپ",
    },
    leadMechanic: {
      en: "Result → build CTA",
      fa: "نتیجه → «من می‌سازم»",
    },
  },
  {
    slug: "mvp-prioritizer",
    live: true,
    title: {
      en: "MVP Prioritizer",
      fa: "اولویت‌بندی فیچر MVP",
    },
    description: {
      en: "MoSCoW-style prioritization export for your feature backlog.",
      fa: "اولویت‌بندی MoSCoW برای backlog فیچرها.",
    },
    keyword: {
      en: "mvp feature prioritization",
      fa: "اولویت‌بندی فیچر MVP",
    },
    leadMechanic: {
      en: "Export + call",
      fa: "خروجی + تماس",
    },
  },
  {
    slug: "i18n-checker",
    live: true,
    title: {
      en: "i18n & hreflang Checker",
      fa: "بررسی i18n و hreflang",
    },
    description: {
      en: "Quick RTL, locale, and hreflang sanity check for multilingual sites.",
      fa: "بررسی سریع RTL، locale و hreflang برای سایت چندزبانه.",
    },
    keyword: {
      en: "rtl hreflang checker",
      fa: "بررسی hreflang",
    },
    leadMechanic: {
      en: "Report + audit offer",
      fa: "گزارش + پیشنهاد ممیزی",
    },
  },
];

export const TOOL_SLUGS = TOOL_CATALOG.map((tool) => tool.slug);
export const LIVE_TOOL_SLUGS = TOOL_CATALOG.filter((tool) => tool.live).map(
  (tool) => tool.slug
);

export function getToolEntry(slug: string): ToolCatalogEntry | undefined {
  return TOOL_CATALOG.find((tool) => tool.slug === slug);
}
