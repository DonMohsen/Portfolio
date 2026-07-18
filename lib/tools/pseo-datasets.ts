import type { LocalizedText } from "@/lib/services/types";
import { getServiceLanding } from "@/lib/services/catalog";

export type PseoIndustry = {
  id: string;
  name: LocalizedText;
  context: LocalizedText;
};

export const PSEO_INDUSTRIES: PseoIndustry[] = [
  {
    id: "healthcare",
    name: { en: "Healthcare", fa: "سلامت" },
    context: {
      en: "HIPAA-aware workflows, audit trails, and role-based access are non-negotiable — speed cannot trade off compliance posture.",
      fa: "جریان‌های سازگار با HIPAA، audit trail و دسترسی نقش‌محور غیرقابل مذاکره است — سرعت نباید compliance را قربانی کند.",
    },
  },
  {
    id: "fintech",
    name: { en: "Fintech", fa: "فین‌تک" },
    context: {
      en: "Money movement demands idempotent APIs, reconciliation, and observability — investors expect production discipline from day one.",
      fa: "جابجایی پول به APIهای idempotent، تطبیق و observability نیاز دارد — سرمایه‌گذار از روز اول انضباط production می‌خواهند.",
    },
  },
  {
    id: "ecommerce",
    name: { en: "E-commerce", fa: "تجارت الکترونیک" },
    context: {
      en: "Checkout, catalog performance, and localized pricing drive revenue — mobile LCP directly hits conversion.",
      fa: "checkout، performance کاتالوگ و قیمت‌گذاری محلی درآمد را می‌سازند — LCP موبایل مستقیم روی conversion اثر دارد.",
    },
  },
  {
    id: "education",
    name: { en: "Education", fa: "آموزش" },
    context: {
      en: "Content discoverability, progress tracking, and multi-role access (student/instructor/admin) shape the architecture early.",
      fa: "کشف محتوا، ردیابی پیشرفت و دسترسی چندنقشی (دانشجو/مدرس/ادمین) زود معماری را شکل می‌دهد.",
    },
  },
  {
    id: "saas-b2b",
    name: { en: "B2B SaaS", fa: "SaaS B2B" },
    context: {
      en: "Multi-tenant isolation, onboarding funnels, and integration hooks (webhooks, SSO) define whether you can sell upmarket.",
      fa: "جداسازی multi-tenant، funnel آنبوردینگ و هوک یکپارچه‌سازی (webhook، SSO) تعیین می‌کند آیا upmarket می‌فروشید.",
    },
  },
];

export const PSEO_SERVICE_SLUGS = [
  "saas-mvp",
  "nextjs-audit",
  "ai-products",
  "automation",
  "i18n",
] as const;

export type PseoServiceSlug = (typeof PSEO_SERVICE_SLUGS)[number];

export type ServiceIndustryEntry = {
  serviceSlug: PseoServiceSlug;
  industryId: string;
  indexable: boolean;
  angle: LocalizedText;
  painPoints: { en: string[]; fa: string[] };
  deliverables: { en: string[]; fa: string[] };
  caseStudySlug: string;
  faq: {
    en: Array<{ question: string; answer: string }>;
    fa: Array<{ question: string; answer: string }>;
  };
};

function buildServiceIndustrySlug(
  serviceSlug: string,
  industryId: string
): string {
  return `${serviceSlug}-for-${industryId}`;
}

