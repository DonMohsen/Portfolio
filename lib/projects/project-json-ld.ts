import { ProjectDetail } from "./types";
import { resolveSiteUrl } from "@/lib/metadata-base";
import { toProjectIsoDate } from "./project-dates";

const SITE_URL = resolveSiteUrl();

export function buildBreadcrumbJsonLd(
  locale: string,
  project: ProjectDetail
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fa" ? "خانه" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fa" ? "پروژه‌ها" : "Projects",
        item: `${SITE_URL}/${locale}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${SITE_URL}/${locale}/projects/${project.slug}`,
      },
    ],
  };
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
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    image: absoluteImage,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    keywords: project.seoKeywords.join(", "),
    author: {
      "@type": "Person",
      name: "Mohsen Khojasteh Nezhad",
      url: SITE_URL,
    },
    datePublished: toProjectIsoDate(project.createdAt),
    dateModified: toProjectIsoDate(project.lastUpdatedAt),
  };
}
