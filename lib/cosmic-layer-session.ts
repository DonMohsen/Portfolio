let sessionBooted = false;
const listeners = new Set<() => void>();

export function isCosmicLayerBooted() {
  return sessionBooted;
}

export function markCosmicLayerBooted() {
  if (sessionBooted) return;
  sessionBooted = true;
  listeners.forEach((listener) => listener());
}

export function subscribeCosmicLayerBoot(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
