import type { LocalizedText } from "@/lib/services/types";

export const ABOUT_HERO: {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
} = {
  eyebrow: {
    en: "Author · Software Product Engineer",
    fa: "نویسنده · مهندس محصول نرم‌افزار",
  },
  title: {
    en: "Mohsen Khojasteh Nezhad",
    fa: "محسن خجسته‌نژاد",
  },
  subtitle: {
    en: "I build scalable software products from idea to production — SaaS, automation, and AI integrations for founders who need architecture ownership, not hourly output.",
    fa: "محصولات نرم‌افزاری مقیاس‌پذیر از ایده تا production می‌سازم — SaaS، اتوماسیون و AI برای بنیان‌گذارانی که مالکیت معماری می‌خواهند، نه خروجی ساعتی.",
  },
};

export const ABOUT_SUMMARY: LocalizedText = {
  en: "Software Product Engineer based in Tehran. I help startups and product teams ship production-grade Next.js apps with weekly demos, ADRs, and documentation they own.",
  fa: "مهندس محصول نرم‌افزار مستقر در تهران. به استارتاپ‌ها و تیم‌های محصول کمک می‌کنم اپ Next.js production-grade با دمو هفتگی، ADR و مستندات مالکیت‌شده ship کنند.",
};

export const ABOUT_STORY: {
  heading: LocalizedText;
  body: LocalizedText;
} = {
  heading: {
    en: "Story",
    fa: "داستان",
  },
  body: {
    en: "I started in front-end delivery — React, Redux, team sprints at HiWeb and Tat Bikeran — and kept asking why features shipped but products stalled. That pull toward architecture, business context, and measurable outcomes became my lane: Software Product Engineer.\n\nToday I work with founders internationally and in Iran: discovery sprints, MVP builds, and retainers where I own technical direction while trusted specialists execute under a clear blueprint. This site — bilingual, BICM case studies, transparent process — is the same standard I bring to client work.",
    fa: "از تحویل front-end شروع کردم — React، Redux، اسپرینت تیمی در های‌وب و تات بیکران — و مدام می‌پرسیدم چرا feature ship می‌شود اما محصول گیر می‌کند. آن کشش به سمت معماری، context کسب‌وکار و نتایج قابل اندازه‌گیری مسیرم شد: مهندس محصول نرم‌افزار.\n\nامروز با بنیان‌گذاران بین‌المللی و ایرانی کار می‌کنم: اسپرینت discovery، ساخت MVP و retainer جایی که جهت فنی با من است و متخصصان منتخب زیر نقشه روشن اجرا می‌کنند. این سایت — دوزبانه، case study BICM، فرآیند شفاف — همان استانداری است که به کار مشتری می‌آورم.",
  },
};

export const ABOUT_PHILOSOPHY: {
  heading: LocalizedText;
  body: LocalizedText;
  principles: { en: string[]; fa: string[] };
} = {
  heading: {
    en: "Philosophy",
    fa: "فلسفه",
  },
  body: {
    en: "I don't build apps. I build businesses. That means outcomes, metrics, and honest trade-offs — not feature checklists that look good in a sprint review but don't move revenue or retention.",
    fa: "اپ نمی‌سازم — business می‌سازم. یعنی outcome، metric و trade-off صادقانه — نه چک‌لیست feature که در review اسپرینت خوب به نظر می‌رسد اما revenue یا retention را جابه‌جا نمی‌کند.",
  },
  principles: {
    en: [
      "Fixed-scope discovery before big commits",
      "Weekly demos — no black-box development",
      "Architecture docs and ADRs you own",
      "Named metrics in every case study",
      "Direct communication — no account-manager layer",
    ],
    fa: [
      "کشف با دامنه مشخص قبل از تعهد بزرگ",
      "دمو هفتگی — بدون توسعه جعبه‌سیاه",
      "مستندات معماری و ADR مال شما",
      "metric نام‌دار در هر case study",
      "ارتباط مستقیم — بدون لایه account manager",
    ],
  },
};

export type AboutEducation = {
  school: LocalizedText;
  degree: LocalizedText;
  years: LocalizedText;
};

