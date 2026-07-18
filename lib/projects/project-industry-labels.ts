import type { ProjectIndustry } from "@prisma/client";

export const PROJECT_INDUSTRY_FILTERS: ProjectIndustry[] = [
  "SaaS",
  "Ecommerce",
  "Fintech",
  "Healthcare",
  "AI",
  "Automation",
  "Education",
  "Marketplace",
  "Enterprise",
  "Other",
];

export const PROJECT_INDUSTRY_LABELS: Record<
  ProjectIndustry,
  { en: string; fa: string }
> = {
  Healthcare: { en: "Healthcare", fa: "سلامت" },
  Fintech: { en: "Fintech", fa: "فین‌تک" },
  Ecommerce: { en: "E-commerce", fa: "تجارت الکترونیک" },
  AI: { en: "AI", fa: "هوش مصنوعی" },
  Automation: { en: "Automation", fa: "اتوماسیون" },
  Education: { en: "Education", fa: "آموزش" },
  Marketplace: { en: "Marketplace", fa: "مارکت‌پلیس" },
  Enterprise: { en: "Enterprise", fa: "سازمانی" },
  SaaS: { en: "SaaS", fa: "SaaS" },
  Other: { en: "Other", fa: "سایر" },
};
