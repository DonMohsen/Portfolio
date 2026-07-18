import {
  WEBSITE_PRICING,
  type PageCountId,
  type WebsiteFeatureId,
  type WebsiteTimelineId,
  type WebsiteTypeId,
} from "@/lib/tools/website-cost-config";

export type WebsiteCostInput = {
  websiteType: WebsiteTypeId;
  pageCount: PageCountId;
  features: WebsiteFeatureId[];
  timeline: WebsiteTimelineId;
  locale: string;
};

export type WebsiteCostResult = {
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
  currency: string;
  breakdown: Array<{
    id: string;
    labelEn: string;
    labelFa: string;
    min: number;
    max: number;
  }>;
  summaryEn: string;
  summaryFa: string;
};

function roundPrice(value: number): number {
  return Math.round(value / 250) * 250;
}

export function computeWebsiteCost(input: WebsiteCostInput): WebsiteCostResult {
  const { websiteType, pageCount, features, timeline } = input;
  const base = WEBSITE_PRICING.baseByType[websiteType];
  const pageMul = WEBSITE_PRICING.pageMultipliers[pageCount];
  const timeMul = WEBSITE_PRICING.timelineMultipliers[timeline];

  let featureMin = 0;
  let featureMax = 0;
  const breakdown: WebsiteCostResult["breakdown"] = [
    {
      id: "base",
      labelEn: `Base — ${websiteType}`,
      labelFa: `پایه — ${websiteType}`,
      min: base.min,
      max: base.max,
    },
    {
      id: "pages",
      labelEn: `Page count — ${pageCount}`,
      labelFa: `تعداد صفحه — ${pageCount}`,
      min: 0,
      max: 0,
    },
  ];

  for (const feature of features) {
    const addon = WEBSITE_PRICING.featureAddons[feature];
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

  const rawMin = (base.min * pageMul + featureMin) * timeMul.price;
  const rawMax = (base.max * pageMul + featureMax) * timeMul.price;
  const priceMin = roundPrice(rawMin);
  const priceMax = roundPrice(Math.max(rawMin + 1500, rawMax));

  const weeksMin = Math.max(2, Math.round(base.weeksMin * timeMul.weeks));
  const weeksMax = Math.max(
    weeksMin + 1,
    Math.round(base.weeksMax * timeMul.weeks * (pageCount === "30plus" ? 1.15 : 1))
  );

  const summaryEn = `Custom website estimate: ${priceMin.toLocaleString()}–${priceMax.toLocaleString()} USD, ${weeksMin}–${weeksMax} weeks (${websiteType}, ${pageCount} pages).`;
  const summaryFa = `برآورد سایت اختصاصی: ${priceMin.toLocaleString()} تا ${priceMax.toLocaleString()} دلار، ${weeksMin} تا ${weeksMax} هفته (${websiteType}، ${pageCount} صفحه).`;

  return {
    priceMin,
    priceMax,
    weeksMin,
    weeksMax,
    currency: WEBSITE_PRICING.currency,
    breakdown,
    summaryEn,
    summaryFa,
  };
}
