import type { ServiceLadderTier } from "./types";

export const SERVICE_LADDER: ServiceLadderTier[] = [
  {
    tier: 0,
    name: {
      en: "Discovery call",
      fa: "تماس کشف",
    },
    price: {
      en: "Free · 30 minutes",
      fa: "رایگان · ۳۰ دقیقه",
    },
    summary: {
      en: "Fit check, timeline sanity, and whether a fixed-scope sprint makes sense — no sales pressure.",
      fa: "بررسی fit، واقع‌بینی تایم‌لاین و منطق اسپرینت با دامنه مشخص — بدون فشار فروش.",
    },
    cta: {
      slug: "schedule",
      label: {
        en: "Book a call",
        fa: "رزرو تماس",
      },
    },
  },
  {
    tier: 1,
    name: {
      en: "Technical Discovery Sprint",
      fa: "اسپرینت کشف فنی",
    },
    price: {
      en: "From $2K",
      fa: "از ۲٬۰۰۰ دلار",
    },
    summary: {
      en: "One week, fixed scope: architecture doc, risk map, and delivery plan you can share with investors.",
      fa: "یک هفته، دامنه مشخص: سند معماری، نقشه ریسک و برنامه تحویل قابل ارائه به سرمایه‌گذار.",
    },
    cta: {
      slug: "nextjs-audit",
      label: {
        en: "Performance & architecture audit",
        fa: "ممیزی performance و معماری",
      },
    },
  },
  {
    tier: 2,
    name: {
      en: "SaaS MVP in 90 Days",
      fa: "SaaS MVP در ۹۰ روز",
    },
    price: {
      en: "$15K–$50K",
      fa: "۱۵ تا ۵۰ هزار دلار",
    },
    summary: {
      en: "8–12 week build sprint: auth, billing-ready core, staging demos, and handoff docs.",
      fa: "اسپرینت ۸–۱۲ هفته: هسته auth، آماده billing، دمو staging و مستندات تحویل.",
    },
    cta: {
      slug: "saas-mvp",
      label: {
        en: "SaaS MVP details",
        fa: "جزئیات SaaS MVP",
      },
    },
  },
  {
    tier: 3,
    name: {
      en: "Zero-to-Production Product Build",
      fa: "ساخت محصول صفر تا production",
    },
    price: {
      en: "$50K–$200K+",
      fa: "۵۰ تا ۲۰۰+ هزار دلار",
    },
    summary: {
      en: "Full product delivery: multi-squad coordination, production hardening, metrics, and runbooks.",
      fa: "تحویل کامل محصول: هماهنگی چند تیم، سخت‌سازی production، معیارها و runbook.",
    },
    cta: {
      slug: "ai-products",
      label: {
        en: "AI product builds",
        fa: "ساخت محصول AI",
      },
    },
  },
  {
    tier: 4,
    name: {
      en: "Fractional CTO Retainer",
      fa: "Fractional CTO (retainer)",
    },
    price: {
      en: "$8K–$25K / month",
      fa: "۸ تا ۲۵ هزار دلار / ماه",
    },
    summary: {
      en: "Ongoing architecture leadership, hiring support, and investor-ready technical narrative.",
      fa: "رهبری معماری مستمر، پشتیبانی استخدام و روایت فنی آماده سرمایه‌گذار.",
    },
    cta: {
      slug: "fractional-cto",
      label: {
        en: "Fractional CTO for startups",
        fa: "Fractional CTO برای استارتاپ",
      },
    },
  },
  {
    tier: 4,
    name: {
      en: "Product Subscription",
      fa: "اشتراک محصول",
    },
    price: {
      en: "From $5K / month",
      fa: "از ۵٬۰۰۰ دلار / ماه",
    },
    summary: {
      en: "DesignJoy-style capacity: one active request, flat monthly fee, pause or cancel anytime.",
      fa: "ظرفیت DesignJoy-style: یک درخواست فعال، هزینه ماهانه ثابت، pause یا cancel هر زمان.",
    },
    cta: {
      slug: "subscription",
      label: {
        en: "Product subscription",
        fa: "اشتراک محصول",
      },
    },
  },
];
