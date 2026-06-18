import { ProjectDetail } from "./types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://donmohsen.ir";

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

function toIsoDate(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
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
    datePublished: toIsoDate(project.createdAt),
    dateModified: toIsoDate(project.lastUpdatedAt),
  };
}
