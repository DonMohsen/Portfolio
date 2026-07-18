export type LocalizedText = {
  en: string;
  fa: string;
};

export type ProcessStep = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  deliverables: { en: string[]; fa: string[] };
};

export const PROCESS_HERO: {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
} = {
  eyebrow: {
    en: "Transparent delivery",
    fa: "تحویل شفاف",
  },
  title: {
    en: "How I work",
    fa: "فرآیند همکاری",
  },
  subtitle: {
    en: "Fixed-scope discovery, weekly demos, and documentation you own — from first call to production handoff.",
    fa: "کشف با دامنه مشخص، دمو هفتگی و مستنداتی که مال شماست — از اولین تماس تا تحویل production.",
  },
};

export const OWNERSHIP_BLOCK: {
  title: LocalizedText;
  body: LocalizedText;
} = {
  title: {
    en: "Who does the work",
    fa: "چه کسی کار را انجام می‌دهد",
  },
  body: {
    en: "I own architecture, key technical decisions (ADRs), client communication, and quality review. Trusted specialists execute modules under that blueprint — you get senior product engineering judgment without agency overhead or black-box delivery.",
    fa: "معماری، تصمیمات فنی کلیدی (ADR)، ارتباط با مشتری و بازبینی کیفیت با من است. متخصصان منتخب ماژول‌ها را زیر همان نقشه اجرا می‌کنند — قضاوت سطح senior بدون سربار آژانس و بدون جعبه‌سیاه.",
  },
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    title: { en: "Discovery", fa: "کشف" },
    summary: {
      en: "Map the business problem, stakeholders, constraints, and success metrics before committing to build.",
      fa: "قبل از شروع ساخت، مسئله کسب‌وکار، ذی‌نفعان، محدودیت‌ها و معیارهای موفقیت را مشخص می‌کنیم.",
    },
    deliverables: {
      en: [
        "Scoped problem statement",
        "Risk map & assumptions",
        "Success metrics & timeline",
      ],
      fa: [
        "بیانیه مسئله با دامنه مشخص",
        "نقشه ریسک و فرضیات",
        "معیار موفقیت و تایم‌لاین",
      ],
    },
  },
  {
    id: "architecture",
    title: { en: "Architecture", fa: "معماری" },
    summary: {
      en: "System design, stack choices, and ADRs documented so your team and investors can follow the why.",
      fa: "طراحی سیستم، انتخاب استک و ADRهای مستند — تا تیم و سرمایه‌گذار «چرایی» را ببینند.",
    },
    deliverables: {
      en: [
        "Architecture overview",
        "ADR log (key decisions)",
        "Milestone delivery plan",
      ],
      fa: [
        "نمای کلی معماری",
        "لاگ ADR (تصمیمات کلیدی)",
        "برنامه تحویل milestone",
      ],
    },
  },
  {
    id: "build",
    title: { en: "Build", fa: "ساخت" },
    summary: {
      en: "Milestone-based delivery with vertical slices — working software every sprint, not slide decks.",
      fa: "تحویل milestone با برش عمودی — نرم‌افزار کارا هر اسپرینت، نه اسلاید.",
    },
    deliverables: {
      en: [
        "Feature increments per milestone",
        "CI/CD & staging environments",
        "Tests on critical paths",
      ],
      fa: [
        "افزایش قابلیت در هر milestone",
        "CI/CD و محیط staging",
        "تست مسیرهای بحرانی",
      ],
    },
  },
  {
    id: "demo",
    title: { en: "Demo", fa: "دمو" },
    summary: {
      en: "Weekly demos with recordings. You see progress in production-like environments — no localhost surprises at launch.",
      fa: "دمو هفتگی با ضبط جلسه. پیشرفت در محیط شبیه production دیده می‌شود — نه غافلگیری در روز لانچ.",
    },
    deliverables: {
      en: [
        "Weekly demo & recording",
        "Changelog & release notes",
        "Stakeholder feedback loop",
      ],
      fa: [
        "دمو و ضبط هفتگی",
        "Changelog و release notes",
        "حلقه بازخورد ذی‌نفعان",
      ],
    },
  },
  {
    id: "handoff",
    title: { en: "Handoff", fa: "تحویل" },
    summary: {
      en: "Runbooks, docs, and knowledge transfer so your team owns the system — with an optional retainer path.",
      fa: "Runbook، مستندات و انتقال دانش تا تیم شما مالک سیستم باشد — با مسیر retainer اختیاری.",
    },
    deliverables: {
      en: [
        "Operations runbook",
        "Onboarding guide for your team",
        "Optional ongoing support plan",
      ],
      fa: [
        "Runbook عملیاتی",
        "راهنمای onboarding برای تیم شما",
        "پلن پشتیبانی اختیاری",
      ],
    },
  },
];

