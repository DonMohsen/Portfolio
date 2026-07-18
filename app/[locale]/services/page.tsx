import type { Metadata } from "next";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import EntityGraphScript from "@/components/seo/EntityGraphScript";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "خدمات | محسن خجسته‌نژاد"
      : "Services | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "پلکان خدمات از کشف تا retainer: SaaS MVP، ممیزی Next.js، AI، اتوماسیون، i18n، Fractional CTO و اشتراک محصول."
      : "Service ladder from discovery to retainer: SaaS MVP, Next.js audit, AI products, automation, i18n, fractional CTO, and product subscription.",
    alternates: buildLocaleAlternates(locale, "services"),
  };
}

export default async function ServicesPage(props: { params: Params }) {
  const { locale } = await props.params;

  return (
    <>
      <EntityGraphScript />
      <ServicesPageContent locale={locale} />
    </>
  );
}
