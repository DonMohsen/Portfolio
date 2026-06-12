import { ProjectTypes } from "@prisma/client";

export const PROJECT_TYPE_FILTERS: ProjectTypes[] = [
  "Practice",
  "Copy",
  "Forked",
  "Real",
];

export const PROJECT_TYPE_LABELS: Record<
  ProjectTypes,
  { en: string; fa: string }
> = {
  Practice: { en: "Practice", fa: "تمرینی" },
  Copy: { en: "Copied", fa: "کپی شده" },
  Forked: { en: "Forked", fa: "فورک شده" },
  Real: { en: "Production", fa: "واقعی" },
};
