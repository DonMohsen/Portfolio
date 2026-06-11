"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  CURVE_MENU_PREPARE_EVENT,
  prefetchCurveMenuOverlay,
} from "@/components/curve-menu/prefetch";

const CurveMenuOverlay = dynamic(
  () => import("@/components/curve-menu/CurveMenuOverlay"),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((mod) => mod.Toaster),
  { ssr: false }
);

/** After load — keeps framer-motion off the LCP window (~1.5s) on mobile. */
const MOBILE_MENU_WARMUP_MS = 2800;
const MOBILE_MQ = "(max-width: 767px)";

export default function DeferredChrome() {
  const [menuReady, setMenuReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const enableMenu = () => {
      if (!cancelled) setMenuReady(true);
    };

    const warmup = () => {
      prefetchCurveMenuOverlay();
      enableMenu();
    };

    window.addEventListener("curve-menu:open", enableMenu);
    window.addEventListener(CURVE_MENU_PREPARE_EVENT, enableMenu);

    if (window.matchMedia(MOBILE_MQ).matches) {
      const scheduleWarmup = () => {
        timer = window.setTimeout(warmup, MOBILE_MENU_WARMUP_MS);
      };

      if (document.readyState === "complete") {
        scheduleWarmup();
      } else {
        window.addEventListener("load", scheduleWarmup, { once: true });
      }
    }

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("curve-menu:open", enableMenu);
      window.removeEventListener(CURVE_MENU_PREPARE_EVENT, enableMenu);
    };
  }, []);

  return (
    <>
      {menuReady ? <CurveMenuOverlay /> : null}
      <Toaster />
    </>
  );
}
