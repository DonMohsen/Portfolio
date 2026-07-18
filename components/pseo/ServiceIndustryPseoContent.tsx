import Link from "next/link";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import TrustStrip from "@/components/Home/TrustStrip";
import { pick, pickFaq } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import type { getServiceIndustryPage } from "@/lib/tools/pseo-datasets";

type ServiceIndustryPageData = NonNullable<
  ReturnType<typeof getServiceIndustryPage>
>;

type ServiceIndustryPseoContentProps = {
  locale: string;
  page: ServiceIndustryPageData;
};

export default function ServiceIndustryPseoContent({
  locale,
  page,
}: ServiceIndustryPseoContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const industryName = pick(locale, page.industry.name);
  const serviceTitle = pick(locale, page.service.title);
  const painPoints = isFa ? page.painPoints.fa : page.painPoints.en;
  const deliverables = isFa ? page.deliverables.fa : page.deliverables.en;
  const faqItems = pickFaq(locale, page.faq);
  const faqJsonLd = buildFaqPageJsonLd(faqItems);

  const h1 = isFa
    ? `${serviceTitle} برای ${industryName}`
    : `${serviceTitle} for ${industryName}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="w-full bg-page transition-colors duration-500">
        <section
          className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <Link
            href={`/${locale}/services/${page.service.slug}`}
            className="text-sm font-medium text-accent-cosmic hover:underline"
          >
            {isFa ? `← ${serviceTitle}` : `← ${serviceTitle}`}
          </Link>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {isFa ? "خدمات × صنعت" : "Service × industry"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
            {h1}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-page-text">
            {pick(locale, page.angle)}
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle">
            {pick(locale, page.industry.context)}
          </p>
        </section>

        <TrustStrip locale={locale} />

        <section
          className={`mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-2 md:px-10 lg:px-12 lg:py-14 ${textAlign}`}
        >
          <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-page-muted">
              {isFa ? "چالش‌های رایج" : "Common challenges"}
            </h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-[14px] leading-6 text-page-subtle">
              {painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-page-muted">
              {isFa ? "خروجی‌های engagement" : "Engagement outputs"}
            </h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-[14px] leading-6 text-page-subtle">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={`mx-auto max-w-7xl border-t border-tech-card-border px-5 py-10 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <h2 className="text-xl font-semibold text-page-text">
            {isFa ? "پروژه مرتبط" : "Related case study"}
          </h2>
          <Link
            href={`/${locale}/work/${page.caseStudySlug}`}
            className="mt-3 inline-block text-accent-cosmic hover:underline"
          >
            {isFa ? "مشاهده case study ←" : "View case study →"}
          </Link>
        </section>

        <section
          className={`mx-auto max-w-7xl px-5 pb-8 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={`/${locale}/services/${page.service.slug}`}
              className="text-accent-cosmic hover:underline"
            >
              {isFa ? "صفحه خدمت (pillar)" : "Service pillar page"}
            </Link>
            <Link
              href={`/${locale}/tools/project-estimator`}
              className="text-page-subtle hover:text-accent-cosmic"
            >
              {isFa ? "برآورد هزینه" : "Cost estimator"}
            </Link>
            <Link
              href={`/${locale}/compare/nextjs-vs-react`}
              className="text-page-subtle hover:text-accent-cosmic"
            >
              {isFa ? "مقایسه Next.js vs React" : "Next.js vs React compare"}
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-8 sm:px-6 md:px-10 lg:px-12">
          <div
            className={`rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10 ${textAlign}`}
          >
            <h2 className="text-xl font-semibold text-page-text">
              {isFa ? "Discovery Sprint رایگان" : "Free discovery sprint"}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-page-subtle">
              {isFa
                ? `بررسی fit برای ${industryName} — بدون فشار فروش.`
                : `Assess fit for ${industryName} — no hard sell.`}
            </p>
            <Link
              href={`/${locale}/contact?tab=schedule&source=pseo:service-industry&service=${page.service.slug}`}
              className="mt-6 inline-flex rounded-lg bg-accent-cosmic px-6 py-3 text-sm font-semibold text-white"
            >
              {isFa ? "رزرو تماس" : "Book a call"}
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12">
          <BlogFAQSection items={faqItems} locale={locale} />
        </section>
      </div>
    </>
  );
}
