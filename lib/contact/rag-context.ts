import { FIRST_90_DAYS, PROCESS_STEPS } from "@/lib/process/content";
import { CASE_STUDY_SEEDS } from "@/lib/projects/case-study-seeds";
import { SERVICE_LANDINGS } from "@/lib/services/catalog";
import { resolveSiteUrl } from "@/lib/metadata-base";
import {
  JOB_TITLE_EN,
  JOB_TITLE_FA,
  PERSON_DESCRIPTION_EN,
  PERSON_DESCRIPTION_FA,
} from "@/lib/seo/person-json-ld";
import {
  SITE_AVAILABILITY_EN,
  SITE_AVAILABILITY_FA,
  SITE_EMAIL,
  SITE_NAME,
  SITE_RESPONSE_TIME_EN,
  SITE_RESPONSE_TIME_FA,
} from "@/lib/site";

export type RagCategory =
  | "identity"
  | "service"
  | "case-study"
  | "faq"
  | "process";

export type RagChunk = {
  id: string;
  category: RagCategory;
  keywords: string[];
  titleEn: string;
  titleFa: string;
  bodyEn: string;
  bodyFa: string;
  serviceSlug?: string;
  caseStudySlug?: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function buildKnowledgeBase(): RagChunk[] {
  const chunks: RagChunk[] = [
    {
      id: "identity-core",
      category: "identity",
      keywords: [
        "mohsen",
        "محسن",
        "hire",
        "استخدام",
        "contact",
        "تماس",
        "availability",
        "product engineer",
      ],
      titleEn: "Who Mohsen is",
      titleFa: "محسن کیست",
      bodyEn: `${SITE_NAME} — ${JOB_TITLE_EN}. ${PERSON_DESCRIPTION_EN} ${SITE_AVAILABILITY_EN}. ${SITE_RESPONSE_TIME_EN}. Email: ${SITE_EMAIL}.`,
      bodyFa: `${SITE_NAME} — ${JOB_TITLE_FA}. ${PERSON_DESCRIPTION_FA} ${SITE_AVAILABILITY_FA}. ${SITE_RESPONSE_TIME_FA}. ایمیل: ${SITE_EMAIL}.`,
    },
    {
      id: "discovery-sprint",
      category: "process",
      keywords: [
        "discovery",
        "sprint",
        "free call",
        "کشف",
        "تماس رایگان",
        "consultation",
        "مشاوره",
      ],
      titleEn: "Free discovery sprint (Tier 0)",
      titleFa: "کشف رایگان (Tier 0)",
      bodyEn:
        "30-minute discovery call — no hard sell. Outcome: fit assessment, risk map, and whether a fixed-scope engagement makes sense. Book via /contact?tab=schedule.",
      bodyFa:
        "تماس کشف ۳۰ دقیقه‌ای — بدون فشار فروش. خروجی: ارزیابی fit، نقشه ریسک و اینکه قرارداد fixed-scope منطقی است یا نه. رزرو: /contact?tab=schedule",
    },
  ];

  for (const step of PROCESS_STEPS) {
    chunks.push({
      id: `process-${step.id}`,
      category: "process",
      keywords: [
        step.id,
        step.title.en.toLowerCase(),
        step.title.fa,
        "process",
        "فرآیند",
        "delivery",
        "تحویل",
      ],
      titleEn: `Process: ${step.title.en}`,
      titleFa: `فرآیند: ${step.title.fa}`,
      bodyEn: `${step.summary.en} Deliverables: ${step.deliverables.en.join("; ")}.`,
      bodyFa: `${step.summary.fa} خروجی‌ها: ${step.deliverables.fa.join("؛ ")}.`,
    });
  }

  chunks.push({
    id: "process-first-90",
    category: "process",
    keywords: ["90 days", "ninety", "۹۰ روز", "first 90", "timeline", "تایم‌لاین"],
    titleEn: FIRST_90_DAYS.title.en,
    titleFa: FIRST_90_DAYS.title.fa,
    bodyEn: `${FIRST_90_DAYS.subtitle.en} Phases: ${FIRST_90_DAYS.phases.map((p) => p.title.en).join(" → ")}.`,
    bodyFa: `${FIRST_90_DAYS.subtitle.fa} فازها: ${FIRST_90_DAYS.phases.map((p) => p.title.fa).join(" ← ")}.`,
  });

  for (const service of SERVICE_LANDINGS) {
    chunks.push({
      id: `service-${service.slug}`,
      category: "service",
      keywords: [
        service.slug,
        service.slug.replace(/-/g, " "),
        service.title.en.toLowerCase(),
        service.title.fa,
        service.outcome.en.toLowerCase(),
        service.outcome.fa,
        service.icp.en.toLowerCase(),
        service.icp.fa,
        "service",
        "خدمات",
      ],
      titleEn: service.title.en,
      titleFa: service.title.fa,
      bodyEn: `Outcome: ${service.outcome.en}. For: ${service.icp.en}. Timeline: ${service.timeline.en}. Starting: ${service.startingFrom.en}. Deliverables: ${service.deliverables.en.join("; ")}.`,
      bodyFa: `نتیجه: ${service.outcome.fa}. مخاطب: ${service.icp.fa}. زمان: ${service.timeline.fa}. شروع از: ${service.startingFrom.fa}. خروجی‌ها: ${service.deliverables.fa.join("؛ ")}.`,
      serviceSlug: service.slug,
    });

    for (const [lang, items] of [
      ["en", service.faq.en],
      ["fa", service.faq.fa],
    ] as const) {
      items.forEach((item, index) => {
        chunks.push({
          id: `faq-${service.slug}-${lang}-${index}`,
          category: "faq",
          keywords: [
            service.slug,
            ...tokenize(item.question),
            ...tokenize(item.answer),
          ],
          titleEn: item.question,
          titleFa: service.faq.fa[index]?.question ?? item.question,
          bodyEn: item.answer,
          bodyFa: service.faq.fa[index]?.answer ?? item.answer,
          serviceSlug: service.slug,
        });
      });
    }
  }

  for (const seed of CASE_STUDY_SEEDS) {
    const problem = stripHtml(seed.problemHtml).slice(0, 280);
    const change = stripHtml(seed.changeHtml).slice(0, 280);
    chunks.push({
      id: `case-${seed.slug}`,
      category: "case-study",
      keywords: [
        seed.slug,
        seed.name.toLowerCase(),
        seed.industry.toLowerCase(),
        seed.outcomeMetric.toLowerCase(),
        seed.role.toLowerCase(),
        "case study",
        "نمونه کار",
        "portfolio",
      ],
      titleEn: seed.name,
      titleFa: seed.name,
      bodyEn: `Industry: ${seed.industry}. Outcome: ${seed.outcomeMetric}. Problem: ${problem}. Change: ${change}. Metrics: ${seed.metricsJson.map((m) => `${m.label} ${m.before}→${m.after}`).join("; ")}.`,
      bodyFa: `صنعت: ${seed.industry}. نتیجه: ${seed.outcomeMetric}. مسئله: ${problem}. تغییر: ${change}.`,
      caseStudySlug: seed.slug,
    });
  }

  return chunks;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

export function retrieveRagContext(
  query: string,
  options?: { topK?: number }
): RagChunk[] {
  const topK = options?.topK ?? 6;
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return KNOWLEDGE_BASE.filter((chunk) => chunk.category === "identity").slice(
      0,
      2
    );
  }

  const scored = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const keywordSet = new Set(chunk.keywords.map((k) => k.toLowerCase()));

    for (const token of tokens) {
      if (keywordSet.has(token)) score += 4;
      if (chunk.id.includes(token)) score += 2;
      if (chunk.titleEn.toLowerCase().includes(token)) score += 2;
      if (chunk.titleFa.includes(token)) score += 2;
      if (chunk.bodyEn.toLowerCase().includes(token)) score += 1;
      if (chunk.bodyFa.includes(token)) score += 1;
    }

    if (chunk.category === "identity") score += 0.5;

    return { chunk, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const selected = scored.slice(0, topK).map((item) => item.chunk);

  if (!selected.some((c) => c.category === "identity")) {
    const identity = KNOWLEDGE_BASE.find((c) => c.id === "identity-core");
    if (identity) selected.unshift(identity);
  }

  return selected.slice(0, topK + 1);
}

const SERVICE_INTENT: Array<{
  slug: string;
  patterns: RegExp;
}> = [
  {
    slug: "saas-mvp",
    patterns:
      /saas|mvp|startup|founder|90\s*day|product.?market|بنیان.?گذار|استارتاپ|محصول|mvp/i,
  },
  {
    slug: "nextjs-audit",
    patterns:
      /next\.?js|audit|performance|lcp|cls|core web vitals|speed|ممیزی|سرعت|nextjs/i,
  },
  {
    slug: "ai-products",
    patterns: /ai\b|rag\b|llm|chatbot|openai|machine learning|هوش مصنوعی|چت.?بات/i,
  },
  {
    slug: "automation",
    patterns: /automation|webhook|zapier|integrat|workflow|اتوماسیون|یکپارچه/i,
  },
  {
    slug: "i18n",
    patterns: /i18n|rtl|multilingual|locale|hreflang|چندزبانه|فارسی|عربی/i,
  },
  {
    slug: "fractional-cto",
    patterns: /fractional|cto\b|technical lead|retainer|مشاوره فنی|مدیر فنی/i,
  },
  {
    slug: "subscription",
    patterns: /subscription|retainer|monthly|mrr|اشتراک|ماهانه/i,
  },
];

const CASE_INTENT: Array<{ slug: string; patterns: RegExp }> = [
  {
    slug: "lumina-analytics-console",
    patterns: /analytics|dashboard|saas|realtime|log|داشبورد|تحلیل/i,
  },
  {
    slug: "orbit-commerce-studio",
    patterns: /ecommerce|commerce|checkout|marketplace|فروشگاه|چک.?اوت/i,
  },
  {
    slug: "nebula-docs-platform",
    patterns: /docs|documentation|api|developer|مستندات|توسعه.?دهنده/i,
  },
];

export type AdvisorIntent = {
  isSerious: boolean;
  suggestDiscovery: boolean;
  suggestedServiceSlug: string | null;
  suggestedCaseStudySlug: string | null;
};

export function analyzeAdvisorIntent(
  messages: Array<{ role: string; content: string }>
): AdvisorIntent {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");

  const seriousPattern =
    /budget|timeline|hire|mvp|retainer|quote|price|cost|build my|need a dev|looking for|project|بودجه|تایم|لاین|قیمت|هزینه|استخدام|پروژه|می.?خوام|نیاز دارم|بساز/i;

  const isSerious = seriousPattern.test(userText);
  const suggestDiscovery = isSerious || messages.filter((m) => m.role === "user").length >= 2;

  let suggestedServiceSlug: string | null = null;
  for (const entry of SERVICE_INTENT) {
    if (entry.patterns.test(userText)) {
      suggestedServiceSlug = entry.slug;
      break;
    }
  }

  let suggestedCaseStudySlug: string | null = null;
  for (const entry of CASE_INTENT) {
    if (entry.patterns.test(userText)) {
      suggestedCaseStudySlug = entry.slug;
      break;
    }
  }

  if (!suggestedCaseStudySlug && suggestedServiceSlug) {
    const serviceToCase: Record<string, string> = {
      "saas-mvp": "lumina-analytics-console",
      "nextjs-audit": "lumina-analytics-console",
      "ai-products": "lumina-analytics-console",
      automation: "lumina-analytics-console",
      i18n: "orbit-commerce-studio",
      "fractional-cto": "nebula-docs-platform",
      subscription: "lumina-analytics-console",
    };
    suggestedCaseStudySlug =
      serviceToCase[suggestedServiceSlug] ?? "lumina-analytics-console";
  }

  return {
    isSerious,
    suggestDiscovery,
    suggestedServiceSlug,
    suggestedCaseStudySlug,
  };
}

export function buildAdvisorSystemPrompt(
  locale: "fa" | "en",
  chunks: RagChunk[]
): string {
  const siteUrl = resolveSiteUrl();
  const isFa = locale === "fa";
  const schedulePath = `${siteUrl}/${locale}/contact?tab=schedule&source=ai-advisor`;
  const briefPath = `${siteUrl}/${locale}/contact?tab=brief&source=ai-advisor`;
  const toolsPath = `${siteUrl}/${locale}/tools/project-estimator`;

  const contextBlock = chunks
    .map((chunk) => {
      const title = isFa ? chunk.titleFa : chunk.titleEn;
      const body = isFa ? chunk.bodyFa : chunk.bodyEn;
      let link = "";
      if (chunk.caseStudySlug) {
        link = ` Link: ${siteUrl}/${locale}/work/${chunk.caseStudySlug}`;
      } else if (chunk.serviceSlug) {
        link = ` Link: ${siteUrl}/${locale}/services/${chunk.serviceSlug}`;
      }
      return `### ${title}\n${body}${link}`;
    })
    .join("\n\n");

  if (isFa) {
    return `تو مشاور پروژه AI برای ${SITE_NAME} هستی. فقط از «CONTEXT» زیر پاسخ بده — حدس نزن.

CONTEXT:
${contextBlock}

قوانین:
1. فقط scope خدمات محسن — سوال نامرتبط را مودبانه رد کن.
2. پاسخ کوتاه (۲–۴ جمله) مگر کاربر جزئیات بخواهد.
3. fit را صادقانه بگو — اگر خارج از scope است، بگو.
4. برای lead جدی: Discovery Sprint رایگان پیشنهاد بده: ${schedulePath}
5. فرم brief: ${briefPath}
6. برآورد هزینه: ${toolsPath}
7. قیمت قطعی بدون discovery نده — tier و بازه را از context استفاده کن.
8. case study مرتبط را با نام و لینک ذکر کن.`;
  }

  return `You are the AI project advisor for ${SITE_NAME}. Answer ONLY from the CONTEXT below — do not invent facts.

CONTEXT:
${contextBlock}

Rules:
1. Stay in Mohsen's portfolio scope — decline unrelated questions politely.
2. Keep replies practical (2–4 sentences unless depth is requested).
3. Assess fit honestly — say when something is out of scope.
4. For serious leads, recommend the free discovery sprint: ${schedulePath}
5. Structured brief: ${briefPath}
6. Cost estimator tool: ${toolsPath}
7. No exact quotes without discovery — use tiers/ranges from context.
8. Cite relevant case studies by name with links when applicable.`;
}

/** @deprecated Use buildAdvisorSystemPrompt with RAG chunks */
export function buildPortfolioSystemPrompt(locale: "fa" | "en"): string {
  return buildAdvisorSystemPrompt(
    locale,
    KNOWLEDGE_BASE.filter((c) =>
      ["identity", "service", "case-study"].includes(c.category)
    ).slice(0, 8)
  );
}

export { KNOWLEDGE_BASE };
