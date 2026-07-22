import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import {
  buildBreadcrumbListJsonLd,
  type BreadcrumbTrailItem,
} from "@/lib/seo/breadcrumb";

type SiteBreadcrumbsProps = {
  locale: string;
  items: BreadcrumbTrailItem[];
  className?: string;
  /** Skip JSON-LD when the page already emits an identical BreadcrumbList. */
  includeJsonLd?: boolean;
};

/**
 * Visible breadcrumb nav + matching BreadcrumbList JSON-LD.
 * Schema names/order must stay identical to what users see (Google policy).
 */
export default function SiteBreadcrumbs({
  locale,
  items,
  className,
  includeJsonLd = true,
}: SiteBreadcrumbsProps) {
  const isFa = locale === "fa";
  const Separator = isFa ? ChevronLeft : ChevronRight;
  const jsonLd = includeJsonLd ? buildBreadcrumbListJsonLd(items) : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <nav
        aria-label={isFa ? "مسیر صفحه" : "Breadcrumb"}
        className={clsx("w-full", className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-page-subtle">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <Separator
                    className="h-3.5 w-3.5 shrink-0 opacity-50"
                    aria-hidden
                  />
                ) : null}
                {isLast || !item.pathname ? (
                  <span
                    className="inline-block max-w-[14rem] truncate font-medium text-page-text sm:max-w-none"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.pathname}
                    className="transition-colors hover:text-page-text"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
