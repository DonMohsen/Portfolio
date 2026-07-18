"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMetricsRow } from "@/lib/projects/types";

type ScrollMetricsRevealProps = {
  rows: ProjectMetricsRow[];
  locale: string;
};

export function isAnimatableMetric(row: ProjectMetricsRow): boolean {
  const before = row.before?.trim();
  const after = row.after?.trim();
  if (!before || !after) return false;
  if (before === "[TBD]" || after === "[TBD]") return false;
  return true;
}

export default function ScrollMetricsReveal({
  rows,
  locale,
}: ScrollMetricsRevealProps) {
  const isFa = locale === "fa";
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  const animatableRows = rows.filter(isAnimatableMetric);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (animatableRows.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="mt-4 space-y-4">
      {animatableRows.map((row) => (
        <div
          key={row.label}
          className="rounded-xl border border-tech-card-border bg-page/40 p-4 sm:p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-page-muted">
            {row.label}
          </p>
          <div
            className={`mt-3 flex items-end gap-3 ${isFa ? "flex-row-reverse justify-end" : ""}`}
          >
            <div
              className={`min-w-0 flex-1 transition-all duration-700 ease-out ${
                revealed
                  ? "opacity-40 scale-95 blur-[0.5px]"
                  : "opacity-100 scale-100"
              }`}
            >
              <p className="text-[11px] uppercase tracking-wider text-page-muted">
                {isFa ? "قبل" : "Before"}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-page-subtle sm:text-3xl">
                {row.before}
              </p>
            </div>

            <span
              className={`shrink-0 pb-2 text-lg text-accent-cosmic transition-opacity duration-500 ${
                revealed ? "opacity-100" : "opacity-30"
              }`}
              aria-hidden
            >
              →
            </span>

            <div
              className={`min-w-0 flex-1 transition-all duration-700 ease-out delay-150 ${
                revealed
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-105 translate-y-2"
              }`}
            >
              <p className="text-[11px] uppercase tracking-wider text-accent-cosmic">
                {isFa ? "بعد" : "After"}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-page-text sm:text-3xl">
                {row.after}
              </p>
            </div>
          </div>

          {row.delta ? (
            <p
              className={`mt-3 text-sm font-semibold text-emerald-700 transition-opacity duration-500 dark:text-emerald-300 ${
                revealed ? "opacity-100" : "opacity-0"
              } ${isFa ? "text-right" : "text-left"}`}
            >
              {row.delta}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
