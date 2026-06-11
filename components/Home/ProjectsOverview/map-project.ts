import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { ProjectOverviewItem } from "./types";

const PROJECT_TYPE_LABELS: Record<
  ProjectsWithTechsType["projectType"],
  { en: string; fa: string }
> = {
  Real: { en: "Production", fa: "پروژه واقعی" },
  Practice: { en: "Practice", fa: "تمرینی" },
  Copy: { en: "Recreation", fa: "کپی شده" },
  Forked: { en: "Open Fork", fa: "فورک شده" },
};

/** Supports comma-separated URLs in `image` until a gallery field exists in admin. */
export function parseProjectImages(image: string | null | undefined): string[] {
  if (!image?.trim()) return [];

  return image
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function mapProjectToOverview(
  project: ProjectsWithTechsType,
  locale: string
): ProjectOverviewItem {
  const isFa = locale === "fa";
  const typeLabels = PROJECT_TYPE_LABELS[project.projectType];
  const technologies = project.techStack.map((entry) => ({
    name: entry.technology.name,
    imageUrl: entry.technology.imageUrl,
  }));

  return {
    id: project.id,
    title: project.name,
    subtitle: isFa ? typeLabels.fa : typeLabels.en,
    description: project.description,
    images: parseProjectImages(project.image),
    projectTypeLabel: (isFa ? typeLabels.fa : typeLabels.en).toUpperCase(),
    isLive: Boolean(project.liveLink),
    isOpenSource: Boolean(project.githubLink),
    githubUrl: project.githubLink || null,
    liveUrl: project.liveLink || null,
    detailHref: `/${locale}/projects/${project.id}`,
    technologies,
  };
}
