import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { resolveListingCoverSrc } from "@/lib/projects/listing-card-image";
import { getProjectSlug } from "@/lib/projects/get-project-slug";
import { PROJECT_INDUSTRY_LABELS } from "@/lib/projects/project-industry-labels";
import { parseProjectImages } from "@/lib/projects/parse-project-images";
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

export { parseProjectImages } from "@/lib/projects/parse-project-images";

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
    images: parseProjectImages(project.image).map(
      (src) => resolveListingCoverSrc(src) ?? src
    ),
    projectTypeLabel: (isFa ? typeLabels.fa : typeLabels.en).toUpperCase(),
    isLive: Boolean(project.liveLink),
    isOpenSource: Boolean(project.githubLink),
    githubUrl: project.githubLink || null,
    liveUrl: project.liveLink || null,
    detailHref: `/${locale}/work/${getProjectSlug(project)}`,
    technologies,
    industryLabel: project.industry
      ? isFa
        ? PROJECT_INDUSTRY_LABELS[project.industry].fa
        : PROJECT_INDUSTRY_LABELS[project.industry].en
      : isFa
        ? "صنعت نامشخص"
        : "Industry TBD",
    outcomeLabel:
      project.outcomeMetric ??
      (isFa ? "متریک در حال تکمیل" : "Metric coming soon"),
  };
}
