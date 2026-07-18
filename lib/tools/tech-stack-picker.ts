import type { LocalizedText } from "@/lib/services/types";

export type ProductTypeId =
  | "saas"
  | "marketing"
  | "mobile"
  | "internal";

export type TeamSizeId = "solo" | "small" | "growing";

export type PriorityId = "speed" | "scale" | "seo" | "cost";

export type StackPickerInput = {
  productType: ProductTypeId;
  teamSize: TeamSizeId;
  priority: PriorityId;
};

export type StackRecommendation = {
  stack: string[];
  rationale: LocalizedText;
  tradeoffs: LocalizedText;
  serviceSlug: string;
};

export const STACK_PRODUCT_TYPES: Array<{
  id: ProductTypeId;
  label: LocalizedText;
}> = [
  { id: "saas", label: { en: "SaaS / web app", fa: "SaaS / وب‌اپ" } },
  { id: "marketing", label: { en: "Marketing site", fa: "سایت معرفی" } },
  { id: "mobile", label: { en: "Mobile-first product", fa: "محصول موبایل‌محور" } },
  { id: "internal", label: { en: "Internal tool", fa: "ابزار داخلی" } },
];

export const STACK_TEAM_SIZES: Array<{ id: TeamSizeId; label: LocalizedText }> = [
  { id: "solo", label: { en: "Solo / 1–2 people", fa: "تک‌نفره / ۱–۲ نفر" } },
  { id: "small", label: { en: "Small team (3–8)", fa: "تیم کوچک (۳–۸)" } },
  { id: "growing", label: { en: "Growing (8+)", fa: "در حال رشد (۸+)" } },
];

export const STACK_PRIORITIES: Array<{ id: PriorityId; label: LocalizedText }> = [
  { id: "speed", label: { en: "Speed to market", fa: "سرعت ورود به بازار" } },
  { id: "scale", label: { en: "Scale & performance", fa: "مقیاس و performance" } },
  { id: "seo", label: { en: "SEO & content", fa: "SEO و محتوا" } },
  { id: "cost", label: { en: "Lower run cost", fa: "هزینه عملیاتی کمتر" } },
];

export function recommendStack(input: StackPickerInput): StackRecommendation {
  const { productType, teamSize, priority } = input;

  if (productType === "marketing" || priority === "seo") {
    return {
      stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "MDX / headless CMS"],
      rationale: {
        en: "Static + ISR pages with excellent SEO, fast builds, and a content workflow your team can own.",
        fa: "صفحات static + ISR با SEO قوی، build سریع و workflow محتوا که تیم شما مالک آن باشد.",
      },
      tradeoffs: {
        en: "Less ideal for heavy realtime dashboards — pair with a separate API if needed later.",
        fa: "برای داشبورد realtime سنگین کمتر ایده‌آل — در صورت نیاز API جدا اضافه کنید.",
      },
      serviceSlug: "saas-mvp",
    };
  }

  if (productType === "internal" || priority === "cost") {
    return {
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "tRPC or REST"],
      rationale: {
        en: "Monolith-friendly stack with typed data layer — fast to ship internal tools without microservice overhead.",
        fa: "استک مناسب monolith با لایه داده typed — سریع برای ابزار داخلی بدون سربار microservice.",
      },
      tradeoffs: {
        en: "May need extraction to services if multi-team scale exceeds ~20 engineers.",
        fa: "در مقیاس چند تیم (+۲۰ مهندس) ممکن است نیاز به جداسازی سرویس باشد.",
      },
      serviceSlug: "automation",
    };
  }

  if (priority === "scale" || teamSize === "growing") {
    return {
      stack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Prisma",
        "Vercel / container deploy",
      ],
      rationale: {
        en: "Proven production stack with clear upgrade paths: caching, edge, observability, and modular domains.",
        fa: "استک production اثبات‌شده با مسیر ارتقا: کش، edge، observability و domainهای ماژولار.",
      },
      tradeoffs: {
        en: "Higher initial setup than a no-code MVP — pays off past ~1k active users.",
        fa: "راه‌اندازی اولیه بیشتر از no-code — از ~۱۰۰۰ کاربر فعال ارزشمند می‌شود.",
      },
      serviceSlug: "saas-mvp",
    };
  }

  if (productType === "mobile") {
    return {
      stack: ["Next.js PWA", "TypeScript", "React Native (phase 2)", "Expo"],
      rationale: {
        en: "Ship a mobile-quality PWA first, then add native shell when store presence is validated.",
        fa: "ابتدا PWA با کیفیت موبایل، سپس shell native وقتی حضور در استور validate شد.",
      },
      tradeoffs: {
        en: "Native-only features (background sync) may wait until phase 2.",
        fa: "فیچرهای purely native ممکن است تا فاز ۲ صبر کنند.",
      },
      serviceSlug: "saas-mvp",
    };
  }

  return {
    stack: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Stripe-ready auth"],
    rationale: {
      en: "Default SaaS MVP stack — auth, billing hooks, and weekly vertical slices with demos.",
      fa: "استک پیش‌فرض MVP SaaS — auth، هوک billing و برش‌های عمودی هفتگی با دمو.",
    },
    tradeoffs: {
      en: "Not every feature belongs in v1 — use the MVP prioritizer to trim scope.",
      fa: "همه فیچرها در v1 نیستند — از اولویت‌بندی MVP برای trim scope استفاده کنید.",
    },
    serviceSlug: "saas-mvp",
  };
}

export const TECH_STACK_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "Is this the only stack you recommend?",
      fa: "فقط همین stack را پیشنهاد می‌دهید؟",
    },
    answer: {
      en: "No — discovery narrows choices. This tool reflects common fit patterns for founders I work with.",
      fa: "خیر — discovery انتخاب را دقیق می‌کند. این ابزار الگوهای fit رایج برای بنیان‌گذارانی است که با آن‌ها کار می‌کنم.",
    },
  },
];
