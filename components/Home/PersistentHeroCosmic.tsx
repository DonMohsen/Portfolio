"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  isCosmicLayerBooted,
  subscribeCosmicLayerBoot,
} from "@/lib/cosmic-layer-session";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";

type CosmicComponent = ComponentType<{
  align?: "left" | "right";
  active?: boolean;
}>;

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

export default function PersistentHeroCosmic() {
  const pathname = usePathname();
  const locale = useLocale();
  const isHome = isHomePath(pathname);
  const [booted, setBooted] = useState(() => isCosmicLayerBooted());
  const [Cosmic, setCosmic] = useState<CosmicComponent | null>(null);

  useEffect(() => {
    if (!isHome && !booted) return;
    if (Cosmic) return;

    let cancelled = false;
    const load = () => {
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
  }, [isHome, booted, Cosmic]);

  useEffect(() => subscribeCosmicLayerBoot(() => setBooted(true)), []);

  if (!Cosmic || !booted) return null;

  return (
    <Cosmic
      align={locale === "fa" ? "left" : "right"}
      active={isHome}
    />
  );
}
