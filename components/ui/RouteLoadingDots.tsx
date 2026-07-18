"use client";

import { useEffect } from "react";

type RouteLoadingDotsProps = {
  /** Extra classes on the outer shell */
  className?: string;
};

/** CSS-only route loader — never pull framer-motion into loading.tsx. */
export default function RouteLoadingDots({
  className = "flex min-h-[101dvh] items-center justify-center bg-background",
}: RouteLoadingDotsProps) {
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  return (
    <div className={className}>
      <div className="relative flex space-x-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-4 w-4 animate-bounce rounded-full bg-black dark:bg-white"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.7s" }}
          />
        ))}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