export const SERVICE_INDUSTRY_ENTRIES: ServiceIndustryEntry[] = [
  // saas-mvp × industries
  {
    serviceSlug: "saas-mvp",
    industryId: "healthcare",
    indexable: true,
    angle: {
      en: "Ship a HIPAA-ready SaaS MVP with audit-friendly auth, structured logging, and weekly demos — without a 12-month enterprise rewrite.",
      fa: "MVP SaaS آماده HIPAA با auth قابل ممیزی، لاگ ساختاریافته و دمو هفتگی — بدون بازنویسی enterprise ۱۲ ماهه.",
    },
    painPoints: {
      en: [
        "Clinical or ops teams need dashboards but compliance blocks quick no-code tools.",
        "Investors ask for traceability you cannot bolt on after launch.",
        "Mobile clinicians need fast loads on hospital Wi‑Fi.",
      ],
      fa: [
        "تیم بالینی به داشبورد نیاز دارد اما compliance ابزار no-code سریع را مسدود می‌کند.",
        "سرمایه‌گذار traceability می‌خواهد که بعد از لانچ نمی‌چسبد.",
        "پرسنل موبایل به بارگذاری سریع روی Wi‑Fi بیمارستان نیاز دارد.",
      ],
    },
    deliverables: {
      en: [
        "Tenant-aware auth + role matrix documented",
        "Audit log pipeline for sensitive actions",
        "Performance budget for mobile LCP < 2.5s target",
      ],
      fa: [
        "Auth tenant-aware + ماتریس نقش مستند",
        "خط لوله audit log برای اقدامات حساس",
        "بودجه performance برای هدف LCP موبایل زیر ۲.۵ ثانیه",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "Can you sign a BAA?",
          answer:
            "I architect for HIPAA-friendly patterns and work with your counsel on BAA scope — I do not claim to be a compliance vendor; legal review stays on your side.",
        },
        {
          question: "Typical timeline for healthcare MVP?",
          answer:
            "10–14 weeks after discovery when compliance requirements are scoped — rush timelines risk audit gaps.",
        },
      ],
      fa: [
        {
          question: "آیا BAA امضا می‌کنید؟",
          answer:
            "معماری را برای الگوهای سازگار با HIPAA طراحی می‌کنم و با وکیل شما روی scope BAA همکاری می‌کنم — بازبینی حقوقی با شماست.",
        },
        {
          question: "تایم‌لاین معمول MVP سلامت؟",
          answer: "۱۰–۱۴ هفته پس از discovery وقتی الزامات compliance مشخص شده — عجله شکاف audit می‌سازد.",
        },
      ],
    },
  },
  {
    serviceSlug: "saas-mvp",
    industryId: "fintech",
    indexable: true,
    angle: {
      en: "Launch a credible fintech MVP with idempotent payment flows, ledger-friendly data models, and staging environments investors can click through.",
      fa: "MVP فین‌تک قابل اعتماد با جریان پرداخت idempotent، مدل داده مناسب ledger و staging قابل کلیک برای سرمایه‌گذار.",
    },
    painPoints: {
      en: [
        "Double-charge bugs destroy trust faster than missing features.",
        "Regulatory questions appear in due diligence before product-market fit.",
        "You need sandbox + production parity without AWS bill shock.",
      ],
      fa: [
        "باگ double-charge سریع‌تر از نبود فیچر اعتماد را می‌کشد.",
        "سؤالات نظارتی قبل از product-market fit در due diligence می‌آید.",
        "به sandbox + parity production بدون شوک قبض AWS نیاز دارید.",
      ],
    },
    deliverables: {
      en: [
        "Payment integration with retry/idempotency keys",
        "Reconciliation export hooks",
        "Observability dashboards for money paths",
      ],
      fa: [
        "یکپارچه‌سازی پرداخت با retry/کلید idempotency",
        "هوک export تطبیق",
        "داشبورد observability برای مسیرهای پول",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "Do you handle PCI?",
          answer:
            "Card data stays on Stripe/Adyen — I integrate tokenized flows and never store PANs in your app database.",
        },
      ],
      fa: [
        {
          question: "PCI را شما handle می‌کنید؟",
          answer:
            "داده کارت روی Stripe/Adyen می‌ماند — جریان tokenized یکپارچه می‌کنم و PAN در دیتابیس شما ذخیره نمی‌شود.",
        },
      ],
    },
  },
  {
    serviceSlug: "saas-mvp",
    industryId: "ecommerce",
    indexable: true,
    angle: {
      en: "Headless commerce MVP with localized checkout, optimistic cart, and measurable conversion lifts — not a theme hack.",
      fa: "MVP commerce headless با checkout محلی، سبد optimistic و افزایش conversion قابل اندازه‌گیری — نه هک قالب.",
    },
    painPoints: {
      en: [
        "Shopify limits custom checkout logic you need for B2B tiers.",
        "International rollout breaks when i18n is an afterthought.",
        "Marketing wants speed; engineering fears plugin debt.",
      ],
      fa: [
        "Shopify منطق checkout سفارشی B2B را محدود می‌کند.",
        "بین‌المللی‌سازی وقتی فکر بعدی باشد می‌شکند.",
        "مارکتینگ سرعت می‌خواهد؛ مهندسی از بدهی پلاگین می‌ترسد.",
      ],
    },
    deliverables: {
      en: [
        "Checkout slices with inventory reconciliation",
        "Locale-first product model",
        "Core Web Vitals baseline report",
      ],
      fa: [
        "برش checkout با تطبیق موجودی",
        "مدل محصول locale-first",
        "گزارش baseline Core Web Vitals",
      ],
    },
    caseStudySlug: "orbit-commerce-studio",
    faq: {
      en: [
        {
          question: "Headless vs Shopify?",
          answer:
            "Headless when checkout rules, B2B pricing, or multi-region logic exceed platform limits — I help you decide in discovery.",
        },
      ],
      fa: [
        {
          question: "Headless یا Shopify؟",
          answer:
            "Headless وقتی قوانین checkout، قیمت B2B یا منطق چندمنطقه‌ای از سقف پلتفرم رد شود — در discovery تصمیم می‌گیریم.",
        },
      ],
    },
  },
  {
    serviceSlug: "saas-mvp",
    industryId: "education",
    indexable: true,
    angle: {
      en: "Course platforms and learning ops tools with searchable content, role-based classrooms, and analytics founders can demo to districts or investors.",
      fa: "پلتفرم دوره و ابزار یادگیری با محتوای قابل جستجو، کلاس نقش‌محور و analytics قابل دمو برای مناطق یا سرمایه‌گذار.",
    },
    painPoints: {
      en: [
        "Video + documents + quizzes sprawl across tools.",
        "Instructors need drafts; students need stable mobile UX.",
        "Procurement asks for accessibility and export paths.",
      ],
      fa: [
        "ویدیو + سند + آزمون بین ابزارها پراکنده است.",
        "مدرس draft می‌خواهد؛ دانشجو UX موبایل پایدار.",
        "تدارکات accessibility و مسیر export می‌خواهد.",
      ],
    },
    deliverables: {
      en: [
        "MDX or CMS pipeline with preview",
        "Progress + enrollment models",
        "Search across lessons",
      ],
      fa: [
        "خط لوله MDX یا CMS با preview",
        "مدل پیشرفت + ثبت‌نام",
        "جستجو در درس‌ها",
      ],
    },
    caseStudySlug: "nebula-docs-platform",
    faq: {
      en: [
        {
          question: "LMS integration?",
          answer:
            "I integrate via LTI/xAPI or custom APIs when needed — scope depends on your institutional buyers.",
        },
      ],
      fa: [
        {
          question: "یکپارچه‌سازی LMS؟",
          answer:
            "در صورت نیاز LTI/xAPI یا API سفارشی — scope به خریداران institution شما بستگی دارد.",
        },
      ],
    },
  },
  {
    serviceSlug: "saas-mvp",
    industryId: "saas-b2b",
    indexable: true,
    angle: {
      en: "B2B SaaS MVP with tenant isolation, admin consoles, and integration-ready APIs — built to pass security questionnaires later.",
      fa: "MVP SaaS B2B با جداسازی tenant، کنسول ادمین و API آماده یکپارچه‌سازی — برای عبور از پرسشنامه امنیتی بعداً.",
    },
    painPoints: {
      en: [
        "First customers demand SSO before you have bandwidth.",
        "Feature flags and audit logs are enterprise table stakes.",
        "Founders underestimate onboarding time-to-value.",
      ],
      fa: [
        "اولین مشتری SSO می‌خواهد قبل از bandwidth شما.",
        "feature flag و audit log شرط enterprise است.",
        "بنیان‌گذار time-to-value آنبوردینگ را دست‌کم می‌گیرد.",
      ],
    },
    deliverables: {
      en: [
        "Multi-tenant data model + migration plan",
        "Admin impersonation-safe tools",
        "Webhook + API key management",
      ],
      fa: [
        "مدل داده multi-tenant + نقشه migration",
        "ابزار ادمین بدون impersonation ناامن",
        "مدیریت webhook + API key",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "SOC2 from day one?",
          answer:
            "I implement logging, access control, and deployment patterns that shorten a later SOC2 path — certification itself is a separate engagement.",
        },
      ],
      fa: [
        {
          question: "SOC2 از روز اول؟",
          answer:
            "لاگ، کنترل دسترسی و الگوی deploy را طوری می‌چینم که مسیر SOC2 بعدی کوتاه‌تر شود — خود گواهی engagement جداست.",
        },
      ],
    },
  },
  // nextjs-audit × subset
  {
    serviceSlug: "nextjs-audit",
    industryId: "ecommerce",
    indexable: true,
    angle: {
      en: "E-commerce lives on mobile LCP and checkout CLS — I audit Next.js storefronts with revenue-linked metrics, not vanity Lighthouse scores alone.",
      fa: "تجارت الکترونیک روی LCP موبایل و CLS checkout است — ممیزی Next.js با متریک مرتبط درآمد، نه فقط امتیاز Lighthouse.",
    },
    painPoints: {
      en: [
        "Product heroes load slowly on 4G.",
        "Third-party scripts tank INP during checkout.",
        "Marketing ships landing pages outside performance budget.",
      ],
      fa: [
        "hero محصول روی 4G کند است.",
        "اسکریپت third-party در checkout INP را می‌کشد.",
        "مارکتینگ لندینگ خارج از بودجه performance می‌فرستد.",
      ],
    },
    deliverables: {
      en: [
        "CWV trace on top templates",
        "Prioritized fix roadmap (2–4 week slices)",
        "Before/after measurement plan",
      ],
      fa: [
        "ردیابی CWV روی قالب‌های اصلی",
        "نقشه راه اصلاح اولویت‌دار (برش ۲–۴ هفته)",
        "طرح اندازه‌گیری before/after",
      ],
    },
    caseStudySlug: "orbit-commerce-studio",
    faq: {
      en: [
        {
          question: "Audit vs rebuild?",
          answer:
            "Audit first when architecture is sound — rebuild only when tech debt blocks measurable fixes.",
        },
      ],
      fa: [
        {
          question: "ممیزی یا بازسازی؟",
          answer:
            "ابتدا ممیزی وقتی معماری سالم است — rebuild فقط وقتی بدهی فنی اصلاح قابل اندازه‌گیری را مسدود کند.",
        },
      ],
    },
  },
  {
    serviceSlug: "nextjs-audit",
    industryId: "saas-b2b",
    indexable: true,
    angle: {
      en: "B2B dashboards fail under real data volume — audit streaming, caching, and bundle splits before your biggest customer demo.",
      fa: "داشبورد B2B زیر حجم داده واقعی می‌ریزد — قبل از دمو بزرگ‌ترین مشتری streaming، کش و bundle را ممیزی کنید.",
    },
    painPoints: {
      en: [
        "Server components misused — waterfalls on every navigation.",
        "Prisma N+1 appears only in production traces.",
        "Bundle bloat from icon and chart libraries.",
      ],
      fa: [
        "server component غلط — waterfall در هر navigation.",
        "Prisma N+1 فقط در trace production.",
        "باد bundle از کتابخانه آیکون و چارت.",
      ],
    },
    deliverables: {
      en: [
        "RUM + lab CWV report",
        "Query + cache recommendations",
        "CI performance guardrails",
      ],
      fa: [
        "گزارش RUM + lab CWV",
        "پیشنهاد query + cache",
        "guardrail performance در CI",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "How long is an audit?",
          answer: "Typically 1–2 weeks for a focused Next.js app with a written roadmap and optional implementation sprint.",
        },
      ],
      fa: [
        {
          question: "ممیزی چقدر طول می‌کشد؟",
          answer: "معمولاً ۱–۲ هفته برای اپ Next.js متمرکز با نقشه راه نوشتاری و sprint پیاده‌سازی اختیاری.",
        },
      ],
    },
  },
  // ai-products
  {
    serviceSlug: "ai-products",
    industryId: "healthcare",
    indexable: true,
    angle: {
      en: "Clinical-adjacent AI needs grounded retrieval and human-in-the-loop — not a chatbot that hallucinates protocols.",
      fa: "AI مجاور بالینی به retrieval grounded و human-in-the-loop نیاز دارد — نه چت‌بات hallucinateکننده پروتکل.",
    },
    painPoints: {
      en: [
        "Generic LLM answers are unusable for clinical staff.",
        "PHI boundaries must be explicit in RAG pipelines.",
        "Latency budgets differ between triage and research modes.",
      ],
      fa: [
        "پاسخ LLM جنریک برای staff بالینی بی‌فایده است.",
        "مرز PHI باید در خط لوله RAG صریح باشد.",
        "بودجه latency بین triage و research فرق می‌کند.",
      ],
    },
    deliverables: {
      en: [
        "RAG architecture with citation surfaces",
        "Evaluation harness for answer quality",
        "Red-team prompts for unsafe outputs",
      ],
      fa: [
        "معماری RAG با سطح citation",
        "چارچوب ارزیابی کیفیت پاسخ",
        "prompt red-team برای خروجی ناامن",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "Which models?",
          answer:
            "Model choice follows latency, cost, and data residency — OpenRouter or direct APIs with fallbacks; no vendor lock-in in app code.",
        },
      ],
      fa: [
        {
          question: "کدام مدل‌ها؟",
          answer:
            "انتخاب مدل بر latency، هزینه و data residency — OpenRouter یا API مستقیم با fallback؛ بدون lock-in در کد اپ.",
        },
      ],
    },
  },
  {
    serviceSlug: "ai-products",
    industryId: "saas-b2b",
    indexable: true,
    angle: {
      en: "Embed copilots and workflow AI inside your B2B product — scoped tools, tenant-aware context, and usage metering ready for pricing.",
      fa: "copilot و AI workflow داخل محصول B2B — ابزار محدود، context tenant-aware و metering آماده قیمت‌گذاری.",
    },
    painPoints: {
      en: [
        "Customers ask for AI features competitors ship in slides only.",
        "Per-tenant prompts and data isolation are hard to retrofit.",
        "Token costs eat margin without metering.",
      ],
      fa: [
        "مشتری فیچر AI می‌خواهد که رقبا فقط در اسلاید دارند.",
        "prompt و جداسازی داده per-tenant سخت retrofit می‌شود.",
        "هزینه token حاشیه را می‌خورد بدون metering.",
      ],
    },
    deliverables: {
      en: [
        "Tool-calling or RAG lane with guardrails",
        "Per-tenant vector or document boundaries",
        "Usage events for billing analytics",
      ],
      fa: [
        "لاین tool-calling یا RAG با guardrail",
        "مرز vector/سند per-tenant",
        "رویداد usage برای analytics صورتحساب",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "Build vs buy AI layer?",
          answer:
            "I integrate hosted models with owned orchestration — you keep IP in prompts, evals, and product UX.",
        },
      ],
      fa: [
        {
          question: "ساخت یا خرید لایه AI؟",
          answer:
            "مدل hosted با orchestration مالکیت‌شده یکپارچه می‌کنم — IP در prompt، eval و UX محصول می‌ماند.",
        },
      ],
    },
  },
  // automation
  {
    serviceSlug: "automation",
    industryId: "fintech",
    indexable: true,
    angle: {
      en: "Replace brittle zap chains with owned Node services — reconciliation, webhooks, and alert routing that survive production traffic.",
      fa: "جایگزینی زنجیره zap شکننده با سرویس Node مالک — تطبیق، webhook و مسیریابی alert که traffic production را تحمل کند.",
    },
    painPoints: {
      en: [
        "Ops teams manually export CSVs between systems.",
        "Failed webhooks silently lose money events.",
        "No audit trail when spreadsheets are the source of truth.",
      ],
      fa: [
        "تیم ops دستی CSV بین سیستم‌ها export می‌کند.",
        "webhook شکست‌خورده رویداد پول را بی‌صدا از دست می‌دهد.",
        "بدون audit trail وقتی spreadsheet منبع حقیقت است.",
      ],
    },
    deliverables: {
      en: [
        "Idempotent webhook consumers",
        "Dead-letter queues + replay tools",
        "Runbooks and monitoring dashboards",
      ],
      fa: [
        "مصرف‌کننده webhook idempotent",
        "صف dead-letter + ابزار replay",
        "runbook و داشبورد monitoring",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "Zapier forever?",
          answer:
            "Keep Zapier for low-volume glue; move money and compliance paths to code you control.",
        },
      ],
      fa: [
        {
          question: "برای همیشه Zapier؟",
          answer:
            "Zapier برای چسب کم‌حجم بماند؛ مسیر پول و compliance به کدی که کنترل می‌کنید منتقل شود.",
        },
      ],
    },
  },
  {
    serviceSlug: "automation",
    industryId: "saas-b2b",
    indexable: true,
    angle: {
      en: "Internal automation for onboarding, provisioning, and support ops — reduce CAC payback time without hiring another ops engineer.",
      fa: "اتوماسیون داخلی برای آنبوردینگ، provisioning و ops پشتیبانی — کاهش زمان بازگشت CAC بدون استخدام ops دیگر.",
    },
    painPoints: {
      en: [
        "Customer success copies data between CRM and product.",
        "Trial-to-paid steps are manual and error-prone.",
        "Engineering interrupts for one-off scripts weekly.",
      ],
      fa: [
        "موفقیت مشتری داده را بین CRM و محصول کپی می‌کند.",
        "مراحل trial-to-paid دستی و خطاخیز است.",
        "مهندسی هفتگی برای اسکریپت یک‌باره قطع می‌شود.",
      ],
    },
    deliverables: {
      en: [
        "Event-driven provisioning jobs",
        "CRM ↔ product sync with conflict rules",
        "Admin tools for support overrides",
      ],
      fa: [
        "job provisioning event-driven",
        "sync CRM ↔ محصول با قوانین conflict",
        "ابزار ادمین برای override پشتیبانی",
      ],
    },
    caseStudySlug: "lumina-analytics-console",
    faq: {
      en: [
        {
          question: "How is this priced?",
          answer:
            "Fixed-scope automation blueprints from discovery — typically smaller than a full MVP engagement.",
        },
      ],
      fa: [
        {
          question: "قیمت‌گذاری چگونه است؟",
          answer:
            "نقشه اتوماسیون fixed-scope از discovery — معمولاً کوچک‌تر از engagement کامل MVP.",
        },
      ],
    },
  },
  // i18n
  {
    serviceSlug: "i18n",
    industryId: "ecommerce",
    indexable: true,
    angle: {
      en: "Locale-first commerce — currency, RTL, hreflang, and checkout copy in one pipeline, not a translation plugin after launch.",
      fa: "commerce locale-first — ارز، RTL، hreflang و copy checkout در یک خط لوله، نه پلاگین ترجمه بعد از لانچ.",
    },
    painPoints: {
      en: [
        "Arabic or Persian layouts break on mobile product grids.",
        "hreflang errors hide entire regions from Google.",
        "Payment methods differ per country but share one codebase.",
      ],
      fa: [
        "چیدمان عربی/فارسی روی grid موبایل می‌شکند.",
        "خطای hreflang کل مناطق را از Google پنهان می‌کند.",
        "روش پرداخت per کشور با یک codebase مشترک.",
      ],
    },
    deliverables: {
      en: [
        "RTL-safe design system audit",
        "hreflang + sitemap alternates",
        "Locale routing + currency formatting",
      ],
      fa: [
        "ممیزی design system سازگار RTL",
        "hreflang + alternateهای sitemap",
        "مسیریابی locale + فرمت ارز",
      ],
    },
    caseStudySlug: "orbit-commerce-studio",
    faq: {
      en: [
        {
          question: "Machine translation enough?",
          answer:
            "MT for drafts; production UX needs native review for trust — especially checkout and legal copy.",
        },
      ],
      fa: [
        {
          question: "ترجمه ماشینی کافی است؟",
          answer:
            "MT برای پیش‌نویس؛ UX production به بازبینی native برای اعتماد نیاز دارد — مخصوصاً checkout و copy حقوقی.",
        },
      ],
    },
  },
  {
    serviceSlug: "i18n",
    industryId: "education",
    indexable: true,
    angle: {
      en: "Multilingual course delivery with RTL lesson layouts, locale-aware search, and admin workflows translators can actually use.",
      fa: "ارائه دوره چندزبانه با چیدمان درس RTL، جستجوی locale-aware و workflow ادمین قابل استفاده برای مترجم.",
    },
    painPoints: {
      en: [
        "Translators break MDX components they do not understand.",
        "Students cannot find content across languages.",
        "Date and number formats confuse progress reports.",
      ],
      fa: [
        "مترجم component MDX را که نمی‌فهمد می‌شکند.",
        "دانشجو محتوا را بین زبان‌ها پیدا نمی‌کند.",
        "فرمت تاریخ و عدد گزارش پیشرفت را گیج می‌کند.",
      ],
    },
    deliverables: {
      en: [
        "Translation workflow + preview URLs",
        "Unified search index per locale",
        "RTL typography tokens",
      ],
      fa: [
        "workflow ترجمه + URL preview",
        "ایندکس جستجوی یکپارچه per locale",
        "توکن تایپوگرافی RTL",
      ],
    },
    caseStudySlug: "nebula-docs-platform",
    faq: {
      en: [
        {
          question: "next-intl or custom?",
          answer:
            "next-intl for App Router sites I ship — custom only when legacy constraints demand it.",
        },
      ],
      fa: [
        {
          question: "next-intl یا custom؟",
          answer:
            "next-intl برای سایت App Router که تحویل می‌دهم — custom فقط با محدودیت legacy.",
        },
      ],
    },
  },
  // Thin placeholder — not indexable (demonstrates noindex pattern)
  {
    serviceSlug: "nextjs-audit",
    industryId: "healthcare",
    indexable: false,
    angle: { en: "TBD", fa: "TBD" },
    painPoints: { en: [], fa: [] },
    deliverables: { en: [], fa: [] },
    caseStudySlug: "lumina-analytics-console",
    faq: { en: [], fa: [] },
  },
];

