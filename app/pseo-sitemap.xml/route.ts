import { resolveSiteUrl } from "@/lib/metadata-base";
import { buildSitemapLanguageAlternates } from "@/lib/site-alternates";
import {
  INDEXABLE_COMPARE_SLUGS,
  INDEXABLE_SERVICE_INDUSTRY_SLUGS,
} from "@/lib/tools/pseo-datasets";

function pseoUrl(siteUrl: string, locale: string, path: string): string {
  return `${siteUrl}/${locale}${path}`;
}

export async function GET() {
  const siteUrl = resolveSiteUrl();
  const now = new Date().toISOString();

  const entries: string[] = [];

  for (const slug of INDEXABLE_SERVICE_INDUSTRY_SLUGS) {
    const path = `/services/${slug}`;
    const languages = buildSitemapLanguageAlternates(path);
    for (const locale of ["fa", "en"] as const) {
      entries.push(`  <url>
    <loc>${pseoUrl(siteUrl, locale, path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.62</priority>
    <xhtml:link rel="alternate" hreflang="fa" href="${languages.fa}" />
    <xhtml:link rel="alternate" hreflang="en" href="${languages.en}" />
  </url>`);
    }
  }

  for (const slug of INDEXABLE_COMPARE_SLUGS) {
    const path = `/compare/${slug}`;
    const languages = buildSitemapLanguageAlternates(path);
    for (const locale of ["fa", "en"] as const) {
      entries.push(`  <url>
    <loc>${pseoUrl(siteUrl, locale, path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="fa" href="${languages.fa}" />
    <xhtml:link rel="alternate" hreflang="en" href="${languages.en}" />
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
