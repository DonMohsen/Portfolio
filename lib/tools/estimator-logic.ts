import { CASE_STUDY_SEEDS } from "@/lib/projects/case-study-seeds";
import {
  ESTIMATOR_PRICING,
  type FeatureId,
  type ProjectTypeId,
  type TimelineId,
} from "@/lib/tools/estimator-config";

export type EstimatorInput = {
  projectType: ProjectTypeId;
  features: FeatureId[];
  timeline: TimelineId;
  locale: string;
};

export type EstimatorResult = {
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
  currency: string;
  matchedCaseStudy: {
    slug: string;
    name: string;
    outcomeMetric: string;
    industry: string;
  };
  breakdown: Array<{
    id: string;
    labelEn: string;
    labelFa: string;
    min: number;
    max: number;
  }>;
  summaryEn: string;
  summaryFa: string;
  contactPrefill: {
    projectType: string;
    budgetRange: string;
    timeline: string;
    message: string;
  };
};

const TYPE_CASE_STUDY_BIAS: Record<ProjectTypeId, string[]> = {
  saas: ["lumina-analytics-console"],
  marketplace: ["orbit-commerce-studio"],
  ai: ["lumina-analytics-console"],
  automation: ["lumina-analytics-console", "nebula-docs-platform"],
  mobile: ["orbit-commerce-studio"],
  other: ["nebula-docs-platform"],
};

const FEATURE_CASE_STUDY_BIAS: Partial<Record<FeatureId, string[]>> = {
  dashboard: ["lumina-analytics-console"],
  realtime: ["lumina-analytics-console"],
  i18n: ["orbit-commerce-studio"],
  billing: ["orbit-commerce-studio"],
  ai: ["lumina-analytics-console"],
};

function roundToThousands(value: number): number {
  return Math.round(value / 500) * 500;
}

function budgetRangeKey(min: number, max: number): string {
  const midpoint = (min + max) / 2;
  if (midpoint < 5000) return "under-5k";
  if (midpoint < 15000) return "5k-15k";
  if (midpoint < 50000) return "15k-50k";
  return "50k-plus";
}

function timelineContactKey(timeline: TimelineId): string {
  if (timeline === "rush") return "asap";
  if (timeline === "flexible") return "3-6m";
  return "1-3m";
}

function inquiryProjectType(projectType: ProjectTypeId): string {
  const map: Record<ProjectTypeId, string> = {
    saas: "saas-mvp",
    marketplace: "saas-mvp",
    ai: "ai-products",
    automation: "automation",
    mobile: "other",
    other: "other",
  };
  return map[projectType];
}

export function computeEstimate(input: EstimatorInput): EstimatorResult {
  const { projectType, features, timeline } = input;
  const base = ESTIMATOR_PRICING.baseByType[projectType];
  const multiplier = ESTIMATOR_PRICING.timelineMultipliers[timeline];

  let featureMin = 0;
  let featureMax = 0;
  const breakdown: EstimatorResult["breakdown"] = [
    {
      id: "base",
      labelEn: `Base — ${projectType}`,
      labelFa: `پایه — ${projectType}`,
      min: base.min,
      max: base.max,
    },
  ];

  for (const feature of features) {
    const addon = ESTIMATOR_PRICING.featureAddons[feature];
    featureMin += addon.min;
    featureMax += addon.max;
    breakdown.push({
      id: feature,
      labelEn: `Feature — ${feature}`,
      labelFa: `فیچر — ${feature}`,
      min: addon.min,
      max: addon.max,
    });
  }

  const rawMin = (base.min + featureMin) * multiplier.price;
  const rawMax = (base.max + featureMax) * multiplier.price;
  const priceMin = roundToThousands(rawMin);
  const priceMax = roundToThousands(Math.max(rawMin + 5000, rawMax));

  const weeksMin = Math.max(
    4,
    Math.round(base.weeksMin * multiplier.weeks)
  );
  const weeksMax = Math.max(
    weeksMin + 2,
    Math.round(base.weeksMax * multiplier.weeks)
  );

  const matched = matchCaseStudy(projectType, features);
  const budgetRange = budgetRangeKey(priceMin, priceMax);

  const summaryEn = `Estimated ${priceMin.toLocaleString("en-US")}–${priceMax.toLocaleString("en-US")} USD over ${weeksMin}–${weeksMax} weeks for a ${projectType} build with ${features.length} selected capabilities.`;
  const summaryFa = `برآورد ${priceMin.toLocaleString("en-US")} تا ${priceMax.toLocaleString("en-US")} دلار در ${weeksMin} تا ${weeksMax} هفته برای ساخت ${projectType} با ${features.length} قابلیت انتخاب‌شده.`;

  return {
    priceMin,
    priceMax,
    weeksMin,
    weeksMax,
    currency: ESTIMATOR_PRICING.currency,
    matchedCaseStudy: {
      slug: matched.slug,
      name: matched.name,
      outcomeMetric: matched.outcomeMetric,
      industry: matched.industry,
    },
    breakdown,
    summaryEn,
    summaryFa,
    contactPrefill: {
      projectType: inquiryProjectType(projectType),
      budgetRange,
      timeline: timelineContactKey(timeline),
      message: summaryEn,
    },
  };
}

function matchCaseStudy(projectType: ProjectTypeId, features: FeatureId[]) {
  const scores = new Map<string, number>();

  for (const slug of TYPE_CASE_STUDY_BIAS[projectType]) {
    scores.set(slug, (scores.get(slug) ?? 0) + 3);
  }

  for (const feature of features) {
    const biased = FEATURE_CASE_STUDY_BIAS[feature];
    if (!biased) continue;
    for (const slug of biased) {
      scores.set(slug, (scores.get(slug) ?? 0) + 1);
    }
  }

  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const topSlug = ranked[0]?.[0] ?? CASE_STUDY_SEEDS[0].slug;
  const seed =
    CASE_STUDY_SEEDS.find((item) => item.slug === topSlug) ??
    CASE_STUDY_SEEDS[0];

  return seed;
}

export function formatPriceRange(
  min: number,
  max: number,
  currency: string,
  locale: string
): string {
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} – ${formatter.format(max)}`;
}
