import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/metadata-base";

/** AI crawlers we intentionally allow for GEO / citation (goal.md §20.4). */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/pseo-sitemap.xml`],
  };
}
