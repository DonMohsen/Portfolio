"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/** Scaled down from the original tree toggle — all layout values derived from this. */
const SCALE = 0.58;

const PILL_W = Math.round(112 * SCALE);
const PILL_H = Math.round(48 * SCALE);
const KNOB_SIZE = Math.round(40 * SCALE);
const KNOB_LIGHT_X = Math.round(4 * SCALE);
const KNOB_DARK_X = Math.round(68 * SCALE);
const SUN_OFFSET_Y = Math.round(25 * SCALE);
const SUN_OFFSET_X = Math.round(8 * SCALE);
const MOON_HIDE_Y = Math.round(20 * SCALE);
const MOON_HIDE_X = Math.round(10 * SCALE);

const SCENE_TRANSITION = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 130, damping: 17 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 90, damping: 14 };

type LandscapeVariant = "day" | "night";

const LANDSCAPE_COLORS = {
  day: {
    backHill: "#b1ec74",
    frontHill: "#7cc447",
    trunk: "#a4775d",
    canopy: ["#3fb04e", "#369e44", "#369e44", "#4dc45c"] as const,
    bush: ["#7cc447", "#6ba83f", "#6ba83f", "#7cc447", "#6ba83f"] as const,
  },
  night: {
    backHill: "#1b2a3c",
    frontHill: "#0f1925",
    trunk: "#121b26",
    canopy: ["#152e1f", "#0f2316", "#0f2316", "#1d3f2a"] as const,
    bush: ["#0f1925", "#0b111a", "#0b111a", "#0f1925", "#0b111a"] as const,
  },
} as const;

const LandscapeSvg = React.memo(function LandscapeSvg({
  variant,
}: {
  variant: LandscapeVariant;
}) {
  const c = LANDSCAPE_COLORS[variant];

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 112 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M -10 32 Q 35 18 70 28 T 122 26 L 122 48 L -10 48 Z"
        fill={c.backHill}
      />
      <rect x="85.5" y="24" width="2.5" height="12" fill={c.trunk} />
      <circle cx="86.5" cy="18" r="9" fill={c.canopy[0]} />
      <circle cx="80.5" cy="19.5" r="6" fill={c.canopy[1]} />
      <circle cx="92.5" cy="20" r="7" fill={c.canopy[2]} />
      <circle cx="86.5" cy="14.5" r="6" fill={c.canopy[3]} />
      <path
        d="M -10 40 Q 25 32 60 30 T 122 34 L 122 48 L -10 48 Z"
        fill={c.frontHill}
      />
      <circle cx="28" cy="38" r="3.5" fill={c.bush[0]} />
      <circle cx="32" cy="39" r="2.5" fill={c.bush[1]} />
      <circle cx="58" cy="34" r="3" fill={c.bush[2]} />
      <circle cx="78" cy="35" r="2.5" fill={c.bush[3]} />
      <circle cx="74" cy="36" r="2" fill={c.bush[4]} />
    </svg>
  );
});

const STARS = [
  { left: "45%", top: "12%", size: 1.2 * SCALE, duration: 2.5, delay: 0, tone: "bg-white" },
  { left: "62%", top: "22%", size: 1.5 * SCALE, duration: 1.8, delay: 0.3, tone: "bg-yellow-200" },
  { left: "65%", top: "15%", size: 1 * SCALE, duration: 2.2, delay: 0.7, tone: "bg-white" },
] as const;

function ThemeToggleSkeleton() {
  return (
    <div
      className="shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
      style={{ width: PILL_W, height: PILL_H }}
      aria-hidden
    />
  );
}

function subscribeNoop() {
  return () => {};
}

