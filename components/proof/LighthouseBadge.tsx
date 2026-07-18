"use client";

import clsx from "clsx";
import { Gauge } from "lucide-react";
import { useEffect, useState } from "react";

type LighthouseBadgeProps = {
  locale: string;
  className?: string;
};

type LighthouseResponse = {
  performanceScore: number | null;
  source: "pagespeed" | "unavailable";
  checkedAt?: string;
};

function scoreTone(score: number): string {
  if (score >= 90) return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
  if (score >= 70) return "text-amber-500 border-amber-500/30 bg-amber-500/10";
  return "text-orange-500 border-orange-500/30 bg-orange-500/10";
}

export default function LighthouseBadge({
  locale,
  className,
}: LighthouseBadgeProps) {
  const isFa = locale === "fa";
  const [data, setData] = useState<LighthouseResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/proof/lighthouse");
        if (!response.ok || cancelled) return;
        const payload = (await response.json()) as LighthouseResponse;
        if (!cancelled) setData(payload);
      } catch {
        // badge hides when unavailable
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data?.performanceScore) return null;

  const score = data.performanceScore;
  const label = isFa ? "Lighthouse موبایل" : "Mobile Lighthouse";

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
        scoreTone(score),
        className
      )}
      title={
        isFa
          ? `امتیاز performance این سایت — ${score}/100`
          : `This site's performance score — ${score}/100`
      }
    >
      <Gauge className="h-3.5 w-3.5" aria-hidden />
      <span>{label}</span>
      <span className="font-bold tabular-nums">{score}</span>
    </div>
  );
}
