import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import { threeLevelTrail } from "@/lib/seo/breadcrumb";

type ProjectBreadcrumbsProps = {
  locale: string;
  projectName: string;
  className?: string;
};

export default function ProjectBreadcrumbs({
  locale,
  projectName,
  className = "w-full max-w-4xl px-4 lg:px-0 mb-4",
}: ProjectBreadcrumbsProps) {
  return (
    <SiteBreadcrumbs
      locale={locale}
      items={threeLevelTrail(locale, "work", projectName)}
      className={className}
    />
  );
}
