"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import {
  isThemeToggleBooted,
  markThemeToggleBooted,
  prefetchThemeToggle,
} from "@/lib/theme-toggle-session";

const SKELETON = (
  <div
    className="h-9 w-9 shrink-0 rounded-lg bg-zinc-200/30 dark:bg-zinc-800/50"
    aria-hidden
  />
);

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => SKELETON,
});

export default function DeferredThemeToggle() {
  const [ready, setReady] = useState(() => isThemeToggleBooted());

  useEffect(() => {
    prefetchThemeToggle();
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

  return <ThemeToggle />;
}
