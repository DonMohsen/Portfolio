import { getTopProjectsForFooter } from "@/app/actions/getTopProjectsForFooter";
import { getLatestBlogsForFooter } from "@/lib/blogs/get-latest-blogs";
import { getProjectSlug } from "@/lib/projects/get-project-slug";
import { PLACEHOLDER_PROJECTS } from "@/components/Home/ProjectsOverview/placeholder-projects";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

export type FooterProjectItem = {
  id: number;
  title: string;
  competency: number;
  href: string;
};

function resolveTopProjects(projects: ProjectsWithTechsType[]) {
  const source = projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;
  return [...source]
    .sort((a, b) => b.competency - a.competency)
    .slice(0, 3);
}

/** Resolved at build time for the locale layout footer. */
export async function getFooterData(locale: string) {
  const [blogs, projects] = await Promise.all([
    getLatestBlogsForFooter(locale),
    getTopProjectsForFooter(),
  ]);

  const topProjects = resolveTopProjects(projects).map((project) => ({
    id: project.id,
    title: project.name,
    competency: project.competency,
    href: `/${locale}/work/${getProjectSlug(project)}`,
  }));

  return { blogs, projects: topProjects };
}
