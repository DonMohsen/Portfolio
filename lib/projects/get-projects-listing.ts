import { unstable_cache } from "next/cache";
import { getAllProjects } from "@/app/actions/getAllProjects";
import { PLACEHOLDER_PROJECTS } from "@/components/Home/ProjectsOverview/placeholder-projects";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { filterMockProjects } from "./filter-mock-projects";

async function fetchProjectsListing(
  search: string,
  order: string,
  type: string
): Promise<ProjectsWithTechsType[]> {
  try {
    const projects = await getAllProjects(search, order, type);
    if (projects.length > 0) return projects;
  } catch (error) {
    console.error("Error fetching projects listing:", error);
  }

  return filterMockProjects(PLACEHOLDER_PROJECTS, search, order, type);
}

export async function getProjectsListingData(
  search: string,
  order: string,
  type: string
): Promise<ProjectsWithTechsType[]> {
  const normalizedOrder = order === "asc" ? "asc" : "desc";

  return unstable_cache(
    () => fetchProjectsListing(search, normalizedOrder, type),
    ["projects-listing", search, normalizedOrder, type],
    {
      revalidate: 600,
      tags: ["project"],
    }
  )();
}
