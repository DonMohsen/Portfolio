export type LocalizedText = {
  en: string;
  fa: string;
};

export type LocalizedFaq = {
  en: Array<{ question: string; answer: string }>;
  fa: Array<{ question: string; answer: string }>;
};

export type ServiceSection = {
  heading: LocalizedText;
  body: LocalizedText;
};

export type ServiceTier = 0 | 1 | 2 | 3 | 4;

export type ServiceLanding = {
  slug: string;
  tier: ServiceTier;
  outcome: LocalizedText;
  title: LocalizedText;
  metaDescription: LocalizedText;
  icp: LocalizedText;
  timeline: LocalizedText;
  startingFrom: LocalizedText;
  deliverables: { en: string[]; fa: string[] };
  sections: ServiceSection[];
  faq: LocalizedFaq;
};

export type ServiceLadderTier = {
  tier: ServiceTier;
  name: LocalizedText;
  price: LocalizedText;
  summary: LocalizedText;
  cta?: { slug: string; label: LocalizedText };
};

export type ServiceIndexCard = {
  slug: string;
  tier: ServiceTier;
  outcome: LocalizedText;
  icp: LocalizedText;
  timeline: LocalizedText;
  startingFrom: LocalizedText;
};
