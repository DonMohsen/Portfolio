import type { HeroInfoCard } from "./hero-info-card";
import MobileHeroGalaxyCardsDeferred from "./MobileHeroGalaxyCardsDeferred";

export type { HeroInfoCard } from "./hero-info-card";

export default function HeroGalaxyCards({ cards }: { cards: HeroInfoCard[] }) {
  return (
    <div className="relative w-full">
      <MobileHeroGalaxyCardsDeferred cards={cards} />

      <div className="relative hidden min-h-[500px] w-full lg:block lg:min-h-[600px]">
        {cards.map((card) => (
          <DesktopGalaxyCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function DesktopGalaxyCard({ card }: { card: HeroInfoCard }) {
  const duration = card.floatDuration ?? 5;
  const delay = card.delay ?? 0;

  return (
    <div
      className="absolute z-10 min-w-[148px] rounded-lg border px-4 py-3 transition-colors duration-500"
      style={{
        backgroundColor: "var(--galaxy-card-bg)",
        borderColor: "var(--galaxy-card-border)",
        boxShadow: "var(--galaxy-card-shadow)",
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        top: card.top,
        right: card.right,
        left: card.left,
        bottom: card.bottom,
      }}
    >
      <span
        className="block text-[10px] font-medium uppercase tracking-[0.12em]"
        style={{ color: "var(--galaxy-card-label)" }}
      >
        {card.label}
      </span>
      <span
        className="mt-0.5 block text-[13px] font-medium"
        style={{ color: "var(--galaxy-card-value)" }}
      >
        {card.value}
      </span>
    </div>
  );
}
