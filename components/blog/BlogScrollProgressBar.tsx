"use client";

import { useEffect, useState } from "react";

export default function BlogScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let latest = 0;

    const readPercentage = () => {
      const blogContentEl = document.getElementById("blog-content-with-conclusion");

      if (blogContentEl) {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const contentRect = blogContentEl.getBoundingClientRect();
        const contentTop = scrollTop + contentRect.top;
        const contentHeight = blogContentEl.scrollHeight || contentRect.height;
        const contentBottom = contentTop + contentHeight;
        const scrollableRange = Math.max(1, contentBottom - viewportHeight);
        const raw = (scrollTop / scrollableRange) * 100;
        const clamped = Math.min(100, Math.max(0, raw));
        if (scrollTop > 0 && clamped === 0) return 1.5;
        return clamped;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return scrollableHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
        : 0;
    };

    const scheduleUpdate = () => {
      latest = readPercentage();
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setProgress(latest);
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9997] h-[8px] bg-page-text/10 xl:hidden">
      <div className="relative h-full">
        <div
          className="absolute inset-y-0 left-0 rounded-r-full bg-accent-cosmic"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
