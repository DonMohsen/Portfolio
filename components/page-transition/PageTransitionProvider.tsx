"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import CurveOverlay from "./CurveOverlay";
import {
  getTransitionHrefFromAnchor,
  isLocaleOnlyPathChange,
  isModifiedClick,
  shouldAnimatePathname,
} from "./link-navigation";
import { consumePendingTransition } from "./pending-navigation";
import {
  getRouteLabelFromHref,
  getRouteLabelFromPathname,
  getTransitionLabelFromAnchor,
} from "./route-label";
import { prefetchBlogLabelsCache } from "@/lib/blogs/blog-labels-cache";

type NavigationSource = "click" | "history" | null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PageTransitionProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");
  const [fromCovered, setFromCovered] = useState(false);
  const [routeLabel, setRouteLabel] = useState("");
  const busyRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);
  const pathnameRef = useRef(pathname);
  const previousPathnameRef = useRef(pathname);
  const navigationSourceRef = useRef<NavigationSource>(null);
  const skipPathnameEffectRef = useRef(false);
  const isFirstPathnameEffectRef = useRef(true);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const finishTransition = useCallback(() => {
    busyRef.current = false;
    pendingHrefRef.current = null;
    navigationSourceRef.current = null;
    setFromCovered(false);
    setActive(false);
    previousPathnameRef.current = pathnameRef.current;
  }, []);

  const handleCoverComplete = useCallback(() => {
    const href = pendingHrefRef.current;
    if (!href) {
      finishTransition();
      return;
    }
    skipPathnameEffectRef.current = true;
    router.push(href);
    setPhase("reveal");
  }, [router, finishTransition]);

  const handleRevealComplete = useCallback(() => {
    finishTransition();
  }, [finishTransition]);

  const startHistoryTransition = useCallback((nextPathname: string) => {
    if (busyRef.current) return;
    if (!shouldAnimatePathname(nextPathname)) return;
    if (prefersReducedMotion()) return;

    const prevPathname = pathnameRef.current;
    if (nextPathname === prevPathname) return;
    if (isLocaleOnlyPathChange(prevPathname, nextPathname)) return;

    busyRef.current = true;
    navigationSourceRef.current = "history";
    pendingHrefRef.current = null;
    useHamburgerMenu.getState().closeHamburgerMenuState();
    setFromCovered(true);
    setRouteLabel(getRouteLabelFromPathname(nextPathname));
    setPhase("reveal");
    setActive(true);
  }, []);

  const startClickTransition = useCallback(
    (href: string, labelOverride?: string | null) => {
      if (busyRef.current) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      busyRef.current = true;
      navigationSourceRef.current = "click";
      pendingHrefRef.current = href;
      useHamburgerMenu.getState().closeHamburgerMenuState();
      setFromCovered(false);
      setRouteLabel(labelOverride || getRouteLabelFromHref(href));
      setPhase("cover");
      setActive(true);
    },
    [router]
  );

  useEffect(() => {
    const onPointerOver = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href*="/blogs/"]');
      if (anchor) prefetchBlogLabelsCache();
    };

    document.addEventListener("mouseover", onPointerOver, { passive: true });
    return () => document.removeEventListener("mouseover", onPointerOver);
  }, []);

  useEffect(() => {
    const pendingHref = consumePendingTransition();
    if (pendingHref) {
      startClickTransition(pendingHref);
    }
  }, [startClickTransition]);

  useEffect(() => {
    const onPopState = () => {
      startHistoryTransition(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [startHistoryTransition]);

  useEffect(() => {
    if (isFirstPathnameEffectRef.current) {
      isFirstPathnameEffectRef.current = false;
      previousPathnameRef.current = pathname;
      return;
    }

    if (skipPathnameEffectRef.current) {
      skipPathnameEffectRef.current = false;
      previousPathnameRef.current = pathname;
      return;
    }

    const prev = previousPathnameRef.current;
    if (pathname === prev) return;

    if (navigationSourceRef.current === "click" && busyRef.current) {
      previousPathnameRef.current = pathname;
      return;
    }

    if (!busyRef.current) {
      startHistoryTransition(pathname);
    }

    previousPathnameRef.current = pathname;
  }, [pathname, startHistoryTransition]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busyRef.current || isModifiedClick(event)) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = getTransitionHrefFromAnchor(anchor, pathnameRef.current);
      if (!href) return;

      const labelOverride = getTransitionLabelFromAnchor(anchor);

      event.preventDefault();
      event.stopPropagation();
      startClickTransition(href, labelOverride);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [startClickTransition]);

  if (!active) return null;

  return (
    <CurveOverlay
      routeLabel={routeLabel}
      phase={phase}
      fromCovered={fromCovered}
      onPhaseComplete={
        phase === "cover" ? handleCoverComplete : handleRevealComplete
      }
    />
  );
}
