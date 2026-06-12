import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { ProjectTypes } from "@prisma/client";

export function filterMockProjects(
  projects: ProjectsWithTechsType[],
  search: string,
  order: string,
  type: string
): ProjectsWithTechsType[] {
  let filtered = [...projects];
  const query = search.trim().toLowerCase();

  if (query) {
    filtered = filtered.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }

  const validType = Object.values(ProjectTypes).includes(type as ProjectTypes)
    ? (type as ProjectTypes)
    : undefined;

  if (validType) {
    filtered = filtered.filter((project) => project.projectType === validType);
  }

  filtered.sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return order === "asc" ? aTime - bTime : bTime - aTime;
  });

  return filtered;
}
