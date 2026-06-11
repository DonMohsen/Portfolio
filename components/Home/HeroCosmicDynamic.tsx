"use client";

import dynamic from "next/dynamic";

const HeroCosmicLazy = dynamic(() => import("./hero-cosmic-lazy"), {
  ssr: false,
});

type HeroCosmicDynamicProps = {
  align?: "left" | "right";
};

export default function HeroCosmicDynamic({ align = "right" }: HeroCosmicDynamicProps) {
  return <HeroCosmicLazy align={align} />;
}
