"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  BUCKET_LABELS,
  EFFORT_LABELS,
  IMPACT_LABELS,
  MVP_PRIORITIZER_FAQ,
  exportMoscowText,
  prioritizeFeatures,
  type PrioritizerFeature,
  type PrioritizerResult,
} from "@/lib/tools/mvp-prioritizer";

type MvpPrioritizerToolProps = {
  locale: string;
};

function newFeature(): PrioritizerFeature {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `f-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: "",
    effort: 2,
    impact: 2,
  };
}

export default function MvpPrioritizerTool({ locale }: MvpPrioritizerToolProps) {
  const isFa = locale === "fa";
  const [features, setFeatures] = useState<PrioritizerFeature[]>([
    newFeature(),
    newFeature(),
    newFeature(),
  ]);
  const [result, setResult] = useState<PrioritizerResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [logged, setLogged] = useState(false);

  const faqItems = useMemo(
    () =>
      MVP_PRIORITIZER_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const updateFeature = useCallback(
    (id: string, patch: Partial<PrioritizerFeature>) => {
      setFeatures((current) =>
        current.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );
    },
    []
  );

  const run = useCallback(async () => {
    const next = prioritizeFeatures(features);
    setResult(next);
    setCopied(false);

    if (!logged) {
      await fetch("/api/tools/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: "mvp-prioritizer",
          locale: isFa ? "fa" : "en",
          inputs: { features },
          result: next,
          source: "tool:mvp-prioritizer",
        }),
      }).catch(() => null);
      setLogged(true);
    }
  }, [features, isFa, logged]);

  const copyExport = useCallback(async () => {
    if (!result) return;
    const text = exportMoscowText(locale, result);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [locale, result]);

  const inputClass =
    "w-full rounded-lg border border-tech-card-border bg-page/50 px-3 py-2 text-sm text-page-text outline-none focus:border-accent-cosmic/50";

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
        toolSlug="mvp-prioritizer"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "اولویت‌بندی فیچر MVP" : "MVP Feature Prioritizer"}
        subtitle={
          isFa
            ? "فیچرها را با impact و effort وارد کنید — خروجی MoSCoW برای v1."
            : "Add features with impact and effort — get a MoSCoW cut for v1."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="grid gap-3 rounded-xl border border-tech-card-border bg-page/40 p-4 sm:grid-cols-[1fr_auto_auto]"
            >
              <div>
                <label className="mb-1 block text-xs text-page-muted">
                  {isFa ? `فیچر ${index + 1}` : `Feature ${index + 1}`}
                </label>
                <input
                  className={inputClass}
                  value={feature.name}
                  onChange={(e) =>
                    updateFeature(feature.id, { name: e.target.value })
                  }
                  placeholder={
                    isFa ? "مثلاً: billing Stripe" : "e.g. Stripe billing"
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-page-muted">
                  {isFa ? "تأثیر" : "Impact"}
                </label>
                <select
                  className={inputClass}
                  value={feature.impact}
                  onChange={(e) =>
                    updateFeature(feature.id, {
                      impact: Number(e.target.value) as 1 | 2 | 3,
                    })
                  }
                >
                  {([1, 2, 3] as const).map((value) => (
                    <option key={value} value={value}>
                      {pick(locale, IMPACT_LABELS[value])}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-page-muted">
                  {isFa ? "هزینه" : "Effort"}
                </label>
                <select
                  className={inputClass}
                  value={feature.effort}
                  onChange={(e) =>
                    updateFeature(feature.id, {
                      effort: Number(e.target.value) as 1 | 2 | 3,
                    })
                  }
                >
                  {([1, 2, 3] as const).map((value) => (
                    <option key={value} value={value}>
                      {pick(locale, EFFORT_LABELS[value])}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div
          className={clsx(
            "mt-4 flex flex-wrap gap-3",
            isFa && "flex-row-reverse"
          )}
        >
          <button
            type="button"
            onClick={() => setFeatures((current) => [...current, newFeature()])}
            className="rounded-lg border border-tech-card-border px-4 py-2.5 text-sm font-medium text-page-subtle"
          >
            {isFa ? "+ فیچر" : "+ Feature"}
          </button>
          <button
            type="button"
            onClick={() => void run()}
            className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
          >
            {isFa ? "اولویت‌بندی" : "Prioritize"}
          </button>
        </div>

        {result ? (
          <div className="mt-10 space-y-6">
            <p className="text-[15px] leading-7 text-page-subtle">
              {pick(locale, result.summary)}
            </p>

            {(["must", "should", "could", "wont"] as const).map((bucket) => {
              const items = result.features.filter((f) => f.bucket === bucket);
              if (items.length === 0) return null;
              return (
                <div key={bucket}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-page-muted">
                    {pick(locale, BUCKET_LABELS[bucket])}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-lg border border-tech-card-border bg-page/40 px-4 py-2.5 text-sm text-page-text"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div
              className={clsx(
                "flex flex-col gap-3 sm:flex-row",
                isFa && "sm:flex-row-reverse"
              )}
            >
              <button
                type="button"
                onClick={() => void copyExport()}
                className="rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
              >
                {copied
                  ? isFa
                    ? "کپی شد"
                    : "Copied"
                  : isFa
                    ? "کپی خروجی"
                    : "Copy export"}
              </button>
              <Link
                href={`/${locale}/contact?tab=schedule&source=tool:mvp-prioritizer&projectType=saas-mvp`}
                className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
              >
                {isFa ? "رزرو تماس کشف" : "Book discovery call"}
              </Link>
            </div>
          </div>
        ) : null}
      </ToolPageChrome>
    </>
  );
}
