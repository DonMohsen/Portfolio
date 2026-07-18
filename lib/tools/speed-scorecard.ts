import type { LocalizedText } from "@/lib/services/types";

export type SpeedStrategy = "mobile" | "desktop";

export type SpeedMetrics = {
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  fcpMs: number | null;
  ttfbMs: number | null;
  performanceScore: number | null;
};

export type SpeedGrade = "good" | "needs-improvement" | "poor";

export type SpeedRecommendation = {
  id: string;
  priority: "high" | "medium";
  title: LocalizedText;
  detail: LocalizedText;
};

export type SpeedCheckResult = {
  url: string;
  strategy: SpeedStrategy;
  metrics: SpeedMetrics;
  grade: SpeedGrade;
  recommendations: SpeedRecommendation[];
  usedPageSpeedApi: boolean;
  summaryEn: string;
  summaryFa: string;
};

function msToSec(ms: number | null): string {
  if (ms == null) return "—";
  return `${(ms / 1000).toFixed(2)}s`;
}

function gradeMetric(
  value: number | null,
  good: number,
  poor: number,
  lowerIsBetter = true
): SpeedGrade {
  if (value == null) return "needs-improvement";
  if (lowerIsBetter) {
    if (value <= good) return "good";
    if (value <= poor) return "needs-improvement";
    return "poor";
  }
  if (value >= good) return "good";
  if (value >= poor) return "needs-improvement";
  return "poor";
}

export function buildSpeedRecommendations(
  metrics: SpeedMetrics
): SpeedRecommendation[] {
  const items: SpeedRecommendation[] = [];

  if (metrics.lcpMs != null && metrics.lcpMs > 2500) {
    items.push({
      id: "lcp",
      priority: metrics.lcpMs > 4000 ? "high" : "medium",
      title: {
        en: "Improve Largest Contentful Paint (LCP)",
        fa: "بهبود LCP",
      },
      detail: {
        en: "Optimize hero images (WebP/AVIF), use Next.js Image, preload LCP asset, reduce server TTFB.",
        fa: "بهینه‌سازی تصاویر hero (WebP/AVIF)، Next.js Image، preload دارایی LCP، کاهش TTFB سرور.",
      },
    });
  }

  if (metrics.cls != null && metrics.cls > 0.1) {
    items.push({
      id: "cls",
      priority: metrics.cls > 0.25 ? "high" : "medium",
      title: {
        en: "Reduce layout shift (CLS)",
        fa: "کاهش جابجایی layout (CLS)",
      },
      detail: {
        en: "Set width/height on images and embeds, reserve ad slots, avoid injecting content above the fold.",
        fa: "عرض/ارتفاع برای تصاویر و embedها، رزرو جای تبلیغ، جلوگیری از inject محتوا بالای fold.",
      },
    });
  }

  if (metrics.inpMs != null && metrics.inpMs > 200) {
    items.push({
      id: "inp",
      priority: "high",
      title: {
        en: "Improve interaction responsiveness (INP)",
        fa: "بهبود واکنش‌پذیری تعامل (INP)",
      },
      detail: {
        en: "Split long tasks, defer non-critical JS, audit third-party scripts, use server components where possible.",
        fa: "تقسیم taskهای طولانی، defer کردن JS غیرضروری، ممیزی اسکریپت‌های third-party، server components.",
      },
    });
  }

  if (metrics.ttfbMs != null && metrics.ttfbMs > 800) {
    items.push({
      id: "ttfb",
      priority: "medium",
      title: {
        en: "Lower Time to First Byte (TTFB)",
        fa: "کاهش TTFB",
      },
      detail: {
        en: "Edge caching, CDN, database query optimization, and streaming SSR on Next.js.",
        fa: "کش edge، CDN، بهینه‌سازی query دیتابیس و streaming SSR در Next.js.",
      },
    });
  }

  if (
    metrics.performanceScore != null &&
    metrics.performanceScore < 70 &&
    items.length === 0
  ) {
    items.push({
      id: "audit",
      priority: "high",
      title: {
        en: "Full Next.js performance audit",
        fa: "ممیزی کامل performance در Next.js",
      },
      detail: {
        en: "Bundle analysis, Core Web Vitals tracing, and a prioritized fix roadmap — typical engagement starts with a performance audit.",
        fa: "تحلیل bundle، ردیابی Core Web Vitals و نقشه راه اصلاح — معمولاً با ممیزی performance شروع می‌شود.",
      },
    });
  }

  return items;
}

export function buildSpeedCheckResult(
  url: string,
  strategy: SpeedStrategy,
  metrics: SpeedMetrics,
  usedPageSpeedApi: boolean
): SpeedCheckResult {
  const grades = [
    gradeMetric(metrics.lcpMs, 2500, 4000),
    gradeMetric(metrics.cls, 0.1, 0.25),
    gradeMetric(metrics.inpMs, 200, 500),
    gradeMetric(metrics.performanceScore, 90, 50, false),
  ];

  const grade: SpeedGrade = grades.includes("poor")
    ? "poor"
    : grades.includes("needs-improvement")
      ? "needs-improvement"
      : "good";

  const recommendations = buildSpeedRecommendations(metrics);

  const summaryEn = `Performance (${strategy}): score ${metrics.performanceScore ?? "—"}, LCP ${msToSec(metrics.lcpMs)}, CLS ${metrics.cls?.toFixed(3) ?? "—"}, INP ${msToSec(metrics.inpMs)}.`;
  const summaryFa = `عملکرد (${strategy}): امتیاز ${metrics.performanceScore ?? "—"}، LCP ${msToSec(metrics.lcpMs)}، CLS ${metrics.cls?.toFixed(3) ?? "—"}، INP ${msToSec(metrics.inpMs)}.`;

  return {
    url,
    strategy,
    metrics,
    grade,
    recommendations,
    usedPageSpeedApi,
    summaryEn,
    summaryFa,
  };
}

export const SPEED_SCORECARD_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "How accurate is this speed test?",
      fa: "این تست سرعت چقدر دقیق است؟",
    },
    answer: {
      en: "With a PageSpeed API key we use Google Lighthouse data. Otherwise a lightweight probe estimates TTFB — book an audit for lab + field data.",
      fa: "با API کلید PageSpeed از داده Lighthouse استفاده می‌شود. در غیر این صورت TTFB تخمینی است — برای داده lab+field ممیزی رزرو کنید.",
    },
  },
  {
    question: {
      en: "Can you fix my Core Web Vitals?",
      fa: "می‌توانید Core Web Vitals من را درست کنید؟",
    },
    answer: {
      en: "Yes — Next.js audit engagements target LCP, CLS, and INP with measurable before/after metrics. See /services/nextjs-audit.",
      fa: "بله — ممیزی Next.js روی LCP، CLS و INP با متریک before/after — /services/nextjs-audit",
    },
  },
];
