import { sanitizeBlogHtml } from "@/lib/cms/core/sanitize-html";

type CaseStudyADRProps = {
  html: string;
  locale: string;
};

export default function CaseStudyADR({ html, locale }: CaseStudyADRProps) {
  const isFa = locale === "fa";
  const safeHtml = sanitizeBlogHtml(html);

  if (!safeHtml) return null;

  return (
    <section aria-labelledby="case-study-adr-heading">
      <h3
        id="case-study-adr-heading"
        className="text-lg font-semibold text-page-text"
      >
        {isFa ? "راه‌حل و تصمیم‌های معماری" : "Solution & architecture decisions"}
      </h3>
      <div
        className="prose-case-study mt-3 text-[15px] leading-7 text-page-subtle [&_li]:my-1 [&_strong]:text-page-text [&_ul]:list-disc [&_ul]:ps-5"
        dir={isFa ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </section>
  );
}
