import { scheduleAfterLoadIdle } from "@/lib/schedule-idle";

type ScheduleLcpOptions = {
  /** Safety net when LCP is not reported (e.g. bfcache restore). */
  fallbackMs?: number;
};

/** Run after LCP is recorded — keeps cosmic work off the LCP critical path. */
export function scheduleAfterLcp(
  callback: () => void,
  { fallbackMs = 2200 }: ScheduleLcpOptions = {}
) {
  let called = false;

  const run = () => {
    if (called) return;
    called = true;

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: 1200 });
      return;
    }

    window.setTimeout(callback, 120);
  };

  if (typeof window === "undefined") return;

  if (typeof PerformanceObserver === "undefined") {
    scheduleAfterLoadIdle(run, { minDelayMs: 500 });
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      if (list.getEntries().length > 0) run();
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });

    if (performance.getEntriesByType("largest-contentful-paint").length > 0) {
      run();
    }

    window.setTimeout(() => {
      observer.disconnect();
      run();
    }, fallbackMs);
  } catch {
    scheduleAfterLoadIdle(run, { minDelayMs: 500 });
  }
}
