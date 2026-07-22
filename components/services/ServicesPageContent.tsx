import Link from "next/link";
import TrustStrip from "@/components/Home/TrustStrip";
import { SERVICE_INDEX_CARDS } from "@/lib/services/catalog";
import { SERVICE_LADDER } from "@/lib/services/ladder";
import { pick } from "@/lib/services/pick";

type ServicesPageContentProps = {
  locale: string;
};

export default function ServicesPageContent({ locale }: ServicesPageContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {isFa ? "بر اساس نتیجه، نه ساعت" : "Outcome-based offers"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
          {isFa ? "خدمات" : "Services"}
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8">
          {isFa
            ? "از تماس کشف رایگان تا retainer ماهانه — هر پله خروجی مشخص دارد، نه برآورد ساعتی مبهم."
            : "From a free discovery call to monthly retainers — each step has defined outputs, not vague hourly estimates."}
        </p>
        <p className="mt-4">
          <Link
            href={`/${locale}/tools/project-estimator`}
            className="text-sm font-semibold text-accent-cosmic hover:underline"
          >
            {isFa
              ? "برآورد رایگان هزینه ساخت اپلیکیشن ←"
              : "Free MVP cost calculator →"}
          </Link>
        </p>
        <p className="mt-2">
          <Link
            href={`/${locale}/compare/nextjs-vs-react`}
            className="text-sm text-page-subtle hover:text-accent-cosmic"
          >
            {isFa ? "مقایسه‌های فنی (pSEO) ←" : "Technical comparisons (pSEO) →"}
          </Link>
        </p>
      </section>

      <TrustStrip locale={locale} />

      <section
        className={`mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
          {isFa ? "پلکان خدمات" : "Service ladder"}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
          {isFa
            ? "Tier 0 رایگان · Tier 1–3 پروژه‌ای · Tier 4 درآمد بازگشتی (MRR)."
            : "Tier 0 free · Tiers 1–3 project-based · Tier 4 recurring revenue (MRR)."}
        </p>

        <ol className="mt-10 space-y-4">
          {SERVICE_LADDER.map((tier) => (
            <li
              key={`${tier.tier}-${pick(locale, tier.name)}`}
              className="rounded-2xl border border-tech-card-border bg-page/40 p-5 sm:p-6"
            >
              <div
                className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${
                  isFa ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cosmic">
                    Tier {tier.tier}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-page-text">
                    {pick(locale, tier.name)}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-page-subtle">
                    {pick(locale, tier.summary)}
                  </p>
                </div>
                <div className={`shrink-0 ${isFa ? "text-left" : "text-right"}`}>
                  <p className="text-sm font-semibold text-page-text">
                    {pick(locale, tier.price)}
                  </p>
                  {tier.cta ? (
                    <Link
                      href={
                        tier.cta.slug === "schedule"
                          ? `/${locale}/contact?tab=schedule`
                          : `/${locale}/services/${tier.cta.slug}`
                      }
                      className="mt-3 inline-flex text-sm font-medium text-accent-cosmic hover:underline"
                    >
                      {pick(locale, tier.cta.label)} →
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={`border-t border-tech-card-border bg-page/50 ${textAlign}`}
      >
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
            {isFa ? "landingهای تخصصی" : "Specialized offerings"}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
            {isFa
              ? "هر کارت outcome، مخاطب، تایم‌لاین و نقطه شروع قیمت دارد."
              : "Each card includes outcome, audience, timeline, and starting price."}
          </p>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {SERVICE_INDEX_CARDS.map((card) => (
              <li key={card.slug}>
                <Link
                  href={`/${locale}/services/${card.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-tech-card-border bg-page/40 p-6 transition-colors hover:border-accent-cosmic/35 hover:bg-page/60"
                >
                  <div
                    className={`flex items-center justify-between gap-3 ${
                      isFa ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="rounded-full bg-accent-cosmic/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-cosmic">
                      Tier {card.tier}
                    </span>
                    <span className="text-sm font-medium text-page-text">
                      {pick(locale, card.startingFrom)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-page-text group-hover:text-accent-cosmic">
                    {pick(locale, card.outcome)}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-6 text-page-subtle">
                    {pick(locale, card.icp)}
                  </p>
                  <p className="mt-4 text-[13px] text-page-muted">
                    {pick(locale, card.timeline)}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent-cosmic">
                    {isFa ? "جزئیات ←" : "Details →"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-6 md:px-10 lg:px-12 lg:pb-24 ${textAlign}`}
      >
        <div className="rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-2xl font-semibold tracking-tight text-page-text">
            {isFa ? "کدام پله مناسب شماست؟" : "Not sure which tier fits?"}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-page-subtle">
            {isFa
              ? "تماس کشف ۳۰ دقیقه‌ای رایگان — بدون فشار فروش."
              : "Free 30-minute discovery call — no hard sell."}
          </p>
          <Link
            href={`/${locale}/contact?tab=schedule`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
          >
            {isFa ? "رزرو تماس کشف" : "Book a discovery call"}
          </Link>
        </div>
      </section>
    </div>
  );
}
