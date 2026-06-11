"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLoadIdle } from "@/lib/schedule-idle";

const ThemeToggleTree = dynamic(() => import("./ThemeToggleTree"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
      aria-hidden
    />
  ),
});

export default function DeferredThemeToggle() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterLoadIdle(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div
        className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
        aria-hidden
      />
    );
  }

  return <ThemeToggleTree />;
}
