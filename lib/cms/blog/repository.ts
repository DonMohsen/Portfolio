import { prisma } from "@/lib/prisma";
import { BlogCategory, BlogStatus, Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { BLOG_CACHE_TAG } from "@/lib/cms/core/cache-tag";
import { sanitizeBlogHtml } from "@/lib/cms/core/sanitize-html";
import { slugifyText } from "@/lib/cms/core/slug";
import { extractHeadingsFromHtml } from "./headings-extractor";
import { mapPrismaToBlogPost, type BlogPostRecord } from "./mappers";
import { calculateReadTimeMinutes } from "./read-time";
import type { BlogPostInput } from "./schema";
import type { BlogPost } from "@/lib/blogs/types";

function getPublishedWhere(): Prisma.BlogPostWhereInput {
  return {
    status: BlogStatus.published,
    OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
  };
}

function prepareBlogData(input: BlogPostInput) {
  const contentHtmlEn = sanitizeBlogHtml(input.contentHtmlEn);
  const contentHtmlFa = sanitizeBlogHtml(input.contentHtmlFa);
  const conclusionHtmlEn = input.conclusionHtmlEn
    ? sanitizeBlogHtml(input.conclusionHtmlEn)
    : null;
  const conclusionHtmlFa = input.conclusionHtmlFa
    ? sanitizeBlogHtml(input.conclusionHtmlFa)
    : null;

  const publishedAt =
    input.status === "published"
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : new Date()
      : input.publishedAt
        ? new Date(input.publishedAt)
        : null;

  const headings = extractHeadingsFromHtml(contentHtmlEn, contentHtmlFa);

  return {
    slug: slugifyText(input.slug),
    status: input.status as BlogStatus,
    category: input.category as BlogCategory,
    publishedAt,
    titleEn: input.titleEn.trim(),
    titleFa: input.titleFa.trim(),
    excerptEn: input.excerptEn.trim(),
    excerptFa: input.excerptFa.trim(),
    contentHtmlEn,
    contentHtmlFa,
    conclusionHtmlEn,
    conclusionHtmlFa,
    heroImage: input.heroImage ?? null,
    readTimeMinutes:
      input.readTimeMinutes ??
      calculateReadTimeMinutes(contentHtmlEn, contentHtmlFa),
    views: input.views ?? 0,
    likes: input.likes ?? 0,
    faq: input.faq?.length ? input.faq : Prisma.DbNull,
    headings: headings.length > 0 ? headings : Prisma.DbNull,
  };
}

export async function isSlugTaken(slug: string, excludeId?: number) {
  const row = await prisma.blogPost.findFirst({
    where: {
      slug: slugifyText(slug),
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
  return Boolean(row);
}

export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    where: getPublishedWhere(),
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return rows.map(mapPrismaToBlogPost);
}

export const getCachedPublishedBlogPosts = unstable_cache(
  async () => listPublishedBlogPosts(),
  ["blog-published-posts"],
  { tags: [BLOG_CACHE_TAG] }
);

export async function listAllBlogPostsAdmin(): Promise<BlogPostRecord[]> {
  return prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getBlogPostBySlugFromDb(
  slug: string,
  options?: { includeDraft?: boolean }
): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row) return null;
  if (!options?.includeDraft && row.status !== BlogStatus.published) {
    return null;
  }
  if (
    !options?.includeDraft &&
    row.publishedAt &&
    row.publishedAt > new Date()
  ) {
    return null;
  }
  return mapPrismaToBlogPost(row);
}

export const getCachedBlogPostBySlug = unstable_cache(
  async (slug: string) => getBlogPostBySlugFromDb(slug),
  ["blog-post-by-slug"],
  { tags: [BLOG_CACHE_TAG] }
);

export async function getBlogPostByIdAdmin(
  id: number
): Promise<BlogPostRecord | null> {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: getPublishedWhere(),
    select: { slug: true },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map((row) => row.slug);
}

export async function getPublishedSlugLabels(): Promise<
  Record<string, { en: string; fa: string }>
> {
  const rows = await prisma.blogPost.findMany({
    where: getPublishedWhere(),
    select: { slug: true, titleEn: true, titleFa: true },
  });
  return Object.fromEntries(
    rows.map((row) => [row.slug, { en: row.titleEn, fa: row.titleFa }])
  );
}

export async function createBlogPost(input: BlogPostInput) {
  const data = prepareBlogData(input);
  if (await isSlugTaken(data.slug)) {
    throw new Error("SLUG_TAKEN");
  }
  return prisma.blogPost.create({ data });
}

export async function updateBlogPost(id: number, input: BlogPostInput) {
  const data = prepareBlogData(input);
  if (await isSlugTaken(data.slug, id)) {
    throw new Error("SLUG_TAKEN");
  }
  return prisma.blogPost.update({ where: { id }, data });
}

export async function deleteBlogPost(id: number) {
  return prisma.blogPost.delete({ where: { id } });
}

export { slugifyText };
