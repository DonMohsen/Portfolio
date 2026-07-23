"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  isCosmicLayerBooted,
  subscribeCosmicLayerBoot,
} from "@/lib/cosmic-layer-session";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";

type CosmicComponent = ComponentType<{
  align?: "left" | "right";
  active?: boolean;
}>;

const MOBILE_MQ = "(max-width: 767px)";

type PersistentHeroCosmicProps = {
  locale: string;
};

export default function PersistentHeroCosmic({ locale }: PersistentHeroCosmicProps) {
  const [booted, setBooted] = useState(() => isCosmicLayerBooted());
  const [Cosmic, setCosmic] = useState<CosmicComponent | null>(null);

  useEffect(() => {
    if (Cosmic) return;

    let cancelled = false;
    const load = () => {
      if (window.matchMedia(MOBILE_MQ).matches) {
        setBooted(true);
        return;
      }

      void import("./hero-cosmic-lazy").then((mod) => {
        if (cancelled) return;
        setBooted(true);
        setCosmic(() => mod.default);
      });
    };

    if (isCosmicLayerBooted()) {
      load();
      return () => {
        cancelled = true;
      };
    }

    scheduleAfterLcp(load);
    return () => {
      cancelled = true;
    };
  }, [booted, Cosmic]);

  useEffect(() => subscribeCosmicLayerBoot(() => setBooted(true)), []);

  if (!Cosmic || !booted) return null;

  return (
    <Cosmic
      align={locale === "fa" ? "left" : "right"}
      active
    />
  );
}
