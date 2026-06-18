"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import {
  isThemeToggleBooted,
  markThemeToggleBooted,
  prefetchThemeToggleTree,
} from "@/lib/theme-toggle-session";

const ThemeToggleTree = dynamic(() => import("./ThemeToggleTree"), {
  ssr: false,
  loading: () => null,
});

const SKELETON = (
  <div
    className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
    aria-hidden
  />
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