export type CompareRow = {
  dimension: LocalizedText;
  left: LocalizedText;
  right: LocalizedText;
  winner: "left" | "right" | "tie";
};

export type ComparePageData = {
  slug: string;
  indexable: boolean;
  left: { id: string; label: LocalizedText };
  right: { id: string; label: LocalizedText };
  title: LocalizedText;
  metaDescription: LocalizedText;
  verdict: LocalizedText;
  audience: LocalizedText;
  rows: CompareRow[];
  recommendServiceSlug: string;
  relatedCaseStudySlug?: string;
};

export const COMPARE_PAGES: ComparePageData[] = [
  {
    slug: "nextjs-vs-react",
    indexable: true,
    left: { id: "nextjs", label: { en: "Next.js", fa: "Next.js" } },
    right: { id: "react", label: { en: "React (SPA)", fa: "React (SPA)" } },
    title: {
      en: "Next.js vs React for Startups",
      fa: "Next.js در برابر React برای استارتاپ",
    },
    metaDescription: {
      en: "When a Next.js app beats a client-only React SPA for SEO, performance, and MVP speed — and when it does not.",
      fa: "چه زمانی Next.js از SPA React خالص برای SEO، performance و سرعت MVP جلو می‌زند — و چه زمانی نه.",
    },
    audience: {
      en: "Founders choosing a first production stack for a SaaS or marketing site.",
      fa: "بنیان‌گذارانی که stack production اول را برای SaaS یا سایت معرفی انتخاب می‌کنند.",
    },
    verdict: {
      en: "For most funded MVPs that need SEO and fast first paint, Next.js App Router wins. Pure React SPA still fits embedded widgets or authenticated tools behind login with no SEO need.",
      fa: "برای اکثر MVPهای funded که SEO و first paint سریع می‌خواهند، Next.js App Router برنده است. React SPA خالص برای widget جاسازی‌شده یا ابزار پشت login بدون SEO مناسب است.",
    },
    rows: [
      {
        dimension: { en: "SEO", fa: "SEO" },
        left: { en: "SSR/SSG + metadata APIs", fa: "SSR/SSG + API متادیتا" },
        right: { en: "Requires extra setup", fa: "نیاز به راه‌اندازی اضافه" },
        winner: "left",
      },
      {
        dimension: { en: "Time to MVP", fa: "زمان تا MVP" },
        left: { en: "Routing, images, API routes built-in", fa: "مسیریابی، تصویر، API route داخلی" },
        right: { en: "Choose and wire ecosystem", fa: "انتخاب و سیم‌کشی ecosystem" },
        winner: "left",
      },
      {
        dimension: { en: "Flexibility", fa: "انعطاف" },
        left: { en: "Opinionated conventions", fa: "قراردادهای opinionated" },
        right: { en: "Maximum freedom", fa: "آزادی بیشتر" },
        winner: "right",
      },
    ],
    recommendServiceSlug: "saas-mvp",
    relatedCaseStudySlug: "lumina-analytics-console",
  },
  {
    slug: "nextjs-vs-remix",
    indexable: true,
    left: { id: "nextjs", label: { en: "Next.js", fa: "Next.js" } },
    right: { id: "remix", label: { en: "Remix", fa: "Remix" } },
    title: {
      en: "Next.js vs Remix",
      fa: "Next.js در برابر Remix",
    },
    metaDescription: {
      en: "Compare data loading, deployment, and ecosystem for two React frameworks — practical picks for 2026 MVPs.",
      fa: "مقایسه بارگذاری داده، deploy و ecosystem دو فریم‌ورک React — انتخاب عملی برای MVP ۲۰۲۶.",
    },
    audience: {
      en: "Teams already on React debating framework for a new greenfield app.",
      fa: "تیم‌های روی React که فریم‌ورک اپ greenfield جدید را بحث می‌کنند.",
    },
    verdict: {
      en: "Next.js offers the broader hiring pool, Vercel-adjacent DX, and App Router maturity for typical SaaS. Remix shines when nested routing and web-standard forms are central — both are production-viable.",
      fa: "Next.js استخر استخدام گسترده‌تر، DX نزدیک Vercel و بلوغ App Router برای SaaS معمول دارد. Remix وقتی routing تو در تو و form استاندارد وب محور است می‌درخشد — هر دو production-viable هستند.",
    },
    rows: [
      {
        dimension: { en: "Ecosystem", fa: "Ecosystem" },
        left: { en: "Largest React meta-framework", fa: "بزرگ‌ترین meta-framework React" },
        right: { en: "Strong, smaller community", fa: "جامعه قوی و کوچک‌تر" },
        winner: "left",
      },
      {
        dimension: { en: "Data loading", fa: "بارگذاری داده" },
        left: { en: "Server Components + fetch", fa: "Server Component + fetch" },
        right: { en: "Loader/action model", fa: "مدل loader/action" },
        winner: "tie",
      },
      {
        dimension: { en: "Hosting", fa: "هاستینگ" },
        left: { en: "Vercel, Node, static export", fa: "Vercel، Node، export استاتیک" },
        right: { en: "Any Node adapter", fa: "هر adapter Node" },
        winner: "tie",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "prisma-vs-drizzle",
    indexable: true,
    left: { id: "prisma", label: { en: "Prisma", fa: "Prisma" } },
    right: { id: "drizzle", label: { en: "Drizzle", fa: "Drizzle" } },
    title: {
      en: "Prisma vs Drizzle ORM",
      fa: "Prisma در برابر Drizzle ORM",
    },
    metaDescription: {
      en: "Type-safe data layers for Next.js — migrations, DX, and performance trade-offs.",
      fa: "لایه داده type-safe برای Next.js — migration، DX و trade-off performance.",
    },
    audience: {
      en: "Technical founders picking ORM for PostgreSQL-backed SaaS.",
      fa: "بنیان‌گذاران فنی که ORM برای SaaS روی PostgreSQL انتخاب می‌کنند.",
    },
    verdict: {
      en: "Prisma speeds early MVP with schema-first migrations and great docs. Drizzle wins when you need lighter bundles and SQL-close control at scale — I default to Prisma for most MVPs, Drizzle when query performance is already a bottleneck.",
      fa: "Prisma MVP اولیه را با migration schema-first و مستندات عالی سریع می‌کند. Drizzle وقتی bundle سبک‌تر و کنترل نزدیک SQL در scale می‌خواهید برنده است — برای اکثر MVPها Prisma، وقتی query bottleneck است Drizzle.",
    },
    rows: [
      {
        dimension: { en: "DX / migrations", fa: "DX / migration" },
        left: { en: "Excellent migrate + studio", fa: "migrate + studio عالی" },
        right: { en: "SQL-first, lighter tooling", fa: "SQL-first، ابزار سبک‌تر" },
        winner: "left",
      },
      {
        dimension: { en: "Runtime overhead", fa: "سربار runtime" },
        left: { en: "Heavier client", fa: "کلاینت سنگین‌تر" },
        right: { en: "Thinner layer", fa: "لایه نازک‌تر" },
        winner: "right",
      },
      {
        dimension: { en: "Team onboarding", fa: "آنبوردینگ تیم" },
        left: { en: "Faster for juniors", fa: "سریع‌تر برای junior" },
        right: { en: "Needs SQL comfort", fa: "نیاز به راحتی SQL" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "supabase-vs-firebase",
    indexable: true,
    left: { id: "supabase", label: { en: "Supabase", fa: "Supabase" } },
    right: { id: "firebase", label: { en: "Firebase", fa: "Firebase" } },
    title: {
      en: "Supabase vs Firebase for MVPs",
      fa: "Supabase در برابر Firebase برای MVP",
    },
    metaDescription: {
      en: "Postgres vs document backend for your first production app — auth, realtime, and escape hatches.",
      fa: "Postgres در برابر backend سندی برای اولین اپ production — auth، realtime و مسیر خروج.",
    },
    audience: {
      en: "Startups choosing BaaS before hiring a backend team.",
      fa: "استارتاپ‌هایی که قبل از تیم backend، BaaS انتخاب می‌کنند.",
    },
    verdict: {
      en: "Supabase fits relational SaaS data and SQL reporting. Firebase fits mobile-first realtime prototypes — plan migration before complex queries hurt you.",
      fa: "Supabase برای داده SaaS رابطه‌ای و گزارش SQL مناسب است. Firebase برای پروتوتایپ realtime موبایل‌محور — قبل از query پیچیده migration برنامه بریزید.",
    },
    rows: [
      {
        dimension: { en: "Data model", fa: "مدل داده" },
        left: { en: "PostgreSQL relational", fa: "رابطه‌ای PostgreSQL" },
        right: { en: "Document NoSQL", fa: "NoSQL سندی" },
        winner: "left",
      },
      {
        dimension: { en: "Mobile SDKs", fa: "SDK موبایل" },
        left: { en: "Good, improving", fa: "خوب، در حال بهبود" },
        right: { en: "Mature", fa: "بالغ" },
        winner: "right",
      },
      {
        dimension: { en: "Vendor escape", fa: "خروج از vendor" },
        left: { en: "Standard Postgres export", fa: "export Postgres استاندارد" },
        right: { en: "Harder relational exports", fa: "export رابطه‌ای سخت‌تر" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "saas-mvp-vs-no-code",
    indexable: true,
    left: {
      id: "custom-mvp",
      label: { en: "Custom Next.js MVP", fa: "MVP سفارشی Next.js" },
    },
    right: {
      id: "no-code",
      label: { en: "No-code (Bubble/Webflow)", fa: "No-code (Bubble/Webflow)" },
    },
    title: {
      en: "Custom MVP vs No-Code",
      fa: "MVP سفارشی در برابر No-Code",
    },
    metaDescription: {
      en: "When to invest in code you own versus validating with no-code — cost, speed, and ceiling.",
      fa: "چه زمانی در کدی که مالک آن هستید سرمایه‌گذاری کنید versus اعتبارسنجی با no-code — هزینه، سرعت و سقف.",
    },
    audience: {
      en: "Non-technical founders before first paying customers.",
      fa: "بنیان‌گذاران غیرفنی قبل از اولین مشتری پرداخت‌کننده.",
    },
    verdict: {
      en: "No-code wins for same-week experiments. Custom MVP wins when integrations, roles, or performance ceilings block revenue — typically before seed or first B2B contracts.",
      fa: "No-code برای آزمایش همان هفته برنده است. MVP سفارشی وقتی یکپارچه‌سازی، نقش یا سقف performance درآمد را مسدود کند برنده است — معمولاً قبل از seed یا اولین قرارداد B2B.",
    },
    rows: [
      {
        dimension: { en: "Speed to demo", fa: "سرعت تا دمو" },
        left: { en: "Weeks with scope", fa: "هفته‌ها با scope" },
        right: { en: "Days", fa: "روزها" },
        winner: "right",
      },
      {
        dimension: { en: "Ownership", fa: "مالکیت" },
        left: { en: "Full code + IP", fa: "کد و IP کامل" },
        right: { en: "Platform limits", fa: "محدودیت پلتفرم" },
        winner: "left",
      },
      {
        dimension: { en: "Scale ceiling", fa: "سقف scale" },
        left: { en: "High with good architecture", fa: "بالا با معماری خوب" },
        right: { en: "Low–medium", fa: "پایین–متوسط" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "typescript-vs-javascript",
    indexable: true,
    left: { id: "typescript", label: { en: "TypeScript", fa: "TypeScript" } },
    right: { id: "javascript", label: { en: "JavaScript", fa: "JavaScript" } },
    title: {
      en: "TypeScript vs JavaScript for Products",
      fa: "TypeScript در برابر JavaScript برای محصول",
    },
    metaDescription: {
      en: "Why typed Next.js codebases reduce MVP rework when teams grow.",
      fa: "چرا codebaseهای Next.js typed rework MVP را با رشد تیم کم می‌کنند.",
    },
    audience: {
      en: "Solo founders and small teams shipping customer-facing apps.",
      fa: "بنیان‌گذاران solo و تیم‌های کوچک با اپ customer-facing.",
    },
    verdict: {
      en: "TypeScript is the default for products I ship — the small upfront cost pays back in refactors and onboarding. JavaScript only for throwaway prototypes.",
      fa: "TypeScript پیش‌فرض محصولاتی است که تحویل می‌دهم — هزینه کوچک اولیه در refactor و آنبوردینگ برمی‌گردد. JavaScript فقط برای پروتوتایپ دورریختنی.",
    },
    rows: [
      {
        dimension: { en: "Refactor safety", fa: "ایمنی refactor" },
        left: { en: "Compile-time checks", fa: "بررسی compile-time" },
        right: { en: "Runtime surprises", fa: "سورپرایز runtime" },
        winner: "left",
      },
      {
        dimension: { en: "Initial velocity", fa: "سرعت اولیه" },
        left: { en: "Slightly slower", fa: "کمی کندتر" },
        right: { en: "Faster first commit", fa: "اولین commit سریع‌تر" },
        winner: "right",
      },
      {
        dimension: { en: "Hiring", fa: "استخدام" },
        left: { en: "Industry default for SaaS", fa: "پیش‌فرض صنعت SaaS" },
        right: { en: "Declining for new codebases", fa: "کاهشی برای codebase جدید" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "tailwind-vs-css-modules",
    indexable: true,
    left: { id: "tailwind", label: { en: "Tailwind CSS", fa: "Tailwind CSS" } },
    right: {
      id: "css-modules",
      label: { en: "CSS Modules", fa: "CSS Modules" },
    },
    title: {
      en: "Tailwind vs CSS Modules",
      fa: "Tailwind در برابر CSS Modules",
    },
    metaDescription: {
      en: "Styling approach for design-system-driven Next.js products.",
      fa: "رویکرد استایل برای محصولات Next.js مبتنی بر design system.",
    },
    audience: {
      en: "Design-conscious founders working with one senior engineer.",
      fa: "بنیان‌گذاران design-aware با یک مهندس senior.",
    },
    verdict: {
      en: "Tailwind accelerates consistent UI and pairs well with token-based design systems. CSS Modules fit teams with dedicated CSS authors or strict BEM legacy.",
      fa: "Tailwind UI یکنواخت را سریع می‌کند و با design system مبتنی بر token جفت خوبی است. CSS Modules برای تیم با نویسنده CSS اختصاصی یا legacy BEM.",
    },
    rows: [
      {
        dimension: { en: "Consistency", fa: "یکنواختی" },
        left: { en: "Utility tokens", fa: "توکن utility" },
        right: { en: "Scoped classes", fa: "کلاس scoped" },
        winner: "tie",
      },
      {
        dimension: { en: "Velocity", fa: "سرعت" },
        left: { en: "Very fast iteration", fa: "تکرار بسیار سریع" },
        right: { en: "More files to manage", fa: "فایل بیشتر برای مدیریت" },
        winner: "left",
      },
      {
        dimension: { en: "Bundle size", fa: "اندازه bundle" },
        left: { en: "Purged utilities", fa: "utility پاک‌شده" },
        right: { en: "Per-component CSS", fa: "CSS per-component" },
        winner: "tie",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "nextjs-app-router-vs-pages",
    indexable: true,
    left: {
      id: "app-router",
      label: { en: "App Router", fa: "App Router" },
    },
    right: {
      id: "pages-router",
      label: { en: "Pages Router", fa: "Pages Router" },
    },
    title: {
      en: "Next.js App Router vs Pages Router",
      fa: "App Router در برابر Pages Router",
    },
    metaDescription: {
      en: "Which Next.js routing model to choose for new MVPs in 2026.",
      fa: "کدام مدل مسیریابی Next.js برای MVP جدید در ۲۰۲۶.",
    },
    audience: {
      en: "Teams maintaining Pages apps or starting greenfield.",
      fa: "تیم‌هایی که Pages را نگه می‌دارند یا greenfield شروع می‌کنند.",
    },
    verdict: {
      en: "New builds use App Router — Server Components, layouts, and streaming are the default path. Pages Router stays for stable legacy apps until a phased migration makes sense.",
      fa: "ساخت جدید App Router — Server Component، layout و streaming مسیر پیش‌فرض است. Pages Router برای اپ legacy پایدار تا migration تدریجی منطقی شود.",
    },
    rows: [
      {
        dimension: { en: "New features", fa: "فیچر جدید" },
        left: { en: "Active focus", fa: "تمرکز فعال" },
        right: { en: "Maintenance mode", fa: "حالت نگهداری" },
        winner: "left",
      },
      {
        dimension: { en: "Learning curve", fa: "منحنی یادگیری" },
        left: { en: "Steeper", fa: "شیب‌دارتر" },
        right: { en: "Familiar", fa: "آشنا" },
        winner: "right",
      },
      {
        dimension: { en: "Streaming SSR", fa: "Streaming SSR" },
        left: { en: "First-class", fa: "درجه یک" },
        right: { en: "Limited patterns", fa: "الگوی محدود" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "nextjs-audit",
  },
  {
    slug: "vercel-vs-aws",
    indexable: true,
    left: { id: "vercel", label: { en: "Vercel", fa: "Vercel" } },
    right: { id: "aws", label: { en: "AWS (self-managed)", fa: "AWS (مدیریت خود)" } },
    title: {
      en: "Vercel vs AWS for Next.js",
      fa: "Vercel در برابر AWS برای Next.js",
    },
    metaDescription: {
      en: "Deploy trade-offs for early-stage Next.js — speed, cost, and control.",
      fa: "trade-off deploy برای Next.js early-stage — سرعت، هزینه و کنترل.",
    },
    audience: {
      en: "Founders before DevOps hire.",
      fa: "بنیان‌گذاران قبل از استخدام DevOps.",
    },
    verdict: {
      en: "Vercel minimizes ops during MVP and fits Next.js features natively. AWS wins when compliance, custom networking, or cost at scale require owned infrastructure — often post-PMF.",
      fa: "Vercel ops را در MVP کم می‌کند و با فیچر Next.js بومی جفت است. AWS وقتی compliance، شبکه سفارشی یا هزینه در scale به infra مالک نیاز دارد برنده است — اغلب پس از PMF.",
    },
    rows: [
      {
        dimension: { en: "Ops burden", fa: "بار ops" },
        left: { en: "Very low", fa: "بسیار کم" },
        right: { en: "High without team", fa: "بالا بدون تیم" },
        winner: "left",
      },
      {
        dimension: { en: "Cost at scale", fa: "هزینه در scale" },
        left: { en: "Can grow quickly", fa: "می‌تواند سریع رشد کند" },
        right: { en: "Optimizable", fa: "قابل بهینه‌سازی" },
        winner: "right",
      },
      {
        dimension: { en: "Time to first deploy", fa: "زمان تا اولین deploy" },
        left: { en: "Minutes", fa: "دقیقه" },
        right: { en: "Days–weeks", fa: "روز–هفته" },
        winner: "left",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "stripe-vs-paddle",
    indexable: true,
    left: { id: "stripe", label: { en: "Stripe", fa: "Stripe" } },
    right: { id: "paddle", label: { en: "Paddle", fa: "Paddle" } },
    title: {
      en: "Stripe vs Paddle for SaaS Billing",
      fa: "Stripe در برابر Paddle برای صورتحساب SaaS",
    },
    metaDescription: {
      en: "Merchant of record vs bring-your-own billing — tax, compliance, and DX.",
      fa: "merchant of record در برابر billing خودتان — مالیات، compliance و DX.",
    },
    audience: {
      en: "B2B SaaS selling internationally.",
      fa: "SaaS B2B با فروش بین‌المللی.",
    },
    verdict: {
      en: "Stripe plus Billing gives maximum flexibility and ecosystem integrations. Paddle simplifies VAT/sales tax as merchant of record — pick based on finance team bandwidth, not hype.",
      fa: "Stripe + Billing انعطاف و یکپارچه‌سازی ecosystem بیشتر می‌دهد. Paddle VAT/مالیات فروش را به‌عنوان merchant of record ساده می‌کند — بر اساس bandwidth تیم مالی انتخاب کنید.",
    },
    rows: [
      {
        dimension: { en: "Tax handling", fa: "مدیریت مالیات" },
        left: { en: "Stripe Tax add-on", fa: "افزونه Stripe Tax" },
        right: { en: "Included MoR", fa: "MoR شامل" },
        winner: "right",
      },
      {
        dimension: { en: "Customization", fa: "سفارشی‌سازی" },
        left: { en: "Extensive APIs", fa: "API گسترده" },
        right: { en: "More constrained", fa: "محدودتر" },
        winner: "left",
      },
      {
        dimension: { en: "Fees", fa: "کارمزد" },
        left: { en: "Payment % only*", fa: "فقط % پرداخت*" },
        right: { en: "Higher all-in %", fa: "% all-in بالاتر" },
        winner: "tie",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "graphql-vs-rest",
    indexable: true,
    left: { id: "graphql", label: { en: "GraphQL", fa: "GraphQL" } },
    right: { id: "rest", label: { en: "REST", fa: "REST" } },
    title: {
      en: "GraphQL vs REST for MVPs",
      fa: "GraphQL در برابر REST برای MVP",
    },
    metaDescription: {
      en: "API style choice for early products — complexity vs client flexibility.",
      fa: "انتخاب سبک API برای محصول اولیه — پیچیدگی در برابر انعطاف کلاینت.",
    },
    audience: {
      en: "Teams with web + mobile clients sharing one backend.",
      fa: "تیم با کلاینت وب + موبایل و backend مشترک.",
    },
    verdict: {
      en: "REST (or tRPC inside monolith) is the default for MVPs I ship — simpler caching and fewer operational surprises. GraphQL when multiple clients need flexible field sets and you can invest in schema governance.",
      fa: "REST (یا tRPC داخل monolith) پیش‌فرض MVPهایی است که تحویل می‌دهم — کش ساده‌تر و سورپرایز عملیاتی کمتر. GraphQL وقتی چند کلاینت field set انعطاف‌پذیر می‌خواهند و schema governance دارید.",
    },
    rows: [
      {
        dimension: { en: "MVP speed", fa: "سرعت MVP" },
        left: { en: "Schema + resolvers overhead", fa: "سربار schema + resolver" },
        right: { en: "Simple routes", fa: "route ساده" },
        winner: "right",
      },
      {
        dimension: { en: "Client flexibility", fa: "انعطاف کلاینت" },
        left: { en: "Query exactly what you need", fa: "query دقیقاً آنچه نیاز است" },
        right: { en: "Fixed payloads", fa: "payload ثابت" },
        winner: "left",
      },
      {
        dimension: { en: "Caching", fa: "کش" },
        left: { en: "Harder at HTTP layer", fa: "سخت‌تر در لایه HTTP" },
        right: { en: "HTTP-native", fa: "بومی HTTP" },
        winner: "right",
      },
    ],
    recommendServiceSlug: "saas-mvp",
  },
  {
    slug: "nextjs-vs-nuxt",
    indexable: true,
    left: { id: "nextjs", label: { en: "Next.js", fa: "Next.js" } },
    right: { id: "nuxt", label: { en: "Nuxt", fa: "Nuxt" } },
    title: {
      en: "Next.js vs Nuxt",
      fa: "Next.js در برابر Nuxt",
    },
    metaDescription: {
      en: "React vs Vue meta-frameworks for full-stack MVPs — ecosystem and hiring.",
      fa: "meta-frameworkهای React در برابر Vue برای MVP full-stack — ecosystem و استخدام.",
    },
    audience: {
      en: "Teams choosing between React and Vue ecosystems.",
      fa: "تیم‌هایی که بین ecosystem React و Vue انتخاب می‌کنند.",
    },
    verdict: {
      en: "Pick Next.js when your team or hiring pool is React-first (most US/EU SaaS). Nuxt is excellent for Vue-first teams — both ship production sites; the choice is talent and library fit, not raw capability.",
      fa: "Next.js وقتی تیم یا استخر استخدام React-first است (اکثر SaaS آمریکا/اروپا). Nuxt عالی برای تیم Vue-first — هر دو سایت production می‌فرستند؛ انتخاب talent و fit کتابخانه است.",
    },
    rows: [
      {
        dimension: { en: "Hiring pool", fa: "استخر استخدام" },
        left: { en: "Larger for SaaS", fa: "بزرگ‌تر برای SaaS" },
        right: { en: "Strong in Vue shops", fa: "قوی در shopهای Vue" },
        winner: "left",
      },
      {
        dimension: { en: "DX", fa: "DX" },
        left: { en: "App Router + RSC", fa: "App Router + RSC" },
        right: { en: "Nuxt modules ecosystem", fa: "ecosystem ماژول Nuxt" },
        winner: "tie",
      },
      {
        dimension: { en: "i18n", fa: "i18n" },
        left: { en: "next-intl / built-in patterns", fa: "next-intl / الگوی داخلی" },
        right: { en: "Mature i18n module", fa: "ماژول i18n بالغ" },
        winner: "tie",
      },
    ],
    recommendServiceSlug: "i18n",
  },
];

// --- accessors ---

export function getServiceIndustrySlug(
  serviceSlug: string,
  industryId: string
): string {
  return buildServiceIndustrySlug(serviceSlug, industryId);
}

export function getServiceIndustryPage(slug: string) {
  const match = slug.match(/^(.+)-for-(.+)$/);
  if (!match) return null;
  const [, serviceSlug, industryId] = match;
  const entry = SERVICE_INDUSTRY_ENTRIES.find(
    (item) =>
      item.serviceSlug === serviceSlug && item.industryId === industryId
  );
  if (!entry) return null;

  const industry = PSEO_INDUSTRIES.find((i) => i.id === industryId);
  const service = getServiceLanding(serviceSlug);
  if (!industry || !service) return null;

  return {
    slug,
    ...entry,
    industry,
    service,
  };
}

export function getComparePage(slug: string): ComparePageData | null {
  return COMPARE_PAGES.find((page) => page.slug === slug) ?? null;
}

export const INDEXABLE_SERVICE_INDUSTRY_SLUGS = SERVICE_INDUSTRY_ENTRIES.filter(
  (e) => e.indexable
).map((e) => buildServiceIndustrySlug(e.serviceSlug, e.industryId));

export const INDEXABLE_COMPARE_SLUGS = COMPARE_PAGES.filter(
  (p) => p.indexable
).map((p) => p.slug);

export const ALL_INDEXABLE_PSEO_SLUGS = {
  serviceIndustry: INDEXABLE_SERVICE_INDUSTRY_SLUGS,
  compare: INDEXABLE_COMPARE_SLUGS,
};

export function getPseoPageCount(): number {
  return (
    INDEXABLE_SERVICE_INDUSTRY_SLUGS.length + INDEXABLE_COMPARE_SLUGS.length
  );
}
