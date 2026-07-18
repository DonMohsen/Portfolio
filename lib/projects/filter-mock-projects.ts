import "server-only";
import type { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { ProjectIndustry, ProjectTypes } from "@prisma/client";

export function filterMockProjects(
  projects: ProjectsWithTechsType[],
  search: string,
  order: string,
  type: string,
  industry = "",
  featured = ""
): ProjectsWithTechsType[] {
  let filtered = [...projects];
  const query = search.trim().toLowerCase();

  if (query) {
    filtered = filtered.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.outcomeMetric?.toLowerCase().includes(query) ?? false)
    );
  }

  const validType = Object.values(ProjectTypes).includes(type as ProjectTypes)
    ? (type as ProjectTypes)
    : undefined;

  if (validType) {
    filtered = filtered.filter((project) => project.projectType === validType);
  }

  const validIndustry = Object.values(ProjectIndustry).includes(
    industry as ProjectIndustry
  )
    ? (industry as ProjectIndustry)
    : undefined;

  if (validIndustry) {
    filtered = filtered.filter((project) => project.industry === validIndustry);
  }

  const featuredOnly = featured === "true" || featured === "1";
  if (featuredOnly) {
    filtered = filtered.filter((project) => project.featured);
  }

  filtered.sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return order === "asc" ? aTime - bTime : bTime - aTime;
  });

  return filtered;
}
