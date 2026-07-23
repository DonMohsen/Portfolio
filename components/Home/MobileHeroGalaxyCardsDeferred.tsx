"use client";

import { useEffect, useState } from "react";
import type { HeroInfoCard } from "./hero-info-card";
import { MobileGalaxyCard } from "./hero-galaxy-mobile-card";

export default function MobileHeroGalaxyCardsDeferred({
  cards,
}: {
  cards: HeroInfoCard[];
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const enable = () => {
      if (cancelled || ready) return;
      setReady(true);
    };

    const onScroll = () => {
      if (window.scrollY > 64) enable();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", enable, { once: true, passive: true });

    const fallback = window.setTimeout(enable, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div
        className="min-h-[240px] w-full lg:hidden"
        aria-hidden
        style={{ contain: "layout style paint" }}
      />
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 lg:hidden">
      {cards.map((card) => (
        <MobileGalaxyCard key={card.id} card={card} />
      ))}
    </div>
  );
}
