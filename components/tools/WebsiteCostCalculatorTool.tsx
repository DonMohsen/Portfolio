"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { formatPriceRange } from "@/lib/tools/estimator-logic";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  PAGE_COUNTS,
  WEBSITE_COST_FAQ,
  WEBSITE_FEATURES,
  WEBSITE_TIMELINES,
  WEBSITE_TYPES,
  type PageCountId,
  type WebsiteFeatureId,
  type WebsiteTimelineId,
  type WebsiteTypeId,
} from "@/lib/tools/website-cost-config";
import type { WebsiteCostResult } from "@/lib/tools/website-cost-logic";

type WebsiteCostCalculatorToolProps = {
  locale: string;
};

type Step = 1 | 2 | 3 | 4 | "result";

export default function WebsiteCostCalculatorTool({
  locale,
}: WebsiteCostCalculatorToolProps) {
  const isFa = locale === "fa";
  const [step, setStep] = useState<Step>(1);
  const [websiteType, setWebsiteType] = useState<WebsiteTypeId | null>(null);
  const [pageCount, setPageCount] = useState<PageCountId | null>(null);
  const [features, setFeatures] = useState<WebsiteFeatureId[]>([]);
  const [timeline, setTimeline] = useState<WebsiteTimelineId | null>(null);
  const [result, setResult] = useState<WebsiteCostResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const faqItems = useMemo(
    () =>
      WEBSITE_COST_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const toggleFeature = useCallback((id: WebsiteFeatureId) => {
    setFeatures((current) =>
      current.includes(id)
        ? current.filter((f) => f !== id)
        : [...current, id]
    );
  }, []);

  const runEstimate = useCallback(async () => {
    if (!websiteType || !pageCount || !timeline) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tools/website-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteType,
          pageCount,
          features,
          timeline,
          locale: isFa ? "fa" : "en",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error ?? "Failed");
      setResult(data.result as WebsiteCostResult);
      setStep("result");
    } catch {
      setError(isFa ? "محاسبه ناموفق." : "Estimate failed.");
    } finally {
      setLoading(false);
    }
  }, [features, isFa, pageCount, timeline, websiteType]);

  const submitEmail = async () => {
    if (!result || !email.trim()) return;
    await fetch("/api/tools/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolSlug: "website-cost-calculator",
        locale: isFa ? "fa" : "en",
        email: email.trim(),
        inputs: { websiteType, pageCount, features, timeline },
        result,
        source: "tool:website-cost",
      }),
    });
    setEmailSent(true);
  };

  const nextBtn = (label: string, onClick: () => void, disabled?: boolean) => (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
    >
      {label}
    </button>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqItems)),
        }}
      />
      <ToolPageChrome
        locale={locale}
        toolSlug="website-cost-calculator"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "هزینه طراحی سایت اختصاصی" : "Website Development Cost Calculator"}
        subtitle={
          isFa
            ? "نوع سایت، تعداد صفحه، فیچرها و زمان — برآورد بازه قیمت."
            : "Site type, pages, features, and timeline — get a price range."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        {step !== "result" ? (
          <div className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۱. نوع سایت" : "1. Site type"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {WEBSITE_TYPES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setWebsiteType(opt.id)}
                        className={clsx(
                          "w-full rounded-xl border px-4 py-3 text-sm font-medium",
                          websiteType === opt.id
                            ? "border-accent-cosmic bg-accent-cosmic/10"
                            : "border-tech-card-border"
                        )}
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={isFa ? "text-left" : "text-right"}>
                  {nextBtn(isFa ? "بعدی" : "Next", () => setStep(2), !websiteType)}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۲. تعداد صفحه" : "2. Page count"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {PAGE_COUNTS.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setPageCount(opt.id)}
                        className={clsx(
                          "w-full rounded-xl border px-4 py-3 text-sm font-medium",
                          pageCount === opt.id
                            ? "border-accent-cosmic bg-accent-cosmic/10"
                            : "border-tech-card-border"
                        )}
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm"
                  >
                    {isFa ? "قبلی" : "Back"}
                  </button>
                  {nextBtn(isFa ? "بعدی" : "Next", () => setStep(3), !pageCount)}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۳. فیچرها" : "3. Features"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {WEBSITE_FEATURES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => toggleFeature(opt.id)}
                        className={clsx(
                          "w-full rounded-xl border px-4 py-3 text-sm font-medium",
                          features.includes(opt.id)
                            ? "border-accent-cosmic bg-accent-cosmic/10"
                            : "border-tech-card-border"
                        )}
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm"
                  >
                    {isFa ? "قبلی" : "Back"}
                  </button>
                  {nextBtn(isFa ? "بعدی" : "Next", () => setStep(4))}
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۴. زمان‌بندی" : "4. Timeline"}
                </h2>
                <ul className="grid gap-3">
                  {WEBSITE_TIMELINES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setTimeline(opt.id)}
                        className={clsx(
                          "w-full rounded-xl border px-4 py-3 text-sm font-medium",
                          timeline === opt.id
                            ? "border-accent-cosmic bg-accent-cosmic/10"
                            : "border-tech-card-border"
                        )}
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm"
                  >
                    {isFa ? "قبلی" : "Back"}
                  </button>
                  {nextBtn(
                    loading ? (isFa ? "…" : "…") : isFa ? "برآورد" : "Estimate",
                    () => void runEstimate(),
                    !timeline || loading
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          result && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
                <p className="text-3xl font-semibold text-page-text">
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
                <p className="mt-4 text-sm text-page-subtle">
                  {isFa ? result.summaryFa : result.summaryEn}
                </p>
              </div>

              {!emailSent ? (
                <div className="rounded-xl border border-dashed border-accent-cosmic/30 p-4">
                  <p className="text-sm font-medium">
                    {isFa ? "جزئیات به ایمیل" : "Email breakdown"}
                  </p>
                  <div className={`mt-3 flex gap-2 ${isFa ? "flex-row-reverse" : ""}`}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg border border-tech-card-border px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      disabled={!email.trim()}
                      onClick={() => void submitEmail()}
                      className="rounded-lg bg-accent-cosmic px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                    >
                      {isFa ? "دریافت" : "Get"}
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="text-sm text-page-subtle">
                  {result.breakdown.map((row) => (
                    <li key={row.id}>
                      {pick(locale, { en: row.labelEn, fa: row.labelFa })}:{" "}
                      {row.min.toLocaleString()} – {row.max.toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/${locale}/contact?tab=schedule&source=tool:website-cost`}
                className="inline-flex rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
              >
                {isFa ? "رزرو تماس" : "Book a call"}
              </Link>
            </div>
          )
        )}
        {error ? (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </ToolPageChrome>
    </>
  );
}
