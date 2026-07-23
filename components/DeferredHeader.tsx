"use client";

import { useEffect, useState, type ComponentType } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import { prefetchThemeToggle } from "@/lib/theme-toggle-session";
import MobileHeaderPlaceholder from "@/components/MobileHeaderPlaceholder";

type HeaderComponent = ComponentType<Record<string, never>>;

/**
 * Manual import (not next/dynamic) — next/dynamic was prefetching the
 * framer-motion header chunk during layout hydration and fighting LCP.
 * Placeholder reserves the mobile control cluster so late mount is CLS-free.
 */
export default function DeferredHeader() {
  const [Header, setHeader] = useState<HeaderComponent | null>(null);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterLcp(() => {
      void import("@/components/header").then((mod) => {
        if (cancelled) return;
        prefetchThemeToggle();
        setHeader(() => mod.Header);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Header) return <MobileHeaderPlaceholder />;
  return <Header />;
}
