/** IRANYekan Web — weights loaded after idle (400 Regular is in next/font). */
export const IRANYEKAN_DEFERRED = [
  { file: "iranyekanwebthin.ttf", weight: "100" },
  { file: "iranyekanweblight.ttf", weight: "300" },
  { file: "iranyekanwebmedium.ttf", weight: "500" },
  { file: "iranyekanwebextrabold.ttf", weight: "800" },
  { file: "iranyekanwebblack.ttf", weight: "900" },
  { file: "iranyekanwebextrablack.ttf", weight: "950" },
] as const;

/** Bold (700) — loaded only after first interaction so LCP h1 is not re-painted. */
export const IRANYEKAN_BOLD = {
  file: "iranyekanwebbold.ttf",
  weight: "700",
} as const;

export const IRANYEKAN_BASE = "/fonts/iranyekan";
