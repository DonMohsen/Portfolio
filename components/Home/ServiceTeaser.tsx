import Link from "next/link";
import { SERVICE_INDEX_CARDS } from "@/lib/services/catalog";
import { pick } from "@/lib/services/pick";

const TEASER_SLUGS = ["saas-mvp", "nextjs-audit", "fractional-cto"] as const;

type ServiceTeaserProps = {
  locale: string;
};

export default function ServiceTeaser({ locale }: ServiceTeaserProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  const cards = SERVICE_INDEX_CARDS.filter((card) =>
    TEASER_SLUGS.includes(card.slug as (typeof TEASER_SLUGS)[number])
  );

  return (
    <section
      className={`border-y border-tech-card-border bg-page/50 ${textAlign}`}
      aria-labelledby="home-services-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 lg:px-12">
        <div
          className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
            isFa ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
              {isFa ? "خدمات" : "Services"}
            </p>
            <h2
              id="home-services-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-page-text sm:text-3xl"
            >
              {isFa ? "پیشنهادهای اصلی" : "Core offers"}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
              {isFa
                ? "بر اساس نتیجه — از MVP تا Fractional CTO."
                : "Outcome-based — from MVP builds to fractional CTO."}
            </p>
          </div>
          <Link
            href={`/${locale}/services`}
            className="shrink-0 text-sm font-semibold text-accent-cosmic hover:underline"
          >
            {isFa ? "همه خدمات ←" : "All services →"}
          </Link>
        </div>
        <p className="mt-2 text-sm text-page-muted">
          <Link
            href={`/${locale}/tools/project-estimator`}
            className="font-medium text-accent-cosmic hover:underline"
          >
            {isFa
              ? "برآورد رایگان هزینه ساخت اپلیکیشن ←"
              : "Free MVP cost calculator →"}
          </Link>
        </p>

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.slug}>
              <Link
                href={`/${locale}/services/${card.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-tech-card-border bg-page/40 p-5 transition-colors hover:border-accent-cosmic/35"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-cosmic">
                  Tier {card.tier}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-page-text group-hover:text-accent-cosmic">
                  {pick(locale, card.outcome)}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-6 text-page-subtle">
                  {pick(locale, card.icp)}
                </p>
                <p className="mt-4 text-sm font-medium text-page-text">
                  {pick(locale, card.startingFrom)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
