import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { getMockProjectById } from "./mock-projects";
import { slugify } from "./slugify";

export function getProjectSlug(project: ProjectsWithTechsType): string {
  const mock = getMockProjectById(project.id);
  if (mock) return mock.slug;
  if (project.slug) return project.slug;
  return slugify(project.name);
}
