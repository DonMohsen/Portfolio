import Link from "next/link";
import AskFAQ from "@/components/ask/AskFAQ";
import TrustStrip from "@/components/Home/TrustStrip";
import {
  ASK_HERO,
  getAskFaqForLocale,
  getAskFaqJsonLdItems,
} from "@/lib/ask/content";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";

type AskPageContentProps = {
  locale: string;
};

export default function AskPageContent({ locale }: AskPageContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const faqItems = getAskFaqForLocale(locale);
  const faqJsonLd = buildFaqPageJsonLd(getAskFaqJsonLdItems(locale));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="w-full bg-page transition-colors duration-500">
        <section
          className={`mx-auto max-w-3xl px-5 pb-4 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {pick(locale, ASK_HERO.eyebrow)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
            {pick(locale, ASK_HERO.title)}
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-page-subtle">
            {pick(locale, ASK_HERO.subtitle)}
          </p>
          <p className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href={`/${locale}/contact?tab=chat&source=ask`}
              className="font-medium text-accent-cosmic hover:underline"
            >
              {isFa ? "مشاور AI ←" : "AI advisor →"}
            </Link>
            <Link
              href={`/${locale}/tools/project-estimator`}
              className="text-page-subtle hover:text-accent-cosmic"
            >
              {isFa ? "برآورد هزینه" : "Cost estimator"}
            </Link>
          </p>
        </section>

        <TrustStrip locale={locale} />

        <section className="mx-auto max-w-3xl px-5 py-10 sm:px-6 md:px-10 lg:px-12">
          <AskFAQ locale={locale} items={faqItems} />
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <div className="rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10">
            <h2 className="text-xl font-semibold text-page-text">
              {isFa ? "سؤال خود را نپرسیدید؟" : "Didn't find your question?"}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-page-subtle">
              {isFa
                ? "مشاور AI با context خدمات و case study — یا تماس کشف ۳۰ دقیقه‌ای رایگان."
                : "AI advisor with services & case study context — or a free 30-minute discovery call."}
            </p>
            <div
              className={`mt-6 flex flex-wrap gap-3 ${isFa ? "flex-row-reverse justify-end" : ""}`}
            >
              <Link
                href={`/${locale}/contact?tab=schedule&source=ask`}
                className="inline-flex rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
              >
                {isFa ? "رزرو تماس" : "Book a call"}
              </Link>
              <Link
                href={`/${locale}/contact?tab=brief&source=ask`}
                className="inline-flex rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
              >
                {isFa ? "ارسال brief" : "Send brief"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
