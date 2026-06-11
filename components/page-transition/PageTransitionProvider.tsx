"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import CurveOverlay from "./CurveOverlay";
import {
  getRouteLabelFromHref,
  getRouteLabelFromPathname,
} from "./route-label";

type NavigationSource = "click" | "history" | null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function stripLocalePath(pathname: string): string {
  const match = pathname.match(/^\/(en|fa)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

function isLocaleOnlyPathChange(prev: string, next: string): boolean {
  return stripLocalePath(prev) === stripLocalePath(next) && prev !== next;
}

function shouldAnimatePathname(pathname: string): boolean {
  return !pathname.startsWith("/admin");
}

function shouldAnimateNavigation(anchor: HTMLAnchorElement, pathname: string) {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return null;

  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;
  if (!shouldAnimatePathname(url.pathname)) return null;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;
  if (url.pathname === pathname && url.search === "" && url.hash === "") {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
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
    (href: string) => {
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
      setRouteLabel(getRouteLabelFromHref(href));
      setPhase("cover");
      setActive(true);
    },
    [router]
  );

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

      const href = shouldAnimateNavigation(anchor, pathnameRef.current);
      if (!href) return;

      event.preventDefault();
      event.stopPropagation();
      startClickTransition(href);
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
