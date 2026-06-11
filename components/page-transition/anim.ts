import type { Variants } from "framer-motion";

/** Olivier Larose / Denis Snellenberg curve — [nextjs-framer-page-transition](https://github.com/olivierlarose/nextjs-framer-page-transition) */
export const curveEase = [0.76, 0, 0.24, 1] as const;
export const curveEaseOut = [0.33, 1, 0.68, 1] as const;

/** Route label — visible while the curve covers the screen. */
export const routeText: Variants = {
  coverFrom: { opacity: 0, top: "47.5%" },
  coverTo: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.5, delay: 0.4, ease: curveEaseOut },
  },
  revealFrom: { opacity: 1, top: "40%" },
  revealTo: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: curveEase },
    transitionEnd: { top: "47.5%" },
  },
};

export function curvePath(initialPath: string, targetPath: string): Variants {
  return {
    coverFrom: { d: targetPath },
    coverTo: {
      d: initialPath,
      transition: { duration: 0.75, ease: curveEase },
    },
    revealFrom: { d: initialPath },
    revealTo: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: curveEase },
    },
  };
}
