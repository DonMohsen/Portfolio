"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThemeToggleTree = dynamic(() => import("./ThemeToggleTree"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[28px] w-[65px] shrink-0 rounded-full bg-zinc-200/30 dark:bg-zinc-800/50"
      aria-hidden
    />
  ),
});

function scheduleMount(onReady: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(onReady, { timeout: 4000 });
      return;
    }
    window.setTimeout(onReady, 1500);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}

export default function DeferredThemeToggle() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleMount(() => setReady(true));
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
