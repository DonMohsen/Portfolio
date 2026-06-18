import Link from "next/link";
import BlogCard from "./BlogCard";
import { buildBlogListHref } from "@/lib/blogs/build-blog-list-href";
import type { BlogCardItem } from "@/lib/blogs/types";

type BlogListProps = {
  posts: BlogCardItem[];
  locale: string;
};

export default function BlogList({ posts, locale }: BlogListProps) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          description={post.excerpt}
          image={post.image}
          href={post.href}
          readTimeLabel={post.readTimeLabel}
          dateLabel={post.dateLabel}
          views={post.views}
          likes={post.likes}
          priority={index === 0}
          locale={locale}
        />
      ))}
    </div>
  );
}

type BlogPaginationProps = {
  locale: string;
  currentPage: number;
  totalPages: number;
  category?: string;
  sort?: string;
};

export function BlogPagination({
  locale,
  currentPage,
  totalPages,
  category,
  sort,
}: BlogPaginationProps) {
  const isFa = locale === "fa";

  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const getVisiblePages = () => {
    const delta = 0;
    const pages: (number | string)[] = [];

    if (totalPages > 1) pages.push(1);
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageHref = (page: number) =>
    buildBlogListHref(locale, { page, category, sort });

  const btnClass =
    "inline-flex h-8 items-center justify-center rounded-lg border border-tech-card-border bg-tech-card px-3 text-sm font-medium text-page-subtle transition-colors hover:border-accent-cosmic/30 hover:text-page-text";
  const disabledClass =
    "inline-flex h-8 cursor-not-allowed items-center justify-center rounded-lg border border-tech-card-border bg-tech-card px-3 text-sm font-medium text-page-subtle opacity-50";

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label={isFa ? "صفحه‌بندی مقالات بلاگ" : "Blog pagination"}
      role="navigation"
    >
      {currentPage < totalPages ? (
        <Link
          href={pageHref(nextPage)}
          rel="next"
          className={btnClass}
          aria-label={isFa ? `صفحه بعدی، ${nextPage}` : `Next page, ${nextPage}`}
        >
          {isFa ? "بعدی" : "Next"}
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          {isFa ? "بعدی" : "Next"}
        </span>
      )}

      <div className="flex items-center gap-0.5" dir="ltr">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-8 w-8 items-center justify-center text-sm font-medium text-page-subtle"
            >
              ...
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cosmic text-sm font-medium text-accent-cosmic-fg"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={pageHref(page as number)}
              className={btnClass + " w-8 px-0"}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage > 1 ? (
        <Link
          href={pageHref(prevPage)}
          rel="prev"
          className={btnClass}
          aria-label={isFa ? `صفحه قبلی، ${prevPage}` : `Previous page, ${prevPage}`}
        >
          {isFa ? "قبلی" : "Previous"}
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          {isFa ? "قبلی" : "Previous"}
        </span>
      )}
    </nav>
  );
}
