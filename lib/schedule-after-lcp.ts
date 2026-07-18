type ScheduleLcpOptions = {
  /** Safety net when load never fires. */
  fallbackMs?: number;
};

/**
 * Run after the page has loaded and the main thread is idle.
 *
 * Cosmic / decorative work must not mount during the LCP observation window.
 * Waiting for `load` + idle keeps full-viewport effects off the critical path
 * without delaying first paint of hero text.
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

  const onLoad = () => {
    // Small buffer so the final text LCP candidate can settle in lab tools.
    window.setTimeout(run, 400);
  };

  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad, { once: true });
  }

  window.setTimeout(run, fallbackMs);
}
