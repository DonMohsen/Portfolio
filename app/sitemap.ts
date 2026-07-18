import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blogs/get-latest-blogs";
import { HIRE_SLUGS } from "@/lib/hire/catalog";
import { resolveSiteUrl } from "@/lib/metadata-base";
import { getAllProjectSlugs } from "@/lib/projects/get-all-project-slugs";
import { SERVICE_SLUGS } from "@/lib/services/catalog";
import { LIVE_TOOL_SLUGS } from "@/lib/tools/catalog";
import { buildSitemapLanguageAlternates } from "@/lib/site-alternates";

type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedSitemapEntries(
  pathSuffix: string,
  options: {
    changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
    priority: number;
  }
): SitemapEntry[] {
  const siteUrl = resolveSiteUrl();
  const languages = buildSitemapLanguageAlternates(pathSuffix);
  const normalizedSuffix = pathSuffix
    ? pathSuffix.startsWith("/")
      ? pathSuffix
      : `/${pathSuffix}`
    : "";

  return (["fa", "en"] as const).map((locale) => ({
    url: `${siteUrl}/${locale}${normalizedSuffix}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = resolveSiteUrl();
  const projectSlugs = await getAllProjectSlugs();
  const blogSlugs = await getAllBlogSlugs();

  const staticPaths: Array<{
    path: string;
    changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/work", changeFrequency: "daily", priority: 0.85 },
    { path: "/services", changeFrequency: "weekly", priority: 0.8 },
    { path: "/process", changeFrequency: "monthly", priority: 0.75 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/stack", changeFrequency: "monthly", priority: 0.65 },
    { path: "/contact", changeFrequency: "weekly", priority: 0.8 },
    { path: "/tools", changeFrequency: "weekly", priority: 0.78 },
    { path: "/ask", changeFrequency: "weekly", priority: 0.74 },
    { path: "/stats", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.6 },
  ];

  const staticEntries = staticPaths.flatMap(
    ({ path, changeFrequency, priority }) =>
      localizedSitemapEntries(path, { changeFrequency, priority })
  );

  const serviceEntries = SERVICE_SLUGS.flatMap((slug) =>
    localizedSitemapEntries(`/services/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.72,
    })
  );

  const hireEntries = HIRE_SLUGS.flatMap((slug) =>
    localizedSitemapEntries(`/hire/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.68,
    })
  );

  const toolEntries = LIVE_TOOL_SLUGS.flatMap((slug) =>
    localizedSitemapEntries(`/tools/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.76,
    })
  );

  const blogEntries = blogSlugs.flatMap((slug) =>
    localizedSitemapEntries(`/blogs/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.55,
    })
  );

  const projectEntries = projectSlugs.flatMap((slug) =>
    localizedSitemapEntries(`/work/${slug}`, {
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: buildSitemapLanguageAlternates(),
      },
    },
    ...staticEntries,
    ...serviceEntries,
    ...hireEntries,
    ...toolEntries,
    ...blogEntries,
    ...projectEntries,
  ];
}
