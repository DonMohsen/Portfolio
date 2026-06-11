"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLoadIdle } from "@/lib/schedule-idle";

const HeroCosmicLayer = dynamic(() => import("./HeroCosmicLayer"), {
  ssr: false,
});

type HeroCosmicLazyProps = {
  align?: "left" | "right";
};

/**
 * Mount after load + idle so LCP (h1) is never blocked by canvas work.
 */
export default function HeroCosmicLazy({ align = "right" }: HeroCosmicLazyProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterLoadIdle(
      () => {
        if (!cancelled) setReady(true);
      },
      { minDelayMs: 2500 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return <HeroCosmicLayer align={align} />;
}
