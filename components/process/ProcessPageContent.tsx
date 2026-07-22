import Link from "next/link";
import {
  Compass,
  DraftingCompass,
  Hammer,
  MonitorPlay,
  PackageCheck,
} from "lucide-react";
import TrustStrip from "@/components/Home/TrustStrip";
import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import {
  FIRST_90_DAYS,
  OWNERSHIP_BLOCK,
  PROCESS_CTA,
  PROCESS_HERO,
  PROCESS_STEPS,
} from "@/lib/process/content";
import { twoLevelTrail } from "@/lib/seo/breadcrumb";

const STEP_ICONS = [
  Compass,
  DraftingCompass,
  Hammer,
  MonitorPlay,
  PackageCheck,
] as const;

type ProcessPageContentProps = {
  locale: string;
};

function pick<T extends { en: string; fa: string }>(locale: string, copy: T) {
  return locale === "fa" ? copy.fa : copy.en;
}

export default function ProcessPageContent({ locale }: ProcessPageContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <SiteBreadcrumbs
          locale={locale}
          items={twoLevelTrail(locale, "process")}
          className="mb-5"
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {pick(locale, PROCESS_HERO.eyebrow)}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
          {pick(locale, PROCESS_HERO.title)}
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8">
          {pick(locale, PROCESS_HERO.subtitle)}
        </p>
      </section>

      <TrustStrip locale={locale} />

      <section
        className={`mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
          {isFa ? "پنج مرحله" : "Five stages"}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
          {isFa
            ? "از کشف تا تحویل — هر مرحله خروجی مشخص دارد."
            : "Discovery through handoff — each stage ships tangible outputs."}
        </p>

        <ol className="mt-10 grid gap-5 lg:grid-cols-5 lg:gap-4">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            const deliverables = isFa
              ? step.deliverables.fa
              : step.deliverables.en;

            return (
              <li
                key={step.id}
                className="flex flex-col rounded-2xl border border-tech-card-border bg-page/40 p-5 backdrop-blur-sm transition-colors hover:border-accent-cosmic/30"
              >
                <div
                  className={`flex items-center gap-3 ${
                    isFa ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-cosmic/15 text-accent-cosmic">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-page-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-semibold text-page-text">
                      {pick(locale, step.title)}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[14px] leading-6 text-page-subtle">
                  {pick(locale, step.summary)}
                </p>
                <ul className="mt-4 space-y-2 border-t border-tech-card-border pt-4">
                  {deliverables.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-2 text-[13px] leading-5 text-page-muted ${
                        isFa ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span
                        className="mt-1 shrink-0 text-accent-cosmic"
                        aria-hidden
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        className={`border-y border-tech-card-border bg-page/50 ${textAlign}`}
      >
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
            {pick(locale, FIRST_90_DAYS.title)}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-page-subtle">
            {pick(locale, FIRST_90_DAYS.subtitle)}
          </p>

          <ol className="relative mt-10 space-y-0">
            {FIRST_90_DAYS.phases.map((phase, index) => {
              const isLast = index === FIRST_90_DAYS.phases.length - 1;

              return (
                <li
                  key={phase.id}
                  className={`relative flex gap-5 pb-10 lg:gap-8 ${
                    isFa ? "flex-row-reverse" : ""
                  } ${isLast ? "pb-0" : ""}`}
                >
                  <div
                    className={`relative flex shrink-0 flex-col items-center ${
                      isFa ? "items-center" : ""
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-cosmic/40 bg-accent-cosmic/10 text-[11px] font-bold uppercase tracking-wider text-accent-cosmic">
                      {index + 1}
                    </span>
                    {!isLast ? (
                      <span
                        className="mt-2 w-px flex-1 bg-tech-card-border"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cosmic">
                      {pick(locale, phase.weeks)}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-page-text">
                      {pick(locale, phase.title)}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14px] leading-6 text-page-subtle">
                      {pick(locale, phase.summary)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
      >
        <div className="rounded-2xl border border-tech-card-border bg-gradient-to-br from-page/80 to-page/30 p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl font-semibold text-page-text sm:text-2xl">
            {pick(locale, OWNERSHIP_BLOCK.title)}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle">
            {pick(locale, OWNERSHIP_BLOCK.body)}
          </p>
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-6 md:px-10 lg:px-12 lg:pb-24 ${textAlign}`}
      >
        <div className="rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-2xl font-semibold tracking-tight text-page-text sm:text-3xl">
            {pick(locale, PROCESS_CTA.title)}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-page-subtle">
            {pick(locale, PROCESS_CTA.body)}
          </p>
          <div
            className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${
              isFa ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Link
              href={`/${locale}/contact?tab=schedule`}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
            >
              {pick(locale, PROCESS_CTA.primary)}
            </Link>
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
            >
              {pick(locale, PROCESS_CTA.secondary)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
