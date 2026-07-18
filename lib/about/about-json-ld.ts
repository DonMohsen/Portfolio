import { resolveSiteUrl } from "@/lib/metadata-base";
import {
  getPersonSchemaId,
  JOB_TITLE_EN,
  JOB_TITLE_FA,
  PERSON_DESCRIPTION_EN,
  PERSON_DESCRIPTION_FA,
  PROFILE_IMAGE_PATH,
} from "@/lib/seo/person-json-ld";
import { SITE_EMAIL, SITE_NAME, SITE_NAME_FA } from "@/lib/site";

function absoluteUrl(siteUrl: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalized}`;
}

export function buildAboutPageJsonLd(locale: string, siteUrl = resolveSiteUrl()) {
  const isFa = locale === "fa";
  const personId = getPersonSchemaId(siteUrl);
  const pageUrl = `${siteUrl.replace(/\/$/, "")}/${locale}/about`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: isFa ? `درباره ${SITE_NAME_FA}` : `About ${SITE_NAME}`,
        inLanguage: isFa ? "fa" : "en",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        alternateName: SITE_NAME_FA,
        url: siteUrl,
        image: absoluteUrl(siteUrl, PROFILE_IMAGE_PATH),
        jobTitle: isFa ? JOB_TITLE_FA : JOB_TITLE_EN,
        description: isFa ? PERSON_DESCRIPTION_FA : PERSON_DESCRIPTION_EN,
        email: SITE_EMAIL,
      },
    ],
  };
}
