"use client";

import { useEffect, useState } from "react";
import {
  isCosmicLayerBooted,
  markCosmicLayerBooted,
} from "@/lib/cosmic-layer-session";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import HeroCosmicLayer from "./HeroCosmicLayer";

type HeroCosmicLazyProps = {
  align?: "left" | "right";
  active?: boolean;
};

export default function HeroCosmicLazy({
  align = "right",
  active = true,
}: HeroCosmicLazyProps) {
  const [ready, setReady] = useState(() => isCosmicLayerBooted());

  useEffect(() => {
    if (ready) return;

    let cancelled = false;

    scheduleAfterLcp(() => {
      if (cancelled) return;
      markCosmicLayerBooted();
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready) return null;

  return <HeroCosmicLayer align={align} active={active} />;
}
