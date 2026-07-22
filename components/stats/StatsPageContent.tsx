import Link from "next/link";
import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import {
  CITEABLE_STATS,
  STATS_HERO,
  STATS_METHODOLOGY,
} from "@/lib/stats/content";
import { pick } from "@/lib/services/pick";
import { resolveSiteUrl } from "@/lib/metadata-base";
import { twoLevelTrail } from "@/lib/seo/breadcrumb";

type StatsPageContentProps = {
  locale: string;
};

export default function StatsPageContent({ locale }: StatsPageContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const siteUrl = resolveSiteUrl();

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: isFa
      ? "آمار قابل استناد — محسن خجسته‌نژاد"
      : "Citeable outcomes — Mohsen Khojasteh Nezhad",
    description: pick(locale, STATS_HERO.subtitle),
    url: `${siteUrl}/${locale}/stats`,
    creator: {
      "@type": "Person",
      name: "Mohsen Khojasteh Nezhad",
      url: siteUrl,
    },
    variableMeasured: CITEABLE_STATS.map((stat) => ({
      "@type": "PropertyValue",
      name: pick(locale, stat.label),
      value: pick(locale, stat.value),
      description: pick(locale, stat.context),
      url: `${siteUrl}/${locale}${stat.sourceHref}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />

      <div className="w-full bg-page transition-colors duration-500">
        <section
          className={`mx-auto max-w-3xl px-5 pb-4 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <SiteBreadcrumbs
            locale={locale}
            items={twoLevelTrail(locale, "stats")}
            className="mb-5"
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {pick(locale, STATS_HERO.eyebrow)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
            {pick(locale, STATS_HERO.title)}
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-page-subtle">
            {pick(locale, STATS_HERO.subtitle)}
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-8 sm:px-6 md:px-10 lg:px-12">
          <ul className="grid gap-4 sm:grid-cols-2">
            {CITEABLE_STATS.map((stat) => (
              <li
                key={stat.id}
                className={`rounded-2xl border border-tech-card-border bg-page/40 p-5 ${textAlign}`}
              >
                <p className="text-3xl font-semibold tabular-nums tracking-tight text-accent-cosmic">
                  {pick(locale, stat.value)}
                </p>
                <h2 className="mt-2 text-base font-semibold text-page-text">
                  {pick(locale, stat.label)}
                </h2>
                <p className="mt-2 text-sm leading-6 text-page-subtle">
                  {pick(locale, stat.context)}
                </p>
                <Link
                  href={`/${locale}${stat.sourceHref}`}
                  className="mt-4 inline-block text-sm font-medium text-accent-cosmic hover:underline"
                >
                  {pick(locale, stat.sourceLabel)} →
                </Link>
              </li>
            ))}
          </ul>

          <p className={`mt-10 text-sm leading-6 text-page-muted ${textAlign}`}>
            {pick(locale, STATS_METHODOLOGY)}
          </p>

          <div
            className={`mt-8 flex flex-col gap-3 sm:flex-row ${
              isFa ? "sm:flex-row-reverse sm:justify-end" : ""
            }`}
          >
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
            >
              {isFa ? "مطالعات موردی" : "Case studies"}
            </Link>
            <Link
              href={`/${locale}/ask`}
              className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
            >
              {isFa ? "پرسش و پاسخ" : "Ask FAQ"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
