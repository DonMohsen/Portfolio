import {
  getCachedBlogPostBySlug,
  getCachedPublishedBlogPosts,
} from "@/lib/cms/blog/repository";
import { BLOG_FALLBACK_IMAGE, BLOG_POSTS_PER_PAGE } from "./constants";
import { formatBlogDate, formatReadTime } from "./format-blog-date";
import type {
  BlogCardItem,
  BlogCategory,
  BlogHeading,
  BlogListingOptions,
  BlogListingResult,
  BlogPost,
  BlogRelatedItem,
  BlogSidebarItem,
} from "./types";

function pickLocalized<T extends { en: string; fa: string }>(
  value: T,
  locale: string
): string {
  return locale === "fa" ? value.fa : value.en;
}

function getPostImage(post: BlogPost): string {
  return post.heroImage?.trim() || BLOG_FALLBACK_IMAGE;
}

function toCardItem(post: BlogPost, locale: string): BlogCardItem {
  const readMinutes = post.readTimeMinutes ?? 5;
  return {
    slug: post.slug,
    title: pickLocalized(post.title, locale),
    excerpt: pickLocalized(post.excerpt, locale),
    image: getPostImage(post),
    href: `/${locale}/blogs/${post.slug}`,
    publishedAt: post.publishedAt,
    readTimeLabel: formatReadTime(readMinutes, locale),
    dateLabel: formatBlogDate(post.publishedAt, locale),
    views: post.views ?? 0,
    likes: post.likes ?? 0,
  };
}

function sortPosts(
  posts: BlogPost[],
  sort: "latest" | "popular"
): BlogPost[] {
  const copy = [...posts];
  if (sort === "popular") {
    return copy.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  }
  return copy.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function filterByCategory(
  posts: BlogPost[],
  category?: BlogCategory | "all"
): BlogPost[] {
  if (!category || category === "all") return posts;
  return posts.filter((post) => post.category === category);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const post = await getCachedBlogPostBySlug(slug);
  return post ?? undefined;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getCachedPublishedBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getBlogListingPosts(
  locale: string,
  options: BlogListingOptions = {}
): Promise<BlogListingResult> {
  const {
    category = "all",
    page = 1,
    sort = "latest",
    perPage = BLOG_POSTS_PER_PAGE,
  } = options;

  const allPosts = await getCachedPublishedBlogPosts();
  const filtered = sortPosts(filterByCategory(allPosts, category), sort);
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const pagePosts = filtered.slice(start, start + perPage);

  const featuredSource =
    safePage === 1 && category === "all"
      ? sortPosts(allPosts, "latest")[0]
      : null;

  const listPosts =
    featuredSource && safePage === 1 && category === "all"
      ? pagePosts.filter((post) => post.slug !== featuredSource.slug)
      : pagePosts;

  return {
    posts: listPosts.map((post) => toCardItem(post, locale)),
    featured: featuredSource ? toCardItem(featuredSource, locale) : null,
    totalPages,
    currentPage: safePage,
    totalCount,
  };
}

export async function getSidebarPosts(locale: string): Promise<{
  latest: BlogSidebarItem[];
  popular: BlogSidebarItem[];
}> {
  const allPosts = await getCachedPublishedBlogPosts();

  const toSidebar = (post: BlogPost): BlogSidebarItem => ({
    slug: post.slug,
    title: pickLocalized(post.title, locale),
    image: getPostImage(post),
    href: `/${locale}/blogs/${post.slug}`,
    dateLabel: formatBlogDate(post.publishedAt, locale),
  });

  return {
    latest: sortPosts(allPosts, "latest").slice(0, 5).map(toSidebar),
    popular: sortPosts(allPosts, "popular").slice(0, 5).map(toSidebar),
  };
}

export async function getRelatedPosts(
  slug: string,
  locale: string,
  limit = 5
): Promise<BlogRelatedItem[]> {
  const allPosts = await getCachedPublishedBlogPosts();
  const current = allPosts.find((post) => post.slug === slug);
  if (!current) return [];

  const related = allPosts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );

  return sortPosts(related, "popular")
    .slice(0, limit)
    .map((post) => ({
      slug: post.slug,
      title: pickLocalized(post.title, locale),
      excerpt: pickLocalized(post.excerpt, locale),
      image: getPostImage(post),
      href: `/${locale}/blogs/${post.slug}`,
      dateLabel: formatBlogDate(post.publishedAt, locale),
    }));
}

export function getPostHeadings(
  post: BlogPost,
  locale: string
): { id: string; name: string; children?: { id: string; name: string }[] }[] {
  if (!post.headings?.length) return [];

  return post.headings.map((heading: BlogHeading) => ({
    id: heading.id,
    name: pickLocalized(heading.text, locale),
    children: heading.children?.map((child) => ({
      id: child.id,
      name: pickLocalized(child.text, locale),
    })),
  }));
}

export function getPostContent(post: BlogPost, locale: string) {
  const isFa = locale === "fa";
  return {
    title: pickLocalized(post.title, locale),
    excerpt: pickLocalized(post.excerpt, locale),
    contentHtml:
      (isFa ? post.contentHtml?.fa : post.contentHtml?.en) ??
      `<p>${pickLocalized(post.excerpt, locale)}</p>`,
    conclusionHtml:
      (isFa ? post.conclusionHtml?.fa : post.conclusionHtml?.en) ?? "",
    dateLabel: formatBlogDate(post.publishedAt, locale, true),
    readTimeLabel: formatReadTime(post.readTimeMinutes ?? 5, locale),
    image: getPostImage(post),
    views: post.views ?? 0,
    likes: post.likes ?? 0,
    faq:
      post.faq?.map((item) => ({
        question: pickLocalized(item.question, locale),
        answer: pickLocalized(item.answer, locale),
      })) ?? [],
  };
}
