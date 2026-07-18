"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import ToolPageChrome from "@/components/tools/ToolPageChrome";
import { pick } from "@/lib/services/pick";
import { buildFaqPageJsonLd } from "@/lib/seo/faq-json-ld";
import {
  STACK_PRIORITIES,
  STACK_PRODUCT_TYPES,
  STACK_TEAM_SIZES,
  TECH_STACK_FAQ,
  recommendStack,
  type PriorityId,
  type ProductTypeId,
  type StackRecommendation,
  type TeamSizeId,
} from "@/lib/tools/tech-stack-picker";

type TechStackPickerToolProps = {
  locale: string;
};

type Step = 1 | 2 | 3 | "result";

export default function TechStackPickerTool({ locale }: TechStackPickerToolProps) {
  const isFa = locale === "fa";
  const [step, setStep] = useState<Step>(1);
  const [productType, setProductType] = useState<ProductTypeId | null>(null);
  const [teamSize, setTeamSize] = useState<TeamSizeId | null>(null);
  const [priority, setPriority] = useState<PriorityId | null>(null);
  const [result, setResult] = useState<StackRecommendation | null>(null);
  const [logged, setLogged] = useState(false);

  const faqItems = useMemo(
    () =>
      TECH_STACK_FAQ.map((item) => ({
        question: pick(locale, item.question),
        answer: pick(locale, item.answer),
      })),
    [locale]
  );

  const showResult = useCallback(
    async (input: {
      productType: ProductTypeId;
      teamSize: TeamSizeId;
      priority: PriorityId;
    }) => {
      const rec = recommendStack(input);
      setResult(rec);
      setStep("result");

      if (!logged) {
        await fetch("/api/tools/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolSlug: "tech-stack-picker",
            locale: isFa ? "fa" : "en",
            inputs: input,
            result: rec,
            source: "tool:tech-stack",
          }),
        }).catch(() => null);
        setLogged(true);
      }
    },
    [isFa, logged]
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
        toolSlug="tech-stack-picker"
        eyebrow={isFa ? "ابزار رایگان" : "Free tool"}
        title={isFa ? "بهترین تکنولوژی برای اپ" : "Tech Stack Picker"}
        subtitle={
          isFa
            ? "۳ سؤال — stack پیشنهادی با trade-off و مسیر build."
            : "3 questions — recommended stack with trade-offs and a build path."
        }
        faq={<BlogFAQSection items={faqItems} locale={locale} />}
      >
        {step !== "result" ? (
          <div className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۱. نوع محصول" : "1. Product type"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {STACK_PRODUCT_TYPES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setProductType(opt.id);
                          setStep(2);
                        }}
                        className={clsx(
                          "w-full rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:border-accent-cosmic/40",
                          productType === opt.id
                            ? "border-accent-cosmic bg-accent-cosmic/10"
                            : "border-tech-card-border"
                        )}
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {step === 2 && productType && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۲. اندازه تیم" : "2. Team size"}
                </h2>
                <ul className="grid gap-3">
                  {STACK_TEAM_SIZES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setTeamSize(opt.id);
                          setStep(3);
                        }}
                        className="w-full rounded-xl border border-tech-card-border px-4 py-3 text-sm font-medium hover:border-accent-cosmic/40"
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {step === 3 && productType && teamSize && (
              <>
                <h2 className="text-lg font-semibold text-page-text">
                  {isFa ? "۳. اولویت اصلی" : "3. Top priority"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {STACK_PRIORITIES.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setPriority(opt.id);
                          void showResult({
                            productType,
                            teamSize,
                            priority: opt.id,
                          });
                        }}
                        className="w-full rounded-xl border border-tech-card-border px-4 py-3 text-sm font-medium hover:border-accent-cosmic/40"
                      >
                        {pick(locale, opt.label)}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          result && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-cosmic">
                  {isFa ? "Stack پیشنهادی" : "Recommended stack"}
                </p>
                <ul className="mt-4 space-y-2">
                  {result.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-tech-card-border bg-page/50 px-3 py-2 text-sm font-medium text-page-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-6 text-page-subtle">
                  {pick(locale, result.rationale)}
                </p>
                <p className="mt-3 text-sm text-page-muted">
                  <span className="font-medium text-page-text">
                    {isFa ? "Trade-off: " : "Trade-off: "}
                  </span>
                  {pick(locale, result.tradeoffs)}
                </p>
              </div>

              <div className={`flex flex-wrap gap-3 ${isFa ? "flex-row-reverse" : ""}`}>
                <Link
                  href={`/${locale}/services/${result.serviceSlug}`}
                  className="inline-flex rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {isFa ? "من می‌سازم — جزئیات خدمت" : "I'll build this — service details"}
                </Link>
                <Link
                  href={`/${locale}/contact?tab=brief&source=tool:tech-stack`}
                  className="inline-flex rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-medium text-page-text"
                >
                  {isFa ? "ارسال brief" : "Send brief"}
                </Link>
                <Link
                  href={`/${locale}/tools/project-estimator`}
                  className="inline-flex text-sm text-accent-cosmic hover:underline"
                >
                  {isFa ? "برآورد MVP ←" : "MVP estimator →"}
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setProductType(null);
                  setTeamSize(null);
                  setPriority(null);
                  setResult(null);
                  setLogged(false);
                }}
                className="text-sm text-page-muted hover:text-page-text"
              >
                {isFa ? "شروع دوباره" : "Start over"}
              </button>
            </div>
          )
        )}
      </ToolPageChrome>
    </>
  );
}
