import Link from "next/link";
import TrustStrip from "@/components/Home/TrustStrip";
import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import { pick } from "@/lib/services/pick";
import {
  homeTrailItem,
  sectionTrailItem,
} from "@/lib/seo/breadcrumb";
import type { ComparePageData } from "@/lib/tools/pseo-datasets";

type ComparePseoContentProps = {
  locale: string;
  page: ComparePageData;
};

export default function ComparePseoContent({
  locale,
  page,
}: ComparePseoContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const title = pick(locale, page.title);

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <SiteBreadcrumbs
          locale={locale}
          items={[
            homeTrailItem(locale),
            sectionTrailItem(locale, "services"),
            { name: title },
          ]}
          className="mb-5"
        />
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {isFa ? "مقایسه" : "Compare"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle">
          {pick(locale, page.audience)}
        </p>
      </section>

      <TrustStrip locale={locale} />

      <section
        className={`mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <div className="rounded-2xl border border-accent-cosmic/30 bg-accent-cosmic/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-cosmic">
            {isFa ? "جمع‌بندی" : "Verdict"}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-page-text">
            {pick(locale, page.verdict)}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-tech-card-border">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-tech-card-border bg-page/50">
                <th className="px-4 py-3 text-start font-semibold text-page-muted">
                  {isFa ? "بعد" : "Dimension"}
                </th>
                <th className="px-4 py-3 text-start font-semibold text-page-text">
                  {pick(locale, page.left.label)}
                </th>
                <th className="px-4 py-3 text-start font-semibold text-page-text">
                  {pick(locale, page.right.label)}
                </th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr
                  key={pick(locale, row.dimension)}
                  className="border-b border-tech-card-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-page-text">
                    {pick(locale, row.dimension)}
                    {row.winner === "left" ? (
                      <span className="ms-2 text-xs text-accent-cosmic">✓</span>
                    ) : null}
                    {row.winner === "right" ? (
                      <span className="ms-2 text-xs text-page-muted">
                        ({pick(locale, page.right.label)})
                      </span>
                    ) : null}
                  </td>
                  <td
                    className={`px-4 py-3 text-page-subtle ${
                      row.winner === "left" ? "bg-accent-cosmic/5 font-medium" : ""
                    }`}
                  >
                    {pick(locale, row.left)}
                  </td>
                  <td
                    className={`px-4 py-3 text-page-subtle ${
                      row.winner === "right" ? "bg-accent-cosmic/5 font-medium" : ""
                    }`}
                  >
                    {pick(locale, row.right)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-5 pb-8 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href={`/${locale}/services/${page.recommendServiceSlug}`}
            className="font-semibold text-accent-cosmic hover:underline"
          >
            {isFa ? "خدمت پیشنهادی" : "Recommended service"}
          </Link>
          {page.relatedCaseStudySlug ? (
            <Link
              href={`/${locale}/work/${page.relatedCaseStudySlug}`}
              className="text-page-subtle hover:text-accent-cosmic"
            >
              {isFa ? "case study" : "Case study"}
            </Link>
          ) : null}
          <Link
            href={`/${locale}/tools/tech-stack-picker`}
            className="text-page-subtle hover:text-accent-cosmic"
          >
            {isFa ? "انتخاب stack" : "Stack picker"}
          </Link>
        </div>
      </section>

      <section
        className={`mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <Link
          href={`/${locale}/contact?tab=brief&source=pseo:compare&service=${page.recommendServiceSlug}`}
          className="inline-flex rounded-lg bg-accent-cosmic px-6 py-3 text-sm font-semibold text-white"
        >
          {isFa ? "می‌خواهم همین را بسازم" : "I want to build this"}
        </Link>
      </section>
    </div>
  );
}
