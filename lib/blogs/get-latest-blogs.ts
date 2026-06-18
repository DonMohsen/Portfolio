import { unstable_cache } from "next/cache";
import { getAllBlogSlugs, getBlogPostBySlug } from "./get-blog-data";
import { BLOG_CACHE_TAG } from "@/lib/cms/core/cache-tag";

export type FooterBlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  href: string;
};

async function mapPosts(locale: string): Promise<FooterBlogItem[]> {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getBlogPostBySlug(slug))
  );

  return posts
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: locale === "fa" ? post.title.fa : post.title.en,
      excerpt: locale === "fa" ? post.excerpt.fa : post.excerpt.en,
      publishedAt: post.publishedAt,
      href: `/${locale}/blogs/${post.slug}`,
    }));
}

export const getLatestBlogsForFooter = unstable_cache(
  async (locale: string): Promise<FooterBlogItem[]> => mapPosts(locale),
  ["footer-latest-blogs"],
  { tags: [BLOG_CACHE_TAG] }
);

export { getAllBlogSlugs, getBlogPostBySlug };
