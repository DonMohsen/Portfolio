/** 1% of the visible viewport — locked on load / orientationchange only. */
export const DVH_CSS_VAR = "--dvh";

export function syncDvhUnit() {
  if (typeof window === "undefined") return;
  const unit = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(DVH_CSS_VAR, `${unit}px`);
}

/** Locked hero height from --dvh (set once on load / orientationchange). */
export function readLockedDvhHeight() {
  if (typeof window === "undefined") return 0;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(DVH_CSS_VAR)
    .trim();
  const unitPx = parseFloat(raw);
  if (Number.isFinite(unitPx) && unitPx > 0) return unitPx * 100;

  return window.innerHeight;
}

/** Fixed cosmic canvas: always use locked --dvh height, never live innerHeight. */
export function readViewportSize(container: HTMLElement | null) {
  return {
    width: container?.clientWidth ?? document.documentElement.clientWidth,
    height: readLockedDvhHeight(),
  };
}

export function readViewportHeight(container?: HTMLElement | null) {
  return readViewportSize(container ?? null).height;
}
