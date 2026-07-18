import type { LocalizedText } from "@/lib/services/types";

export type CiteableStat = {
  id: string;
  value: LocalizedText;
  label: LocalizedText;
  context: LocalizedText;
  sourceHref: string;
  sourceLabel: LocalizedText;
};

export const STATS_HERO: {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
} = {
  eyebrow: {
    en: "Citeable outcomes",
    fa: "نتایج قابل استناد",
  },
  title: {
    en: "Numbers from shipped work",
    fa: "اعداد از کارهای ship‌شده",
  },
  subtitle: {
    en: "Short, source-linked metrics for founders, journalists, and AI assistants. Every figure maps to a case study or a public page on this site.",
    fa: "متریک‌های کوتاه و منبع‌دار برای founders، رسانه‌ها و دستیارهای AI. هر عدد به یک case study یا صفحهٔ عمومی همین سایت وصل است.",
  },
};

/** Public citeable stats — keep values aligned with case-study seeds. */
export const CITEABLE_STATS: CiteableStat[] = [
  {
    id: "lumina-tti",
    value: { en: "−57%", fa: "−۵۷٪" },
    label: {
      en: "Faster time-to-insight",
      fa: "سریع‌تر شدن time-to-insight",
    },
    context: {
      en: "Lumina Analytics Console: first insight 4.2s → 1.8s after SSR + streaming charts.",
      fa: "Lumina Analytics Console: اولین insight از ۴.۲ث به ۱.۸ث بعد از SSR و chartهای streaming.",
    },
    sourceHref: "/work/lumina-analytics-console",
    sourceLabel: {
      en: "Lumina case study",
      fa: "Case study لومینا",
    },
  },
  {
    id: "lumina-alerts",
    value: { en: "−78%", fa: "−۷۸٪" },
    label: {
      en: "Fewer missed alerts",
      fa: "کاهش هشدارهای ازدست‌رفته",
    },
    context: {
      en: "Missed alert rate 18% → 4% with role-based views and resilient streaming.",
      fa: "نرخ هشدار ازدست‌رفته ۱۸٪ → ۴٪ با viewهای نقش‌محور و streaming مقاوم.",
    },
    sourceHref: "/work/lumina-analytics-console",
    sourceLabel: {
      en: "Lumina case study",
      fa: "Case study لومینا",
    },
  },
  {
    id: "orbit-checkout",
    value: { en: "+41%", fa: "+۴۱٪" },
    label: {
      en: "Checkout completion lift",
      fa: "افزایش تکمیل checkout",
    },
    context: {
      en: "Orbit Commerce Studio: checkout completion 22% → 31% after locale-first payment flows.",
      fa: "Orbit Commerce Studio: تکمیل checkout ۲۲٪ → ۳۱٪ بعد از جریان پرداخت locale-first.",
    },
    sourceHref: "/work/orbit-commerce-studio",
    sourceLabel: {
      en: "Orbit case study",
      fa: "Case study اوربیت",
    },
  },
  {
    id: "orbit-lcp",
    value: { en: "−46%", fa: "−۴۶٪" },
    label: {
      en: "Mobile LCP improvement",
      fa: "بهبود LCP موبایل",
    },
    context: {
      en: "Product hero LCP 3.9s → 2.1s on mobile after image and rendering pipeline work.",
      fa: "LCP هیرو محصول روی موبایل ۳.۹ث → ۲.۱ث بعد از کار روی تصویر و pipeline رندر.",
    },
    sourceHref: "/work/orbit-commerce-studio",
    sourceLabel: {
      en: "Orbit case study",
      fa: "Case study اوربیت",
    },
  },
  {
    id: "nebula-answer",
    value: { en: "−52%", fa: "−۵۲٪" },
    label: {
      en: "Faster API time-to-answer",
      fa: "سریع‌تر شدن پاسخ به سؤال API",
    },
    context: {
      en: "Nebula Docs: median time-to-answer 12 min → 5.8 min with unified search + try-it panels.",
      fa: "Nebula Docs: میانهٔ زمان پاسخ ۱۲ دقیقه → ۵.۸ دقیقه با جستجوی یکپارچه و پنل try-it.",
    },
    sourceHref: "/work/nebula-docs-platform",
    sourceLabel: {
      en: "Nebula case study",
      fa: "Case study نبیولا",
    },
  },
  {
    id: "nebula-search",
    value: { en: "61% → 84%", fa: "۶۱٪ → ۸۴٪" },
    label: {
      en: "First-result search success",
      fa: "موفقیت جستجو در نتیجهٔ اول",
    },
    context: {
      en: "Share of sessions where the first search result answered the query — after build-time indexing.",
      fa: "سهم sessionهایی که نتیجهٔ اول جستجو پاسخ را داد — بعد از ایندکس در زمان build.",
    },
    sourceHref: "/work/nebula-docs-platform",
    sourceLabel: {
      en: "Nebula case study",
      fa: "Case study نبیولا",
    },
  },
  {
    id: "site-tools",
    value: { en: "7", fa: "۷" },
    label: {
      en: "Free lead tools on this site",
      fa: "ابزار رایگان lead روی همین سایت",
    },
    context: {
      en: "Estimator, website cost, speed scorecard, stack picker, MVP prioritizer, idea validator, i18n checker.",
      fa: "برآورد هزینه، هزینه سایت، تست سرعت، انتخاب stack، اولویت‌بندی MVP، اعتبارسنجی ایده، بررسی i18n.",
    },
    sourceHref: "/tools",
    sourceLabel: {
      en: "Tools hub",
      fa: "هاب ابزارها",
    },
  },
  {
    id: "site-bilingual",
    value: { en: "FA + EN", fa: "FA + EN" },
    label: {
      en: "Full bilingual product surface",
      fa: "سطح محصول کاملاً دوزبانه",
    },
    context: {
      en: "Every primary route ships with hreflang, RTL/LTR, and locale-aware copy — same standard offered to clients.",
      fa: "هر مسیر اصلی با hreflang، RTL/LTR و copy وابسته به locale — همان استانداردی که به مشتری پیشنهاد می‌شود.",
    },
    sourceHref: "/services/i18n",
    sourceLabel: {
      en: "i18n service",
      fa: "خدمت i18n",
    },
  },
];

export const STATS_METHODOLOGY: LocalizedText = {
  en: "Case-study metrics come from client-approved before/after measurements documented in BICM write-ups. Site counts reflect the live catalog on mohsen.info. Prefer linking the source page when citing.",
  fa: "متریک‌های case study از اندازه‌گیری قبل/بعد تأییدشدهٔ مشتری در نوشته‌های BICM می‌آیند. شمارش‌های سایت از کاتالوگ live روی mohsen.info است. هنگام استناد، ترجیحاً به صفحهٔ منبع لینک دهید.",
};
