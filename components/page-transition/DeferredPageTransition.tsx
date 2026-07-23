"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { getTransitionHrefFromAnchor, isModifiedClick } from "./link-navigation";
import { queuePendingTransition } from "./pending-navigation";
import {
  PAGE_TRANSITION_PREPARE_EVENT,
  prefetchPageTransition,
  preparePageTransition,
} from "./prefetch";

type ProviderComponent = ComponentType<Record<string, never>>;

export default function DeferredPageTransition() {
  const [Provider, setProvider] = useState<ProviderComponent | null>(null);
  const readyRef = useRef(false);
  const pathnameRef = useRef("");

  useEffect(() => {
    readyRef.current = Boolean(Provider);
  }, [Provider]);

  useEffect(() => {
    pathnameRef.current = window.location.pathname;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const enable = () => {
      if (cancelled || readyRef.current) return;
      void import("./PageTransitionProvider").then((mod) => {
        if (cancelled) return;
        setProvider(() => mod.default);
      });
    };

    const onPrepare = () => enable();
    window.addEventListener(PAGE_TRANSITION_PREPARE_EVENT, onPrepare);

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
      window.removeEventListener(PAGE_TRANSITION_PREPARE_EVENT, onPrepare);
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  if (!Provider) return null;
  return <Provider />;
}
