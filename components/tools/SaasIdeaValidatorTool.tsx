"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  IDEA_AUDIENCES,
  IDEA_MOATS,
  IDEA_STAGES,
  SAAS_IDEA_FAQ,
  validateSaasIdea,
  verdictLabel,
  type IdeaAudienceId,
  type IdeaMoatId,
  type IdeaStageId,
  type SaasIdeaResult,
} from "@/lib/tools/saas-idea-validator";

type SaasIdeaValidatorToolProps = {
  locale: string;
};

export default function SaasIdeaValidatorTool({
  locale,
}: SaasIdeaValidatorToolProps) {
  const isFa = locale === "fa";
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState<IdeaAudienceId>("b2b");
  const [stage, setStage] = useState<IdeaStageId>("idea");
  const [moat, setMoat] = useState<IdeaMoatId>("unclear");
  const [result, setResult] = useState<SaasIdeaResult | null>(null);
  const [logged, setLogged] = useState(false);

  const faqItems = useMemo(
    () =>
      SAAS_IDEA_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const run = useCallback(async () => {
    if (idea.trim().length < 20) return;
    const next = validateSaasIdea({ idea, audience, stage, moat });
    setResult(next);

    if (!logged) {
      await fetch("/api/tools/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: "saas-idea-validator",
          locale: isFa ? "fa" : "en",
          inputs: { idea, audience, stage, moat },
          result: next,
          source: "tool:saas-idea-validator",
        }),
      }).catch(() => null);
      setLogged(true);
    }
  }, [audience, idea, isFa, logged, moat, stage]);

  const inputClass =
    "w-full rounded-lg border border-tech-card-border bg-page/50 px-4 py-2.5 text-sm text-page-text outline-none focus:border-accent-cosmic/50";
  const labelClass = "mb-1.5 block text-sm font-medium text-page-text";

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
        toolSlug="saas-idea-validator"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "ایده استارتاپم خوبه؟" : "Is My SaaS Idea Good?"}
        subtitle={
          isFa
            ? "ایده، مخاطب، مرحله و moat — بازخورد ساخت‌یافته + پیشنهاد scope MVP."
            : "Idea, audience, stage, and moat — structured feedback + MVP scope nudge."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        <div className="space-y-5">
          <div>
            <label className={labelClass} htmlFor="saas-idea">
              {isFa ? "ایده (حداقل ۲۰ کاراکتر)" : "Idea (min 20 characters)"}
            </label>
            <textarea
              id="saas-idea"
              className={`${inputClass} min-h-[120px] resize-y`}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={
                isFa
                  ? "چه مشکلی، برای چه کسی، چرا الان پول می‌دهند..."
                  : "What problem, for whom, why they pay now..."
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="saas-audience">
                {isFa ? "مخاطب" : "Audience"}
              </label>
              <select
                id="saas-audience"
                className={inputClass}
                value={audience}
                onChange={(e) => setAudience(e.target.value as IdeaAudienceId)}
              >
                {IDEA_AUDIENCES.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {pick(locale, opt.label)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="saas-stage">
                {isFa ? "مرحله" : "Stage"}
              </label>
              <select
                id="saas-stage"
                className={inputClass}
                value={stage}
                onChange={(e) => setStage(e.target.value as IdeaStageId)}
              >
                {IDEA_STAGES.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {pick(locale, opt.label)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="saas-moat">
                {isFa ? "Moat" : "Moat"}
              </label>
              <select
                id="saas-moat"
                className={inputClass}
                value={moat}
                onChange={(e) => setMoat(e.target.value as IdeaMoatId)}
              >
                {IDEA_MOATS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {pick(locale, opt.label)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void run()}
            disabled={idea.trim().length < 20}
            className="rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg disabled:opacity-60"
          >
            {isFa ? "اعتبارسنجی" : "Validate idea"}
          </button>
        </div>

        {result ? (
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-accent-cosmic/30 bg-accent-cosmic/5 p-5">
              <p className="text-sm text-page-muted">
                {isFa ? "نتیجه" : "Verdict"}
              </p>
              <p className="mt-1 text-2xl font-semibold text-page-text">
                {verdictLabel(result.verdict, isFa)}{" "}
                <span className="text-base font-normal text-page-subtle">
                  ({result.score}/100)
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-page-text">
                {isFa ? "نقاط قوت" : "Strengths"}
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-page-subtle">
                {result.strengths.map((item, index) => (
                  <li key={`s-${index}`}>• {pick(locale, item)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-page-text">
                {isFa ? "ریسک‌ها" : "Risks"}
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-page-subtle">
                {result.risks.map((item, index) => (
                  <li key={`r-${index}`}>• {pick(locale, item)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-page-text">
                {isFa ? "Scope پیشنهادی MVP" : "Suggested MVP scope"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-page-subtle">
                {pick(locale, result.mvpScope)}
              </p>
            </div>

            <p className="text-sm leading-6 text-page-subtle">
              {pick(locale, result.nextStep)}
            </p>

            <div
              className={clsx(
                "flex flex-col gap-3 sm:flex-row",
                isFa && "sm:flex-row-reverse"
              )}
            >
              <Link
                href={`/${locale}/contact?tab=schedule&source=tool:saas-idea-validator&projectType=${result.serviceSlug}`}
                className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
              >
                {isFa ? "رزرو تماس کشف" : "Book discovery call"}
              </Link>
              <Link
                href={`/${locale}/tools/project-estimator?source=tool:saas-idea-validator`}
                className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
              >
                {isFa ? "برآورد هزینه" : "Estimate cost"}
              </Link>
            </div>
          </div>
        ) : null}
      </ToolPageChrome>
    </>
  );
}
