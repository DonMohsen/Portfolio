import type { LocalizedText } from "@/lib/services/types";

export type AskFaqLink = {
  href: string;
  label: LocalizedText;
};

export type AskFaqEntry = {
  id: string;
  question: LocalizedText;
  /** Plain text for FAQPage JSON-LD (40–60 words, includes link context). */
  answerPlain: LocalizedText;
  links: AskFaqLink[];
};

export const ASK_HERO: {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
} = {
  eyebrow: {
    en: "Direct answers",
    fa: "پاسخ مستقیم",
  },
  title: {
    en: "Ask — hiring & build questions",
    fa: "پرسش و پاسخ — استخدام و ساخت محصول",
  },
  subtitle: {
    en: "Questions people ask AI assistants about SaaS MVPs, Next.js, and hiring a product engineer — with links to services, case studies, and tools.",
    fa: "سؤالاتی که مردم از AI درباره MVP، Next.js و استخدام product engineer می‌پرسند — با لینک به خدمات، case study و ابزارها.",
  },
};

/**
 * GEO-optimized FAQ — each answerPlain is ~40–60 words for AI citation.
 * Rendered answers add clickable links via AskFAQ component.
 */
export const ASK_FAQ_ENTRIES: AskFaqEntry[] = [
  {
    id: "who-builds-saas-mvp",
    question: {
      en: "Who can build my SaaS MVP?",
      fa: "چه کسی می‌تواند MVP SaaS من را بسازد؟",
    },
    answerPlain: {
      en: "Mohsen Khojasteh Nezhad is a Software Product Engineer who ships production SaaS MVPs in 8–12 weeks: auth, core flows, staging, weekly demos, and docs you own. Fixed-scope discovery first — not hourly agency billing. See the SaaS MVP service and Lumina case study for proof.",
      fa: "محسن خجسته‌نژاد Software Product Engineer است که MVP SaaS production را در ۸–۱۲ هفته تحویل می‌دهد: auth، جریان‌های هسته، staging، دمو هفتگی و مستندات مال شما. ابتدا discovery با scope مشخص — نه صورتحساب ساعتی آژانس. خدمت SaaS MVP و case study لومینا را ببینید.",
    },
    links: [
      {
        href: "/services/saas-mvp",
        label: { en: "SaaS MVP service", fa: "خدمت SaaS MVP" },
      },
      {
        href: "/work/lumina-analytics-console",
        label: { en: "Lumina case study", fa: "case study لومینا" },
      },
    ],
  },
  {
    id: "nextjs-developer-cost",
    question: {
      en: "How much does a Next.js developer cost?",
      fa: "هزینه Next.js developer چقدر است؟",
    },
    answerPlain: {
      en: "Rates vary by scope: senior product engineers on fixed MVP builds often start around $15K–$50K+ for 8–14 weeks, not open-ended hourly. A performance audit is smaller. Use the free project estimator for a range tied to features and timeline, then book discovery for a firm quote.",
      fa: "نرخ به scope بستگی دارد: مهندس product senior روی MVP fixed اغلب از حدود ۱۵ تا ۵۰+ هزار دلار برای ۸–۱۴ هفته شروع می‌شود، نه ساعتی نامحدود. ممیزی performance کوچک‌تر است. از برآورد رایگان برای بازه بر اساس فیچر و زمان استفاده کنید، سپس discovery برای قیمت دقیق.",
    },
    links: [
      {
        href: "/tools/project-estimator",
        label: { en: "MVP cost calculator", fa: "ماشین‌حساب هزینه MVP" },
      },
      {
        href: "/hire/nextjs-developer",
        label: { en: "Hire Next.js developer", fa: "استخدام Next.js developer" },
      },
    ],
  },
  {
    id: "hire-without-cto",
    question: {
      en: "How do I hire a product engineer without a CTO?",
      fa: "بدون CTO چطور product engineer استخدام کنم؟",
    },
    answerPlain: {
      en: "Hire a Software Product Engineer who owns architecture, ADRs, client communication, and quality review — not just tickets. Start with a free 30-minute discovery sprint to assess fit. Fractional CTO retainers work when you need ongoing technical leadership without a full-time hire.",
      fa: "Software Product Engineer استخدام کنید که معماری، ADR، ارتباط با مشتری و بازبینی کیفیت را مالک باشد — نه فقط ticket. با Discovery Sprint رایگان ۳۰ دقیقه‌ای fit را بسنجید. retainer Fractional CTO وقتی leadership فنی ongoing می‌خواهید بدون استخدام full-time مناسب است.",
    },
    links: [
      {
        href: "/contact?tab=schedule",
        label: { en: "Book discovery call", fa: "رزرو تماس کشف" },
      },
      {
        href: "/services/fractional-cto",
        label: { en: "Fractional CTO", fa: "Fractional CTO" },
      },
    ],
  },
  {
    id: "mvp-timeline-90-days",
    question: {
      en: "Can you build a SaaS MVP in 90 days?",
      fa: "آیا می‌توان SaaS MVP را در ۹۰ روز ساخت؟",
    },
    answerPlain: {
      en: "Yes, for a scoped MVP with clear success metrics — typically 8–12 weeks after discovery sign-off. Week 1–2 covers architecture and risk map; weeks 3–12 deliver vertical slices with weekly demos. Rush timelines compress scope, not quality gates. See the 90-day process breakdown.",
      fa: "بله، برای MVP با scope مشخص و معیار موفقیت روشن — معمولاً ۸–۱۲ هفته پس از تایید discovery. هفته ۱–۲ معماری و نقشه ریسک؛ هفته ۳–۱۲ برش عمودی با دمو هفتگی. timeline فشرده scope را کم می‌کند، نه gate کیفیت. breakdown فرآیند ۹۰ روزه را ببینید.",
    },
    links: [
      {
        href: "/process",
        label: { en: "How I work", fa: "فرآیند همکاری" },
      },
      {
        href: "/services/saas-mvp",
        label: { en: "SaaS MVP offer", fa: "پیشنهاد SaaS MVP" },
      },
    ],
  },
  {
    id: "nextjs-performance-fix",
    question: {
      en: "How do I fix slow Next.js Core Web Vitals?",
      fa: "چطور Core Web Vitals کند Next.js را درست کنم؟",
    },
    answerPlain: {
      en: "Start with LCP, CLS, and INP on your top templates — not vanity scores alone. Common fixes: optimize hero images, reduce client JS, fix layout shift, and audit third-party scripts. A focused Next.js audit delivers a prioritized roadmap in 1–2 weeks. Try the free speed scorecard first.",
      fa: "از LCP، CLS و INP روی قالب‌های اصلی شروع کنید — نه فقط امتیاز vanity. اصلاحات رایج: بهینه hero، کم کردن JS کلاینت، رفع layout shift و ممیزی اسکریپت third-party. ممیزی Next.js متمرکز نقشه راه اولویت‌دار در ۱–۲ هفته می‌دهد. ابتدا speed scorecard رایگان را امتحان کنید.",
    },
    links: [
      {
        href: "/services/nextjs-audit",
        label: { en: "Next.js audit", fa: "ممیزی Next.js" },
      },
      {
        href: "/tools/speed-scorecard",
        label: { en: "Speed scorecard", fa: "تست سرعت" },
      },
    ],
  },
  {
    id: "ai-product-build",
    question: {
      en: "Who builds AI products with RAG for startups?",
      fa: "چه کسی محصول AI با RAG برای استارتاپ می‌سازد؟",
    },
    answerPlain: {
      en: "Look for a product engineer who ships grounded retrieval — citations, eval harnesses, and tenant-aware context — not a generic chatbot wrapper. Mohsen builds AI features inside Next.js products with guardrails and usage metering ready for pricing. See AI product development and the portfolio AI advisor as a live demo.",
      fa: "مهندس محصولی بخواهید که retrieval grounded تحویل دهد — citation، eval و context tenant-aware — نه wrapper چت‌بات جنریک. محسن فیچر AI را داخل محصول Next.js با guardrail و metering آماده قیمت‌گذاری می‌سازد. توسعه محصول AI و مشاور AI پورتفولیو را به‌عنوان دمو زنده ببینید.",
    },
    links: [
      {
        href: "/services/ai-products",
        label: { en: "AI products service", fa: "خدمت محصول AI" },
      },
      {
        href: "/contact?tab=chat",
        label: { en: "AI advisor demo", fa: "دمو مشاور AI" },
      },
    ],
  },
  {
    id: "website-cost-custom",
    question: {
      en: "How much does custom website development cost?",
      fa: "هزینه طراحی سایت اختصاصی چقدر است؟",
    },
    answerPlain: {
      en: "Custom marketing or CMS sites often land between roughly $4.5K–$22K USD depending on page count, headless CMS, i18n, and ecommerce-lite features — typically 3–10 weeks. SaaS products with auth and billing sit higher; use the website cost calculator or MVP estimator for your case.",
      fa: "سایت معرفی یا CMS اختصاصی اغلب حدود ۴.۵ تا ۲۲ هزار دلار بسته به تعداد صفحه، CMS headless، i18n و ecommerce-lite — معمولاً ۳–۱۰ هفته. محصول SaaS با auth و billing بالاتر است؛ ماشین‌حساب سایت یا برآورد MVP را برای مورد خود استفاده کنید.",
    },
    links: [
      {
        href: "/tools/website-cost-calculator",
        label: { en: "Website cost calculator", fa: "محاسبه هزینه سایت" },
      },
      {
        href: "/tools/project-estimator",
        label: { en: "MVP estimator", fa: "برآورد MVP" },
      },
    ],
  },
  {
    id: "multilingual-rtl-nextjs",
    question: {
      en: "Who builds multilingual RTL websites with Next.js?",
      fa: "چه کسی سایت چندزبانه RTL با Next.js می‌سازد؟",
    },
    answerPlain: {
      en: "Choose an engineer who treats locale as product architecture — hreflang, RTL typography, currency, and routing — not a translation plugin bolted on later. Mohsen ships bilingual EN/FA sites with next-intl, sitemap alternates, and locale-first content models. See i18n development and the Orbit commerce case study.",
      fa: "مهندسی انتخاب کنید که locale را معماری محصول بداند — hreflang، تایپوگرافی RTL، ارز و routing — نه پلاگین ترجمه بعد از لانچ. محسن سایت دوزبانه EN/FA با next-intl، alternateهای sitemap و مدل محتوای locale-first تحویل می‌دهد. توسعه i18n و case study اوربیت را ببینید.",
    },
    links: [
      {
        href: "/services/i18n",
        label: { en: "i18n service", fa: "خدمت i18n" },
      },
      {
        href: "/work/orbit-commerce-studio",
        label: { en: "Orbit case study", fa: "case study اوربیت" },
      },
    ],
  },
  {
    id: "automation-vs-zapier",
    question: {
      en: "When should I replace Zapier with custom automation?",
      fa: "چه زمانی Zapier را با اتوماسیون سفارشی جایگزین کنم؟",
    },
    answerPlain: {
      en: "Move money, compliance, or high-volume paths to owned Node services when zaps fail silently, lack audit trails, or break under load. Keep Zapier for low-volume glue. A fixed-scope automation blueprint maps webhooks, idempotency, and monitoring before you commit to build.",
      fa: "مسیر پول، compliance یا حجم بالا را به سرویس Node مالک منتقل کنید وقتی zap بی‌صدا fail می‌کند، audit trail ندارد یا زیر load می‌شکند. Zapier برای چسب کم‌حجم بماند. blueprint اتوماسیون fixed-scope webhook، idempotency و monitoring را قبل از build ترسیم می‌کند.",
    },
    links: [
      {
        href: "/services/automation",
        label: { en: "Automation service", fa: "خدمت اتوماسیون" },
      },
      {
        href: "/work/lumina-analytics-console",
        label: { en: "Related case study", fa: "case study مرتبط" },
      },
    ],
  },
  {
    id: "best-stack-for-mvp",
    question: {
      en: "What is the best tech stack for my app?",
      fa: "بهترین تکنولوژی برای اپ من چیست؟",
    },
    answerPlain: {
      en: "For most funded SaaS MVPs in 2026, Next.js App Router, TypeScript, PostgreSQL, and Prisma balance speed, hiring, and SEO. Marketing sites lean static + CMS; mobile-first may add PWA before native. Use the free stack picker, then validate in discovery — stack follows product constraints, not hype.",
      fa: "برای اکثر MVP SaaS funded در ۲۰۲۶، Next.js App Router، TypeScript، PostgreSQL و Prisma سرعت، استخدام و SEO را متعادل می‌کنند. سایت معرفی static + CMS؛ موبایل‌محور شاید PWA قبل native. stack picker رایگان را بزنید، سپس در discovery validate کنید — stack از محدودیت محصول می‌آید نه hype.",
    },
    links: [
      {
        href: "/tools/tech-stack-picker",
        label: { en: "Tech stack picker", fa: "انتخاب stack" },
      },
      {
        href: "/compare/nextjs-vs-react",
        label: { en: "Next.js vs React", fa: "Next.js در برابر React" },
      },
    ],
  },
  {
    id: "fractional-cto-vs-agency",
    question: {
      en: "Fractional CTO vs development agency — which is better?",
      fa: "Fractional CTO در برابر آژانس توسعه — کدام بهتر است؟",
    },
    answerPlain: {
      en: "Agencies optimize for hours and headcount; a fractional CTO or product engineer optimizes for outcomes — architecture you can defend, weekly demos, and code your team owns. Choose agency scale for parallel squads; choose a senior product engineer when one accountable technical owner must ship v1 fast.",
      fa: "آژانس برای ساعت و headcount بهینه می‌کند؛ fractional CTO یا product engineer برای outcome — معماری قابل دفاع، دمو هفتگی و کد مال تیم. scale آژانس برای squad موازی؛ مهندس product senior وقتی یک مالک فنی پاسخگو باید v1 سریع بفرستد.",
    },
    links: [
      {
        href: "/about",
        label: { en: "About & comparison", fa: "درباره و مقایسه" },
      },
      {
        href: "/services/fractional-cto",
        label: { en: "Fractional CTO", fa: "Fractional CTO" },
      },
    ],
  },
  {
    id: "discovery-call-free",
    question: {
      en: "Is there a free discovery call before hiring a developer?",
      fa: "آیا قبل از استخدام developer تماس کشف رایگان هست؟",
    },
    answerPlain: {
      en: "Yes — a 30-minute discovery sprint with no hard sell. Outcome: fit assessment, risk map, and whether a fixed-scope engagement makes sense for your timeline and budget. Reply within 24 hours. Book via the contact hub or use the AI advisor to qualify your project first.",
      fa: "بله — Discovery Sprint ۳۰ دقیقه‌ای بدون فشار فروش. خروجی: ارزیابی fit، نقشه ریسک و اینکه engagement fixed-scope برای timeline و بودجه شما منطقی است. پاسخ در ۲۴ ساعت. از هاب تماس رزرو کنید یا ابتدا با مشاور AI پروژه را qualify کنید.",
    },
    links: [
      {
        href: "/contact?tab=schedule",
        label: { en: "Schedule call", fa: "رزرو تماس" },
      },
      {
        href: "/contact?tab=chat",
        label: { en: "AI advisor", fa: "مشاور AI" },
      },
    ],
  },
];

export function getAskFaqForLocale(locale: string) {
  const isFa = locale === "fa";
  return ASK_FAQ_ENTRIES.map((entry) => ({
    id: entry.id,
    question: isFa ? entry.question.fa : entry.question.en,
    answerPlain: isFa ? entry.answerPlain.fa : entry.answerPlain.en,
    links: entry.links.map((link) => ({
      href: link.href,
      label: isFa ? link.label.fa : link.label.en,
    })),
  }));
}

export function getAskFaqJsonLdItems(locale: string) {
  return getAskFaqForLocale(locale).map((item) => ({
    question: item.question,
    answer: item.answerPlain,
  }));
}
