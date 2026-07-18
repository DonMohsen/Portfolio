import { sanitizeBlogHtml } from "@/lib/cms/core/sanitize-html";
import { hasBicmContent } from "@/lib/projects/bicm";
import { parseMetricsJson, type ProjectDetail } from "@/lib/projects/types";
import CaseStudyADR from "./CaseStudyADR";
import ClientQuote from "./ClientQuote";
import MetricsTable from "./MetricsTable";
import ScrollMetricsReveal, {
  isAnimatableMetric,
} from "@/components/case-study/ScrollMetricsReveal";
import SoftProjectCta from "@/components/conversion/SoftProjectCta";

type CaseStudyBICMProps = {
  project: ProjectDetail;
  locale: string;
};

function BicmSection({
  id,
  title,
  html,
  locale,
}: {
  id: string;
  title: string;
  html: string;
  locale: string;
}) {
  const isFa = locale === "fa";
  const safeHtml = sanitizeBlogHtml(html);
  if (!safeHtml) return null;

  return (
    <section aria-labelledby={id}>
      {title ? (
        <h3 id={id} className="text-lg font-semibold text-page-text">
          {title}
        </h3>
      ) : null}
      <div
        className={`prose-case-study text-[15px] leading-7 text-page-subtle [&_p]:mb-3 [&_strong]:text-page-text ${title ? "mt-3" : ""}`}
        dir={isFa ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </section>
  );
}

export default function CaseStudyBICM({ project, locale }: CaseStudyBICMProps) {
  const isFa = locale === "fa";
  const metrics = parseMetricsJson(project.metricsJson);

  if (!hasBicmContent(project)) {
    return (
      <div className="space-y-6">
        <div
          className="font-IRANSansXUltraLight whitespace-pre-line leading-relaxed text-page-subtle"
          dir={isFa ? "rtl" : "ltr"}
        >
          {project.longDescription}
        </div>
        {project.highlights.length > 0 ? (
          <div>
            <h2 className="text-xl font-IRANSansXBlack mb-3 text-page-text">
              {isFa ? "ویژگی‌های کلیدی" : "Key highlights"}
            </h2>
            <ul
              className="list-disc ps-5 space-y-2 font-IRANSansXLight text-page-subtle"
              dir={isFa ? "rtl" : "ltr"}
            >
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <SoftProjectCta
          locale={locale}
          source={`case-study:${project.slug}`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {project.problemHtml ? (
        <BicmSection
          id="bicm-problem"
          title={isFa ? "زمینه و مشکل" : "Context & problem"}
          html={project.problemHtml}
          locale={locale}
        />
      ) : null}

      {project.insightHtml ? (
        <BicmSection
          id="bicm-insight"
          title={isFa ? "بینش" : "Insight"}
          html={project.insightHtml}
          locale={locale}
        />
      ) : null}

      {project.changeHtml ? (
        <CaseStudyADR html={project.changeHtml} locale={locale} />
      ) : null}

      {project.measurementHtml || (metrics && metrics.length > 0) ? (
        <section aria-labelledby="bicm-measurement">
          <h3
            id="bicm-measurement"
            className="text-lg font-semibold text-page-text"
          >
            {isFa ? "نتایج و اندازه‌گیری" : "Results & measurement"}
          </h3>
          {project.measurementHtml ? (
            <BicmSection
              id="bicm-measurement-copy"
              title=""
              html={project.measurementHtml}
              locale={locale}
            />
          ) : null}
          {metrics && metrics.length > 0 ? (
            <div className={project.measurementHtml ? "mt-4" : "mt-3"}>
              <ScrollMetricsReveal rows={metrics} locale={locale} />
              {metrics.some((row) => !isAnimatableMetric(row)) ? (
                <div className="mt-4">
                  <MetricsTable
                    rows={metrics.filter((row) => !isAnimatableMetric(row))}
                    locale={locale}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {project.failureHtml ? (
        <BicmSection
          id="bicm-failure"
          title={isFa ? "چه چیزی کار نکرد" : "What didn't work"}
          html={project.failureHtml}
          locale={locale}
        />
      ) : null}

      {project.clientQuote ? (
        <ClientQuote
          quote={project.clientQuote}
          clientName={project.clientName}
          locale={locale}
        />
      ) : null}

      <SoftProjectCta
        locale={locale}
        source={`case-study:${project.slug}`}
        headline={
          isFa
            ? `پروژه‌ای شبیه ${project.name}؟`
            : `Building something like ${project.name}?`
        }
      />
    </div>
  );
}
