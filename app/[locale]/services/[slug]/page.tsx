import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceIndustryPseoContent from "@/components/pseo/ServiceIndustryPseoContent";
import ServiceLandingContent from "@/components/services/ServiceLandingContent";
import {
  getServiceLanding,
  SERVICE_SLUGS,
} from "@/lib/services/catalog";
import { pick } from "@/lib/services/pick";
import {
  getServiceIndustryPage,
  INDEXABLE_SERVICE_INDUSTRY_SLUGS,
} from "@/lib/tools/pseo-datasets";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string; slug: string }>;

export const revalidate = 86_400;

export async function generateStaticParams() {
  const serviceParams = ["fa", "en"].flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
  const pseoParams = ["fa", "en"].flatMap((locale) =>
    INDEXABLE_SERVICE_INDUSTRY_SLUGS.map((slug) => ({ locale, slug }))
  );
  return [...serviceParams, ...pseoParams];
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const isFa = locale === "fa";

  const pseoPage = getServiceIndustryPage(slug);
  if (pseoPage) {
    const industryName = pick(locale, pseoPage.industry.name);
    const serviceTitle = pick(locale, pseoPage.service.title);
    const title = isFa
      ? `${serviceTitle} برای ${industryName}`
      : `${serviceTitle} for ${industryName}`;

    return {
      title: isFa ? `${title} | خدمات` : `${title} | Services`,
      description: pick(locale, pseoPage.angle),
      alternates: buildLocaleAlternates(locale, `services/${slug}`),
      robots: pseoPage.indexable
        ? { index: true, follow: true }
        : { index: false, follow: false },
    };
  }

  const landing = getServiceLanding(slug);
  if (!landing) return {};

  const title = pick(locale, landing.title);

  return {
    title: isFa ? `${title} | خدمات` : `${title} | Services`,
    description: pick(locale, landing.metaDescription),
    alternates: buildLocaleAlternates(locale, `services/${slug}`),
  };
}

export default async function ServiceLandingPage(props: { params: Params }) {
  const { locale, slug } = await props.params;

  const pseoPage = getServiceIndustryPage(slug);
  if (pseoPage) {
    if (!pseoPage.indexable) {
      notFound();
    }
    return <ServiceIndustryPseoContent locale={locale} page={pseoPage} />;
  }

  const landing = getServiceLanding(slug);
  if (!landing) {
    notFound();
  }

  return <ServiceLandingContent locale={locale} landing={landing} />;
}
