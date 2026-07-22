import Link from "next/link";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import TrustStrip from "@/components/Home/TrustStrip";
import { pick, pickFaq } from "@/lib/services/pick";
import type { ServiceLanding } from "@/lib/services/types";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";

type ServiceLandingContentProps = {
  locale: string;
  landing: ServiceLanding;
};

export default function ServiceLandingContent({
  locale,
  landing,
}: ServiceLandingContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const faqItems = pickFaq(locale, landing.faq);
  const deliverables = isFa
    ? landing.deliverables.fa
    : landing.deliverables.en;
  const faqJsonLd = buildFaqPageJsonLd(faqItems);

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
            href={`/${locale}/services`}
            className="text-sm font-medium text-accent-cosmic hover:underline"
          >
            {isFa ? "← همه خدمات" : "← All services"}
          </Link>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            Tier {landing.tier} · {pick(locale, landing.startingFrom)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
            {pick(locale, landing.title)}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-page-text sm:text-xl">
            {pick(locale, landing.outcome)}
          </p>
        </section>

        <TrustStrip locale={locale} />

        <section
          className={`mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-3 md:px-10 lg:px-12 lg:py-14 ${textAlign}`}
        >
          <div className="rounded-2xl border border-tech-card-border bg-page/40 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-page-muted">
              {isFa ? "برای چه کسی" : "For whom"}
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-page-subtle">
              {pick(locale, landing.icp)}
            </p>
          </div>
          <div className="rounded-2xl border border-tech-card-border bg-page/40 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-page-muted">
              {isFa ? "تایم‌لاین" : "Timeline"}
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-page-subtle">
              {pick(locale, landing.timeline)}
            </p>
          </div>
          <div className="rounded-2xl border border-tech-card-border bg-page/40 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-page-muted">
              {isFa ? "شروع از" : "Starting from"}
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-page-subtle">
              {pick(locale, landing.startingFrom)}
            </p>
          </div>
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 py-4 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <h2 className="text-xl font-semibold text-page-text">
            {isFa ? "تحویل‌دادنی‌ها" : "Deliverables"}
          </h2>
          <ul className="mt-4 space-y-2">
            {deliverables.map((item) => (
              <li
                key={item}
                className={`flex gap-2 text-[15px] leading-7 text-page-subtle ${
                  isFa ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-accent-cosmic" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`mx-auto max-w-3xl space-y-12 px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
        >
          {landing.sections.map((section) => (
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
              {isFa ? "شروع همکاری" : "Start the conversation"}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-page-subtle">
              {isFa
                ? "تماس کشف یا brief ساختاریافته — service در فرم از پیش انتخاب می‌شود."
                : "Discovery call or structured brief — service pre-selected in the form."}
            </p>
            <div
              className={`mt-6 flex flex-col gap-3 sm:flex-row ${
                isFa ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/${locale}/contact?tab=schedule&service=${landing.slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
              >
                {isFa ? "رزرو تماس" : "Book a call"}
              </Link>
              <Link
                href={`/${locale}/contact?service=${landing.slug}`}
                className="inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
              >
                {isFa ? "ارسال brief" : "Send a brief"}
              </Link>
            </div>
            <p className="mt-4 text-xs text-page-muted">
              <Link href={`/${locale}/process`} className="hover:text-accent-cosmic">
                {isFa ? "فرآیند همکاری را ببینید" : "See how I work"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
