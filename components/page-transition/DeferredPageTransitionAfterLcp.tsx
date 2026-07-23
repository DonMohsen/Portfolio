"use client";

import { useEffect, useState, type ComponentType } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";

type TransitionComponent = ComponentType<Record<string, never>>;

/** Mount page-transition listeners only after LCP window closes. */
export default function DeferredPageTransitionAfterLcp() {
  const [Transition, setTransition] =
    useState<TransitionComponent | null>(null);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterLcp(() => {
      void import("./DeferredPageTransition").then((mod) => {
        if (cancelled) return;
        setTransition(() => mod.default);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Transition) return null;
  return <Transition />;
}
