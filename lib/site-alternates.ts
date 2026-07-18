import { resolveSiteUrl } from "./metadata-base";

function absoluteSiteUrl(base: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${normalized}`;
}

/** Absolute canonical + hreflang alternates for Lighthouse / Google. */
export function buildLocaleAlternates(
  locale: string,
  pathSuffix = ""
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const siteUrl = resolveSiteUrl();
  const suffix = pathSuffix
    ? pathSuffix.startsWith("/")
      ? pathSuffix
      : `/${pathSuffix}`
    : "";

  return {
    canonical: absoluteSiteUrl(siteUrl, `/${locale}${suffix}`),
    languages: {
      fa: absoluteSiteUrl(siteUrl, `/fa${suffix}`),
      en: absoluteSiteUrl(siteUrl, `/en${suffix}`),
      "x-default": absoluteSiteUrl(siteUrl, `/en${suffix}`),
    },
  };
}

/** hreflang map for sitemap entries (fa + en per path). */
export function buildSitemapLanguageAlternates(pathSuffix = ""): Record<string, string> {
  const siteUrl = resolveSiteUrl();
  const suffix = pathSuffix
    ? pathSuffix.startsWith("/")
      ? pathSuffix
      : `/${pathSuffix}`
    : "";

  return {
    fa: absoluteSiteUrl(siteUrl, `/fa${suffix}`),
    en: absoluteSiteUrl(siteUrl, `/en${suffix}`),
  };
}
