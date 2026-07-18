"use client";

import clsx from "clsx";
import { Calculator, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "portfolio-exit-intent-shown";

function shouldSkipPath(pathname: string): boolean {
  return (
    pathname.includes("/contact") ||
    pathname.includes("/tools/project-estimator") ||
    pathname.includes("/admin")
  );
}

export default function ExitIntentModal() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (shouldSkipPath(pathname)) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    if (!isDesktop) return;

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 12) return;
      setOpen(true);
    };

    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss, open]);

  if (!open) return null;

  const estimatorHref = `/${locale}/tools/project-estimator?source=exit-intent`;

  return (
    <div
      className="fixed inset-0 z-[25000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <button
        type="button"
        aria-label={isFa ? "بستن" : "Close"}
        className="absolute inset-0 bg-black/50"
        onClick={dismiss}
      />

      <div
        className={clsx(
          "relative w-full max-w-md rounded-2xl border border-tech-card-border bg-page p-6 shadow-2xl",
          isFa ? "text-right" : "text-left",
          !reduceMotion && "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200"
        )}
      >
        <button
          type="button"
          onClick={dismiss}
          className={clsx(
            "absolute top-4 rounded-lg p-1.5 text-page-muted hover:bg-page/60 hover:text-page-text",
            isFa ? "left-4" : "right-4"
          )}
          aria-label={isFa ? "بستن" : "Close"}
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className={clsx(
            "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-cosmic/15 text-accent-cosmic",
            isFa && "float-left ms-0 me-3"
          )}
        >
          <Calculator className="h-5 w-5" aria-hidden />
        </div>

        <h2
          id="exit-intent-title"
          className="text-xl font-semibold text-page-text"
        >
          {isFa ? "قبل رفتن — هزینه را تخمین بزنید" : "Before you go — estimate your build"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-page-subtle">
          {isFa
            ? "۳ مرحله رایگان: نوع پروژه، فیچرها، زمان‌بندی. خروجی بازه قیمت + case study مشابه — بدون تماس اجباری."
            : "Free 3-step wizard: project type, features, timeline. Get a price range + similar case study — no forced call."}
        </p>

        <div
          className={clsx(
            "mt-6 flex flex-col gap-3 sm:flex-row",
            isFa && "sm:flex-row-reverse"
          )}
        >
          <Link
            href={estimatorHref}
            onClick={dismiss}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent-cosmic px-5 py-3 text-sm font-semibold text-accent-cosmic-fg transition-opacity hover:opacity-90"
          >
            {isFa ? "شروع Estimator" : "Start estimator"}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-tech-card-border px-5 py-3 text-sm font-medium text-page-subtle hover:text-page-text"
          >
            {isFa ? "فعلاً نه" : "Not now"}
          </button>
        </div>
      </div>
    </div>
  );
}
