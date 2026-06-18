import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogContentTable from "@/components/blog/BlogContentTable";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogCommentsSection from "@/components/blog/BlogCommentsSection";
import BlogAddComment from "@/components/blog/BlogAddComment";
import { BLOG_AUTHOR } from "@/lib/blogs/constants";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getPostContent,
  getPostHeadings,
  getRelatedPosts,
  getSidebarPosts,
} from "@/lib/blogs/get-blog-data";
import { Suspense } from "react";
import { Calendar } from "lucide-react";

const BlogScrollProgressBar = dynamic(
  () => import("@/components/blog/BlogScrollProgressBar"),
  { loading: () => null }
);

const BlogStatsSidebar = dynamic(
  () => import("@/components/blog/BlogStatsSidebar"),
  { loading: () => null }
);

const BlogRelatedArticles = dynamic(
  () => import("@/components/blog/BlogRelatedArticles"),
  {
    loading: () => (
      <div className="blog-container mt-10 h-64 animate-pulse rounded-2xl border border-tech-card-border bg-tech-card" />
    ),
  }
);

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return ["fa", "en"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
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

export const revalidate = 600;
export const dynamicParams = true;

function SidebarFallback() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-tech-card-border bg-tech-card" />
  );
}

export default async function BlogPostPage(props: { params: Params }) {
  const { locale, slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const isFa = locale === "fa";
  const content = getPostContent(post, locale);
  const headings = getPostHeadings(post, locale);
  const sidebar = await getSidebarPosts(locale);
  const related = await getRelatedPosts(slug, locale);
  const author = isFa ? BLOG_AUTHOR.fa : BLOG_AUTHOR.en;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Mohsen Khojasteh Nezhad",
    },
    inLanguage: isFa ? "fa" : "en",
  };

  return (
    <>
      <BlogScrollProgressBar />

      <div className="mt-24 min-h-[100dvh] w-full bg-page py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <BlogBreadcrumbs locale={locale} postTitle={content.title} />

        <div className="blog-container relative mt-5 flex gap-6">
          <div className="mt-[80px] flex w-[60px] shrink-0 max-xl:hidden">
            <div className="sticky top-[95px] w-full self-start">
              <BlogStatsSidebar
                locale={locale}
                initialViews={content.views}
                initialLikesCount={content.likes}
                initialCommentsCount={2}
              />
            </div>
          </div>

          <div className="mx-auto flex w-3/4 min-w-0 flex-col overflow-hidden max-xl:w-full">
            <div className="relative mb-5 h-[400px] w-full overflow-hidden rounded-2xl max-md:h-[200px]">
              <Image
                src={content.image}
                alt={content.title}
                fill
                priority
                className="scale-105 object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>

            <h1 className="mb-6 text-3xl font-bold text-page-text">
              {content.title}
            </h1>

            <div className="mx-auto flex w-full min-w-0 flex-col gap-6 rounded-2xl pb-0 max-md:py-5">
              <div className="flex w-full items-center justify-between gap-8 border-b border-tech-card-border pb-2 text-page-subtle max-md:gap-4 xl:border-b">
                <div className="flex items-center gap-1">
                  <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-tech-card">
                    <Image
                      src="/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png"
                      alt={author}
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  </div>
                  <p className="text-sm tracking-tighter">
                    <span className="max-md:hidden">
                      {isFa ? " نویسنده: " : " Author: "}
                    </span>
                    <span className="font-medium text-page-text">{author}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-5 w-5" />
                  <p className="text-sm tracking-tighter">
                    <span className="max-md:hidden">
                      {isFa ? " تاریخ انتشار: " : " Published: "}
                    </span>
                    <span className="font-medium text-page-text">
                      {content.dateLabel}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-b border-tech-card-border pb-3 pt-1 xl:hidden">
                <BlogStatsSidebar
                  locale={locale}
                  initialViews={content.views}
                  initialLikesCount={content.likes}
                  initialCommentsCount={2}
                  horizontal
                />
              </div>

              {headings.length > 0 ? (
                <div className="mb-6">
                  <BlogContentTable topics={headings} locale={locale} />
                </div>
              ) : null}

              <div id="blog-content-with-conclusion" className="w-full min-w-0">
                <div
                  className="blog-content prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: content.contentHtml }}
                />

                {content.faq.length > 0 ? (
                  <div className="mt-8">
                    <BlogFAQSection items={content.faq} locale={locale} />
                  </div>
                ) : null}

                {content.conclusionHtml ? (
                  <div
                    id="blog-conclusion"
                    className="blog-content prose prose-sm mt-6 max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html: content.conclusionHtml,
                    }}
                  />
                ) : null}
              </div>

              <div className="xl:hidden">
                <Suspense fallback={<SidebarFallback />}>
                  <BlogSidebar
                    locale={locale}
                    latestPosts={sidebar.latest}
                    popularPosts={sidebar.popular}
                  />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="flex w-1/4 max-xl:hidden">
            <div className="w-full">
              <div className="sticky top-[95px]">
                <Suspense fallback={<SidebarFallback />}>
                  <BlogSidebar
                    locale={locale}
                    latestPosts={sidebar.latest}
                    popularPosts={sidebar.popular}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <BlogCommentsSection locale={locale} />
        <BlogAddComment locale={locale} />
        <BlogRelatedArticles articles={related} locale={locale} />
      </div>
    </>
  );
}
