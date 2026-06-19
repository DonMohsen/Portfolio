import { resolveSiteUrlForMetadata } from "./metadata-base";

function absoluteSiteUrl(base: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${normalized}`;
}

/** Absolute canonical + hreflang alternates for Lighthouse / Google. */
export async function buildLocaleAlternates(
  locale: string,
  pathSuffix = ""
): Promise<{
  canonical: string;
  languages: Record<string, string>;
}> {
  const siteUrl = await resolveSiteUrlForMetadata();
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
      "x-default": absoluteSiteUrl(siteUrl, `/fa${suffix}`),
    },
  };
}
