import type { ServiceLanding } from "../types";

export const nextjsAuditLanding: ServiceLanding = {
  slug: "nextjs-audit",
  tier: 1,
  outcome: {
    en: "Know exactly why your Next.js app is slow — and what to fix first for the biggest LCP win.",
    fa: "دقیقاً بدانید چرا اپ Next.js شما کند است — و اول چه چیزی را برای بزرگ‌ترین برد LCP درست کنید.",
  },
  title: {
    en: "Next.js Performance & Architecture Audit",
    fa: "ممیزی Performance و معماری Next.js",
  },
  metaDescription: {
    en: "Fixed-scope Next.js audit: Core Web Vitals, bundle analysis, architecture review, and prioritized fix roadmap. From $2K.",
    fa: "ممیزی Next.js با دامنه مشخص: Core Web Vitals، تحلیل bundle، بازبینی معماری و نقشه راه اصلاح اولویت‌دار.",
  },
  icp: {
    en: "Teams with a live Next.js product where SEO, conversion, or investor demos suffer from performance — and internal devs lack time for a structured audit.",
    fa: "تیم‌هایی با محصول Next.js زنده که SEO، conversion یا دمو سرمایه‌گذار از performance آسیب می‌بیند — و dev داخلی وقت ممیزی ساختاریافته ندارد.",
  },
  timeline: {
    en: "5–7 business days from repo + staging access. Deliverable PDF + optional 60-min readout call.",
    fa: "۵–۷ روز کاری از دسترسی repo + staging. PDF تحویلی + تماس readout ۶۰ دقیقه‌ای اختیاری.",
  },
  startingFrom: {
    en: "$2K–$5K",
    fa: "۲ تا ۵ هزار دلار",
  },
  deliverables: {
    en: [
      "Core Web Vitals report (lab + field where available)",
      "Bundle & dependency analysis",
      "Architecture & data-fetching review",
      "Prioritized fix roadmap (impact vs effort)",
      "Optional implementation estimate for top items",
    ],
    fa: [
      "گزارش Core Web Vitals (lab + field در صورت وجود)",
      "تحلیل bundle و وابستگی‌ها",
      "بازبینی معماری و data-fetching",
      "نقشه راه اصلاح اولویت‌دار (اثر در برابر effort)",
      "برآورد پیاده‌سازی اختیاری برای موارد برتر",
    ],
  },
  sections: [
    {
      heading: {
        en: "What the audit covers",
        fa: "ممیزی چه چیزهایی را پوشش می‌دهد",
      },
      body: {
        en: "LCP, INP, and CLS with real URLs — not generic Lighthouse scores on the homepage only. Server vs client component boundaries, caching, image pipelines, font loading, and third-party scripts. I document findings with reproduction steps so your team can verify fixes.",
        fa: "LCP، INP و CLS با URL واقعی — نه فقط امتیاز Lighthouse عمومی روی homepage. مرز server/client component، caching، pipeline تصویر، font و اسکریپت third-party. یافته‌ها با گام بازتولید مستند می‌شوند تا تیم شما اصلاحات را تأیید کند.",
      },
    },
    {
      heading: {
        en: "Architecture review, not just PageSpeed",
        fa: "بازبینی معماری، نه فقط PageSpeed",
      },
      body: {
        en: "Slow pages often trace to data architecture: N+1 queries, over-fetching on the server, missing ISR boundaries, or auth checks on every request. The audit separates cosmetic tweaks from structural fixes — so you do not spend a sprint on image compression when the database is the bottleneck.",
        fa: "صفحات کند اغلب به معماری داده برمی‌گردند: N+1، over-fetch سرور، مرز ISR گم‌شده یا auth روی هر request. ممیزی اصلاحات ظاهری را از ساختاری جدا می‌کند — تا اسپرینت روی فشرده‌سازی تصویر نگذارید وقتی bottleneck دیتابیس است.",
      },
    },
    {
      heading: {
        en: "Deliverable format",
        fa: "قالب تحویل",
      },
      body: {
        en: "A written PDF (or Notion doc) with executive summary, ranked issues, code-level references where helpful, and a 30/60/90-day fix plan. Severity tags: critical (revenue/SEO risk), high, medium. You keep the document — no recurring tool subscription required.",
        fa: "PDF مکتوب (یا Notion) با خلاصه اجرایی، مسائل رتبه‌بندی‌شده، ارجاع سطح کد در صورت نیاز و برنامه اصلاح ۳۰/۶۰/۹۰ روزه. برچسب شدت: بحرانی (ریسک revenue/SEO)، بالا، متوسط. سند مال شماست — بدون اشتراک ابزار اجباری.",
      },
    },
    {
      heading: {
        en: "What happens after the audit",
        fa: "بعد از ممیزی چه می‌شود",
      },
      body: {
        en: "About 40% of audit clients continue to a fixed-scope implementation sprint. Others hand the roadmap to internal devs — the audit is useful either way. No hard sell; the readout call is Q&A, not a pitch deck.",
        fa: "حدود ۴۰٪ مشتریان ممیزی به اسپرینت پیاده‌سازی با دامنه مشخص ادامه می‌دهند. بقیه نقشه راه را به dev داخلی می‌دهند — ممیزی در هر دو حالت مفید است. فروش سخت نیست؛ تماس readout پرسش‌وپاسخ است، نه pitch deck.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Do you need production access?",
        answer:
          "Staging plus read-only repo access is enough for most audits. Production analytics (Vercel Speed Insights, GSC) helps but is optional.",
      },
      {
        question: "Can you implement the fixes?",
        answer:
          "Yes — as a separate fixed-scope sprint quoted from the roadmap. The audit stays independent so you can choose internal implementation.",
      },
      {
        question: "App Router and Pages Router?",
        answer:
          "Both. App Router audits include RSC boundaries, streaming, and cache directives. Pages Router focuses on getServerSideProps patterns and legacy bundle splits.",
      },
    ],
    fa: [
      {
        question: "به production access نیاز دارید؟",
        answer:
          "staging به‌علاوه دسترسی read-only به repo برای بیشتر ممیزی‌ها کافی است. analytics production (Vercel Speed Insights، GSC) کمک می‌کند اما اختیاری است.",
      },
      {
        question: "می‌توانید اصلاحات را پیاده کنید؟",
        answer:
          "بله — به‌عنوان اسپرینت جدا با دامنه مشخص از روی نقشه راه. ممیزی مستقل می‌ماند تا پیاده‌سازی داخلی را انتخاب کنید.",
      },
      {
        question: "App Router و Pages Router؟",
        answer:
          "هر دو. ممیزی App Router شامل مرز RSC، streaming و دستور cache است. Pages Router روی الگوهای getServerSideProps و split bundle قدیمی تمرکز دارد.",
      },
    ],
  },
};
