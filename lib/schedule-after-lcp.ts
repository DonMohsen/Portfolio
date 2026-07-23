type ScheduleLcpOptions = {
  /** Safety net when load never fires. */
  fallbackMs?: number;
};

/**
 * Run after the page has loaded and the main thread is idle.
 *
 * Cosmic / decorative work must not mount during the LCP observation window.
 * No extra post-load delay — the old 400ms buffer correlated with late LCP
 * in throttled mobile lab runs.
 */
export function scheduleAfterLcp(
  callback: () => void,
  { fallbackMs = 4000 }: ScheduleLcpOptions = {}
) {
  let called = false;

  const run = () => {
    if (called) return;
    called = true;

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: 1500 });
      return;
    }

    window.setTimeout(callback, 200);
  };

  if (typeof window === "undefined") return;

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }

  window.setTimeout(run, fallbackMs);
}
