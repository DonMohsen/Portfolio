"use client";

import dynamic from "next/dynamic";

const FooterCosmicLazy = dynamic(() => import("./footer-cosmic-lazy"), {
  ssr: false,
});

export default function FooterCosmicDefer() {
  return <FooterCosmicLazy />;
}
