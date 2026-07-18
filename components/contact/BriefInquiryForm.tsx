"use client";

import clsx from "clsx";
import { useState } from "react";
import {
  BUDGET_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/contact/inquiry-schema";

type BriefInquiryFormProps = {
  locale: string;
  defaultProjectType?: string;
  defaultBudgetRange?: string;
  defaultTimeline?: string;
  defaultMessage?: string;
  defaultSource?: string;
};

type BriefStep = 1 | 2 | 3;

export default function BriefInquiryForm({
  locale,
  defaultProjectType = "",
  defaultBudgetRange = "",
  defaultTimeline = "",
  defaultMessage = "",
  defaultSource = "contact-form",
}: BriefInquiryFormProps) {
  const isFa = locale === "fa";
  const [step, setStep] = useState<BriefStep>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState(defaultProjectType || "other");
  const [budgetRange, setBudgetRange] = useState(
    defaultBudgetRange || "unsure"
  );
  const [timeline, setTimeline] = useState(
    defaultTimeline || "exploring"
  );
  const [message, setMessage] = useState(defaultMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const projectOptions = isFa
    ? PROJECT_TYPE_OPTIONS.fa
    : PROJECT_TYPE_OPTIONS.en;
  const budgetOptions = isFa ? BUDGET_OPTIONS.fa : BUDGET_OPTIONS.en;
  const timelineOptions = isFa ? TIMELINE_OPTIONS.fa : TIMELINE_OPTIONS.en;

  const inputClass =
    "w-full rounded-lg border border-tech-card-border bg-page/50 px-4 py-2.5 text-sm text-page-text outline-none transition-colors focus:border-accent-cosmic/50";
  const labelClass = "mb-1.5 block text-sm font-medium text-page-text";

  const stepLabels = isFa
    ? ["پروژه", "تماس", "پیام"]
    : ["Project", "Contact", "Message"];

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budgetRange,
          timeline,
          message,
          locale: isFa ? "fa" : "en",
          source: defaultSource,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Submission failed");
      }

      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : isFa
            ? "ارسال ناموفق بود."
            : "Submission failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    setError(null);
    setStep((current) => Math.min(3, current + 1) as BriefStep);
  }

  function goBack() {
    setError(null);
    setStep((current) => Math.max(1, current - 1) as BriefStep);
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-accent-cosmic/30 bg-accent-cosmic/5 p-6 text-center">
        <p className="text-lg font-semibold text-page-text">
          {isFa ? "دریافت شد — ممنون!" : "Received — thank you!"}
        </p>
        <p className="mt-2 text-sm text-page-subtle">
          {isFa
            ? "ظرف ۲۴ ساعت پاسخ می‌دهم. اگر فوری است، تلگرام هم بفرستید."
            : "I'll reply within 24 hours. For urgent items, Telegram works too."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div
        className={clsx(
          "flex items-center gap-2",
          isFa && "flex-row-reverse justify-end"
        )}
        aria-label={isFa ? "پیشرفت فرم" : "Form progress"}
      >
        {stepLabels.map((label, index) => {
          const stepNumber = (index + 1) as BriefStep;
          const active = step === stepNumber;
          const done = step > stepNumber;

          return (
            <div
              key={label}
              className={clsx(
                "flex items-center gap-2",
                isFa && "flex-row-reverse"
              )}
            >
              <span
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                  active && "bg-accent-cosmic text-accent-cosmic-fg",
                  done && "bg-accent-cosmic/20 text-accent-cosmic",
                  !active && !done && "bg-page/60 text-page-muted"
                )}
              >
                {stepNumber}
              </span>
              <span
                className={clsx(
                  "hidden text-sm sm:inline",
                  active ? "font-semibold text-page-text" : "text-page-muted"
                )}
              >
                {label}
              </span>
              {index < stepLabels.length - 1 ? (
                <span
                  className="mx-1 hidden h-px w-6 bg-tech-card-border sm:block"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {step === 1 ? (
        <div className="space-y-5">
          <p className="text-sm text-page-subtle">
            {isFa
              ? "اول fit پروژه — نوع، بودجه و زمان‌بندی."
              : "Start with project fit — type, budget, and timeline."}
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="brief-project">
                {isFa ? "نوع پروژه" : "Project type"} *
              </label>
              <select
                id="brief-project"
                className={inputClass}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                required
              >
                {projectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="brief-budget">
                {isFa ? "بودجه" : "Budget"} *
              </label>
              <select
                id="brief-budget"
                className={inputClass}
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                required
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="brief-timeline">
                {isFa ? "تایم‌لاین" : "Timeline"} *
              </label>
              <select
                id="brief-timeline"
                className={inputClass}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
              >
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={clsx("flex gap-3", isFa && "flex-row-reverse justify-end")}>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3 text-sm font-semibold text-accent-cosmic-fg"
            >
              {isFa ? "ادامه" : "Continue"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-5">
          <p className="text-sm text-page-subtle">
            {isFa ? "چطور پاسخ بدهم؟" : "How should I reach you?"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="brief-name">
                {isFa ? "نام" : "Name"} *
              </label>
              <input
                id="brief-name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="brief-email">
                {isFa ? "ایمیل" : "Email"} *
              </label>
              <input
                id="brief-email"
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="brief-company">
              {isFa ? "شرکت (اختیاری)" : "Company (optional)"}
            </label>
            <input
              id="brief-company"
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
            />
          </div>
          <div
            className={clsx(
              "flex flex-col gap-3 sm:flex-row",
              isFa && "sm:flex-row-reverse sm:justify-end"
            )}
          >
            <button
              type="button"
              onClick={goNext}
              disabled={!name.trim() || !email.trim()}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3 text-sm font-semibold text-accent-cosmic-fg disabled:opacity-60"
            >
              {isFa ? "ادامه" : "Continue"}
            </button>
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-6 py-3 text-sm font-medium text-page-subtle"
            >
              {isFa ? "برگشت" : "Back"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <p className="text-sm text-page-subtle">
            {isFa
              ? "مسئله، کاربر هدف و تعریف موفقیت — هرچه دقیق‌تر، پاسخ سریع‌تر."
              : "Problem, target users, and success criteria — the clearer, the faster I can reply."}
          </p>
          <div>
            <label className={labelClass} htmlFor="brief-message">
              {isFa ? "پیام" : "Message"} *
            </label>
            <textarea
              id="brief-message"
              className={`${inputClass} min-h-[160px] resize-y`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={20}
              placeholder={
                isFa
                  ? "مسئله، کاربر هدف، و آنچه موفقیت را تعریف می‌کند..."
                  : "Problem, target users, and what success looks like..."
              }
            />
          </div>

          {error ? (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          ) : null}

          <div
            className={clsx(
              "flex flex-col gap-3 sm:flex-row",
              isFa && "sm:flex-row-reverse sm:justify-end"
            )}
          >
            <button
              type="submit"
              disabled={loading || message.trim().length < 20}
              className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-accent-cosmic-fg disabled:opacity-60"
            >
              {loading
                ? isFa
                  ? "در حال ارسال..."
                  : "Sending..."
                : isFa
                  ? "ارسال brief"
                  : "Send brief"}
            </button>
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-6 py-3 text-sm font-medium text-page-subtle"
            >
              {isFa ? "برگشت" : "Back"}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
