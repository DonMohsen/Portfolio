import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HireCaptureContent from "@/components/hire/HireCaptureContent";
import { getHireCapturePage, HIRE_SLUGS } from "@/lib/hire/catalog";
import { pick } from "@/lib/services/pick";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return ["fa", "en"].flatMap((locale) =>
    HIRE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const page = getHireCapturePage(slug);
  if (!page) return {};

  const isFa = locale === "fa";
  const title = pick(locale, page.title);

  return {
    title: isFa
      ? `${title} | محسن خجسته‌نژاد`
      : `${title} | Mohsen Khojasteh Nezhad`,
    description: pick(locale, page.metaDescription),
    alternates: buildLocaleAlternates(locale, `hire/${slug}`),
  };
}

export default async function HireCapturePage(props: { params: Params }) {
  const { locale, slug } = await props.params;
  const page = getHireCapturePage(slug);

  if (!page) {
    notFound();
  }

  return <HireCaptureContent locale={locale} page={page} />;
}