export const ABOUT_EDUCATION: AboutEducation[] = [
  {
    school: {
      en: "Enghelab Eslami National University of Skills, Tehran",
      fa: "دانشگاه ملی مهارت انقلاب اسلامی تهران",
    },
    degree: {
      en: "Associate Degree in Computer Software Engineering",
      fa: "کاردانی پیوسته مهندسی نرم‌افزار کامپیوتر",
    },
    years: { en: "2020–2023", fa: "۱۳۹۹–۱۴۰۲" },
  },
  {
    school: {
      en: "Shahid Babaei National University of Skills, Qazvin",
      fa: "دانشگاه ملی مهارت شهید بابایی قزوین",
    },
    degree: {
      en: "B.Sc. in Professional Computer Software Engineering",
      fa: "کارشناسی ناپیوسته مهندسی حرفه‌ای نرم‌افزار کامپیوتر",
    },
    years: { en: "2023–2025", fa: "۱۴۰۲–۱۴۰۴" },
  },
];

export type AboutExperience = {
  role: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  highlights: { en: string[]; fa: string[] };
};

export const ABOUT_EXPERIENCE: AboutExperience[] = [
  {
    role: { en: "Front-end Developer", fa: "برنامه‌نویس فرانت‌اند" },
    company: { en: "Tat Bikeran Co.", fa: "شرکت تات بیکران" },
    period: { en: "Dec 2024 – Jul 2025", fa: "۱۴۰۳/۰۹–۱۴۰۴/۰۴" },
    highlights: {
      en: [
        "Built and maintained product components integrated with WordPress via WP REST API.",
        "Collaborated with design and SEO teams to improve UX and delivery speed.",
        "Gained stronger product and business perspective alongside technical delivery.",
      ],
      fa: [
        "توسعه و نگهداری کامپوننت‌های محصول یکپارچه با وردپرس از طریق WP REST API.",
        "همکاری با تیم طراحی و SEO برای بهبود UX و سرعت تحویل.",
        "درک عمیق‌تر ابعاد محصول و کسب‌وکار در کنار تحویل فنی.",
      ],
    },
  },
  {
    role: { en: "Front-end Intern", fa: "کارآموز فرانت‌اند" },
    company: { en: "HiWeb Holding", fa: "هلدینگ های‌وب" },
    period: { en: "Jul 2024 – Sep 2024", fa: "۱۴۰۳/۰۴–۱۴۰۳/۰۶" },
    highlights: {
      en: [
        "Shipped product features with React and Redux in a team delivery workflow.",
        "Aligned with team process for on-time delivery while learning new tools quickly.",
        "Collaborated with design and backend to improve product quality.",
      ],
      fa: [
        "پیاده‌سازی فیچرهای محصول با React و Redux در جریان تحویل تیمی.",
        "هماهنگی با فرآیند تیم برای تحویل به‌موقع و یادگیری سریع ابزارهای جدید.",
        "همکاری با طراحی و بک‌اند برای بهبود کیفیت محصول.",
      ],
    },
  },
];

export type ComparisonCell = "yes" | "partial" | "no" | "text";

export type ComparisonRow = {
  label: LocalizedText;
  freelancer: ComparisonCell | LocalizedText;
  agency: ComparisonCell | LocalizedText;
  me: ComparisonCell | LocalizedText;
};

export const COMPARISON_COLUMNS = {
  freelancer: {
    en: "Freelancer ($20/hr)",
    fa: "فریلنسر (۲۰ دلار/ساعت)",
  },
  agency: {
    en: "Agency ($150/hr)",
    fa: "آژانس (۱۵۰ دلار/ساعت)",
  },
  me: {
    en: "Me",
    fa: "من",
  },
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: {
      en: "Architecture ownership",
      fa: "مالکیت معماری",
    },
    freelancer: "no",
    agency: "partial",
    me: "yes",
  },
  {
    label: {
      en: "Direct communication",
      fa: "ارتباط مستقیم",
    },
    freelancer: "yes",
    agency: "no",
    me: "yes",
  },
  {
    label: {
      en: "Business context",
      fa: "درک کسب‌وکار",
    },
    freelancer: "no",
    agency: "partial",
    me: "yes",
  },
  {
    label: {
      en: "Risk",
      fa: "ریسک",
    },
    freelancer: { en: "High", fa: "بالا" },
    agency: { en: "Medium", fa: "متوسط" },
    me: { en: "Low (discovery sprint)", fa: "پایین (اسپرینت کشف)" },
  },
];

export const ABOUT_CTA: {
  title: LocalizedText;
  body: LocalizedText;
  primary: LocalizedText;
  secondary: LocalizedText;
} = {
  title: {
    en: "Work together",
    fa: "همکاری",
  },
  body: {
    en: "See case studies with metrics, how I work, or book a discovery call.",
    fa: "case study با metric، فرآیند همکاری یا رزرو تماس کشف را ببینید.",
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
