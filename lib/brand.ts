/** Dark-mode hero navy — default when CSS vars unavailable (SSR). */
export const PAGE_BG_DARK = "#171a36" as const;

/** Light-mode warm cream (SSR fallback). */
export const PAGE_BG_LIGHT = "#f7f5f0" as const;

export function readCssVar(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function readPageBg(): string {
  return readCssVar("--page-bg", PAGE_BG_DARK);
}

export function isDarkTheme(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}
