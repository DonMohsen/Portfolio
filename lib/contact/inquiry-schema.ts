import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  projectType: z.string().trim().min(1).max(120),
  budgetRange: z.string().trim().min(1).max(80),
  timeline: z.string().trim().min(1).max(80),
  message: z.string().trim().min(20).max(5000),
  locale: z.enum(["fa", "en"]),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const PROJECT_TYPE_OPTIONS = {
  en: [
    { value: "saas-mvp", label: "SaaS MVP" },
    { value: "nextjs-audit", label: "Next.js audit / performance" },
    { value: "ai-products", label: "AI product / RAG" },
    { value: "automation", label: "Automation system" },
    { value: "i18n", label: "Multilingual / i18n" },
    { value: "fractional-cto", label: "Fractional CTO retainer" },
    { value: "subscription", label: "Product subscription" },
    { value: "other", label: "Other / not sure yet" },
  ],
  fa: [
    { value: "saas-mvp", label: "SaaS MVP" },
    { value: "nextjs-audit", label: "ممیزی Next.js / performance" },
    { value: "ai-products", label: "محصول AI / RAG" },
    { value: "automation", label: "سیستم اتوماسیون" },
    { value: "i18n", label: "چندزبانه / i18n" },
    { value: "fractional-cto", label: "Fractional CTO" },
    { value: "subscription", label: "اشتراک محصول" },
    { value: "other", label: "سایر / هنوز مطمئن نیستم" },
  ],
} as const;

export const BUDGET_OPTIONS = {
  en: [
    { value: "under-5k", label: "Under $5K" },
    { value: "5k-15k", label: "$5K – $15K" },
    { value: "15k-50k", label: "$15K – $50K" },
    { value: "50k-plus", label: "$50K+" },
    { value: "unsure", label: "Not sure yet" },
  ],
  fa: [
    { value: "under-5k", label: "زیر ۵ هزار دلار" },
    { value: "5k-15k", label: "۵ تا ۱۵ هزار دلار" },
    { value: "15k-50k", label: "۱۵ تا ۵۰ هزار دلار" },
    { value: "50k-plus", label: "بالای ۵۰ هزار دلار" },
    { value: "unsure", label: "هنوز مطمئن نیستم" },
  ],
} as const;

export const TIMELINE_OPTIONS = {
  en: [
    { value: "asap", label: "ASAP" },
    { value: "1-3m", label: "1–3 months" },
    { value: "3-6m", label: "3–6 months" },
    { value: "6m-plus", label: "6+ months" },
    { value: "exploring", label: "Just exploring" },
  ],
  fa: [
    { value: "asap", label: "هرچه زودتر" },
    { value: "1-3m", label: "۱–۳ ماه" },
    { value: "3-6m", label: "۳–۶ ماه" },
    { value: "6m-plus", label: "بیش از ۶ ماه" },
    { value: "exploring", label: "فقط بررسی" },
  ],
} as const;
