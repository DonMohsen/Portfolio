import type { ProjectTypes } from "@prisma/client";

export const PROJECT_CARD_TYPE_STYLES: Record<
  ProjectTypes,
  { en: string; fa: string; bgColor: string; textColor: string }
> = {
  Copy: {
    en: "Copied",
    fa: "کپی شده",
    bgColor: "bg-green-300",
    textColor: "text-green-900",
  },
  Forked: {
    en: "Forked",
    fa: "فورک شده",
    bgColor: "bg-purple-300",
    textColor: "text-purple-900",
  },
  Practice: {
    en: "Practice",
    fa: "تمرینی",
    bgColor: "bg-blue-300",
    textColor: "text-blue-900",
  },
  Real: {
    en: "Production",
    fa: "واقعی",
    bgColor: "bg-red-800",
    textColor: "text-white",
  },
};

/** First N cards are above the fold on common breakpoints (1/2/3 col grids). */
export const ABOVE_FOLD_PROJECT_CARD_COUNT = 3;
