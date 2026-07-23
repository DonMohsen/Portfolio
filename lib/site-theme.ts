import { applyBrowserThemeColor, BROWSER_THEME_COLOR } from "@/lib/browser-theme-color";

export type SiteTheme = "dark" | "light";

const STORAGE_KEY = "theme";
export const SITE_THEME_CHANGE_EVENT = "site-theme-change";

/** Runs before paint — sync html class from storage (next-themes compatible key). */
export function getSiteThemeInitScript(): string {
  const { light, dark } = BROWSER_THEME_COLOR;

  return `(function(){try{var k="theme",t=localStorage.getItem(k),r=document.documentElement;if(t==="light"){r.classList.remove("dark");r.classList.add("light")}else{r.classList.add("dark");r.classList.remove("light")}var isDark=r.classList.contains("dark"),c=isDark?"${dark}":"${light}",m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement("meta");m.setAttribute("name","theme-color");document.head.appendChild(m)}m.setAttribute("content",c)}catch(e){}})();`;
}

export function readSiteTheme(): SiteTheme {
  if (typeof document === "undefined") return "dark";

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }

  return "dark";
}

export function applySiteTheme(theme: SiteTheme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }

  applyBrowserThemeColor(theme === "dark");
  window.dispatchEvent(new Event(SITE_THEME_CHANGE_EVENT));
}

export function toggleSiteTheme(): SiteTheme {
  const next: SiteTheme = readSiteTheme() === "dark" ? "light" : "dark";
  applySiteTheme(next);
  return next;
}

export function subscribeSiteTheme(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(SITE_THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SITE_THEME_CHANGE_EVENT, onStoreChange);
  };
}
