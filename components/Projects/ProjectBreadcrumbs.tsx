import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProjectBreadcrumbsProps = {
  locale: string;
  projectName: string;
};

export default function ProjectBreadcrumbs({
  locale,
  projectName,
}: ProjectBreadcrumbsProps) {
  const isFa = locale === "fa";
  const homeLabel = isFa ? "خانه" : "Home";
  const projectsLabel = isFa ? "مطالعات موردی" : "Case studies";
  const Separator = isFa ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label={isFa ? "مسیر صفحه" : "Breadcrumb"}
      className="w-full max-w-4xl px-4 lg:px-0 mb-4"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground font-IRANSansXMedium">
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-foreground transition-colors"
          >
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Separator className="w-4 h-4 opacity-60" />
        </li>
        <li>
          <Link
            href={`/${locale}/work`}
            className="hover:text-foreground transition-colors"
          >
            {projectsLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Separator className="w-4 h-4 opacity-60" />
        </li>
        <li>
          <span className="text-foreground font-IRANSansXDemiBold truncate max-w-[200px] sm:max-w-none inline-block">
            {projectName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
