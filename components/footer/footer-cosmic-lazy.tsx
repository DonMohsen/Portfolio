"use client";

import { useEffect, useState } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import FooterCosmicLayer from "./FooterCosmicLayer";

export default function FooterCosmicLazy() {
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

  return <FooterCosmicLayer />;
}
