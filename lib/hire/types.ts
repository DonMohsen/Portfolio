import type { LocalizedFaq, LocalizedText } from "@/lib/services/types";

export type HireProofLink = {
  slug: string;
  label: LocalizedText;
  metric: LocalizedText;
};

export type HireCapturePage = {
  slug: string;
  keyword: LocalizedText;
  title: LocalizedText;
  metaDescription: LocalizedText;
  subtitle: LocalizedText;
  proofLinks: HireProofLink[];
  stackHighlights: { en: string[]; fa: string[] };
  sections: Array<{ heading: LocalizedText; body: LocalizedText }>;
  faq: LocalizedFaq;
  relatedServiceSlug: string;
};
