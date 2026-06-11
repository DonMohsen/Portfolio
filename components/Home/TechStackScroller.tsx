import type { CSSProperties } from "react";
import Image from "next/image";

const techItems = [
  { src: "/icons/nextjs.svg", name: "Next.js", id: 1 },
  { src: "/icons/reactjs.svg", name: "React", id: 2 },
  { src: "/icons/prisma.svg", name: "Prisma ORM", id: 3 },
  { src: "/icons/tailwindcss.svg", name: "Tailwind CSS", id: 4 },
  { src: "/icons/typescript.svg", name: "Typescript", id: 5 },
  { src: "/icons/expressjs.svg", name: "Express.js", id: 6 },
  { src: "/icons/redux.svg", name: "Redux", id: 7 },
  { src: "/icons/git.svg", name: "Git", id: 8 },
  { src: "/icons/restapi.svg", name: "Rest API", id: 9 },
  { src: "/icons/mongodb.svg", name: "Mongo DB", id: 10 },
  { src: "/icons/uiux.svg", name: "UI UX Patterns", id: 11 },
  { src: "/icons/framermotion.svg", name: "Framer Motion", id: 12 },
];

const MARQUEE_MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

const TechStackScroller = () => {
  const midpoint = Math.ceil(techItems.length / 2);
  const topRow = techItems.slice(0, midpoint);
  const bottomRow = techItems.slice(midpoint);

  return (
    <section
      data-tech-stack-section
      className="relative z-10 py-5 md:py-6"
      dir="ltr"
      aria-label="Tech stack"
    >
      <MarqueeRow items={topRow} direction="left" duration="70s" />
      <MarqueeRow
        items={bottomRow}
        direction="right"
        duration="78s"
        className="-mt-0.5"
      />
    </section>
  );
};

export default TechStackScroller;

function MarqueeRow({
  items,
  direction,
  duration,
  className,
}: {
  items: typeof techItems;
  direction: "left" | "right";
  duration: string;
  className?: string;
}) {
  const baseItems = items.length < 8 ? [...items, ...items] : items;
  const scrollingItems = [...baseItems, ...baseItems];

  return (
    <div
      className={`relative mx-auto max-w-7xl overflow-hidden ${className ?? ""}`}
      style={
        {
          WebkitMaskImage: MARQUEE_MASK,
          maskImage: MARQUEE_MASK,
          "--animation-duration": duration,
          "--animation-direction":
            direction === "left" ? "forwards" : "reverse",
        } as CSSProperties
      }
    >
      <ul className="flex w-max shrink-0 flex-nowrap gap-3 px-1 py-2.5 animate-scroll md:gap-4 md:py-3">
        {scrollingItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div className="flex w-[148px] flex-col items-center justify-center rounded-lg border border-tech-card-border bg-tech-card px-3 py-3 shadow-none transition-colors duration-500 hover:border-page-text/20 max-md:w-[124px] max-md:py-2.5">
              <div className="flex h-9 w-9 items-center justify-center max-md:h-8 max-md:w-8">
                <Image
                  className="h-6 w-6 opacity-80 transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert dark:contrast-110 max-md:h-5 max-md:w-5"
                  alt=""
                  aria-hidden
                  src={item.src}
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-tech-card-text max-md:mt-1.5 max-md:text-[9px] max-md:tracking-[0.11em]">
                {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
