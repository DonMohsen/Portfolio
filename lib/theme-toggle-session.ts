let sessionBooted = false;
const listeners = new Set<() => void>();

export function isThemeToggleBooted() {
  return sessionBooted;
}

export function markThemeToggleBooted() {
  if (sessionBooted) return;
  sessionBooted = true;
  listeners.forEach((listener) => listener());
}

export function subscribeThemeToggleBoot(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function prefetchThemeToggle() {
  void import("@/components/ThemeToggle");
}
