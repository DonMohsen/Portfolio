/** Shared star-network palette — hero + footer must stay in sync. */

export function pickCosmicStarColor(isDark: boolean): string {
  const rand = Math.random();
  if (isDark) {
    if (rand > 0.85) return "rgba(248, 183, 140, 0.75)";
    if (rand > 0.65) return "rgba(142, 214, 245, 0.6)";
    if (rand > 0.45) return "rgba(217, 179, 255, 0.55)";
    return "rgba(255, 255, 255, 0.65)";
  }
  if (rand > 0.85) return "rgba(201, 149, 106, 0.9)";
  if (rand > 0.65) return "rgba(26, 39, 68, 0.72)";
  if (rand > 0.45) return "rgba(74, 84, 112, 0.58)";
  return "rgba(42, 52, 82, 0.78)";
}

export function cosmicConnectionStroke(alpha: number, isDark: boolean): string {
  if (isDark) {
    return `rgba(248, 183, 140, ${alpha})`;
  }
  return `rgba(42, 52, 82, ${Math.min(0.42, alpha * 2.4)})`;
}

export function cosmicConnectionLineAlpha(isDark: boolean, mobile: boolean): number {
  if (isDark) {
    return mobile ? 0.24 : 0.15;
  }
  return mobile ? 0.3 : 0.22;
}
