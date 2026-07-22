"use client";

/**
 * CurveMenuOverlay imports framer-motion and is lazy-loaded through
 * `next/dynamic()`. Kept as a dedicated async chunk so the menu code
 * (and its motion dependency) stays off the critical path.
 */
export { default as CurveMenuOverlay } from "@/components/curve-menu/CurveMenuOverlay";
