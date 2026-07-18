"use client";

/**
 * ThemeToggleTree and CurveMenuOverlay both import framer-motion but are
 * lazy-loaded through two separate `next/dynamic()` boundaries. Turbopack
 * doesn't extract a shared vendor chunk for a dependency split across two
 * independent async chunks — it duplicates framer-motion into each one
 * (~40KB wasted, confirmed via duplicated-javascript-insight). Routing both
 * through this single dynamically-imported module gives them one shared
 * chunk instead, with no change to either component's own load timing.
 */
export { default as ThemeToggleTree } from "@/components/ThemeToggleTree";
export { default as CurveMenuOverlay } from "@/components/curve-menu/CurveMenuOverlay";
