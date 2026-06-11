"use client";

import { useEffect } from "react";
import {
  IRANYEKAN_BASE,
  IRANYEKAN_DEFERRED,
} from "@/lib/iranyekan-weights";

function scheduleMount(onReady: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(onReady, { timeout: 5000 });
      return;
    }
    window.setTimeout(onReady, 2000);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}

function resolveFontFamily() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-iranyekan")
    .trim();
  const family = raw.split(",")[0]?.replace(/['"]/g, "").trim();
  return family || null;
}

export default function DeferredFont() {
  useEffect(() => {
    scheduleMount(async () => {
      const family = resolveFontFamily();
      if (!family) return;

      await Promise.all(
        IRANYEKAN_DEFERRED.map(async ({ file, weight }) => {
          try {
            const face = new FontFace(
              family,
              `url("${IRANYEKAN_BASE}/${file}") format("truetype")`,
              { weight, style: "normal", display: "swap" }
            );
            await face.load();
            document.fonts.add(face);
          } catch {
            // Optional weight — keep rendering with nearest available weight
          }
        })
      );
    });
  }, []);

  return null;
}
