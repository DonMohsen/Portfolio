"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import {
  isThemeToggleBooted,
  markThemeToggleBooted,
  prefetchThemeToggleTree,
} from "@/lib/theme-toggle-session";

const SKELETON = (
  <div
    className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
    aria-hidden
  />
);

const ThemeToggleTree = dynamic(
  () => import("./motion-chrome-bundle").then((mod) => mod.ThemeToggleTree),
  {
    ssr: false,
    // Must keep the reserved 65×28 slot — `null` collapses the cluster and shifts CLS.
    loading: () => SKELETON,
  }
);

export default function DeferredThemeToggle() {
  const [ready, setReady] = useState(() => isThemeToggleBooted());

  useEffect(() => {
    prefetchThemeToggleTree();
  }, []);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;

    scheduleAfterLcp(() => {
      if (cancelled) return;
      markThemeToggleBooted();
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready) return SKELETON;

  return <ThemeToggleTree />;
}
