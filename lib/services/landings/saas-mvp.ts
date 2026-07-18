import type { ServiceLanding } from "../types";

export const saasMvpLanding: ServiceLanding = {
  slug: "saas-mvp",
  tier: 2,
  outcome: {
    en: "Launch a credible SaaS MVP in 90 days — with architecture you can scale, not rewrite.",
    fa: "MVP SaaS قابل اعتماد در ۹۰ روز — با معماری قابل scale، نه بازنویسی.",
  },
  title: {
    en: "SaaS MVP in 90 Days",
    fa: "SaaS MVP در ۹۰ روز",
  },
  metaDescription: {
    en: "Fixed-scope SaaS MVP builds for founders: auth, billing-ready core, weekly demos, and docs you own. From $15K.",
    fa: "ساخت MVP SaaS با دامنه مشخص برای بنیان‌گذاران: auth، هسته آماده billing، دمو هفتگی و مستندات مال شما.",
  },
  icp: {
    en: "Non-technical founders, solo technical founders, and seed-stage teams who need a production MVP — not a prototype that dies at 100 users.",
    fa: "بنیان‌گذاران غیرفنی، بنیان‌گذاران تک‌نفره فنی و تیم‌های seed که MVP production می‌خواهند — نه پروتوتایپی که در ۱۰۰ کاربر می‌میرد.",
  },
  timeline: {
    en: "8–12 weeks after discovery sign-off. Week 1–2: architecture + risk map. Week 3–12: vertical slices with weekly demos.",
    fa: "۸–۱۲ هفته پس از تایید discovery. هفته ۱–۲: معماری + نقشه ریسک. هفته ۳–۱۲: برش‌های عمودی با دمو هفتگی.",
  },
  startingFrom: {
    en: "$15K (scope-dependent)",
    fa: "از ۱۵٬۰۰۰ دلار (وابسته به دامنه)",
  },
  deliverables: {
    en: [
      "Production-ready Next.js app (auth, core flows)",
      "Staging environment + CI/CD",
      "Architecture doc + ADR log",
      "Weekly demo recordings",
      "Handoff runbook",
    ],
    fa: [
      "اپ Next.js production-ready (auth، جریان‌های هسته)",
      "محیط staging + CI/CD",
      "سند معماری + لاگ ADR",
      "ضبط دموهای هفتگی",
      "Runbook تحویل",
    ],
  },
  sections: [
    {
      heading: {
        en: "What you get in 90 days",
        fa: "در ۹۰ روز چه می‌گیرید",
      },
      body: {
        en: "A deployable SaaS core: sign-up, onboarding, your primary value loop, admin basics, and observability hooks. Not every nice-to-have — the smallest surface that proves demand and supports paid pilots. You own the repo, docs, and infrastructure choices.",
        fa: "هسته SaaS قابل deploy: ثبت‌نام، onboarding، حلقه ارزش اصلی، ادمین پایه و قلاب observability. نه هر nice-to-have — کوچک‌ترین سطحی که تقاضا را ثابت کند و پایلوت پولی را پشتیبانی کند. مالک repo، مستندات و انتخاب زیرساخت شما هستید.",
      },
    },
    {
      heading: {
        en: "Why fixed scope beats hourly",
        fa: "چرا دامنه مشخص بهتر از ساعتی است",
      },
      body: {
        en: "Hourly billing rewards slow discovery and vague scope. A fixed MVP sprint forces clarity upfront: milestones, acceptance criteria, and a shared definition of done. You know the ceiling before you commit — and 40%+ of discovery clients continue to a full build.",
        fa: "صورتحساب ساعتی کشف کند و دامنه مبهم را پاداش می‌دهد. اسپرینت MVP با دامنه مشخص از اول شفافیت می‌خواهد: milestone، معیار پذیرش و تعریف مشترک done. قبل از تعهد سقف را می‌دانید — و بیش از ۴۰٪ مشتریان discovery به ساخت کامل ادامه می‌دهند.",
      },
    },
    {
      heading: {
        en: "Stack and architecture defaults",
        fa: "پیش‌فرض‌های استک و معماری",
      },
      body: {
        en: "Next.js App Router, TypeScript, PostgreSQL (Neon/Supabase), Prisma, and deployment on Vercel or your VPS. Monolith-first unless ADRs justify otherwise. Auth via proven providers; billing hooks for Stripe when you are ready — not day-one complexity you do not need.",
        fa: "Next.js App Router، TypeScript، PostgreSQL (Neon/Supabase)، Prisma و deploy روی Vercel یا VPS شما. monolith-first مگر ADR خلافش را توجیه کند. Auth با providerهای اثبات‌شده؛ قلاب billing برای Stripe وقتی آماده‌اید — نه پیچیدگی روز اول غیرضروری.",
      },
    },
    {
      heading: {
        en: "How we de-risk the build",
        fa: "چگونه ریسک ساخت را کم می‌کنیم",
      },
      body: {
        en: "Weekly demos in staging, not localhost. Architecture docs and ADRs you can show investors. Optional discovery sprint ($2K–$5K) before the MVP commit. Clear pause points if priorities shift — you are never locked into a black-box agency cycle.",
        fa: "دمو هفتگی در staging، نه localhost. مستندات معماری و ADR قابل ارائه به سرمایه‌گذار. اسپرینت discovery اختیاری (۲–۵ هزار دلار) قبل از تعهد MVP. نقاط توقف شفاف اگر اولویت عوض شود — هرگز در چرخه آژانس جعبه‌سیاه گیر نمی‌کنید.",
      },
    },
    {
      heading: {
        en: "After launch",
        fa: "بعد از لانچ",
      },
      body: {
        en: "Handoff includes runbooks, env documentation, and a recorded walkthrough for your team. Many clients move to a fractional CTO retainer or product subscription for ongoing capacity — same architecture owner, no context loss.",
        fa: "تحویل شامل runbook، مستندات env و walkthrough ضبط‌شده برای تیم شماست. بسیاری به fractional CTO retainer یا اشتراک محصول برای ظرفیت مستمر می‌روند — همان مالک معماری، بدون از دست دادن context.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Do you sign NDAs and work with existing codebases?",
        answer:
          "Yes. NDAs are standard. I can extend an existing Next.js repo or start greenfield after a short audit. The discovery sprint clarifies which path is cheaper for your timeline.",
      },
      {
        question: "Is $15K enough for a real SaaS?",
        answer:
          "It covers a focused MVP scope — typically one core workflow, auth, and admin basics. Broader multi-tenant or compliance-heavy products land in the $30K–$50K tier after discovery.",
      },
      {
        question: "Who writes the code day to day?",
        answer:
          "I own architecture, ADRs, client communication, and quality review. Trusted specialists execute modules under that blueprint — you get senior judgment without agency overhead.",
      },
      {
        question: "What if we need changes mid-sprint?",
        answer:
          "We use milestone checkpoints. Small tweaks fit in; scope changes get a written change order with timeline impact — no surprise invoices at the end.",
      },
    ],
    fa: [
      {
        question: "NDA و کار روی کد موجود را می‌پذیرید؟",
        answer:
          "بله. NDA استاندارد است. می‌توانم repo Next.js موجود را گسترش دهم یا پس از ممیزی کوتاه greenfield شروع کنم. اسپرینت discovery مسیر ارزان‌تر برای تایم‌لاین شما را روشن می‌کند.",
      },
      {
        question: "آیا ۱۵ هزار دلار برای SaaS واقعی کافی است؟",
        answer:
          "دامنه MVP متمرکز را پوشش می‌دهد — معمولاً یک workflow هسته، auth و ادمین پایه. محصولات multi-tenant گسترده‌تر یا compliance-heavy بعد از discovery در بازه ۳۰–۵۰ هزار دلار قرار می‌گیرند.",
      },
      {
        question: "کد روزانه را چه کسی می‌نویسد؟",
        answer:
          "معماری، ADR، ارتباط با مشتری و بازبینی کیفیت با من است. متخصصان منتخب ماژول‌ها را زیر همان نقشه اجرا می‌کنند — قضاوت senior بدون سربار آژانس.",
      },
      {
        question: "اگر وسط اسپرینت تغییر لازم شود؟",
        answer:
          "از checkpointهای milestone استفاده می‌کنیم. اصلاحات کوچک جا می‌شوند؛ تغییر دامنه با change order مکتوب و اثر روی تایم‌لاین — بدون فاکتور غافلگیرکننده در پایان.",
      },
    ],
  },
};
