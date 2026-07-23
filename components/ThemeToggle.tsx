"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Moon, Sun } from "lucide-react";
import {
  applySiteTheme,
  readSiteTheme,
  subscribeSiteTheme,
} from "@/lib/site-theme";
import { cn } from "@/lib/utils";

const MOTION_MS = 300;
const ICON_MOTION =
  "pointer-events-none absolute h-4 w-4 origin-center will-change-[transform,opacity] transition-[transform,opacity] duration-[300ms] ease-[cubic-bezier(0.34,1.25,0.64,1)] motion-reduce:transition-none motion-reduce:transform-none";

const BUTTON =
  "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 text-page-text transition-colors hover:border-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white enabled:active:scale-95 disabled:pointer-events-none dark:border-white/20 dark:hover:border-white/30 dark:focus-visible:ring-offset-zinc-950";

const IDLE = "scale-100 rotate-0 opacity-100";
const HIDDEN = "scale-0 opacity-0";
const SUN_EXIT = "scale-0 rotate-[135deg] opacity-0";
const SUN_ENTER_FROM = "scale-0 -rotate-[135deg] opacity-0";
const MOON_EXIT = "scale-0 -rotate-[135deg] opacity-0";
const MOON_ENTER_FROM = "scale-0 rotate-[135deg] opacity-0";

export default function ThemeToggle() {
  const themeDark = useSyncExternalStore(
    subscribeSiteTheme,
    () => readSiteTheme() === "dark",
    () => true
  );

  const [visualDark, setVisualDark] = useState(true);
  const [pendingDark, setPendingDark] = useState<boolean | null>(null);
  const [enterReady, setEnterReady] = useState(true);
  const timersRef = useRef<number[]>([]);

  const animating = pendingDark !== null;
  const displayDark = animating ? visualDark : themeDark;

  useEffect(() => {
    if (!animating) {
      setVisualDark(themeDark);
    }
  }, [animating, themeDark]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const handleToggle = useCallback(() => {
    if (animating) return;

    const nextDark = !displayDark;
    setPendingDark(nextDark);
    setVisualDark(nextDark);
    applySiteTheme(nextDark ? "dark" : "light");
    setEnterReady(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEnterReady(true);
      });
    });

    schedule(() => {
      setPendingDark(null);
    }, MOTION_MS);
  }, [animating, displayDark, schedule]);

  const leavingLight = animating && pendingDark === true;
  const enteringLight = animating && pendingDark === false;
  const leavingDark = animating && pendingDark === false;
  const enteringDark = animating && pendingDark === true;

  let sunClass = HIDDEN;
  if (leavingLight) {
    sunClass = SUN_EXIT;
  } else if (enteringLight) {
    sunClass = enterReady ? IDLE : SUN_ENTER_FROM;
  } else if (!animating && !displayDark) {
    sunClass = IDLE;
  }

  let moonClass = HIDDEN;
  if (leavingDark) {
    moonClass = MOON_EXIT;
  } else if (enteringDark) {
    moonClass = enterReady ? IDLE : MOON_ENTER_FROM;
  } else if (!animating && displayDark) {
    moonClass = IDLE;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={displayDark}
      aria-busy={animating}
      disabled={animating}
      aria-label={displayDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      className={BUTTON}
    >
      <Sun aria-hidden strokeWidth={1.75} className={cn(ICON_MOTION, sunClass)} />
      <Moon aria-hidden strokeWidth={1.75} className={cn(ICON_MOTION, moonClass)} />
    </button>
  );
}
