"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getTransitionHrefFromAnchor, isModifiedClick } from "./link-navigation";
import { queuePendingTransition } from "./pending-navigation";
import {
  PAGE_TRANSITION_PREPARE_EVENT,
  prefetchPageTransition,
  preparePageTransition,
} from "./prefetch";

const PageTransitionProvider = dynamic(
  () => import("./PageTransitionProvider"),
  { ssr: false }
);

/** After load — keeps framer-motion off the LCP window (~1.5s). */
const PAGE_TRANSITION_WARMUP_MS = 2600;

export default function DeferredPageTransition() {
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const pathnameRef = useRef("");

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    pathnameRef.current = window.location.pathname;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const enable = () => {
      if (!cancelled) setReady(true);
    };

    const warmup = () => {
      void prefetchPageTransition();
      enable();
    };

    const onPrepare = () => enable();
    window.addEventListener(PAGE_TRANSITION_PREPARE_EVENT, onPrepare);

    const scheduleWarmup = () => {
      timer = window.setTimeout(warmup, PAGE_TRANSITION_WARMUP_MS);
    };

    if (document.readyState === "complete") {
      scheduleWarmup();
    } else {
      window.addEventListener("load", scheduleWarmup, { once: true });
    }

    const onPointerDown = (event: PointerEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = getTransitionHrefFromAnchor(
        anchor,
        pathnameRef.current || window.location.pathname
      );
      if (!href) return;

      preparePageTransition();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (readyRef.current || isModifiedClick(event)) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = getTransitionHrefFromAnchor(
        anchor,
        pathnameRef.current || window.location.pathname
      );
      if (!href) return;

      event.preventDefault();
      event.stopPropagation();

      queuePendingTransition(href);
      void prefetchPageTransition().then(() => {
        if (!cancelled) enable();
      });
    };

    document.addEventListener("pointerdown", onPointerDown, {
      capture: true,
      passive: true,
    });
    document.addEventListener("click", onClickCapture, true);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(PAGE_TRANSITION_PREPARE_EVENT, onPrepare);
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  if (!ready) return null;

  return <PageTransitionProvider />;
}
