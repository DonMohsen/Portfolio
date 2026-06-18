import { Suspense } from "react";
import { Metadata } from "next";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogHero from "@/components/blog/BlogHero";
import BlogList, { BlogPagination } from "@/components/blog/BlogList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { BLOG_AUTHOR } from "@/lib/blogs/constants";
import {
  getBlogListingPosts,
  getSidebarPosts,
} from "@/lib/blogs/get-blog-data";
import type { BlogCategory } from "@/lib/blogs/types";

type Params = Promise<{ locale: string }>;
type SearchParams = Promise<{
  category?: string;
  page?: string;
  sort?: string;
}>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";
  return {
    title: isFa ? "بلاگ | محسن خجسته نژاد" : "Blog | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "نوشته‌های شخصی و فنی محسن خجسته نژاد."
      : "Personal and technical articles by Mohsen Khojasteh Nezhad.",
    alternates: {
      canonical: `/${locale}/blogs`,
    },
  };
}

function parseCategory(value?: string): BlogCategory | "all" {
  if (value === "tech" || value === "personal") return value;
  return "all";
}

function SidebarFallback() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-tech-card-border bg-tech-card" />
  );
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const isFa = locale === "fa";
  const category = parseCategory(sp.category);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const sort = sp.sort === "popular" ? "popular" : "latest";

  const listing = await getBlogListingPosts(locale, { category, page, sort });
  const sidebar = await getSidebarPosts(locale);

  return (
    <div className="mt-24 min-h-[100dvh] w-full bg-page py-10">
      <BlogBreadcrumbs locale={locale} />

      <div className="blog-container mt-5 rounded-2xl border border-tech-card-border bg-tech-card pb-4 shadow-[var(--tech-card-shadow)]">
        <div className="flex items-center gap-4 rounded-xl p-5 px-6 max-md:justify-between max-md:text-sm">
          <h1 className="whitespace-nowrap font-light text-page-text">
            {isFa
              ? "مقالات فنی و شخصی محسن خجسته‌نژاد"
              : "Technical and personal articles"}
          </h1>
          <hr className="flex-1 border-t border-tech-card-border max-md:hidden" />
        </div>

        {listing.featured ? (
          <div className="px-5">
            <BlogHero
              title={listing.featured.title}
              image={listing.featured.image}
              date={listing.featured.dateLabel}
              author={isFa ? BLOG_AUTHOR.fa : BLOG_AUTHOR.en}
              href={listing.featured.href}
              readLabel={isFa ? "مطالعه مقاله" : "Read article"}
            />
          </div>
        ) : null}
      </div>

      <div className="blog-container mt-6 flex gap-6">
        <div className="mx-auto flex w-3/4 flex-col max-xl:w-full">
          <div className="mx-auto flex w-full flex-col gap-6 rounded-2xl py-1 max-md:py-5">
            <BlogList posts={listing.posts} locale={locale} />
            <BlogPagination
              locale={locale}
              currentPage={listing.currentPage}
              totalPages={listing.totalPages}
              category={category === "all" ? undefined : category}
              sort={sort}
            />

            <div className="mt-6 xl:hidden">
              <Suspense fallback={<SidebarFallback />}>
                <BlogSidebar
                  locale={locale}
                  latestPosts={sidebar.latest}
                  popularPosts={sidebar.popular}
                  activeCategory={category}
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
                  activeCategory={category}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 600;
