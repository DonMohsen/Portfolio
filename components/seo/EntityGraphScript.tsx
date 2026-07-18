import { buildEntityGraphJsonLd } from "@/lib/seo/person-json-ld";
import { resolveSiteUrl } from "@/lib/metadata-base";

/** Person + ProfessionalService JSON-LD for commercial pages. */
export default function EntityGraphScript() {
  const schema = buildEntityGraphJsonLd(resolveSiteUrl());

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
