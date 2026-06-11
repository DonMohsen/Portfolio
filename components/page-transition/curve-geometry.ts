import type { Variants } from "framer-motion";
import { curveEase } from "./anim";

/** Tailwind `md` — below this the arc is a soft hill, not a tight circle. */
const MD_BREAKPOINT = 768;
const MIN_WIDTH = 320;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type CurveGeometry = {
  initialPath: string;
  targetPath: string;
  translateOffset: number;
  translateVariants: Variants;
};

/**
 * Fixed 300px bump + control at y=0 reads as a sharp circle on narrow viewports.
 * Scale bump down and raise the bezier control toward the endpoints for a gentle hill.
 */
export function getCurveGeometry(width: number, height: number): CurveGeometry {
  const t = Math.min(
    1,
    Math.max(0, (width - MIN_WIDTH) / (MD_BREAKPOINT - MIN_WIDTH))
  );

  const bump = Math.round(lerp(42, 300, t));
  const controlRatio = lerp(0.9, 0, Math.pow(t, 0.8));
  const controlY = Math.round(bump * controlRatio);
  const tail = Math.round(lerp(90, 300, t));
  const tailCurve = Math.round(lerp(180, 600, t));

  const initialPath = `M0 ${bump} Q${width / 2} ${controlY} ${width} ${bump} L${width} ${height + tail} Q${width / 2} ${height + tailCurve} 0 ${height + tail} L0 0`;
  const targetPath = `M0 ${bump} Q${width / 2} ${controlY} ${width} ${bump} L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const topOffset = `-${bump}px`;
  const translateVariants: Variants = {
    coverFrom: { top: "100vh" },
    coverTo: {
      top: topOffset,
      transition: { duration: 0.75, ease: curveEase },
    },
    revealFrom: { top: topOffset },
    revealTo: {
      top: "-100vh",
      transition: { duration: 0.75, delay: 0.35, ease: curveEase },
      transitionEnd: { top: "100vh" },
    },
  };

  return {
    initialPath,
    targetPath,
    translateOffset: bump,
    translateVariants,
  };
}
