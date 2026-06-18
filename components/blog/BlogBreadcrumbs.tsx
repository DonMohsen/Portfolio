import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogBreadcrumbsProps = {
  locale: string;
  postTitle?: string;
};

export default function BlogBreadcrumbs({
  locale,
  postTitle,
}: BlogBreadcrumbsProps) {
  const isFa = locale === "fa";
  const homeLabel = isFa ? "خانه" : "Home";
  const blogLabel = isFa ? "بلاگ" : "Blog";
  const Separator = isFa ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label={isFa ? "مسیر صفحه" : "Breadcrumb"}
      className="blog-container mb-4"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-page-subtle">
        <li>
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-page-text"
          >
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Separator className="h-4 w-4 opacity-60" />
        </li>
        <li>
          {postTitle ? (
            <Link
              href={`/${locale}/blogs`}
              className="transition-colors hover:text-page-text"
            >
              {blogLabel}
            </Link>
          ) : (
            <span className="truncate font-medium text-page-text">
              {blogLabel}
            </span>
          )}
        </li>
        {postTitle ? (
          <>
            <li aria-hidden="true" className="flex items-center">
              <Separator className="h-4 w-4 opacity-60" />
            </li>
            <li>
              <span className="inline-block max-w-[200px] truncate font-medium text-page-text sm:max-w-none">
                {postTitle}
              </span>
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
