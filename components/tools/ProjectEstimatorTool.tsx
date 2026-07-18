"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import SoftProjectCta from "@/components/conversion/SoftProjectCta";
import TrustStrip from "@/components/Home/TrustStrip";
import {
  ESTIMATOR_FEATURES,
  ESTIMATOR_FAQ,
  ESTIMATOR_PROJECT_TYPES,
  ESTIMATOR_TIMELINES,
  type FeatureId,
  type ProjectTypeId,
  type TimelineId,
} from "@/lib/tools/estimator-config";
import {
  formatPriceRange,
  type EstimatorResult,
} from "@/lib/tools/estimator-logic";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";

type ProjectEstimatorToolProps = {
  locale: string;
};

type WizardStep = 1 | 2 | 3 | "result";

export default function ProjectEstimatorTool({
  locale,
}: ProjectEstimatorToolProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const searchParams = useSearchParams();
  const leadSource = searchParams.get("source")?.trim() || "tool:estimator";

  const [step, setStep] = useState<WizardStep>(1);
  const [projectType, setProjectType] = useState<ProjectTypeId | null>(null);
  const [features, setFeatures] = useState<FeatureId[]>([]);
  const [timeline, setTimeline] = useState<TimelineId | null>(null);
  const [result, setResult] = useState<EstimatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const faqItems = useMemo(
    () =>
      ESTIMATOR_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );
  const faqJsonLd = buildFaqPageJsonLd(faqItems);

  const toggleFeature = useCallback((id: FeatureId) => {
    setFeatures((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }, []);

  const runEstimate = useCallback(async () => {
    if (!projectType || !timeline) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tools/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          features,
          timeline,
          locale: isFa ? "fa" : "en",
        }),
      });

      if (!response.ok) {
        throw new Error("Estimate failed");
      }

      const payload = await response.json();
      setResult(payload.result as EstimatorResult);
      setStep("result");
    } catch {
      setError(
        isFa ? "محاسبه ناموفق بود. دوباره تلاش کنید." : "Estimate failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }, [features, isFa, projectType, timeline]);

  const submitEmail = useCallback(async () => {
    if (!result || !email.trim()) return;
    setEmailLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tools/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: "project-estimator",
          locale: isFa ? "fa" : "en",
          email: email.trim(),
          inputs: { projectType, features, timeline },
          result,
          source: leadSource,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead failed");
      }

      setEmailSubmitted(true);
    } catch {
      setError(
        isFa
          ? "ثبت ایمیل ناموفق بود."
          : "Could not save your email."
      );
    } finally {
      setEmailLoading(false);
    }
  }, [email, features, isFa, projectType, result, timeline]);

  const scheduleHref = useMemo(() => {
    if (!result) return `/${locale}/contact?tab=schedule`;
    const params = new URLSearchParams({
      tab: "schedule",
      source: leadSource,
      projectType: result.contactPrefill.projectType,
      budget: result.contactPrefill.budgetRange,
      timeline: result.contactPrefill.timeline,
    });
    return `/${locale}/contact?${params.toString()}`;
  }, [locale, result]);

  const briefHref = useMemo(() => {
    if (!result) return `/${locale}/contact?tab=brief`;
    const params = new URLSearchParams({
      tab: "brief",
      source: leadSource,
      projectType: result.contactPrefill.projectType,
    });
    return `/${locale}/contact?${params.toString()}`;
  }, [locale, result]);

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
          <Link
            href={`/${locale}/tools`}
            className="text-sm font-medium text-accent-cosmic hover:underline"
          >
            {isFa ? "← همه ابزارها" : "← All tools"}
          </Link>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
            {isFa ? "ابزار رایگان" : "Free tool"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
            {isFa ? "هزینه ساخت اپلیکیشن" : "MVP Cost Calculator"}
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-page-subtle">
            {isFa
              ? "۳ مرحله — نوع پروژه، فیچرها، زمان‌بندی. خروجی: بازه قیمت، timeline و case study مشابه."
              : "3 steps — project type, features, timeline. Output: price range, timeline, and a similar case study."}
          </p>
        </section>

        <TrustStrip locale={locale} />

        <section
          className={`mx-auto max-w-3xl px-5 py-10 sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
        >
          {step !== "result" ? (
            <>
              <div className="mb-8 flex gap-2">
                {([1, 2, 3] as const).map((n) => (
                  <div
                    key={n}
                    className={clsx(
                      "h-1 flex-1 rounded-full",
                      step >= n ? "bg-accent-cosmic" : "bg-tech-card-border"
                    )}
                  />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-page-text">
                    {isFa ? "۱. نوع پروژه" : "1. Project type"}
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ESTIMATOR_PROJECT_TYPES.map((option) => (
                      <li key={option.id}>
                        <button
                          type="button"
                          onClick={() => setProjectType(option.id)}
                          className={clsx(
                            "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                            projectType === option.id
                              ? "border-accent-cosmic bg-accent-cosmic/10 text-page-text"
                              : "border-tech-card-border bg-page/40 text-page-subtle hover:border-accent-cosmic/40"
                          )}
                        >
                          {pick(locale, option.label)}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-8 flex ${isFa ? "justify-start" : "justify-end"}`}>
                    <button
                      type="button"
                      disabled={!projectType}
                      onClick={() => setStep(2)}
                      className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                    >
                      {isFa ? "بعدی" : "Next"}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-page-text">
                    {isFa ? "۲. فیچرها" : "2. Features"}
                  </h2>
                  <p className="mt-2 text-sm text-page-subtle">
                    {isFa ? "چند مورد را انتخاب کنید." : "Select all that apply."}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ESTIMATOR_FEATURES.map((option) => {
                      const selected = features.includes(option.id);
                      return (
                        <li key={option.id}>
                          <button
                            type="button"
                            onClick={() => toggleFeature(option.id)}
                            className={clsx(
                              "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                              selected
                                ? "border-accent-cosmic bg-accent-cosmic/10 text-page-text"
                                : "border-tech-card-border bg-page/40 text-page-subtle hover:border-accent-cosmic/40"
                            )}
                          >
                            {pick(locale, option.label)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div
                    className={`mt-8 flex gap-3 ${isFa ? "flex-row-reverse justify-start" : "justify-between"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
                    >
                      {isFa ? "قبلی" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      {isFa ? "بعدی" : "Next"}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-page-text">
                    {isFa ? "۳. زمان‌بندی" : "3. Timeline"}
                  </h2>
                  <ul className="mt-4 grid gap-3">
                    {ESTIMATOR_TIMELINES.map((option) => (
                      <li key={option.id}>
                        <button
                          type="button"
                          onClick={() => setTimeline(option.id)}
                          className={clsx(
                            "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                            timeline === option.id
                              ? "border-accent-cosmic bg-accent-cosmic/10 text-page-text"
                              : "border-tech-card-border bg-page/40 text-page-subtle hover:border-accent-cosmic/40"
                          )}
                        >
                          {pick(locale, option.label)}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-8 flex gap-3 ${isFa ? "flex-row-reverse justify-start" : "justify-between"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
                    >
                      {isFa ? "قبلی" : "Back"}
                    </button>
                    <button
                      type="button"
                      disabled={!timeline || loading}
                      onClick={() => void runEstimate()}
                      className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                    >
                      {loading
                        ? isFa
                          ? "در حال محاسبه…"
                          : "Calculating…"
                        : isFa
                          ? "مشاهده برآورد"
                          : "See estimate"}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            result && (
              <div className="space-y-8">
                <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cosmic">
                    {isFa ? "برآورد شما" : "Your estimate"}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-page-text">
                    {formatPriceRange(
                      result.priceMin,
                      result.priceMax,
                      result.currency,
                      locale
                    )}
                  </p>
                  <p className="mt-2 text-page-subtle">
                    {isFa
                      ? `${result.weeksMin}–${result.weeksMax} هفته`
                      : `${result.weeksMin}–${result.weeksMax} weeks`}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-page-subtle">
                    {isFa ? result.summaryFa : result.summaryEn}
                  </p>
                </div>

                <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
                  <p className="text-sm font-semibold text-page-text">
                    {isFa ? "شبیه پروژه" : "Similar project"}
                  </p>
                  <Link
                    href={`/${locale}/work/${result.matchedCaseStudy.slug}`}
                    className="mt-2 block text-lg font-medium text-accent-cosmic hover:underline"
                  >
                    {result.matchedCaseStudy.name}
                  </Link>
                  <p className="mt-1 text-sm text-page-subtle">
                    {result.matchedCaseStudy.outcomeMetric}
                  </p>
                </div>

                {!emailSubmitted ? (
                  <div className="rounded-2xl border border-dashed border-accent-cosmic/40 bg-page/30 p-6">
                    <p className="font-semibold text-page-text">
                      {isFa
                        ? "جزئیات خط‌به‌خط (ایمیل)"
                        : "Full line-item breakdown (email)"}
                    </p>
                    <p className="mt-2 text-sm text-page-subtle">
                      {isFa
                        ? "ایمیل بزنید — خلاصه PDF-style به inbox می‌آید."
                        : "Enter your email — we'll send a PDF-style breakdown."}
                    </p>
                    <div
                      className={`mt-4 flex flex-col gap-3 sm:flex-row ${isFa ? "sm:flex-row-reverse" : ""}`}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={isFa ? "ایمیل شما" : "Your email"}
                        className="flex-1 rounded-lg border border-tech-card-border bg-page/50 px-4 py-2.5 text-sm text-page-text outline-none focus:border-accent-cosmic/50"
                      />
                      <button
                        type="button"
                        disabled={!email.trim() || emailLoading}
                        onClick={() => void submitEmail()}
                        className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                      >
                        {emailLoading
                          ? isFa
                            ? "در حال ارسال…"
                            : "Sending…"
                          : isFa
                            ? "دریافت جزئیات"
                            : "Get breakdown"}
                      </button>
                    </div>
                    <ul
                      className={clsx(
                        "mt-4 space-y-1 text-sm text-page-muted blur-sm select-none",
                        emailSubmitted && "blur-none"
                      )}
                    >
                      {result.breakdown.slice(0, 3).map((row) => (
                        <li key={row.id}>
                          {pick(locale, { en: row.labelEn, fa: row.labelFa })}:{" "}
                          {row.min.toLocaleString()} – {row.max.toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
                    <p className="font-semibold text-page-text">
                      {isFa ? "جزئیات ارسال شد" : "Breakdown sent"}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-page-subtle">
                      {result.breakdown.map((row) => (
                        <li key={row.id}>
                          {pick(locale, { en: row.labelEn, fa: row.labelFa })}:{" "}
                          {row.min.toLocaleString()} – {row.max.toLocaleString()}{" "}
                          {result.currency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  className={`flex flex-col gap-3 sm:flex-row ${isFa ? "sm:flex-row-reverse" : ""}`}
                >
                  <Link
                    href={scheduleHref}
                    className="inline-flex justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {isFa ? "رزرو تماس کشف" : "Book discovery call"}
                  </Link>
                  <Link
                    href={briefHref}
                    className="inline-flex justify-center rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
                  >
                    {isFa ? "ارسال brief" : "Send project brief"}
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setProjectType(null);
                    setFeatures([]);
                    setTimeline(null);
                    setResult(null);
                    setEmailSubmitted(false);
                    setEmail("");
                  }}
                  className="text-sm text-page-muted hover:text-page-text"
                >
                  {isFa ? "شروع دوباره" : "Start over"}
                </button>
              </div>
            )
          )}

          {error ? (
            <p className="mt-4 text-sm text-red-500" role="alert">
              {error}
            </p>
          ) : null}
        </section>

        <section className="mx-auto max-w-3xl px-5 py-4 sm:px-6 md:px-10 lg:px-12">
          <SoftProjectCta locale={locale} source="tool:project-estimator" />
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-6 md:px-10 lg:px-12">
          <BlogFAQSection items={faqItems} locale={locale} />
        </section>
      </div>
    </>
  );
}
