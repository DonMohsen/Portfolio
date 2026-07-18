import type { ServiceLanding } from "../types";

export const subscriptionLanding: ServiceLanding = {
  slug: "subscription",
  tier: 4,
  outcome: {
    en: "Ongoing product engineering capacity — one active request at a time, flat monthly fee, pause anytime.",
    fa: "ظرفیت مستمر مهندسی محصول — یک درخواست فعال در لحظه، هزینه ماهانه ثابت، pause هر زمان.",
  },
  title: {
    en: "Product Subscription",
    fa: "اشتراک محصول",
  },
  metaDescription: {
    en: "DesignJoy-style product subscription from $5K/month. One active development request, flat fee, pause or cancel anytime. Continuous shipping without hiring.",
    fa: "اشتراک محصول DesignJoy-style از ۵ هزار دلار/ماه. یک درخواست توسعه فعال، هزینه ثابت، pause یا cancel هر زمان.",
  },
  icp: {
    en: "Funded startups and product teams that need steady design+engineering output — feature polish, integrations, landing pages — without scope negotiations every sprint.",
    fa: "استارتاپ‌های funded و تیم محصول که خروجی design+engineering پایدار می‌خواهند — polish قابلیت، یکپارچه‌سازی، landing — بدون چانه‌زنی دامنه هر اسپرینت.",
  },
  timeline: {
    en: "Month-to-month after onboarding. One active request in progress; queue additional requests. Typical turnaround: 2–5 business days per small request.",
    fa: "ماه‌به‌ماه پس از onboarding. یک درخواست فعال در جریان؛ بقیه در صف. turnaround معمول: ۲–۵ روز کاری هر درخواست کوچک.",
  },
  startingFrom: {
    en: "From $5K / month",
    fa: "از ۵٬۰۰۰ دلار / ماه",
  },
  deliverables: {
    en: [
      "One active request at a time",
      "Async updates (Loom + written notes)",
      "Staging previews per request",
      "Pause or cancel anytime",
      "Same architecture owner as project builds",
      "Priority queue for retainer clients",
    ],
    fa: [
      "یک درخواست فعال در لحظه",
      "به‌روزرسانی async (Loom + یادداشت مکتوب)",
      "پیش‌نمایش staging per request",
      "Pause یا cancel هر زمان",
      "همان مالک معماری ساخت پروژه",
      "صف اولویت برای مشتریان retainer",
    ],
  },
  sections: [
    {
      heading: {
        en: "How the subscription model works",
        fa: "مدل اشتراک چگونه کار می‌کند",
      },
      body: {
        en: "Inspired by DesignJoy: you pay a flat monthly fee and submit requests to a shared board. One request is active; others wait in queue. No timesheets, no SOW per button color — just continuous shipping with clear WIP limits so quality stays high.",
        fa: "الهام از DesignJoy: هزینه ماهانه ثابت می‌پردازید و درخواست به بورد مشترک می‌دهید. یک درخواست فعال است؛ بقیه در صف. بدون timesheet، بدون SOW برای رنگ دکمه — فقط ship مستمر با حد WIP شفاف تا کیفیت بالا بماند.",
      },
    },
    {
      heading: {
        en: "What fits in a request",
        fa: "چه چیزی در یک درخواست جا می‌شود",
      },
      body: {
        en: "Landing page, dashboard widget, API integration, performance fix, CMS tweak, or mobile-responsive pass — sized to complete in roughly one week of focused work. Epics that need discovery still go through a sprint quote; the subscription covers execution once direction is clear.",
        fa: "Landing page، ویجت داشبورد، یکپارچه‌سازی API، اصلاح performance، tweak CMS یا pass responsive موبایل — اندازه‌ای برای تکمیل در حدود یک هفته کار متمرکز. epicهایی که discovery می‌خواهند هنوز از quote اسپرینت می‌گذرند؛ اشتراک اجرا را وقتی جهت روشن است پوشش می‌دهد.",
      },
    },
    {
      heading: {
        en: "Pause, cancel, and fairness",
        fa: "Pause، cancel و انصاف",
      },
      body: {
        en: "Pause anytime — billing stops, queue freezes. Cancel with 14 days notice. No lock-in contracts. If you pause mid-request, we checkpoint to staging and document state so restart is cheap. MRR should feel predictable for you and sustainable for delivery.",
        fa: "هر زمان pause — billing متوقف، صف freeze. cancel با ۱۴ روز اخطار. بدون قرارداد lock-in. اگر وسط درخواست pause کنید، به staging checkpoint و state مستند می‌شود تا restart ارزان باشد. MRR برای شما قابل پیش‌بینی و برای تحویل پایدار باشد.",
      },
    },
    {
      heading: {
        en: "Subscription vs project sprint",
        fa: "اشتراک در برابر اسپرینت پروژه",
      },
      body: {
        en: "Use a sprint for zero-to-one MVP or major architecture. Use subscription for steady iteration after launch — the same person who wrote your ADRs reviews subscription work, so context does not reset every month.",
        fa: "اسپرینت را برای MVP صفر-to-one یا معماری بزرگ استفاده کنید. اشتراک را برای iteration پایدار بعد از لانچ — همان کسی که ADR نوشت کار اشتراک را بازبینی می‌کند، پس context هر ماه reset نمی‌شود.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Is there a limit on requests per month?",
        answer:
          "Fair use applies: typically 1–2 substantial requests per month at the $5K tier, more at higher tiers. Unlimited tiny tasks encourage queue abuse — we scope during onboarding.",
      },
      {
        question: "What stack?",
        answer:
          "Next.js, TypeScript, React Native for mobile-adjacent work. Requests outside stack get an honest no or a referred partner.",
      },
      {
        question: "Can I combine with fractional CTO?",
        answer:
          "Yes. Many clients run CTO retainer for strategy and subscription for execution bandwidth — bundled pricing available after discovery.",
      },
    ],
    fa: [
      {
        question: "محدودیت درخواست در ماه دارید؟",
        answer:
          "استفاده منصفانه: معمولاً ۱–۲ درخواست substantive در ماه در tier ۵ هزار دلار، بیشتر در tier بالاتر. task بی‌نهایت ریز سوءاستفاده صف را تشویق می‌کند — در onboarding scope می‌کنیم.",
      },
      {
        question: "چه استکی؟",
        answer:
          "Next.js، TypeScript، React Native برای کار مجاور موبایل. درخواست خارج استک خیر صادقانه یا معرفی شریک.",
      },
      {
        question: "با fractional CTO ترکیب می‌شود؟",
        answer:
          "بله. بسیاری CTO retainer برای استراتژی و اشتراک برای bandwidth اجرا اجرا می‌کنند — قیمت bundle بعد از discovery موجود است.",
      },
    ],
  },
};
