let prefetched = false;
let prefetchPromise: Promise<unknown> | null = null;

export const PAGE_TRANSITION_PREPARE_EVENT = "page-transition:prepare";

/** Download the page-transition chunk without mounting the provider yet. */
export function prefetchPageTransition(): Promise<unknown> {
  if (typeof window === "undefined") return Promise.resolve();
  if (prefetchPromise) return prefetchPromise;

  prefetched = true;
  prefetchPromise = import("./PageTransitionProvider");
  return prefetchPromise;
}

/** Warm chunk + ask DeferredPageTransition to mount the provider shell. */
export function preparePageTransition() {
  void prefetchPageTransition();
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PAGE_TRANSITION_PREPARE_EVENT));
}

export function isPageTransitionPrefetched() {
  return prefetched;
}
