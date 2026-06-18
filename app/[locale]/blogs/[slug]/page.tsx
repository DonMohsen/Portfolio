import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/blogs/get-latest-blogs";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return ["fa", "en"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const isFa = locale === "fa";
  const title = isFa ? post.title.fa : post.title.en;
  const description = isFa ? post.excerpt.fa : post.excerpt.en;

  return {
    title: isFa ? `${title} | بلاگ` : `${title} | Blog`,
    description,
    alternates: {
      canonical: `/${locale}/blogs/${slug}`,
    },
  };
}

export const revalidate = false;

export default async function BlogPostPage(props: { params: Params }) {
  const { locale, slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const isFa = locale === "fa";
  const title = isFa ? post.title.fa : post.title.en;
  const excerpt = isFa ? post.excerpt.fa : post.excerpt.en;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Mohsen Khojasteh Nezhad",
    },
    inLanguage: isFa ? "fa" : "en",
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Link
        href={`/${locale}/blogs`}
        className="text-sm font-semibold text-accent-cosmic"
      >
        {isFa ? "← بازگشت به بلاگ" : "← Back to blog"}
      </Link>
      <header className="mt-6">
        <time
          dateTime={post.publishedAt}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-page-subtle"
        >
          {post.publishedAt}
        </time>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-8 text-page-subtle">{excerpt}</p>
      </header>
      <p className="mt-10 rounded-2xl border border-tech-card-border bg-tech-card/50 p-5 text-sm leading-7 text-page-subtle">
        {isFa
          ? "این نوشته به‌زودی با محتوای کامل منتشر می‌شود."
          : "The full article will be published here soon."}
      </p>
    </article>
  );
}
