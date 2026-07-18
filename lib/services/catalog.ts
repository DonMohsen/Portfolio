import { aiProductsLanding } from "./landings/ai-products";
import { automationLanding } from "./landings/automation";
import { fractionalCtoLanding } from "./landings/fractional-cto";
import { i18nLanding } from "./landings/i18n";
import { nextjsAuditLanding } from "./landings/nextjs-audit";
import { saasMvpLanding } from "./landings/saas-mvp";
import { subscriptionLanding } from "./landings/subscription";
import type { ServiceIndexCard, ServiceLanding } from "./types";

export const SERVICE_LANDINGS: ServiceLanding[] = [
  saasMvpLanding,
  nextjsAuditLanding,
  aiProductsLanding,
  automationLanding,
  i18nLanding,
  fractionalCtoLanding,
  subscriptionLanding,
];

export const SERVICE_SLUGS = SERVICE_LANDINGS.map((landing) => landing.slug);

const landingBySlug = new Map(
  SERVICE_LANDINGS.map((landing) => [landing.slug, landing])
);

export function getServiceLanding(slug: string): ServiceLanding | null {
  return landingBySlug.get(slug) ?? null;
}

export const SERVICE_INDEX_CARDS: ServiceIndexCard[] = SERVICE_LANDINGS.map(
  (landing) => ({
    slug: landing.slug,
    tier: landing.tier,
    outcome: landing.outcome,
    icp: landing.icp,
    timeline: landing.timeline,
    startingFrom: landing.startingFrom,
  })
);
