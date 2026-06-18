import type { BlogPost as PrismaBlogPost } from "@prisma/client";
import type { BlogFaqItem, BlogHeading, BlogPost } from "@/lib/blogs/types";

function parseJsonArray<T>(value: unknown): T[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value as T[];
  return undefined;
}

export function mapPrismaToBlogPost(row: PrismaBlogPost): BlogPost {
  return {
    slug: row.slug,
    publishedAt: row.publishedAt?.toISOString().slice(0, 10) ?? row.createdAt.toISOString().slice(0, 10),
    category: row.category,
    title: { en: row.titleEn, fa: row.titleFa },
    excerpt: { en: row.excerptEn, fa: row.excerptFa },
    heroImage: row.heroImage ?? undefined,
    contentHtml: { en: row.contentHtmlEn, fa: row.contentHtmlFa },
    conclusionHtml:
      row.conclusionHtmlEn || row.conclusionHtmlFa
        ? {
            en: row.conclusionHtmlEn ?? "",
            fa: row.conclusionHtmlFa ?? "",
          }
        : undefined,
    readTimeMinutes: row.readTimeMinutes ?? undefined,
    views: row.views,
    likes: row.likes,
    faq: parseJsonArray<BlogFaqItem>(row.faq),
    headings: parseJsonArray<BlogHeading>(row.headings),
  };
}

export type BlogPostRecord = PrismaBlogPost;