export type First90Phase = {
  id: string;
  weeks: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
};

export const FIRST_90_DAYS: {
  title: LocalizedText;
  subtitle: LocalizedText;
  phases: First90Phase[];
} = {
  title: {
    en: "First 90 days",
    fa: "۹۰ روز اول",
  },
  subtitle: {
    en: "A typical SaaS MVP or product build cadence — adjustable per scope after discovery.",
    fa: "ریتم معمول MVP یا ساخت محصول — بعد از discovery بر اساس دامنه تنظیم می‌شود.",
  },
  phases: [
    {
      id: "weeks-1-2",
      weeks: { en: "Weeks 1–2", fa: "هفته ۱–۲" },
      title: {
        en: "Discovery & architecture",
        fa: "کشف و معماری",
      },
      summary: {
        en: "Discovery sprint, architecture doc, risk map, and aligned success metrics.",
        fa: "اسپرینت کشف، سند معماری، نقشه ریسک و هم‌راستایی معیارهای موفقیت.",
      },
    },
    {
      id: "weeks-3-4",
      weeks: { en: "Weeks 3–4", fa: "هفته ۳–۴" },
      title: {
        en: "Foundation & first slice",
        fa: "زیرساخت و اولین برش",
      },
      summary: {
        en: "Infrastructure, CI/CD, auth/data foundations, and the first vertical slice in staging.",
        fa: "زیرساخت، CI/CD، پایه auth/data و اولین برش عمودی در staging.",
      },
    },
    {
      id: "weeks-5-8",
      weeks: { en: "Weeks 5–8", fa: "هفته ۵–۸" },
      title: {
        en: "Feature delivery",
        fa: "تحویل قابلیت",
      },
      summary: {
        en: "Core features against milestones — weekly demos, metrics instrumentation where agreed.",
        fa: "قابلیت‌های هسته طبق milestone — دمو هفتگی و instrumentation معیارها در صورت توافق.",
      },
    },
    {
      id: "weeks-9-12",
      weeks: { en: "Weeks 9–12", fa: "هفته ۹–۱۲" },
      title: {
        en: "Hardening & handoff",
        fa: "سخت‌سازی و تحویل",
      },
      summary: {
        en: "Performance hardening, production checks, runbook, and handoff to your team.",
        fa: "سخت‌سازی performance، چک production، runbook و تحویل به تیم شما.",
      },
    },
  ],
};

export const PROCESS_CTA: {
  title: LocalizedText;
  body: LocalizedText;
  primary: LocalizedText;
  secondary: LocalizedText;
} = {
  title: {
    en: "Ready to scope your build?",
    fa: "آماده تعریف دامنه پروژه‌تان هستید؟",
  },
  body: {
    en: "Book a discovery call — we'll map fit, timeline, and whether a fixed-scope sprint makes sense before any big commit.",
    fa: "یک تماس کشف رزرو کنید — قبل از هر تعهد بزرگ، fit، تایم‌لاین و منطق اسپرینت با دامنه مشخص را بررسی می‌کنیم.",
  },
  primary: {
    en: "Book a discovery call",
    fa: "رزرو تماس کشف",
  },
  secondary: {
    en: "View case studies",
    fa: "مطالعات موردی",
  },
};