export default function ThemeToggleTree() {
  const { setTheme, resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  if (!mounted) {
    return <ThemeToggleSkeleton />;
  }

  const isLight = (resolvedTheme ?? "dark") !== "dark";
  const toggle = () => setTheme(isLight ? "dark" : "light");

  const animateStars = !isLight && !reduceMotion;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      dir="ltr"
      style={{ width: PILL_W, height: PILL_H }}
      className={cn(
        "relative flex shrink-0 select-none items-center overflow-hidden rounded-full border border-black/10 bg-[#9be3eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-colors duration-500 dark:border-white/10 dark:bg-[#202c3f]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      )}
    >
        <div className="pointer-events-none absolute inset-0 h-full w-full">
          <motion.div
            initial={false}
            animate={{
              opacity: isLight ? 1 : 0,
              scale: isLight ? 1 : 0.95,
            }}
            transition={SCENE_TRANSITION}
            className="absolute inset-0 overflow-hidden bg-[#9be3eb]"
            aria-hidden
          >
            <div
              className="absolute left-[8%] top-[15%] rounded-full bg-white/70 blur-[0.2px]"
              style={{ width: Math.round(14 * SCALE), height: Math.round(6 * SCALE) }}
            />
            <div
              className="absolute left-[20%] top-[25%] rounded-full bg-white/80 blur-[0.1px]"
              style={{ width: Math.round(20 * SCALE), height: Math.round(8 * SCALE) }}
            />
            <div
              className="absolute right-[22%] top-[18%] rounded-full bg-white/65 blur-[0.3px]"
              style={{ width: Math.round(16 * SCALE), height: Math.round(6 * SCALE) }}
            />

            <motion.div
              initial={false}
              animate={{
                y: isLight ? 0 : SUN_OFFSET_Y,
                x: isLight ? 0 : -SUN_OFFSET_X,
              }}
              transition={SPRING_SOFT}
              className="absolute rounded-full bg-[#fec01a] shadow-[0_0_10px_rgba(254,192,26,0.65)]"
              style={{
                left: Math.round(38 * SCALE),
                top: Math.round(10 * SCALE),
                width: Math.round(20 * SCALE),
                height: Math.round(20 * SCALE),
              }}
            />

            <LandscapeSvg variant="day" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: isLight ? 0 : 1,
              scale: isLight ? 0.95 : 1,
            }}
            transition={SCENE_TRANSITION}
            className="absolute inset-0 overflow-hidden bg-[#202c3f]"
            aria-hidden
          >
            {STARS.map((star, i) => (
              <motion.span
                key={i}
                initial={false}
                animate={
                  animateStars
                    ? {
                        opacity: i === 0 ? [0.4, 1, 0.4] : i === 1 ? [1, 0.3, 1] : [0.3, 0.9, 0.3],
                      }
                    : { opacity: isLight ? 0 : 0.7 }
                }
                transition={
                  animateStars
                    ? {
                        repeat: Infinity,
                        duration: star.duration,
                        ease: "easeInOut",
                        delay: star.delay,
                      }
                    : { duration: 0.2 }
                }
                className={cn(
                  "absolute rounded-full",
                  star.tone
                )}
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                }}
              />
            ))}

            <motion.div
              initial={false}
              animate={{
                y: isLight ? -MOON_HIDE_Y : 0,
                x: isLight ? MOON_HIDE_X : 0,
                opacity: isLight ? 0 : 1,
                rotate: isLight ? -25 : 0,
              }}
              transition={SPRING_SOFT}
              className="absolute"
              style={{
                left: Math.round(20 * SCALE),
                top: Math.round(11 * SCALE),
                width: Math.round(14 * SCALE),
                height: Math.round(14 * SCALE),
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M11 2 C8.5 2 6 4 6 7.5 C6 11 8.5 13 11 13 C5.5 13 2 9.5 2 7.5 C2 5.5 5.5 2 11 2 Z"
                  fill="#fffde8"
                  className="drop-shadow-[0_0_4px_rgba(255,253,232,0.4)]"
                />
              </svg>
            </motion.div>

            <LandscapeSvg variant="night" />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{
            x: isLight ? KNOB_LIGHT_X : KNOB_DARK_X,
            scale: isLight ? 1 : 0.96,
          }}
          transition={SPRING_SNAPPY}
          className="relative z-10 flex items-center justify-center rounded-full border border-black/[0.04] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.1)]"
          style={{ width: KNOB_SIZE, height: KNOB_SIZE }}
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/30" />
        </motion.div>
    </button>
  );
}
