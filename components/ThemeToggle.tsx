"use client";

/**
 * Compact Light / Dark switch — thumb uses fixed top + horizontal motion only
 * so Framer’s translateX never strips vertical centering (avoids moon clipping).
 */

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TRACK_W = 78;
const TRACK_H = 32;
const THUMB = 24;
const PAD_X = 4;
const THUMB_TRAVEL = TRACK_W - THUMB - PAD_X * 2;
/** Vertical inset so the knob never touches the pill edge */
const THUMB_TOP = (TRACK_H - THUMB) / 2;

const STARS = [
  { x: 6, y: 7, s: 1.6, delay: 0 },
  { x: 16, y: 4, s: 1, delay: 0.04 },
  { x: 24, y: 11, s: 1.3, delay: 0.08 },
  { x: 14, y: 15, s: 0.9, delay: 0.03 },
  { x: 4, y: 18, s: 1.2, delay: 0.06 },
] as const;

const SKY_LIGHT =
  "linear-gradient(145deg, #7ec8ff 0%, #5eb0f5 42%, #0984e3 100%)";
const SKY_DARK =
  "linear-gradient(145deg, #1a1a2e 0%, #12121c 45%, #060608 100%)";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return (
      <div
        className="h-8 w-[158px] max-w-[158px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      dir="ltr"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
      className={cn(
        "flex items-center gap-1 rounded-full py-0 pl-0.5 pr-0.5 outline-none sm:gap-1.5 sm:px-1",
        "focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      )}
    >
      <span
        className={cn(
          "shrink-0 text-end text-[10px] leading-none transition-all duration-500 sm:text-[11px]",
          !isDark
            ? "font-semibold text-[#2d3436] dark:text-white"
            : "font-medium text-[#b2bec3] dark:text-zinc-500"
        )}
      >
        Light
      </span>

      <div
        className="relative shrink-0 overflow-hidden rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.35)]"
        style={{ width: TRACK_W, height: TRACK_H }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: SKY_LIGHT }}
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: SKY_DARK }}
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />

        <div className="pointer-events-none absolute inset-[2px] z-[1] overflow-hidden rounded-[inherit]">
          {STARS.map((st, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ left: st.x, top: st.y }}
              initial={false}
              animate={
                isDark
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.2 }
              }
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 24,
                delay: isDark ? st.delay : 0,
              }}
            >
              <motion.span
                className="block rounded-full bg-white"
                style={{ width: st.s, height: st.s }}
                animate={isDark ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{
                  duration: 1.4 + i * 0.15,
                  repeat: isDark ? Infinity : 0,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            </motion.span>
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-[2px] z-[1] overflow-hidden rounded-[inherit]"
          initial={false}
          animate={isDark ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute"
            style={{ right: 3, bottom: 4 }}
            initial={false}
            animate={isDark ? { x: 10, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            <span className="absolute right-0 bottom-0 block h-1.5 w-5 rounded-full bg-white/95" />
            <span className="absolute right-1.5 bottom-0 block h-1 w-3.5 rounded-full bg-white/90" />
            <span className="absolute right-4 bottom-0 block h-0.5 w-3 rounded-full bg-white/85" />
          </motion.div>
          <motion.span
            className="absolute block h-1 w-3.5 rounded-full bg-white/75"
            style={{ right: 20, bottom: 12 }}
            initial={false}
            animate={isDark ? { x: 6, opacity: 0 } : { x: 0, opacity: 0.75 }}
            transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.03 }}
          />
        </motion.div>

        {/* Knob: only translateX — never combine with translateY via Tailwind */}
        <motion.div
          className="absolute left-0 z-20"
          style={{
            width: THUMB,
            height: THUMB,
            top: THUMB_TOP,
          }}
          initial={false}
          animate={{ x: isDark ? THUMB_TRAVEL + PAD_X : PAD_X }}
          transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.85 }}
        >
          <div className="relative box-border h-full w-full overflow-hidden rounded-full border border-black/10 shadow-[0_1px_4px_rgba(0,0,0,0.22)] dark:border-white/10">
            <motion.div
              aria-hidden
              className="absolute inset-[1px] rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, #fff4b8 0%, #ffe566 40%, #ffd93d 75%, #f0b429 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
              }}
              initial={false}
              animate={{
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0.92 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[1px] rounded-full bg-gradient-to-br from-slate-50 to-slate-200"
              initial={false}
              animate={{
                opacity: isDark ? 1 : 0,
                scale: isDark ? 1 : 0.9,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Bite fully inside the circle — no negative overflow */}
              <div
                className="absolute rounded-full bg-[#14141c]"
                style={{
                  width: "54%",
                  height: "54%",
                  right: "3%",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <span
        className={cn(
          "shrink-0 text-start text-[10px] leading-none transition-all duration-500 sm:text-[11px]",
          isDark
            ? "font-semibold text-[#2d3436] dark:text-white"
            : "font-medium text-[#b2bec3] dark:text-zinc-500"
        )}
      >
        Dark
      </span>
    </motion.button>
  );
}
