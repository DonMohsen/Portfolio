/** Run after load + idle — keeps work off the LCP critical path. */
export function scheduleAfterLoadIdle(
  callback: () => void,
  idleTimeoutMs = 8000
) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: idleTimeoutMs });
      return;
    }
    window.setTimeout(callback, 2000);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}
