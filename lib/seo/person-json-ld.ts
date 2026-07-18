import { SITE_EMAIL, SITE_NAME, SITE_NAME_FA, SOCIAL_LINKS } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/metadata-base";

/** Public profile image — replace with /mohsen.jpg when a dedicated headshot is added. */
export const PROFILE_IMAGE_PATH = "/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png";

export const JOB_TITLE_EN = "Software Product Engineer";
export const JOB_TITLE_FA = "مهندس محصول نرم‌افزار";

export const PERSON_DESCRIPTION_EN =
  "I build scalable software products from idea to production.";
export const PERSON_DESCRIPTION_FA =
  "محصولات نرم‌افزاری مقیاس‌پذیر از ایده تا production می‌سازم.";

const KNOWS_ABOUT = [
  "SaaS development",
  "Next.js",
  "React",
  "AI integration",
  "RAG",
  "Automation systems",
  "Software architecture",
] as const;

export function getPersonSchemaId(siteUrl: string = resolveSiteUrl()): string {
  return `${siteUrl.replace(/\/$/, "")}/#person`;
}

function personId(siteUrl: string): string {
  return getPersonSchemaId(siteUrl);
}

function serviceId(siteUrl: string): string {
  return `${siteUrl}/#service`;
}

function absoluteUrl(siteUrl: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalized}`;
}

function buildSameAs(siteUrl: string): string[] {
  const fromSocial = SOCIAL_LINKS.map((link) => link.href).filter(
    (href) => href.startsWith("http")
  );

  return [...new Set([...fromSocial, siteUrl])];
}

export function buildPersonJsonLd(siteUrl: string = resolveSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(siteUrl),
    name: SITE_NAME,
    alternateName: SITE_NAME_FA,
    url: siteUrl,
    image: absoluteUrl(siteUrl, PROFILE_IMAGE_PATH),
    jobTitle: JOB_TITLE_EN,
    description: PERSON_DESCRIPTION_EN,
    email: SITE_EMAIL,
    knowsAbout: [...KNOWS_ABOUT],
    knowsLanguage: ["fa", "en"],
    sameAs: buildSameAs(siteUrl),
  };
}

export function buildProfessionalServiceJsonLd(siteUrl: string = resolveSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": serviceId(siteUrl),
    name: `${SITE_NAME} — Software Product Engineering`,
    url: siteUrl,
    founder: { "@id": personId(siteUrl) },
    areaServed: ["Worldwide", "Iran"],
    availableLanguage: ["English", "Persian"],
    knowsAbout: [...KNOWS_ABOUT],
  };
}

/** Single JSON-LD graph linking Person + ProfessionalService entities. */
export function buildEntityGraphJsonLd(siteUrl: string = resolveSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonJsonLd(siteUrl),
      buildProfessionalServiceJsonLd(siteUrl),
    ],
  };
}

export const SITE_METADATA = {
  en: {
    title: `${SITE_NAME} | ${JOB_TITLE_EN}`,
    description: `${PERSON_DESCRIPTION_EN} SaaS, AI integrations, automation. Available for international projects.`,
    keywords: [
      SITE_NAME,
      "software product engineer",
      "saas mvp development",
      "next.js consultant",
      "hire developer",
      "fractional cto",
      "automation systems",
    ],
    openGraphLocale: "en_US",
  },
  fa: {
    title: `${SITE_NAME_FA} | ${JOB_TITLE_FA}`,
    description: `${PERSON_DESCRIPTION_FA} SaaS، هوش مصنوعی، اتوماسیون. پروژه ایرانی و بین‌المللی.`,
    keywords: [
      SITE_NAME_FA,
      "محسن خجسته نژاد",
      "مهندس محصول نرم‌افزار",
      "توسعه SaaS",
      "برنامه نویس Next.js",
      "استخدام برنامه نویس",
      "ساخت اپلیکیشن",
    ],
    openGraphLocale: "fa_IR",
  },
} as const;
