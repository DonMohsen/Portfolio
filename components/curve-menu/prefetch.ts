let prefetched = false;

export const CURVE_MENU_PREPARE_EVENT = "curve-menu:prepare";

/** Download the curve-menu chunk without mounting the overlay yet. */
export function prefetchCurveMenuOverlay() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  void import("./CurveMenuOverlay");
}

/** Start chunk download + signal DeferredChrome to mount the overlay shell. */
export function prepareCurveMenuOverlay() {
  prefetchCurveMenuOverlay();
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CURVE_MENU_PREPARE_EVENT));
}
