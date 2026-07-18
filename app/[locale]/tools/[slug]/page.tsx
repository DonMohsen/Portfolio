import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import I18nCheckerTool from "@/components/tools/I18nCheckerTool";
import MvpPrioritizerTool from "@/components/tools/MvpPrioritizerTool";
import ProjectEstimatorTool from "@/components/tools/ProjectEstimatorTool";
import SaasIdeaValidatorTool from "@/components/tools/SaasIdeaValidatorTool";
import SpeedScorecardTool from "@/components/tools/SpeedScorecardTool";
import TechStackPickerTool from "@/components/tools/TechStackPickerTool";
import WebsiteCostCalculatorTool from "@/components/tools/WebsiteCostCalculatorTool";
import {
  getToolEntry,
  LIVE_TOOL_SLUGS,
  type ToolSlug,
} from "@/lib/tools/catalog";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string; slug: string }>;

const TOOL_METADATA: Partial<
  Record<ToolSlug, { titleFa: string; titleEn: string; descFa: string; descEn: string }>
> = {
  "project-estimator": {
    titleFa: "هزینه ساخت اپلیکیشن — ماشین‌حساب MVP | ابزار رایگان",
    titleEn: "MVP Cost Calculator — Project Estimator | Free Tool",
    descFa:
      "برآورد هزینه و زمان ساخت اپلیکیشن یا SaaS در ۳ مرحله — با case study مشابه و جزئیات ایمیلی.",
    descEn:
      "Estimate MVP / SaaS build cost and timeline in 3 steps — with a matched case study and email breakdown.",
  },
  "website-cost-calculator": {
    titleFa: "هزینه طراحی سایت اختصاصی | ماشین‌حساب رایگان",
    titleEn: "Custom Website Cost Calculator | Free Tool",
    descFa:
      "برآورد هزینه طراحی سایت اختصاصی بر اساس نوع، صفحات و فیچرها.",
    descEn:
      "Estimate custom website development cost by site type, pages, and features.",
  },
  "speed-scorecard": {
    titleFa: "تست سرعت سایت — Core Web Vitals | ابزار رایگان",
    titleEn: "Website Speed Test — Core Web Vitals Scorecard",
    descFa: "تست سرعت سایت و Core Web Vitals با پیشنهاد بهبود و پیشنهاد ممیزی.",
    descEn:
      "Website speed test with Core Web Vitals, fix recommendations, and audit offer.",
  },
  "tech-stack-picker": {
    titleFa: "بهترین تکنولوژی برای اپ | انتخاب stack",
    titleEn: "Best Tech Stack for My App — Stack Picker",
    descFa: "پاسخ ۳ سؤال — stack پیشنهادی Next.js با trade-offها.",
    descEn: "Answer 3 questions — recommended Next.js stack with trade-offs.",
  },
  "mvp-prioritizer": {
    titleFa: "اولویت‌بندی فیچر MVP | MoSCoW رایگان",
    titleEn: "MVP Feature Prioritization | Free MoSCoW Tool",
    descFa: "فیچرها را با impact و effort وارد کنید — خروجی Must/Should/Could/Won't.",
    descEn: "Rank features by impact and effort — export Must/Should/Could/Won't.",
  },
  "saas-idea-validator": {
    titleFa: "ایده استارتاپم خوبه؟ | اعتبارسنجی SaaS",
    titleEn: "Is My SaaS Idea Good? | Free Validator",
    descFa: "بازخورد ساخت‌یافته درباره fit، ریسک و scope MVP ایده SaaS.",
    descEn: "Structured feedback on fit, risks, and MVP scope for your SaaS idea.",
  },
  "i18n-checker": {
    titleFa: "بررسی hreflang و RTL | ابزار i18n",
    titleEn: "RTL & hreflang Checker | Free i18n Tool",
    descFa: "بررسی سریع lang، dir، hreflang و x-default برای سایت چندزبانه.",
    descEn: "Quick check of lang, dir, hreflang, and x-default on multilingual sites.",
  },
};

export async function generateStaticParams() {
  return ["fa", "en"].flatMap((locale) =>
    LIVE_TOOL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const tool = getToolEntry(slug);
  if (!tool) return {};

  const isFa = locale === "fa";
  const custom = TOOL_METADATA[slug as ToolSlug];

  if (custom) {
    return {
      title: isFa ? custom.titleFa : custom.titleEn,
      description: isFa ? custom.descFa : custom.descEn,
      alternates: buildLocaleAlternates(locale, `tools/${slug}`),
    };
  }

  return {
    title: isFa ? `${tool.title.fa} | ابزار` : `${tool.title.en} | Tool`,
    description: isFa ? tool.description.fa : tool.description.en,
    alternates: buildLocaleAlternates(locale, `tools/${slug}`),
  };
}

function ToolPageContent({ locale, slug }: { locale: string; slug: string }) {
  switch (slug) {
    case "project-estimator":
      return (
        <Suspense fallback={null}>
          <ProjectEstimatorTool locale={locale} />
        </Suspense>
      );
    case "website-cost-calculator":
      return <WebsiteCostCalculatorTool locale={locale} />;
    case "speed-scorecard":
      return <SpeedScorecardTool locale={locale} />;
    case "tech-stack-picker":
      return <TechStackPickerTool locale={locale} />;
    case "mvp-prioritizer":
      return <MvpPrioritizerTool locale={locale} />;
    case "saas-idea-validator":
      return <SaasIdeaValidatorTool locale={locale} />;
    case "i18n-checker":
      return <I18nCheckerTool locale={locale} />;
    default:
      return null;
  }
}

export default async function ToolSlugPage(props: { params: Params }) {
  const { locale, slug } = await props.params;
  const tool = getToolEntry(slug);

  if (!tool || !tool.live) {
    notFound();
  }

  return <ToolPageContent locale={locale} slug={slug} />;
}
