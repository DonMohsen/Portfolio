import Image from "next/image";
import Link from "next/link";
import ComparisonTable from "@/components/about/ComparisonTable";
import TrustStrip from "@/components/Home/TrustStrip";
import { buildAboutPageJsonLd } from "@/lib/about/about-json-ld";
import {
  ABOUT_CTA,
  ABOUT_EDUCATION,
  ABOUT_EXPERIENCE,
  ABOUT_HERO,
  ABOUT_PHILOSOPHY,
  ABOUT_STORY,
} from "@/lib/about/content";
import {
  JOB_TITLE_EN,
  JOB_TITLE_FA,
  PROFILE_IMAGE_PATH,
} from "@/lib/seo/person-json-ld";
import {
  SITE_AVAILABILITY_EN,
  SITE_AVAILABILITY_FA,
  SITE_LOCATION_EN,
  SITE_LOCATION_FA,
  SOCIAL_LINKS,
} from "@/lib/site";
import { pick } from "@/lib/services/pick";

type AboutPageContentProps = {
  locale: string;
};

export default function AboutPageContent({ locale }: AboutPageContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const jsonLd = buildAboutPageJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-page transition-colors duration-500">
        <section
          className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {pick(locale, ABOUT_HERO.eyebrow)}
          </p>
          <div
            className={`mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 ${
              isFa ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-tech-card-border lg:mx-0 lg:h-48 lg:w-48">
              <Image
                src={PROFILE_IMAGE_PATH}
                alt={pick(locale, ABOUT_HERO.title)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 160px, 192px"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
                {pick(locale, ABOUT_HERO.title)}
              </h1>
              <p className="mt-2 text-lg font-medium text-accent-cosmic">
                {isFa ? JOB_TITLE_FA : JOB_TITLE_EN}
              </p>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8">
                {pick(locale, ABOUT_HERO.subtitle)}
              </p>
              <p className="mt-3 text-sm text-page-muted">
                {isFa ? SITE_LOCATION_FA : SITE_LOCATION_EN}
                {" · "}
                {isFa ? SITE_AVAILABILITY_FA : SITE_AVAILABILITY_EN}
              </p>
            </div>
          </div>
        </section>

        <TrustStrip locale={locale} />

        <section
          className={`mx-auto max-w-3xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-page-text">
            {pick(locale, ABOUT_STORY.heading)}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8 whitespace-pre-line">
            {pick(locale, ABOUT_STORY.body)}
          </div>
        </section>

        <section
          className={`border-y border-tech-card-border bg-page/50 ${textAlign}`}
        >
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-page-text">
              {pick(locale, ABOUT_PHILOSOPHY.heading)}
            </h2>
            <p className="mt-4 text-lg italic leading-8 text-page-text">
              {pick(locale, ABOUT_PHILOSOPHY.body)}
            </p>
            <ul className="mt-6 space-y-3">
              {(isFa
                ? ABOUT_PHILOSOPHY.principles.fa
                : ABOUT_PHILOSOPHY.principles.en
              ).map((item) => (
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
          </div>
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-page-text">
            {isFa ? "تحصیلات" : "Education"}
          </h2>
          <ul className="mt-6 space-y-6">
            {ABOUT_EDUCATION.map((item) => (
              <li
                key={pick(locale, item.school)}
                className="rounded-xl border border-tech-card-border bg-page/40 p-5"
              >
                <p className="font-semibold text-page-text">
                  {pick(locale, item.school)}
                </p>
                <p className="mt-1 text-[14px] text-page-subtle">
                  {pick(locale, item.degree)}
                </p>
                <p className="mt-1 text-sm text-page-muted">
                  {pick(locale, item.years)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 py-4 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-page-text">
            {isFa ? "سابقه کاری" : "Experience"}
          </h2>
          <ul className="mt-6 space-y-6">
            {ABOUT_EXPERIENCE.map((item) => (
              <li
                key={`${pick(locale, item.role)}-${pick(locale, item.company)}`}
                className="rounded-xl border border-tech-card-border bg-page/40 p-5"
              >
                <div
                  className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${
                    isFa ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <p className="font-semibold text-page-text">
                    {pick(locale, item.role)}
                  </p>
                  <p className="text-sm text-page-muted">
                    {pick(locale, item.period)}
                  </p>
                </div>
                <p className="mt-1 text-[14px] text-page-subtle">
                  {pick(locale, item.company)}
                </p>
                <ul className="mt-3 space-y-2">
                  {(isFa ? item.highlights.fa : item.highlights.en).map(
                    (highlight) => (
                      <li
                        key={highlight}
                        className={`flex gap-2 text-[14px] leading-6 text-page-subtle ${
                          isFa ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-accent-cosmic">•</span>
                        <span>{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 md:px-10 lg:px-12">
          <ComparisonTable locale={locale} />
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 py-4 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          <h2 className="text-xl font-semibold text-page-text">
            {isFa ? "پروفایل‌ها" : "Profiles"}
          </h2>
          <ul
            className={`mt-4 flex flex-wrap gap-3 ${
              isFa ? "justify-end" : ""
            }`}
          >
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex rounded-lg border border-tech-card-border px-4 py-2 text-sm font-medium text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12 lg:pb-24 ${textAlign}`}
        >
          <div className="rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 px-6 py-10 sm:px-10">
            <h2 className="text-xl font-semibold text-page-text sm:text-2xl">
              {pick(locale, ABOUT_CTA.title)}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-page-subtle">
              {pick(locale, ABOUT_CTA.body)}
            </p>
            <div
              className={`mt-6 flex flex-col gap-3 sm:flex-row ${
                isFa ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/${locale}/contact?tab=schedule`}
                className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors hover:opacity-90"
              >
                {pick(locale, ABOUT_CTA.primary)}
              </Link>
              <Link
                href={`/${locale}/work`}
                className="inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
              >
                {pick(locale, ABOUT_CTA.secondary)}
              </Link>
            </div>
            <p className="mt-4 text-sm text-page-muted">
              <Link href={`/${locale}/process`} className="hover:text-accent-cosmic">
                {isFa ? "فرآیند همکاری" : "How I work"}
              </Link>
              {" · "}
              <Link href={`/${locale}/stats`} className="hover:text-accent-cosmic">
                {isFa ? "آمار قابل استناد" : "Citeable stats"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
