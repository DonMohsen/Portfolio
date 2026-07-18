import Link from "next/link";
import { FIRST_90_DAYS } from "@/lib/process/content";
import { pick } from "@/lib/services/pick";

type First90DaysSectionProps = {
  locale: string;
};

export default function First90DaysSection({ locale }: First90DaysSectionProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <section
      className={`mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      aria-labelledby="home-first-90-heading"
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
          isFa ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {isFa ? "فرآیند" : "Process"}
          </p>
          <h2
            id="home-first-90-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-page-text sm:text-3xl"
          >
            {pick(locale, FIRST_90_DAYS.title)}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
            {pick(locale, FIRST_90_DAYS.subtitle)}
          </p>
        </div>
        <Link
          href={`/${locale}/process`}
          className="shrink-0 text-sm font-semibold text-accent-cosmic hover:underline"
        >
          {isFa ? "فرآیند کامل ←" : "Full process →"}
        </Link>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FIRST_90_DAYS.phases.map((phase, index) => (
          <li
            key={phase.id}
            className="rounded-xl border border-tech-card-border bg-page/40 p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cosmic">
              {pick(locale, phase.weeks)}
            </p>
            <h3 className="mt-2 font-semibold text-page-text">
              {String(index + 1).padStart(2, "0")}. {pick(locale, phase.title)}
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-page-subtle">
              {pick(locale, phase.summary)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
