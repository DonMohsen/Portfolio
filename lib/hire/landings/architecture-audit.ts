import type { HireCapturePage } from "../types";

/** Outbound / Phase 6 CTA — Free Architecture Audit (Discovery Sprint lite). */
export const architectureAuditHire: HireCapturePage = {
  slug: "architecture-audit",
  keyword: {
    en: "free architecture audit",
    fa: "ممیزی معماری رایگان",
  },
  title: {
    en: "Free Architecture Audit",
    fa: "ممیزی معماری رایگان",
  },
  metaDescription: {
    en: "Free architecture audit for founders after funding, new CTOs, or pre-launch — risk map, stack fit, and a fixed-scope next step. Book a discovery call.",
    fa: "ممیزی معماری رایگان برای founders بعد از جذب سرمایه، CTO جدید یا پیش از launch — نقشه ریسک، fit استک و گام بعدی محدود. رزرو تماس کشف.",
  },
  subtitle: {
    en: "Low-risk entry for outbound and inbound leads: a structured look at your stack, risks, and what to build next — not a sales pitch disguised as a call.",
    fa: "ورودی کم‌ریسک برای لید outbound و inbound: نگاه ساخت‌یافته به استک، ریسک‌ها و گام بعدی — نه تماس فروش با برچسب مشاوره.",
  },
  proofLinks: [
    {
      slug: "lumina-analytics-console",
      label: {
        en: "Lumina Analytics Console",
        fa: "Lumina Analytics Console",
      },
      metric: {
        en: "57% faster time-to-insight after architecture focus",
        fa: "۵۷٪ سریع‌تر time-to-insight بعد از تمرکز معماری",
      },
    },
    {
      slug: "orbit-commerce-studio",
      label: {
        en: "Orbit Commerce Studio",
        fa: "Orbit Commerce Studio",
      },
      metric: {
        en: "Checkout + CWV wins from scoped performance work",
        fa: "برد checkout و CWV از کار performance محدود",
      },
    },
  ],
  stackHighlights: {
    en: [
      "Next.js / Node risk map",
      "Data & auth boundaries",
      "CWV & SEO blockers",
      "30/60/90-day options",
      "Written notes you keep",
      "Optional Estimator follow-up",
    ],
    fa: [
      "نقشه ریسک Next.js / Node",
      "مرزهای data و auth",
      "بلاکرهای CWV و SEO",
      "گزینه‌های ۳۰/۶۰/۹۰ روزه",
      "یادداشت مکتوب متعلق به شما",
      "پیگیری اختیاری با Estimator",
    ],
  },
  sections: [
    {
      heading: {
        en: "Who this is for",
        fa: "برای چه کسانی",
      },
      body: {
        en: "Founders after a raise who need build capacity without agency theater. New PMs/CTOs reviewing inherited architecture. Teams about to launch who want a second pair of senior eyes on risk.",
        fa: "Founderهایی بعد از جذب سرمایه که ظرفیت build می‌خواهند بدون نمایش آژانس. PM/CTO جدید که معماری ارثی را بازبینی می‌کنند. تیم‌هایی نزدیک launch که چشم senior دوم روی ریسک می‌خواهند.",
      },
    },
    {
      heading: {
        en: "What you get",
        fa: "چه چیزی می‌گیرید",
      },
      body: {
        en: "A short written risk map (stack fit, delivery risks, quick wins), a recommended engagement shape (audit-only, discovery sprint, or MVP build), and clear next steps — including when I am not the right fit.",
        fa: "نقشه ریسک کوتاه (fit استک، ریسک تحویل، quick winها)، شکل همکاری پیشنهادی (فقط ممیزی، discovery sprint یا build MVP) و گام‌های بعدی شفاف — از جمله وقتی fit نیستم.",
      },
    },
    {
      heading: {
        en: "How outbound leads should book",
        fa: "لیدهای outbound چطور رزرو کنند",
      },
      body: {
        en: "Use the schedule or brief tab with your source tagged (email / LinkedIn). Prefill from Estimator or Advisor is supported. Same Contact Hub — tracked in ContactInquiry.source.",
        fa: "تب schedule یا brief را با source تگ‌شده (ایمیل / LinkedIn) استفاده کنید. Prefill از Estimator یا Advisor پشتیبانی می‌شود. همان Contact Hub — در ContactInquiry.source ردیابی می‌شود.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Is the audit really free?",
        answer:
          "The initial architecture conversation and written risk notes for qualified leads are free. Larger audits or implementation are scoped separately.",
      },
      {
        question: "What should I prepare?",
        answer:
          "Repo or staging access if possible, your ICP, and the decision you need in the next 90 days. A short brief is enough to start.",
      },
    ],
    fa: [
      {
        question: "ممیزی واقعاً رایگان است؟",
        answer:
          "گفتگوی اولیه معماری و یادداشت ریسک مکتوب برای لیدهای واجد شرایط رایگان است. ممیزی بزرگ‌تر یا پیاده‌سازی جداگانه scope می‌شود.",
      },
      {
        question: "چه چیزی آماده کنم؟",
        answer:
          "در صورت امکان دسترسی repo یا staging، ICP، و تصمیمی که در ۹۰ روز آینده لازم دارید. یک brief کوتاه کافی است.",
      },
    ],
  },
  relatedServiceSlug: "nextjs-audit",
};
