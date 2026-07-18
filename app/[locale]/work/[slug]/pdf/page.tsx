import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/lib/projects/get-all-project-slugs";
import { getProjectBySlug } from "@/lib/projects/get-project-by-slug";
import { hasBicmContent } from "@/lib/projects/bicm";
import { parseMetricsJson } from "@/lib/projects/types";
import { sanitizeBlogHtml } from "@/lib/cms/core/sanitize-html";
import { buildLocaleAlternates } from "@/lib/site-alternates";
import { SITE_NAME, SITE_NAME_FA } from "@/lib/site";
import CaseStudyPdfActions from "@/components/CaseStudy/CaseStudyPdfActions";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found" };

  const isFa = locale === "fa";
  return {
    title: isFa
      ? `${project.name} — PDF | مطالعات موردی`
      : `${project.name} — PDF | Case Studies`,
    description: project.summary,
    alternates: buildLocaleAlternates(locale, `work/${slug}/pdf`),
    robots: { index: false, follow: true },
  };
}

function PdfSection({
  title,
  html,
  isFa,
}: {
  title: string;
  html: string | null | undefined;
  isFa: boolean;
}) {
  if (!html) return null;
  const safe = sanitizeBlogHtml(html);
  if (!safe) return null;

  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <div
        className="prose-case-study mt-3 text-[14px] leading-7 text-neutral-700 [&_p]:mb-2"
        dir={isFa ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: safe }}
      />
    </section>
  );
}

export default async function CaseStudyPdfPage({ params }: Props) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const isFa = locale === "fa";
  const metrics = parseMetricsJson(project.metricsJson);
  const siteName = isFa ? SITE_NAME_FA : SITE_NAME;

  return (
    <div
      className="min-h-svh bg-white text-neutral-900"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-3xl px-6 py-8 print:px-0 print:py-0">
        <CaseStudyPdfActions locale={locale} slug={slug} />

        <header className="border-b border-neutral-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {isFa ? "مطالعه موردی" : "Case study"}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="mt-3 text-[15px] leading-7 text-neutral-600">
            {project.summary}
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            {siteName}
            {project.role ? ` · ${project.role}` : ""}
            {project.year ? ` · ${project.year}` : ""}
            {project.outcomeMetric ? ` · ${project.outcomeMetric}` : ""}
          </p>
        </header>

        {hasBicmContent(project) ? (
          <>
            <PdfSection
              title={isFa ? "مسئله" : "Problem"}
              html={project.problemHtml}
              isFa={isFa}
            />
            <PdfSection
              title={isFa ? "بینش" : "Insight"}
              html={project.insightHtml}
              isFa={isFa}
            />
            <PdfSection
              title={isFa ? "تغییر" : "Change"}
              html={project.changeHtml}
              isFa={isFa}
            />
            <PdfSection
              title={isFa ? "اندازه‌گیری" : "Measurement"}
              html={project.measurementHtml}
              isFa={isFa}
            />
            <PdfSection
              title={isFa ? "چه چیزی کار نکرد" : "What didn't work"}
              html={project.failureHtml}
              isFa={isFa}
            />
          </>
        ) : (
          <section className="mt-8">
            <p className="whitespace-pre-line text-[14px] leading-7 text-neutral-700">
              {project.longDescription}
            </p>
          </section>
        )}

        {metrics && metrics.length > 0 ? (
          <section className="mt-8 break-inside-avoid">
            <h2 className="text-lg font-semibold">
              {isFa ? "متریک‌ها" : "Metrics"}
            </h2>
            <table className="mt-3 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-300 text-left">
                  <th className="py-2 pe-3 font-semibold">
                    {isFa ? "شاخص" : "Metric"}
                  </th>
                  <th className="py-2 pe-3 font-semibold">
                    {isFa ? "قبل" : "Before"}
                  </th>
                  <th className="py-2 pe-3 font-semibold">
                    {isFa ? "بعد" : "After"}
                  </th>
                  <th className="py-2 font-semibold">Δ</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((row) => (
                  <tr key={row.label} className="border-b border-neutral-100">
                    <td className="py-2 pe-3">{row.label}</td>
                    <td className="py-2 pe-3">{row.before ?? "—"}</td>
                    <td className="py-2 pe-3">{row.after ?? "—"}</td>
                    <td className="py-2">{row.delta ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {project.clientQuote ? (
          <blockquote className="mt-8 border-s-4 border-neutral-300 ps-4 text-[15px] leading-7 text-neutral-700 italic">
            “{project.clientQuote}”
            {project.clientName ? (
              <footer className="mt-2 text-sm not-italic text-neutral-500">
                — {project.clientName}
              </footer>
            ) : null}
          </blockquote>
        ) : null}

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <p>
            {isFa ? "منبع:" : "Source:"}{" "}
            <Link
              href={`/${locale}/work/${slug}`}
              className="text-neutral-800 underline"
            >
              mohsen.info/{locale}/work/{slug}
            </Link>
          </p>
          <p className="mt-2">
            {isFa
              ? "برای همکاری: mohsen.info/contact"
              : "To work together: mohsen.info/contact"}
          </p>
        </footer>
      </div>
    </div>
  );
}
