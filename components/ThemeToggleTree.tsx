"use client";

import { useSyncExternalStore } from "react";
import { NatureToggle } from "react-nature-toggle";
import "react-nature-toggle/styles.css";
import { useTheme } from "next-themes";

const TOGGLE_SIZE = 28;

function subscribeNoop() {
  return () => {};
}

function ThemeToggleSkeleton() {
  return (
    <div
      className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
      aria-hidden
    />
  );
}

/** Thin next-themes adapter around `react-nature-toggle`. */
export default function ThemeToggleTree() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  if (!mounted) {
    return <ThemeToggleSkeleton />;
  }

  const mode = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <NatureToggle mode={mode} onModeChange={setTheme} size={TOGGLE_SIZE} />
  );
}
