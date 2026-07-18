"use client";

import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  I18N_CHECKER_FAQ,
  type I18nCheckResult,
} from "@/lib/tools/i18n-checker";

type I18nCheckerToolProps = {
  locale: string;
};

function severityClass(severity: "error" | "warn" | "ok"): string {
  if (severity === "error") return "border-red-500/30 text-red-500";
  if (severity === "warn") return "border-amber-500/30 text-amber-600";
  return "border-emerald-500/30 text-emerald-600";
}

export default function I18nCheckerTool({ locale }: I18nCheckerToolProps) {
  const isFa = locale === "fa";
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<I18nCheckResult | null>(null);
  const [logged, setLogged] = useState(false);

  const faqItems = useMemo(
    () =>
      I18N_CHECKER_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const run = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tools/i18n-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          locale: isFa ? "fa" : "en",
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error ?? "Check failed");
      }

      const next = payload.result as I18nCheckResult;
      setResult(next);

      if (!logged) {
        await fetch("/api/tools/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolSlug: "i18n-checker",
            locale: isFa ? "fa" : "en",
            inputs: { url: url.trim() },
            result: next,
            source: "tool:i18n-checker",
          }),
        }).catch(() => null);
        setLogged(true);
      }
    } catch (checkError) {
      setError(
        checkError instanceof Error
          ? checkError.message
          : isFa
            ? "بررسی ناموفق بود."
            : "Check failed."
      );
    } finally {
      setLoading(false);
    }
  }, [isFa, logged, url]);

  const inputClass =
    "w-full rounded-lg border border-tech-card-border bg-page/50 px-4 py-2.5 text-sm text-page-text outline-none focus:border-accent-cosmic/50";

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
        toolSlug="i18n-checker"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "بررسی i18n و hreflang" : "i18n & hreflang Checker"}
        subtitle={
          isFa
            ? "URL را وارد کنید — lang، dir، hreflang و x-default را سریع چک می‌کنیم."
            : "Paste a URL — quick pass on lang, dir, hreflang, and x-default."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        <div
          className={clsx(
            "flex flex-col gap-3 sm:flex-row",
            isFa && "sm:flex-row-reverse"
          )}
        >
          <input
            className={inputClass}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/fa"
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => void run()}
            disabled={loading || !url.trim()}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isFa ? "بررسی" : "Check"}
          </button>
        </div>

        {error ? (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-tech-card-border bg-page/40 p-5">
              <p className="text-sm text-page-muted">
                {isFa ? "امتیاز i18n" : "i18n score"}
              </p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-page-text">
                {result.score}
                <span className="text-base font-normal text-page-subtle">
                  /100
                </span>
              </p>
              <p className="mt-3 text-sm leading-6 text-page-subtle">
                {pick(locale, result.summary)}
              </p>
            </div>

            <ul className="space-y-3">
              {result.issues.map((issue) => (
                <li
                  key={issue.id}
                  className={clsx(
                    "rounded-xl border bg-page/40 px-4 py-3",
                    severityClass(issue.severity)
                  )}
                >
                  <p className="text-sm font-semibold text-page-text">
                    {pick(locale, issue.title)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-page-subtle">
                    {pick(locale, issue.detail)}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/contact?tab=brief&source=tool:i18n-checker&projectType=i18n`}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
            >
              {isFa ? "درخواست ممیزی i18n" : "Request an i18n audit"}
            </Link>
          </div>
        ) : null}
      </ToolPageChrome>
    </>
  );
}
