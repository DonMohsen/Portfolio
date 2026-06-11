let prefetched = false;

/** Warm the curve-menu chunk on hamburger hover/touch — off the LCP path. */
export function prefetchCurveMenuOverlay() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  void import("./CurveMenuOverlay");
}
