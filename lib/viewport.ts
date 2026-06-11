/** Read layout size from a dvh-sized element (matches visible mobile viewport). */
export function readViewportSize(container: HTMLElement | null) {
  if (!container) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }

  return {
    width: container.clientWidth,
    height: container.clientHeight,
  };
}

export function readViewportHeight(container?: HTMLElement | null) {
  return readViewportSize(container ?? null).height;
}
