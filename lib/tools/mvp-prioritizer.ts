import type { LocalizedText } from "@/lib/services/types";

export type MoscowBucket = "must" | "should" | "could" | "wont";

export type PrioritizerFeature = {
  id: string;
  name: string;
  effort: 1 | 2 | 3;
  impact: 1 | 2 | 3;
};

export type PrioritizedFeature = PrioritizerFeature & {
  score: number;
  bucket: MoscowBucket;
};

export type PrioritizerResult = {
  features: PrioritizedFeature[];
  mustCount: number;
  shouldCount: number;
  couldCount: number;
  wontCount: number;
  summary: LocalizedText;
  serviceSlug: string;
};

export const MVP_PRIORITIZER_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "What is MoSCoW prioritization?",
      fa: "اولویت‌بندی MoSCoW چیست؟",
    },
    answer: {
      en: "Must / Should / Could / Won't — a simple way to cut MVP scope so you ship the risky core first.",
      fa: "Must / Should / Could / Won't — روش ساده برای بریدن scope MVP تا هستهٔ پرریسک اول ship شود.",
    },
  },
  {
    question: {
      en: "How are buckets assigned?",
      fa: "سطل‌ها چطور تعیین می‌شوند؟",
    },
    answer: {
      en: "Score = impact × 2 − effort. Top scores become Must, then Should, Could, and the rest Won't for v1.",
      fa: "امتیاز = impact × ۲ − effort. بالاترین‌ها Must، بعد Should، Could و بقیه Won't برای v1.",
    },
  },
];

export const EFFORT_LABELS: Record<1 | 2 | 3, LocalizedText> = {
  1: { en: "Small", fa: "کم" },
  2: { en: "Medium", fa: "متوسط" },
  3: { en: "Large", fa: "زیاد" },
};

export const IMPACT_LABELS: Record<1 | 2 | 3, LocalizedText> = {
  1: { en: "Low", fa: "کم" },
  2: { en: "Medium", fa: "متوسط" },
  3: { en: "High", fa: "بالا" },
};

export const BUCKET_LABELS: Record<MoscowBucket, LocalizedText> = {
  must: { en: "Must have", fa: "Must — ضروری" },
  should: { en: "Should have", fa: "Should — مهم" },
  could: { en: "Could have", fa: "Could — خوب است" },
  wont: { en: "Won't (v1)", fa: "Won't — نه برای v1" },
};

function scoreFeature(feature: PrioritizerFeature): number {
  return feature.impact * 2 - feature.effort;
}

function assignBuckets(sorted: PrioritizerFeature[]): PrioritizedFeature[] {
  const n = sorted.length;
  if (n === 0) return [];

  const mustEnd = Math.max(1, Math.ceil(n * 0.3));
  const shouldEnd = mustEnd + Math.max(1, Math.ceil(n * 0.3));
  const couldEnd = shouldEnd + Math.max(0, Math.ceil(n * 0.2));

  return sorted.map((feature, index) => {
    let bucket: MoscowBucket = "wont";
    if (index < mustEnd) bucket = "must";
    else if (index < shouldEnd) bucket = "should";
    else if (index < couldEnd) bucket = "could";

    return {
      ...feature,
      score: scoreFeature(feature),
      bucket,
    };
  });
}

export function prioritizeFeatures(
  features: PrioritizerFeature[]
): PrioritizerResult {
  const cleaned = features
    .map((f) => ({
      ...f,
      name: f.name.trim(),
    }))
    .filter((f) => f.name.length > 0);

  const sorted = [...cleaned].sort(
    (a, b) => scoreFeature(b) - scoreFeature(a) || a.name.localeCompare(b.name)
  );

  const prioritized = assignBuckets(sorted);
  const mustCount = prioritized.filter((f) => f.bucket === "must").length;
  const shouldCount = prioritized.filter((f) => f.bucket === "should").length;
  const couldCount = prioritized.filter((f) => f.bucket === "could").length;
  const wontCount = prioritized.filter((f) => f.bucket === "wont").length;

  return {
    features: prioritized,
    mustCount,
    shouldCount,
    couldCount,
    wontCount,
    summary: {
      en: `${mustCount} Must, ${shouldCount} Should for a focused MVP — cut ${wontCount} items from v1.`,
      fa: `${mustCount} Must و ${shouldCount} Should برای MVP متمرکز — ${wontCount} مورد از v1 حذف شد.`,
    },
    serviceSlug: "saas-mvp",
  };
}

export function exportMoscowText(
  locale: string,
  result: PrioritizerResult
): string {
  const isFa = locale === "fa";
  const lines = [
    isFa ? "اولویت‌بندی MVP (MoSCoW)" : "MVP Prioritization (MoSCoW)",
    "",
  ];

  (["must", "should", "could", "wont"] as MoscowBucket[]).forEach((bucket) => {
    const label = isFa
      ? BUCKET_LABELS[bucket].fa
      : BUCKET_LABELS[bucket].en;
    lines.push(`## ${label}`);
    const items = result.features.filter((f) => f.bucket === bucket);
    if (items.length === 0) {
      lines.push(isFa ? "(خالی)" : "(empty)");
    } else {
      items.forEach((item) => {
        lines.push(`- ${item.name} (impact ${item.impact}, effort ${item.effort})`);
      });
    }
    lines.push("");
  });

  return lines.join("\n");
}
