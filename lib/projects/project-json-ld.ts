import { ProjectDetail } from "./types";
import { resolveSiteUrl } from "@/lib/metadata-base";
import {
  buildBreadcrumbListJsonLd,
  threeLevelTrail,
} from "@/lib/seo/breadcrumb";
import { getPersonSchemaId } from "@/lib/seo/person-json-ld";
import { toProjectIsoDate } from "./project-dates";

const SITE_URL = resolveSiteUrl();

export function buildBreadcrumbJsonLd(
  locale: string,
  project: ProjectDetail
) {
  return buildBreadcrumbListJsonLd(
    threeLevelTrail(locale, "work", project.name)
  );
}

export function buildSoftwareApplicationJsonLd(
  locale: string,
  project: ProjectDetail
) {
  const image = project.images[0];
  const absoluteImage = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image ?? "/image-placeholder.webp"}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.summary,
    url: `${SITE_URL}/${locale}/work/${project.slug}`,
    image: absoluteImage,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    keywords: project.seoKeywords.join(", "),
    author: {
      "@type": "Person",
      "@id": getPersonSchemaId(SITE_URL),
      name: "Mohsen Khojasteh Nezhad",
      url: SITE_URL,
    },
    datePublished: toProjectIsoDate(project.createdAt),
    dateModified: toProjectIsoDate(project.lastUpdatedAt),
  };
}

export function buildArticleJsonLd(locale: string, project: ProjectDetail) {
  const image = project.images[0];
  const absoluteImage = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image ?? "/image-placeholder.webp"}`;
  const pageUrl = `${SITE_URL}/${locale}/work/${project.slug}`;
  const personId = getPersonSchemaId(SITE_URL);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    description: project.summary,
    image: [absoluteImage],
    author: { "@id": personId },
    publisher: {
      "@type": "Person",
      "@id": personId,
      name: "Mohsen Khojasteh Nezhad",
    },
    datePublished: toProjectIsoDate(project.createdAt),
    dateModified: toProjectIsoDate(project.lastUpdatedAt),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    keywords: project.seoKeywords.join(", "),
  };
}
