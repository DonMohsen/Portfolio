import type { LocalizedText } from "@/lib/services/types";

export type ProjectTypeId =
  | "saas"
  | "marketplace"
  | "ai"
  | "automation"
  | "mobile"
  | "other";

export type FeatureId =
  | "auth"
  | "billing"
  | "dashboard"
  | "realtime"
  | "ai"
  | "admin"
  | "i18n"
  | "mobile";

export type TimelineId = "rush" | "normal" | "flexible";

export type EstimatorOption<T extends string> = {
  id: T;
  label: LocalizedText;
};

export const ESTIMATOR_PROJECT_TYPES: EstimatorOption<ProjectTypeId>[] = [
  {
    id: "saas",
    label: { en: "SaaS product", fa: "محصول SaaS" },
  },
  {
    id: "marketplace",
    label: { en: "Marketplace", fa: "مارکت‌پلیس" },
  },
  {
    id: "ai",
    label: { en: "AI product", fa: "محصول AI" },
  },
  {
    id: "automation",
    label: { en: "Automation / internal tools", fa: "اتوماسیون / ابزار داخلی" },
  },
  {
    id: "mobile",
    label: { en: "Mobile-first app", fa: "اپ موبایل‌محور" },
  },
  {
    id: "other",
    label: { en: "Other / hybrid", fa: "سایر / ترکیبی" },
  },
];

export const ESTIMATOR_FEATURES: EstimatorOption<FeatureId>[] = [
  { id: "auth", label: { en: "Auth & roles", fa: "احراز هویت و نقش‌ها" } },
  { id: "billing", label: { en: "Billing / subscriptions", fa: "صورتحساب / اشتراک" } },
  { id: "dashboard", label: { en: "Analytics dashboard", fa: "داشبورد تحلیلی" } },
  { id: "realtime", label: { en: "Realtime / websockets", fa: "بلادرنگ / websocket" } },
  { id: "ai", label: { en: "AI / LLM features", fa: "فیچر AI / LLM" } },
  { id: "admin", label: { en: "Admin panel", fa: "پنل ادمین" } },
  { id: "i18n", label: { en: "i18n / RTL", fa: "چندزبانه / RTL" } },
  { id: "mobile", label: { en: "Mobile app layer", fa: "لایه اپ موبایل" } },
];

export const ESTIMATOR_TIMELINES: EstimatorOption<TimelineId>[] = [
  {
    id: "rush",
    label: { en: "Rush (≤ 8 weeks)", fa: "فوری (حداکثر ۸ هفته)" },
  },
  {
    id: "normal",
    label: { en: "Normal (8–14 weeks)", fa: "معمول (۸–۱۴ هفته)" },
  },
  {
    id: "flexible",
    label: { en: "Flexible (14+ weeks)", fa: "انعطاف‌پذیر (۱۴+ هفته)" },
  },
];

/** Tunable pricing — edit ranges without redeploying UI logic. */
export const ESTIMATOR_PRICING = {
  currency: "USD",
  baseByType: {
    saas: { min: 22000, max: 52000, weeksMin: 8, weeksMax: 14 },
    marketplace: { min: 28000, max: 65000, weeksMin: 10, weeksMax: 16 },
    ai: { min: 30000, max: 72000, weeksMin: 10, weeksMax: 18 },
    automation: { min: 18000, max: 45000, weeksMin: 6, weeksMax: 12 },
    mobile: { min: 26000, max: 58000, weeksMin: 10, weeksMax: 16 },
    other: { min: 20000, max: 48000, weeksMin: 8, weeksMax: 14 },
  } satisfies Record<
    ProjectTypeId,
    { min: number; max: number; weeksMin: number; weeksMax: number }
  >,
  featureAddons: {
    auth: { min: 2500, max: 6000 },
    billing: { min: 4000, max: 9000 },
    dashboard: { min: 3500, max: 8000 },
    realtime: { min: 4500, max: 10000 },
    ai: { min: 6000, max: 18000 },
    admin: { min: 3000, max: 7000 },
    i18n: { min: 3500, max: 9000 },
    mobile: { min: 8000, max: 20000 },
  } satisfies Record<FeatureId, { min: number; max: number }>,
  timelineMultipliers: {
    rush: { price: 1.28, weeks: 0.75 },
    normal: { price: 1, weeks: 1 },
    flexible: { price: 0.92, weeks: 1.15 },
  } satisfies Record<TimelineId, { price: number; weeks: number }>,
} as const;

export const ESTIMATOR_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "How accurate is this MVP cost calculator?",
      fa: "این ماشین‌حساب هزینه MVP چقدر دقیق است؟",
    },
    answer: {
      en: "It returns a realistic range based on project type, feature set, and timeline — not a fixed quote. Discovery call narrows scope to a firm proposal.",
      fa: "بازه‌ای واقع‌بینانه بر اساس نوع پروژه، فیچرها و زمان‌بندی می‌دهد — نه قیمت قطعی. تماس کشف scope را به پیشنهاد دقیق تبدیل می‌کند.",
    },
  },
  {
    question: {
      en: "What is included in the estimate?",
      fa: "چه چیزهایی در برآورد لحاظ می‌شود؟",
    },
    answer: {
      en: "Product engineering: architecture, Next.js app, API/data layer, core UX, deployment, and one production launch cycle. Content, ads, and ongoing support are separate.",
      fa: "مهندسی محصول: معماری، اپ Next.js، لایه API/داده، UX هسته، deploy و یک چرخه لانچ. محتوا، تبلیغات و پشتیبانی جداگانه است.",
    },
  },
  {
    question: {
      en: "Can I get a detailed breakdown?",
      fa: "می‌توانم جزئیات کامل بگیرم؟",
    },
    answer: {
      en: "Yes — enter your email after the estimate to unlock the full line-item breakdown and optional PDF-style summary by email.",
      fa: "بله — بعد از برآورد ایمیل بزنید تا جزئیات خط‌به‌خط و خلاصه PDF-style (در صورت فعال بودن ایمیل) را بگیرید.",
    },
  },
];
