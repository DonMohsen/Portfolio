import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";
import {
  JOB_TITLE_EN,
  JOB_TITLE_FA,
  PERSON_DESCRIPTION_EN,
  PERSON_DESCRIPTION_FA,
} from "@/lib/seo/person-json-ld";
import { SITE_NAME, SITE_NAME_FA } from "@/lib/site";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? `درباره ${SITE_NAME_FA} | ${JOB_TITLE_FA}`
      : `About ${SITE_NAME} | ${JOB_TITLE_EN}`,
    description: isFa ? PERSON_DESCRIPTION_FA : PERSON_DESCRIPTION_EN,
    alternates: buildLocaleAlternates(locale, "about"),
  };
}

export default async function AboutPage(props: { params: Params }) {
  const { locale } = await props.params;

  return <AboutPageContent locale={locale} />;
}
