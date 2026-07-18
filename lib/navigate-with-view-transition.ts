import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Navigate with View Transitions API when supported; instant push otherwise. */
export function navigateWithViewTransition(
  href: string,
  router: AppRouterInstance
): void {
  if (prefersReducedMotion()) {
    router.push(href);
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      finished: Promise<void>;
    };
  };

  if (typeof doc.startViewTransition !== "function") {
    router.push(href);
    return;
  }

  doc.startViewTransition(() => {
    router.push(href);
  });
}
