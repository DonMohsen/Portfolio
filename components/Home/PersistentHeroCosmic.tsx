"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  isCosmicLayerBooted,
  subscribeCosmicLayerBoot,
} from "@/lib/cosmic-layer-session";

const HeroCosmicLazy = dynamic(() => import("./hero-cosmic-lazy"), {
  ssr: false,
});

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

export default function PersistentHeroCosmic() {
  const pathname = usePathname();
  const locale = useLocale();
  const isHome = isHomePath(pathname);
  const [pinned, setPinned] = useState(() => isCosmicLayerBooted());

  useEffect(() => {
    void import("./hero-cosmic-lazy");
  }, []);

  useEffect(() => {
    if (isHome) setPinned(true);
  }, [isHome]);

  useEffect(() => subscribeCosmicLayerBoot(() => setPinned(true)), []);

  if (!pinned) return null;

  return (
    <HeroCosmicLazy
      align={locale === "fa" ? "left" : "right"}
      active={isHome}
    />
  );
}
