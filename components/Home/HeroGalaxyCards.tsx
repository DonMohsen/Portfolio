import type { CSSProperties, ReactNode } from "react";

export type HeroInfoCard = {
  id: "currently" | "focus" | "location" | "available";
  label: string;
  value: string;
  delay?: number;
  floatDuration?: number;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
};

const CARD_ICONS: Record<HeroInfoCard["id"], ReactNode> = {
  currently: (
    <svg
      className="absolute bottom-3.5 right-3.5 h-[18px] w-[18px] opacity-55"
      style={{ color: "var(--galaxy-card-value)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  ),
  focus: (
    <svg
      className="absolute bottom-3.5 right-3.5 h-[18px] w-[18px] opacity-55"
      style={{ color: "var(--galaxy-card-value)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  ),
  location: (
    <svg
      className="absolute bottom-3.5 right-3.5 h-[18px] w-[18px] opacity-55"
      style={{ color: "var(--galaxy-card-value)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  available: (
    <svg
      className="absolute bottom-3.5 right-3.5 h-[18px] w-[18px] opacity-55"
      style={{ color: "var(--galaxy-card-value)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
};

function GalaxyCard({
  card,
  variant,
}: {
  card: HeroInfoCard;
  variant: "mobile" | "desktop";
}) {
  const duration = card.floatDuration ?? 5;
  const delay = card.delay ?? 0;

  const baseStyle: CSSProperties = {
    backgroundColor: "var(--galaxy-card-bg)",
    borderColor: "var(--galaxy-card-border)",
    boxShadow: "var(--galaxy-card-shadow)",
    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
  };

  if (variant === "mobile") {
    return (
      <div
        className="relative flex min-h-[108px] flex-col rounded-xl border px-4 py-3.5 transition-colors duration-500"
        style={baseStyle}
      >
        <span
          className="text-[10px] font-medium uppercase tracking-[0.14em]"
          style={{ color: "var(--galaxy-card-label)" }}
        >
          {card.label}
        </span>
        <p
          className="mt-2 pr-8 text-[15px] font-medium leading-snug"
          style={{ color: "var(--galaxy-card-value)" }}
        >
          {card.value}
        </p>
        {CARD_ICONS[card.id]}
      </div>
    );
  }

  return (
    <div
      className="absolute z-10 min-w-[148px] rounded-lg border px-4 py-3 transition-colors duration-500"
      style={
        {
          ...baseStyle,
          top: card.top,
          right: card.right,
          left: card.left,
          bottom: card.bottom,
        } as CSSProperties
      }
    >
      <span
        className="block font-mono text-[10px] uppercase tracking-[0.12em]"
        style={{ color: "var(--galaxy-card-label)" }}
      >
        {card.label}
      </span>
      <span
        className="mt-0.5 block font-sans text-[13px]"
        style={{ color: "var(--galaxy-card-value)" }}
      >
        {card.value}
      </span>
    </div>
  );
}

export default function HeroGalaxyCards({ cards }: { cards: HeroInfoCard[] }) {
  return (
    <div className="relative w-full">
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 lg:hidden">
        {cards.map((card) => (
          <GalaxyCard key={card.id} card={card} variant="mobile" />
        ))}
      </div>

      <div className="relative hidden min-h-[500px] w-full lg:block lg:min-h-[600px]">
        {cards.map((card) => (
          <GalaxyCard key={card.id} card={card} variant="desktop" />
        ))}
      </div>
    </div>
  );
}
