"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCosmicLayer = dynamic(() => import("./HeroCosmicLayer"), {
  ssr: false,
});

type HeroCosmicLazyProps = {
  align?: "left" | "right";
};

/**
 * Mount shortly after first paint so LCP (h1) is not blocked,
 * but the galaxy still appears quickly on hero load.
 */
export default function HeroCosmicLazy({ align = "right" }: HeroCosmicLazyProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (!cancelled) setReady(true);
    };

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(mount);
    });

    const fallback = window.setTimeout(mount, 500);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!ready) return null;

  return <HeroCosmicLayer align={align} />;
};
