import type { LocalizedText } from "@/lib/services/types";

export type WebsiteTypeId =
  | "marketing"
  | "cms-blog"
  | "ecommerce-lite"
  | "landing";

export type PageCountId = "1-5" | "6-15" | "16-30" | "30plus";

export type WebsiteFeatureId =
  | "cms"
  | "blog"
  | "forms"
  | "i18n"
  | "animations"
  | "ecommerce"
  | "seo";

export type WebsiteTimelineId = "rush" | "normal" | "flexible";

export type WebsiteOption<T extends string> = {
  id: T;
  label: LocalizedText;
};

export const WEBSITE_TYPES: WebsiteOption<WebsiteTypeId>[] = [
  {
    id: "marketing",
    label: { en: "Marketing / corporate site", fa: "سایت شرکتی / معرفی" },
  },
  {
    id: "cms-blog",
    label: { en: "Blog / content + CMS", fa: "بلاگ / محتوا + CMS" },
  },
  {
    id: "ecommerce-lite",
    label: { en: "Small catalog / ecommerce-lite", fa: "فروشگاه کوچک / ecommerce-lite" },
  },
  {
    id: "landing",
    label: { en: "Landing page / campaign", fa: "لندینگ / کمپین" },
  },
];

export const PAGE_COUNTS: WebsiteOption<PageCountId>[] = [
  { id: "1-5", label: { en: "1–5 pages", fa: "۱–۵ صفحه" } },
  { id: "6-15", label: { en: "6–15 pages", fa: "۶–۱۵ صفحه" } },
  { id: "16-30", label: { en: "16–30 pages", fa: "۱۶–۳۰ صفحه" } },
  { id: "30plus", label: { en: "30+ pages", fa: "۳۰+ صفحه" } },
];

export const WEBSITE_FEATURES: WebsiteOption<WebsiteFeatureId>[] = [
  { id: "cms", label: { en: "Headless CMS", fa: "CMS headless" } },
  { id: "blog", label: { en: "Blog / news", fa: "بلاگ / اخبار" } },
  { id: "forms", label: { en: "Forms & CRM hooks", fa: "فرم و اتصال CRM" } },
  { id: "i18n", label: { en: "Multilingual / RTL", fa: "چندزبانه / RTL" } },
  { id: "animations", label: { en: "Motion / interactions", fa: "انیمیشن / تعامل" } },
  { id: "ecommerce", label: { en: "Cart / checkout", fa: "سبد / checkout" } },
  { id: "seo", label: { en: "Advanced SEO setup", fa: "SEO پیشرفته" } },
];

export const WEBSITE_TIMELINES: WebsiteOption<WebsiteTimelineId>[] = [
  { id: "rush", label: { en: "Rush (≤ 4 weeks)", fa: "فوری (حداکثر ۴ هفته)" } },
  { id: "normal", label: { en: "Normal (4–8 weeks)", fa: "معمول (۴–۸ هفته)" } },
  { id: "flexible", label: { en: "Flexible (8+ weeks)", fa: "انعطاف‌پذیر (۸+ هفته)" } },
];

export const WEBSITE_PRICING = {
  currency: "USD",
  baseByType: {
    marketing: { min: 4500, max: 12000, weeksMin: 3, weeksMax: 6 },
    "cms-blog": { min: 6000, max: 16000, weeksMin: 4, weeksMax: 8 },
    "ecommerce-lite": { min: 9000, max: 22000, weeksMin: 6, weeksMax: 10 },
    landing: { min: 2500, max: 7000, weeksMin: 2, weeksMax: 4 },
  } satisfies Record<
    WebsiteTypeId,
    { min: number; max: number; weeksMin: number; weeksMax: number }
  >,
  pageMultipliers: {
    "1-5": 1,
    "6-15": 1.25,
    "16-30": 1.55,
    "30plus": 1.9,
  } satisfies Record<PageCountId, number>,
  featureAddons: {
    cms: { min: 1500, max: 4000 },
    blog: { min: 1000, max: 3000 },
    forms: { min: 800, max: 2000 },
    i18n: { min: 2000, max: 5500 },
    animations: { min: 1200, max: 3500 },
    ecommerce: { min: 3500, max: 9000 },
    seo: { min: 800, max: 2500 },
  } satisfies Record<WebsiteFeatureId, { min: number; max: number }>,
  timelineMultipliers: {
    rush: { price: 1.22, weeks: 0.8 },
    normal: { price: 1, weeks: 1 },
    flexible: { price: 0.95, weeks: 1.1 },
  } satisfies Record<WebsiteTimelineId, { price: number; weeks: number }>,
} as const;

export const WEBSITE_COST_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "What is included in a custom website build?",
      fa: "ساخت سایت اختصاصی شامل چه چیزهایی است؟",
    },
    answer: {
      en: "Design system, responsive Next.js pages, CMS wiring if selected, deployment, and handoff docs — not copywriting or stock photos unless scoped.",
      fa: "design system، صفحات واکنش‌گرا Next.js، اتصال CMS در صورت انتخاب، deploy و مستندات — محتوا و عکس stock مگر در scope نباشد.",
    },
  },
  {
    question: {
      en: "How is this different from the MVP estimator?",
      fa: "تفاوت با برآورد MVP چیست؟",
    },
    answer: {
      en: "This tool scopes marketing/content sites. For SaaS products with auth and billing, use the project estimator.",
      fa: "این ابزار برای سایت معرفی/محتوا است. برای SaaS با auth و billing از برآورد پروژه استفاده کنید.",
    },
  },
];
