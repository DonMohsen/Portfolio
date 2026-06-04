"use client";

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
  { src: "/icons/framermotion.svg", name: "Framer Motion", id: 12 }
];

const TechStackScroller = () => {
  const midpoint = Math.ceil(techItems.length / 2);
  const topRow = techItems.slice(0, midpoint);
  const bottomRow = techItems.slice(midpoint);

  return (
    <section
      className="border-y border-white/[0.06] bg-[#111222] py-5 md:py-6"
      dir="ltr"
      aria-label="Tech stack"
    >
      <MarqueeRow items={topRow} direction="left" duration="70s" />
      <MarqueeRow items={bottomRow} direction="right" duration="78s" className="-mt-0.5" />
    </section>
  );
};

export default TechStackScroller;

function MarqueeRow({
  items,
  direction,
  duration,
  className
}: {
  items: typeof techItems;
  direction: "left" | "right";
  duration: string;
  className?: string;
}) {
  // Ensure one logical cycle is always wider than viewport, so no empty slots appear mid-animation.
  const baseItems = items.length < 8 ? [...items, ...items] : items;
  const scrollingItems = [...baseItems, ...baseItems];

  return (
    <div
      className={`relative mx-auto max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] ${className ?? ""}`}
      style={
        {
          "--animation-duration": duration,
          "--animation-direction": direction === "left" ? "forwards" : "reverse"
        } as CSSProperties
      }
    >
      <ul className="flex w-max shrink-0 flex-nowrap gap-3 px-1 py-2.5 animate-scroll md:gap-4 md:py-3">
        {scrollingItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <div
              className="group relative flex w-[148px] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/[0.09] bg-gradient-to-b from-[#1a1b24] to-[#12131a] px-3 py-3 shadow-[0_14px_36px_-14px_rgba(0,0,0,0.92),inset_0_1px_0_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-white/[0.15] hover:shadow-[0_18px_44px_-12px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.08)] max-md:w-[124px] max-md:py-2.5"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,1), transparent 55%)"
                }}
              />
              <div className="relative flex h-9 w-9 items-center justify-center max-md:h-8 max-md:w-8">
                <Image
                  className="h-6 w-6 opacity-[0.88] brightness-0 invert contrast-110 transition-[opacity,filter] duration-300 group-hover:opacity-100 max-md:h-5 max-md:w-5"
                  alt=""
                  aria-hidden
                  src={item.src}
                  width={32}
                  height={32}
                />
              </div>
              <p className="relative mt-2 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-200 max-md:mt-1.5 max-md:text-[9px] max-md:tracking-[0.11em]">
                {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
