"use client";

import { useEffect } from "react";
import { markCosmicLayerBooted } from "@/lib/cosmic-layer-session";
import HeroCosmicLayer from "./HeroCosmicLayer";

type HeroCosmicLazyProps = {
  align?: "left" | "right";
  active?: boolean;
};

/** Parent (PersistentHeroCosmic) already waits until after load+idle. */
export default function HeroCosmicLazy({
  align = "right",
  active = true,
}: HeroCosmicLazyProps) {
  useEffect(() => {
    markCosmicLayerBooted();
  }, []);

  return <HeroCosmicLayer align={align} active={active} />;
}
