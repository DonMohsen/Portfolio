let prefetched = false;

/** Warm the page-transition chunk on nav hover — off the LCP path. */
export function prefetchPageTransition() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  void import("./PageTransitionProvider");
}
