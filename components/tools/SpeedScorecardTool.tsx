"use client";

import clsx from "clsx";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  SPEED_SCORECARD_FAQ,
  type SpeedCheckResult,
  type SpeedGrade,
} from "@/lib/tools/speed-scorecard";

type SpeedScorecardToolProps = {
  locale: string;
};

function gradeLabel(grade: SpeedGrade, isFa: boolean): string {
  if (grade === "good") return isFa ? "خوب" : "Good";
  if (grade === "needs-improvement") return isFa ? "نیاز به بهبود" : "Needs work";
  return isFa ? "ضعیف" : "Poor";
}

function gradeClass(grade: SpeedGrade): string {
  if (grade === "good") return "text-green-600";
  if (grade === "needs-improvement") return "text-amber-600";
  return "text-red-500";
}

export default function SpeedScorecardTool({ locale }: SpeedScorecardToolProps) {
  const isFa = locale === "fa";
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeedCheckResult | null>(null);
  const [usedApi, setUsedApi] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const faqItems = useMemo(
    () =>
      SPEED_SCORECARD_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const logLead = useCallback(
    async (checkResult: SpeedCheckResult, withEmail?: string) => {
      await fetch("/api/tools/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: "speed-scorecard",
          locale: isFa ? "fa" : "en",
          email: withEmail,
          inputs: { url: checkResult.url, strategy: checkResult.strategy },
          result: checkResult,
          source: "tool:speed-scorecard",
        }),
      }).catch(() => null);
    },
    [isFa]
  );

  const runCheck = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setEmailSent(false);

    try {
      const response = await fetch("/api/tools/speed-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy, locale: isFa ? "fa" : "en" }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error ?? "Check failed");

      const checkResult = data.result as SpeedCheckResult;
      setResult(checkResult);
      setUsedApi(Boolean(data.usedPageSpeedApi));
      void logLead(checkResult);
    } catch (checkError) {
      setError(
        checkError instanceof Error
          ? checkError.message
          : isFa
            ? "تست ناموفق بود."
            : "Check failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async () => {
    if (!result || !email.trim()) return;
    await logLead(result, email.trim());
    setEmailSent(true);
  };

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
        toolSlug="speed-scorecard"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "تست سرعت سایت" : "Website Speed Scorecard"}
        subtitle={
          isFa
            ? "آدرس سایت را وارد کنید — Core Web Vitals و پیشنهادهای عملی."
            : "Enter your URL — Core Web Vitals signals and actionable fixes."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-page-text">
            {isFa ? "آدرس سایت" : "Website URL"}
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-tech-card-border bg-page/50 px-4 py-2.5 text-sm text-page-text outline-none focus:border-accent-cosmic/50"
          />

          <div className={`flex gap-2 ${isFa ? "flex-row-reverse" : ""}`}>
            {(["mobile", "desktop"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStrategy(item)}
                className={clsx(
                  "rounded-lg border px-4 py-2 text-sm font-medium",
                  strategy === item
                    ? "border-accent-cosmic bg-accent-cosmic/10 text-page-text"
                    : "border-tech-card-border text-page-subtle"
                )}
              >
                {item === "mobile"
                  ? isFa
                    ? "موبایل"
                    : "Mobile"
                  : isFa
                    ? "دسکتاپ"
                    : "Desktop"}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!url.trim() || loading}
            onClick={() => void runCheck()}
            className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isFa ? "در حال تست…" : "Testing…"}
              </span>
            ) : isFa ? (
              "اجرای تست"
            ) : (
              "Run test"
            )}
          </button>

          {!usedApi && result ? (
            <p className="text-xs text-page-muted">
              {isFa
                ? "حالت تخمینی (بدون API PageSpeed) — برای داده Lighthouse کلید API تنظیم کنید."
                : "Estimated mode (no PageSpeed API key) — set PAGESPEED_API_KEY for Lighthouse data."}
            </p>
          ) : null}

          {result ? (
            <div className="mt-6 space-y-4 rounded-2xl border border-tech-card-border bg-page/40 p-6">
              <p className="text-sm text-page-muted">{result.url}</p>
              <p className={clsx("text-2xl font-semibold", gradeClass(result.grade))}>
                {gradeLabel(result.grade, isFa)}
                {result.metrics.performanceScore != null
                  ? ` · ${result.metrics.performanceScore}/100`
                  : ""}
              </p>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-page-muted">LCP</dt>
                  <dd className="font-medium text-page-text">
                    {result.metrics.lcpMs != null
                      ? `${(result.metrics.lcpMs / 1000).toFixed(2)}s`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-page-muted">CLS</dt>
                  <dd className="font-medium text-page-text">
                    {result.metrics.cls?.toFixed(3) ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-page-muted">INP</dt>
                  <dd className="font-medium text-page-text">
                    {result.metrics.inpMs != null
                      ? `${(result.metrics.inpMs / 1000).toFixed(2)}s`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-page-muted">TTFB</dt>
                  <dd className="font-medium text-page-text">
                    {result.metrics.ttfbMs != null
                      ? `${result.metrics.ttfbMs}ms`
                      : "—"}
                  </dd>
                </div>
              </dl>

              {result.recommendations.length > 0 ? (
                <ul className="space-y-3 border-t border-tech-card-border pt-4">
                  {result.recommendations.map((rec) => (
                    <li key={rec.id} className="text-sm">
                      <p className="font-semibold text-page-text">
                        {pick(locale, rec.title)}
                      </p>
                      <p className="mt-1 text-page-subtle">
                        {pick(locale, rec.detail)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-tech-card-border pt-4 sm:flex-row">
                <Link
                  href={`/${locale}/services/nextjs-audit`}
                  className="inline-flex justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {isFa ? "می‌خواهید درستش کنم؟" : "Want me to fix this?"}
                </Link>
                <Link
                  href={`/${locale}/contact?tab=schedule&source=tool:speed-scorecard`}
                  className="inline-flex justify-center rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
                >
                  {isFa ? "رزرو ممیزی" : "Book audit call"}
                </Link>
              </div>

              {!emailSent ? (
                <div className="rounded-lg border border-dashed border-tech-card-border p-4">
                  <p className="text-sm font-medium text-page-text">
                    {isFa ? "گزارش کامل به ایمیل" : "Full report by email"}
                  </p>
                  <div className={`mt-3 flex gap-2 ${isFa ? "flex-row-reverse" : ""}`}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isFa ? "ایمیل" : "Email"}
                      className="min-w-0 flex-1 rounded-lg border border-tech-card-border bg-page/50 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      disabled={!email.trim()}
                      onClick={() => void submitEmail()}
                      className="rounded-lg bg-page-text px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                      {isFa ? "ارسال" : "Send"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-green-600">
                  {isFa ? "گزارش ثبت شد — به زودی ایمیل می‌آید." : "Report logged — check your inbox soon."}
                </p>
              )}
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </ToolPageChrome>
    </>
  );
}
