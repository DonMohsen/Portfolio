"use client";

import { useEffect, useState } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import ViewportLock from "@/components/ViewportLock";

/** Initial --dvh is set inline in root layout; defer resize listeners until after LCP. */
export default function DeferredViewportLock() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterLcp(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;
  return <ViewportLock />;
}
