import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { parseProjectImages } from "./parse-project-images";
import { ProjectDetail } from "./types";

export function mapDbProjectToDetail(
  project: ProjectsWithTechsType
): ProjectDetail {
  const images = parseProjectImages(project.image);

  return {
    ...project,
    slug: project.slug,
    summary: project.description.slice(0, 160).trim(),
    longDescription: project.description,
    highlights: [],
    images,
    seoKeywords: project.techStack.map((entry) => entry.technology.name),
  };
}

export function resolveProjectYear(
  project: Pick<ProjectsWithTechsType, "year" | "createdAt">
): number {
  return project.year ?? new Date(project.createdAt).getFullYear();
}
