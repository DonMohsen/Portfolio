import type { ServiceLanding } from "../types";

export const automationLanding: ServiceLanding = {
  slug: "automation",
  tier: 2,
  outcome: {
    en: "Replace manual ops with reliable automation — integrations, workflows, and dashboards your team actually uses.",
    fa: "جایگزینی ops دستی با اتوماسیون قابل اعتماد — یکپارچه‌سازی، workflow و داشبوردی که تیم واقعاً استفاده می‌کند.",
  },
  title: {
    en: "Automation Systems",
    fa: "سیستم‌های اتوماسیون",
  },
  metaDescription: {
    en: "Custom automation blueprints: API integrations, webhook pipelines, internal tools, and monitoring. Reduce manual work with owned infrastructure.",
    fa: "Blueprint اتوماسیون سفارشی: یکپارچه‌سازی API، pipeline webhook، ابزار داخلی و monitoring. کاهش کار دستی با زیرساخت مالکیت‌شده.",
  },
  icp: {
    en: "Operations-heavy startups and SMBs drowning in spreadsheets, Slack copy-paste, and brittle Zapier chains that break at scale.",
    fa: "استارتاپ‌ها و SMBهای ops-heavy غرق در spreadsheet، copy-paste اسلک و زنجیره Zapier شکننده در scale.",
  },
  timeline: {
    en: "4–10 weeks. Discovery (1 week) maps systems and failure modes; build sprints deliver one automation lane at a time with demos.",
    fa: "۴–۱۰ هفته. discovery (۱ هفته) سیستم‌ها و حالت شکست را نقشه می‌کند؛ اسپرینت ساخت هر بار یک lane اتوماسیون با دمو تحویل می‌دهد.",
  },
  startingFrom: {
    en: "$12K",
    fa: "از ۱۲٬۰۰۰ دلار",
  },
  deliverables: {
    en: [
      "Automation blueprint (systems map + priorities)",
      "Integration layer (APIs, webhooks, queues)",
      "Internal admin or ops dashboard",
      "Error alerting + retry logic",
      "Documentation + runbook",
    ],
    fa: [
      "Blueprint اتوماسیون (نقشه سیستم + اولویت‌ها)",
      "لایه یکپارچه‌سازی (API، webhook، صف)",
      "داشبورد ادمین یا ops داخلی",
      "هشدار خطا + منطق retry",
      "مستندات + runbook",
    ],
  },
  sections: [
    {
      heading: {
        en: "When Zapier is not enough",
        fa: "وقتی Zapier کافی نیست",
      },
      body: {
        en: "No-code tools excel at prototypes. Production automation needs idempotency, audit logs, tenant-aware credentials, and failure recovery — especially when money or customer data moves. I build owned Node/Next services you can extend, not opaque zap chains nobody understands.",
        fa: "ابزار no-code در پروتوتایپ عالی‌اند. اتوماسیون production به idempotency، لاگ audit، credential آگاه به tenant و بازیابی شکست نیاز دارد — به‌ویژه وقتی پول یا داده مشتری جابه‌جا می‌شود. سرویس Node/Next مالکیت‌شده می‌سازم که بتوانید گسترش دهید، نه زنجیره zap مبهم.",
      },
    },
    {
      heading: {
        en: "Typical automation lanes",
        fa: "laneهای معمول اتوماسیون",
      },
      body: {
        en: "CRM ↔ product sync, billing webhooks, lead routing, report generation, Slack/Teams notifications with context, and scheduled data pipelines. Each lane ships with monitoring — you know within minutes when something fails, not when a customer complains.",
        fa: "همگام‌سازی CRM ↔ محصول، webhook billing، مسیریابی lead، تولید گزارش، اعلان Slack/Teams با context و pipeline داده زمان‌بندی‌شده. هر lane با monitoring تحویل می‌شود — ظرف دقیقه می‌دانید چیزی شکسته، نه وقتی مشتری شکایت می‌کند.",
      },
    },
    {
      heading: {
        en: "Blueprint-first delivery",
        fa: "تحویل blueprint-first",
      },
      body: {
        en: "Week one produces a systems diagram, risk map, and ranked automation backlog — so you can pause after planning if budget shifts. Implementation milestones tie to measurable hours saved or error rates reduced, not vanity integrations.",
        fa: "هفته اول نمودار سیستم، نقشه ریسک و backlog اتوماسیون رتبه‌بندی‌شده تحویل می‌دهد — تا اگر بودجه عوض شد بعد از برنامه‌ریزی توقف کنید. milestone پیاده‌سازی به ساعت ذخیره‌شده یا نرخ خطای کاهش‌یافته قابل اندازه‌گیری گره می‌خورد.",
      },
    },
    {
      heading: {
        en: "Handoff and maintenance",
        fa: "تحویل و نگهداری",
      },
      body: {
        en: "You receive code in your org, env docs, and a runbook for common failures. Subscription or retainer tiers cover new lanes and provider API changes — the same architecture owner, no context rebuild every quarter.",
        fa: "کد در org شما، مستندات env و runbook برای شکست‌های رایج دریافت می‌کنید. tier اشتراک یا retainer lane جدید و تغییر API provider را پوشش می‌دهد — همان مالک معماری، بدون rebuild context هر فصل.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "n8n, Make, or custom code?",
        answer:
          "I recommend per use case in the blueprint. High-volume or compliance paths get custom services; simpler flows may stay on managed tools with documented exports.",
      },
      {
        question: "Do you access our CRM and billing?",
        answer:
          "Read-only discovery first. Implementation uses scoped API keys and secrets in your vault — never shared across clients.",
      },
    ],
    fa: [
      {
        question: "n8n، Make یا کد سفارشی؟",
        answer:
          "در blueprint per use case پیشنهاد می‌دهم. مسیرهای پرحجم یا compliance سرویس سفارشی می‌گیرند؛ جریان‌های ساده‌تر ممکن است روی ابزار managed با export مستند بمانند.",
      },
      {
        question: "به CRM و billing ما دسترسی دارید؟",
        answer:
          "اول discovery فقط read-only. پیاده‌سازی از API key محدود و secret در vault شما استفاده می‌کند — هرگز بین مشتریان مشترک نیست.",
      },
    ],
  },
};
