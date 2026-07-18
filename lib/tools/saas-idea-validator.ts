import type { LocalizedText } from "@/lib/services/types";

export type IdeaAudienceId =
  | "b2b"
  | "b2c"
  | "marketplace"
  | "internal";

export type IdeaStageId = "idea" | "prototype" | "paying";

export type IdeaMoatId = "workflow" | "data" | "network" | "brand" | "unclear";

export type SaasIdeaInput = {
  idea: string;
  audience: IdeaAudienceId;
  stage: IdeaStageId;
  moat: IdeaMoatId;
};

export type IdeaVerdict = "strong" | "promising" | "risky";

export type SaasIdeaResult = {
  verdict: IdeaVerdict;
  score: number;
  strengths: LocalizedText[];
  risks: LocalizedText[];
  mvpScope: LocalizedText;
  nextStep: LocalizedText;
  serviceSlug: string;
};

export const IDEA_AUDIENCES: Array<{ id: IdeaAudienceId; label: LocalizedText }> =
  [
    { id: "b2b", label: { en: "B2B / teams", fa: "B2B / تیم‌ها" } },
    { id: "b2c", label: { en: "Consumers", fa: "مصرف‌کننده" } },
    {
      id: "marketplace",
      label: { en: "Two-sided marketplace", fa: "مارکت‌پلیس دوطرفه" },
    },
    { id: "internal", label: { en: "Internal tool", fa: "ابزار داخلی" } },
  ];

export const IDEA_STAGES: Array<{ id: IdeaStageId; label: LocalizedText }> = [
  { id: "idea", label: { en: "Idea only", fa: "فقط ایده" } },
  { id: "prototype", label: { en: "Prototype / waitlist", fa: "پروتوتایپ / waitlist" } },
  { id: "paying", label: { en: "Some paying users", fa: "چند کاربر پرداخت‌کننده" } },
];

export const IDEA_MOATS: Array<{ id: IdeaMoatId; label: LocalizedText }> = [
  {
    id: "workflow",
    label: { en: "Deep workflow / switching cost", fa: "workflow عمیق / هزینه جابه‌جایی" },
  },
  { id: "data", label: { en: "Proprietary data", fa: "داده اختصاصی" } },
  { id: "network", label: { en: "Network effects", fa: "اثر شبکه‌ای" } },
  { id: "brand", label: { en: "Brand / distribution", fa: "برند / توزیع" } },
  { id: "unclear", label: { en: "Not sure yet", fa: "هنوز مطمئن نیستم" } },
];

export const SAAS_IDEA_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "Is this legal or investment advice?",
      fa: "این مشاوره حقوقی یا سرمایه‌گذاری است؟",
    },
    answer: {
      en: "No — a structured product lens to stress-test scope before you spend on a full build.",
      fa: "خیر — لنز محصولی ساخت‌یافته برای stress-test کردن scope قبل از هزینهٔ build کامل.",
    },
  },
];

export function validateSaasIdea(input: SaasIdeaInput): SaasIdeaResult {
  const idea = input.idea.trim();
  let score = 45;

  if (idea.length >= 80) score += 8;
  if (idea.length >= 160) score += 5;

  if (input.audience === "b2b") score += 12;
  if (input.audience === "internal") score += 8;
  if (input.audience === "marketplace") score -= 8;
  if (input.audience === "b2c") score -= 4;

  if (input.stage === "paying") score += 18;
  if (input.stage === "prototype") score += 10;
  if (input.stage === "idea") score -= 2;

  if (input.moat === "workflow") score += 12;
  if (input.moat === "data") score += 10;
  if (input.moat === "network") score += 6;
  if (input.moat === "brand") score += 4;
  if (input.moat === "unclear") score -= 10;

  score = Math.max(20, Math.min(95, score));

  const verdict: IdeaVerdict =
    score >= 72 ? "strong" : score >= 55 ? "promising" : "risky";

  const strengths: LocalizedText[] = [];
  const risks: LocalizedText[] = [];

  if (input.audience === "b2b") {
    strengths.push({
      en: "B2B buyers often pay for clear ROI and tolerate longer sales cycles.",
      fa: "خریداران B2B معمولاً برای ROI واضح پول می‌دهند و چرخه فروش طولانی‌تر را تحمل می‌کنند.",
    });
  }
  if (input.stage === "paying" || input.stage === "prototype") {
    strengths.push({
      en: "You already have signal beyond a slide deck — protect learning velocity.",
      fa: "سیگنال فراتر از اسلاید دارید — سرعت یادگیری را حفظ کنید.",
    });
  }
  if (input.moat === "workflow" || input.moat === "data") {
    strengths.push({
      en: "A concrete moat angle exists — bake it into the first workflows.",
      fa: "زاویه moat مشخص دارید — در اولین workflowها بگنجانید.",
    });
  }

  if (input.audience === "marketplace") {
    risks.push({
      en: "Two-sided liquidity is hard — start with one side or a concierge MVP.",
      fa: "نقدینگی دوطرفه سخت است — با یک طرف یا MVP concierge شروع کنید.",
    });
  }
  if (input.moat === "unclear") {
    risks.push({
      en: "Without a moat hypothesis, competitors can copy features quickly.",
      fa: "بدون فرضیه moat، رقبا سریع فیچرها را کپی می‌کنند.",
    });
  }
  if (input.stage === "idea") {
    risks.push({
      en: "Validate willingness-to-pay before building a wide feature set.",
      fa: "قبل از فیچرهای زیاد، تمایل به پرداخت را validate کنید.",
    });
  }
  if (idea.length < 60) {
    risks.push({
      en: "Idea description is thin — clarify who pays and what painful job you replace.",
      fa: "توضیح ایده نازک است — مشخص کنید چه کسی پول می‌دهد و چه کار دردناکی را جایگزین می‌کنید.",
    });
  }

  if (strengths.length === 0) {
    strengths.push({
      en: "You can still win with a narrow ICP and a fixed-scope discovery sprint.",
      fa: "با ICP باریک و discovery sprint محدود هنوز می‌توانید ببرید.",
    });
  }

  return {
    verdict,
    score,
    strengths,
    risks,
    mvpScope: {
      en:
        input.audience === "marketplace"
          ? "Concierge or single-side MVP: auth, core matching, payments later."
          : "Auth, one core workflow, admin basics, staging + weekly demos — cut nice-to-haves.",
      fa:
        input.audience === "marketplace"
          ? "MVP concierge یا یک‌طرفه: auth، matching اصلی، پرداخت بعداً."
          : "Auth، یک workflow اصلی، admin پایه، staging + دمو هفتگی — nice-to-haveها را ببرید.",
    },
    nextStep: {
      en:
        verdict === "risky"
          ? "Run a paid discovery sprint before a full build — clarify ICP and willingness to pay."
          : "Book a discovery call or use the Project Estimator to size a fixed-scope MVP.",
      fa:
        verdict === "risky"
          ? "قبل از build کامل، discovery sprint پولی — ICP و تمایل به پرداخت را روشن کنید."
          : "تماس کشف رزرو کنید یا با Project Estimator اندازه MVP محدود را ببینید.",
    },
    serviceSlug: verdict === "risky" ? "fractional-cto" : "saas-mvp",
  };
}

export function verdictLabel(verdict: IdeaVerdict, isFa: boolean): string {
  if (verdict === "strong") return isFa ? "قوی" : "Strong";
  if (verdict === "promising") return isFa ? "امیدوارکننده" : "Promising";
  return isFa ? "پرریسک" : "Risky";
}
