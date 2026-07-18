import { getLatestProjectsForHome } from "@/app/actions/getLatestProjectsForHome";
import getAllProjectsCount from "@/app/actions/getProjectsAndTechsCount";
import {
  resolveFeaturedCaseStudies,
  resolveHomeProjectCount,
} from "@/components/Home/ProjectsOverview/placeholder-projects";

/** Resolved at build time — no client fetch; placeholders when DB is unavailable. */
export async function getHomeProjectsOverviewData() {
  const [projects, { projectCount }] = await Promise.all([
    getLatestProjectsForHome(),
    getAllProjectsCount(),
  ]);

  return {
    projects: resolveFeaturedCaseStudies(projects),
    projectCount: resolveHomeProjectCount(projectCount),
  };
}
