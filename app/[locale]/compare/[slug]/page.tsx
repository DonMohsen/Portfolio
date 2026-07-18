import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparePseoContent from "@/components/pseo/ComparePseoContent";
import {
  COMPARE_PAGES,
  getComparePage,
  INDEXABLE_COMPARE_SLUGS,
} from "@/lib/tools/pseo-datasets";
import { pick } from "@/lib/services/pick";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string; slug: string }>;

export const revalidate = 86_400;

export async function generateStaticParams() {
  return ["fa", "en"].flatMap((locale) =>
    INDEXABLE_COMPARE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const page = getComparePage(slug);
  if (!page || !page.indexable) return {};

  const isFa = locale === "fa";

  return {
    title: isFa
      ? `${pick(locale, page.title)} | مقایسه`
      : `${pick(locale, page.title)} | Compare`,
    description: pick(locale, page.metaDescription),
    alternates: buildLocaleAlternates(locale, `compare/${slug}`),
    robots: page.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function ComparePage(props: { params: Params }) {
  const { locale, slug } = await props.params;
  const page = getComparePage(slug);

  if (!page || !page.indexable) {
    notFound();
  }

  return <ComparePseoContent locale={locale} page={page} />;
}

/** For sitemap generation */
export function getAllCompareSlugs(): string[] {
  return COMPARE_PAGES.filter((p) => p.indexable).map((p) => p.slug);
}
