/** Hero / page background — Chrome & supported browsers use this for the top UI bar. */
export const BROWSER_THEME_COLOR = {
  light: "#f7f5f0",
  dark: "#171a36",
} as const;

export function resolveBrowserThemeColor(isDark: boolean): string {
  return isDark ? BROWSER_THEME_COLOR.dark : BROWSER_THEME_COLOR.light;
}

export function applyBrowserThemeColor(isDark: boolean): void {
  if (typeof document === "undefined") return;

  const color = resolveBrowserThemeColor(isDark);
  let meta = document.querySelector('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", color);
}

/** Runs before paint — reads theme storage + html class. */
export function getBrowserThemeColorScript(): string {
  const { light, dark } = BROWSER_THEME_COLOR;

  return `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":document.documentElement.classList.contains("dark");var c=d?"${dark}":"${light}";var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement("meta");m.setAttribute("name","theme-color");document.head.appendChild(m)}m.setAttribute("content",c)}catch(e){}})();`;
}
