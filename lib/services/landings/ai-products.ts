import type { ServiceLanding } from "../types";

export const aiProductsLanding: ServiceLanding = {
  slug: "ai-products",
  tier: 3,
  outcome: {
    en: "Ship AI features users trust — RAG, agents, and integrations with guardrails, not demo-grade wrappers.",
    fa: "قابلیت AI که کاربر به آن اعتماد کند — RAG، agent و یکپارچه‌سازی با guardrail، نه wrapper دمو.",
  },
  title: {
    en: "AI Product Development",
    fa: "توسعه محصول AI",
  },
  metaDescription: {
    en: "Production AI product engineering: RAG pipelines, LLM integrations, evaluation, and cost controls. For SaaS teams adding AI to core workflows.",
    fa: "مهندسی محصول AI در production: pipeline RAG، یکپارچه‌سازی LLM، ارزیابی و کنترل هزینه. برای تیم SaaS که AI را به workflow هسته اضافه می‌کنند.",
  },
  icp: {
    en: "B2B SaaS founders and product teams adding copilots, search, or automation — who need architecture beyond a ChatGPT iframe.",
    fa: "بنیان‌گذاران B2B SaaS و تیم محصول که copilot، جستجو یا اتوماسیون اضافه می‌کنند — و به معماری فراتر از iframe ChatGPT نیاز دارند.",
  },
  timeline: {
    en: "6–16 weeks depending on data readiness. Phase 1 (2 weeks): data audit + eval framework. Phase 2+: feature delivery with weekly demos.",
    fa: "۶–۱۶ هفته بسته به آمادگی داده. فاز ۱ (۲ هفته): ممیزی داده + چارچوب eval. فاز ۲+: تحویل قابلیت با دمو هفتگی.",
  },
  startingFrom: {
    en: "$25K (typical copilot/RAG scope)",
    fa: "از ۲۵٬۰۰۰ دلار (دامنه معمول copilot/RAG)",
  },
  deliverables: {
    en: [
      "RAG or agent architecture doc",
      "Ingestion + chunking pipeline",
      "Prompt/version management strategy",
      "Eval suite (golden questions + regression)",
      "Cost & latency monitoring hooks",
      "Production deployment + handoff",
    ],
    fa: [
      "سند معماری RAG یا agent",
      "Pipeline ingestion + chunking",
      "استراتژی prompt/نسخه‌بندی",
      "سوییت eval (سؤالات طلایی + regression)",
      "قلاب monitoring هزینه و latency",
      "Deploy production + تحویل",
    ],
  },
  sections: [
    {
      heading: {
        en: "What production AI actually requires",
        fa: "AI production واقعاً چه می‌خواهد",
      },
      body: {
        en: "Reliable AI products need retrieval quality, hallucination controls, eval datasets, and observability — not just an API key. I design pipelines where bad answers are measurable, costs are capped, and humans stay in the loop for high-stakes actions.",
        fa: "محصول AI قابل اعتماد به کیفیت retrieval، کنترل hallucination، داده eval و observability نیاز دارد — نه فقط API key. pipeline طراحی می‌کنم که پاسخ بد قابل اندازه‌گیری، هزینه سقف‌دار و انسان در حلقه برای اقدامات پرریسک بماند.",
      },
    },
    {
      heading: {
        en: "RAG vs fine-tuning — practical default",
        fa: "RAG در برابر fine-tuning — پیش‌فرض عملی",
      },
      body: {
        en: "For most SaaS products, RAG on your docs and structured data wins first: faster iteration, clearer debugging, lower lock-in. Fine-tuning is scoped only when evals prove retrieval alone cannot hit quality bars. ADRs document the choice for your team and investors.",
        fa: "برای بیشتر محصولات SaaS، RAG روی doc و داده ساختاریافته اول برنده است: iteration سریع‌تر، debug شفاف‌تر، lock-in کمتر. fine-tuning فقط وقتی scope می‌شود که eval ثابت کند retrieval تنها به bar کیفیت نمی‌رسد. ADR انتخاب را برای تیم و سرمایه‌گذار مستند می‌کند.",
      },
    },
    {
      heading: {
        en: "Evaluation before launch",
        fa: "ارزیابی قبل از لانچ",
      },
      body: {
        en: "Every engagement ships a golden-question set and regression checks — so prompt or model changes do not silently break UX. We track answer faithfulness, citation coverage, latency p95, and cost per successful task. Launch criteria are agreed in writing during discovery.",
        fa: "هر همکاری مجموعه سؤال طلایی و چک regression تحویل می‌دهد — تا تغییر prompt یا model بی‌صدا UX را نشکند. faithfulness پاسخ، پوشش citation، latency p95 و هزینه هر task موفق ردیابی می‌شود. معیار لانچ در discovery مکتوب توافق می‌شود.",
      },
    },
    {
      heading: {
        en: "Security and data handling",
        fa: "امنیت و مدیریت داده",
      },
      body: {
        en: "PII redaction, tenant isolation for multi-tenant SaaS, and provider selection (OpenAI, Anthropic, open models via OpenRouter) based on your compliance needs. No training on your customer data without explicit contract terms — architecture docs spell out data flows.",
        fa: "حذف PII، جداسازی tenant برای SaaS چندمستأجره و انتخاب provider (OpenAI، Anthropic، مدل باز via OpenRouter) بر اساس compliance شما. بدون آموزش روی داده مشتری بدون شرط صریح قرارداد — سند معماری جریان داده را روشن می‌کند.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Do you build custom models?",
        answer:
          "I integrate and orchestrate existing models. Custom training is out of scope unless paired with a specialized ML partner — I own the product layer and eval.",
      },
      {
        question: "What if our data is messy?",
        answer:
          "The discovery phase includes a data readiness audit. Many projects start with a 2-week cleanup + ingestion sprint before user-facing AI ships.",
      },
      {
        question: "Ongoing model updates?",
        answer:
          "Handoff includes runbooks for prompt updates and eval reruns. Retainer or subscription tiers cover continuous improvement after launch.",
      },
    ],
    fa: [
      {
        question: "مدل سفارشی می‌سازید؟",
        answer:
          "مدل‌های موجود را یکپارچه و orchestrate می‌کنم. آموزش سفارشی خارج از scope است مگر با شریک ML تخصصی — لایه محصول و eval با من است.",
      },
      {
        question: "اگر داده ما نامرتب است؟",
        answer:
          "فاز discovery شامل ممیزی آمادگی داده است. بسیاری پروژه با اسپرینت ۲ هفته‌ای پاکسازی + ingestion قبل از AI روبروی کاربر شروع می‌شوند.",
      },
      {
        question: "به‌روزرسانی مدل مستمر؟",
        answer:
          "تحویل runbook برای به‌روزرسانی prompt و اجرای مجدد eval دارد. retainer یا tier اشتراک بهبود مستمر بعد از لانچ را پوشش می‌دهد.",
      },
    ],
  },
};
