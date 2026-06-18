import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blogs/get-latest-blogs";
import { getAllProjectSlugs } from "@/lib/projects/get-all-project-slugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["fa", "en"] as const;
  const projectSlugs = await getAllProjectSlugs();
  const blogSlugs = await getAllBlogSlugs();

  const localeEntries = locales.flatMap((locale) => [
    {
      url: `https://donmohsen.ir/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `https://donmohsen.ir/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `https://donmohsen.ir/${locale}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...blogSlugs.map((slug) => ({
      url: `https://donmohsen.ir/${locale}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...projectSlugs.map((slug) => ({
      url: `https://donmohsen.ir/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  return [
    {
      url: "https://donmohsen.ir",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...localeEntries,
  ];
}
