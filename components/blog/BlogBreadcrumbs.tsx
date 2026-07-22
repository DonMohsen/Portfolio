import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import { threeLevelTrail, twoLevelTrail } from "@/lib/seo/breadcrumb";

type BlogBreadcrumbsProps = {
  locale: string;
  postTitle?: string;
  className?: string;
};

export default function BlogBreadcrumbs({
  locale,
  postTitle,
  className = "blog-container mb-4",
}: BlogBreadcrumbsProps) {
  const items = postTitle
    ? threeLevelTrail(locale, "blogs", postTitle)
    : twoLevelTrail(locale, "blogs");

  return (
    <SiteBreadcrumbs
      locale={locale}
      items={items}
      className={className}
    />
  );
}
