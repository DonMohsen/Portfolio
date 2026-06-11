type ScheduleIdleOptions = {
  idleTimeoutMs?: number;
  /** Extra delay after load before scheduling idle work — keeps LCP clear. */
  minDelayMs?: number;
};

/** Run after load + optional delay + idle — keeps work off the LCP critical path. */
export function scheduleAfterLoadIdle(
  callback: () => void,
  options: ScheduleIdleOptions = {}
) {
  const { idleTimeoutMs = 8000, minDelayMs = 0 } = options;

  const runIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: idleTimeoutMs });
      return;
    }
    window.setTimeout(callback, 2000);
  };

  const run = () => {
    if (minDelayMs > 0) {
      window.setTimeout(runIdle, minDelayMs);
      return;
    }
    runIdle();
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}
