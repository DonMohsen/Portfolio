import { unstable_cache } from "next/cache";
import { BLOG_POSTS } from "./posts";
import { BlogPost } from "./types";

export type FooterBlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  href: string;
};

function mapPosts(locale: string): FooterBlogItem[] {
  const isFa = locale === "fa";

  return [...BLOG_POSTS]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: isFa ? post.title.fa : post.title.en,
      excerpt: isFa ? post.excerpt.fa : post.excerpt.en,
      publishedAt: post.publishedAt,
      href: `/${locale}/blogs/${post.slug}`,
    }));
}

export const getLatestBlogsForFooter = unstable_cache(
  async (locale: string): Promise<FooterBlogItem[]> => mapPosts(locale),
  ["footer-latest-blogs"],
  { revalidate: false }
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
