import Link from "next/link";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import TrustStrip from "@/components/Home/TrustStrip";
import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import type { HireCapturePage } from "@/lib/hire/types";
import { pick, pickFaq } from "@/lib/services/pick";
import { homeTrailItem, sectionTrailItem } from "@/lib/seo/breadcrumb";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";

type HireCaptureContentProps = {
  locale: string;
  page: HireCapturePage;
};

export default function HireCaptureContent({
  locale,
  page,
}: HireCaptureContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const title = pick(locale, page.title);
  const faqItems = pickFaq(locale, page.faq);
  const stack = isFa ? page.stackHighlights.fa : page.stackHighlights.en;
  const faqJsonLd = buildFaqPageJsonLd(faqItems);
  const contactSource = `hire:${page.slug}`;

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
            {pick(locale, page.keyword)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-page-subtle sm:text-xl sm:leading-9">
            {pick(locale, page.subtitle)}
          </p>
          <div
            className={`mt-8 flex flex-col gap-3 sm:flex-row ${
              isFa ? "sm:flex-row-reverse sm:justify-end" : ""
            }`}
          >
            <Link
              href={`/${locale}/contact?tab=schedule&source=${contactSource}`}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
            >
              {isFa ? "رزرو تماس کشف" : "Book a discovery call"}
            </Link>
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
            >
              {isFa ? "مطالعات موردی" : "View case studies"}
            </Link>
          </div>
        </section>

        <TrustStrip locale={locale} />

        <section
          className={`border-y border-tech-card-border bg-page/50 ${textAlign}`}
        >
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-14">
            <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
              {isFa ? "اثبات در production" : "Proof in production"}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
              {isFa
                ? "پروژه‌های Next.js واقعی با metric قبل/بعد — نه اسکرین‌شات دمو."
                : "Real Next.js projects with before/after metrics — not demo screenshots."}
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {page.proofLinks.map((proof) => (
                <li key={proof.slug}>
                  <Link
                    href={`/${locale}/work/${proof.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-tech-card-border bg-page/40 p-5 transition-colors hover:border-accent-cosmic/35"
                  >
                    <h3 className="font-semibold text-page-text group-hover:text-accent-cosmic">
                      {pick(locale, proof.label)}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-6 text-page-subtle">
                      {pick(locale, proof.metric)}
                    </p>
                    <span className="mt-4 text-sm font-medium text-accent-cosmic">
                      {isFa ? "case study ←" : "Case study →"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={`mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <h2 className="text-xl font-semibold text-page-text">
            {isFa ? "استک Next.js" : "Next.js stack"}
          </h2>
          <ul
            className={`mt-4 flex flex-wrap gap-2 ${
              isFa ? "justify-end" : ""
            }`}
          >
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-tech-card-border bg-page/40 px-3 py-1.5 text-[13px] text-page-subtle"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-page-muted">
            <Link
              href={`/${locale}/stack`}
              className="font-medium text-accent-cosmic hover:underline"
            >
              {isFa ? "استک کامل فنی" : "Full technical stack"}
            </Link>
          </p>
        </section>

        <section
          className={`mx-auto max-w-3xl space-y-12 px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
        >
          {page.sections.map((section) => (
            <article key={pick(locale, section.heading)}>
              <h2 className="text-xl font-semibold tracking-tight text-page-text sm:text-2xl">
                {pick(locale, section.heading)}
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8">
                {pick(locale, section.body)}
              </p>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-8 sm:px-6 md:px-10 lg:px-12">
          <BlogFAQSection items={faqItems} locale={locale} />
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12 lg:pb-24 ${textAlign}`}
        >
          <div className="rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10">
            <h2 className="text-xl font-semibold text-page-text sm:text-2xl">
              {isFa ? "آماده استخدام؟" : "Ready to hire?"}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-page-subtle">
              {isFa
                ? "تماس کشف رایگان ۳۰ دقیقه‌ای — fit، تایم‌لاین و مدل همکاری را مشخص می‌کنیم."
                : "Free 30-minute discovery — we'll confirm fit, timeline, and engagement model."}
            </p>
            <div
              className={`mt-6 flex flex-col gap-3 sm:flex-row ${
                isFa ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/${locale}/contact?tab=schedule&source=${contactSource}`}
                className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
              >
                {isFa ? "رزرو تماس" : "Book a call"}
              </Link>
              <Link
                href={`/${locale}/services/${page.relatedServiceSlug}`}
                className="inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
              >
                {isFa ? "جزئیات سرویس مرتبط" : "Related service details"}
              </Link>
            </div>
            <p className="mt-4 text-sm text-page-muted">
              <Link href={`/${locale}/process`} className="hover:text-accent-cosmic">
                {isFa ? "فرآیند همکاری" : "How I work"}
              </Link>
              {" · "}
              <Link href={`/${locale}/services`} className="hover:text-accent-cosmic">
                {isFa ? "همه خدمات" : "All services"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
