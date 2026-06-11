export function stripLocalePath(pathname: string): string {
  const match = pathname.match(/^\/(en|fa)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

export function isLocaleOnlyPathChange(prev: string, next: string): boolean {
  return stripLocalePath(prev) === stripLocalePath(next) && prev !== next;
}

export function shouldAnimatePathname(pathname: string): boolean {
  return !pathname.startsWith("/admin");
}

export function getTransitionHrefFromAnchor(
  anchor: HTMLAnchorElement,
  pathname: string
): string | null {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return null;

  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;
  if (!shouldAnimatePathname(url.pathname)) return null;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;
  if (url.pathname === pathname && url.search === "" && url.hash === "") {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}
