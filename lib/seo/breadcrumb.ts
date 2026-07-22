import { resolveSiteUrl } from "@/lib/metadata-base";

/**
 * Visible trail item. Omit `pathname` on the current page (last crumb):
 * Google does not require `item` on the final ListItem.
 */
export type BreadcrumbTrailItem = {
  name: string;
  /** Locale-prefixed path, e.g. `/fa/services`. Absolute URLs also accepted. */
  pathname?: string;
};

export type BreadcrumbSection =
  | "home"
  | "services"
  | "work"
  | "tools"
  | "process"
  | "contact"
  | "about"
  | "ask"
  | "stack"
  | "stats"
  | "blogs"
  | "hire"
  | "compare";

const SECTION_LABELS: Record<
  BreadcrumbSection,
  { en: string; fa: string }
> = {
  home: { en: "Home", fa: "خانه" },
  services: { en: "Services", fa: "خدمات" },
  work: { en: "Case studies", fa: "مطالعات موردی" },
  tools: { en: "Tools", fa: "ابزارها" },
  process: { en: "Process", fa: "فرآیند" },
  contact: { en: "Contact", fa: "تماس" },
  about: { en: "About", fa: "درباره" },
  ask: { en: "Ask", fa: "پرسش و پاسخ" },
  stack: { en: "Stack", fa: "استک فنی" },
  stats: { en: "Stats", fa: "آمار" },
  blogs: { en: "Blog", fa: "بلاگ" },
  hire: { en: "Hire", fa: "استخدام" },
  compare: { en: "Compare", fa: "مقایسه" },
};

const SECTION_PATH: Record<BreadcrumbSection, string> = {
  home: "",
  services: "services",
  work: "work",
  tools: "tools",
  process: "process",
  contact: "contact",
  about: "about",
  ask: "ask",
  stack: "stack",
  stats: "stats",
  blogs: "blogs",
  hire: "hire",
  compare: "compare",
};

export function breadcrumbLabel(
  locale: string,
  section: BreadcrumbSection
): string {
  const copy = SECTION_LABELS[section];
  return locale === "fa" ? copy.fa : copy.en;
}

/** Locale home or section path: `/fa`, `/fa/services`, … */
export function localePath(locale: string, section: BreadcrumbSection = "home"): string {
  const segment = SECTION_PATH[section];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function toAbsoluteUrl(pathnameOrUrl: string): string {
  if (/^https?:\/\//i.test(pathnameOrUrl)) {
    return pathnameOrUrl.replace(/\/$/, "") || pathnameOrUrl;
  }
  const base = resolveSiteUrl().replace(/\/$/, "");
  const path = pathnameOrUrl.startsWith("/")
    ? pathnameOrUrl
    : `/${pathnameOrUrl}`;
  return `${base}${path}`.replace(/\/$/, "") || `${base}/`;
}

/**
 * Google Search: BreadcrumbList with ≥2 ListItems, sequential position,
 * absolute URLs on every item except the last (current page).
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function buildBreadcrumbListJsonLd(items: BreadcrumbTrailItem[]) {
  if (items.length < 2) {
    throw new Error("BreadcrumbList requires at least two ListItem entries");
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => {
      const position = index + 1;
      const isLast = index === items.length - 1;
      const listItem: {
        "@type": "ListItem";
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position,
        name: crumb.name,
      };

      if (!isLast) {
        if (!crumb.pathname) {
          throw new Error(
            `BreadcrumbList item at position ${position} is missing pathname`
          );
        }
        listItem.item = toAbsoluteUrl(crumb.pathname);
      }

      return listItem;
    }),
  };
}

export function homeTrailItem(locale: string): BreadcrumbTrailItem {
  return {
    name: breadcrumbLabel(locale, "home"),
    pathname: localePath(locale, "home"),
  };
}

export function sectionTrailItem(
  locale: string,
  section: Exclude<BreadcrumbSection, "home">,
  options?: { current?: boolean }
): BreadcrumbTrailItem {
  const name = breadcrumbLabel(locale, section);
  if (options?.current) {
    return { name };
  }
  return { name, pathname: localePath(locale, section) };
}

/** Home → section (current). */
export function twoLevelTrail(
  locale: string,
  section: Exclude<BreadcrumbSection, "home">
): BreadcrumbTrailItem[] {
  return [homeTrailItem(locale), sectionTrailItem(locale, section, { current: true })];
}

/** Home → section → leaf (current). */
export function threeLevelTrail(
  locale: string,
  section: Exclude<BreadcrumbSection, "home">,
  leafName: string
): BreadcrumbTrailItem[] {
  return [
    homeTrailItem(locale),
    sectionTrailItem(locale, section),
    { name: leafName },
  ];
}
