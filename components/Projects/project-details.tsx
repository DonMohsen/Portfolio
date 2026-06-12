import ProjectBreadcrumbs from "./ProjectBreadcrumbs";
import ProjectHero from "./ProjectHero";
import ProjectDetailsInteractive from "./ProjectDetailsInteractive";
import { ProjectDetail } from "@/lib/projects/types";

type ProjectDetailsProps = {
  project: ProjectDetail;
  locale: string;
};

/** @deprecated Use page-level server composition instead. */
export default function ProjectDetails({ project, locale }: ProjectDetailsProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <ProjectBreadcrumbs locale={locale} projectName={project.name} />
      <ProjectHero project={project} locale={locale} />
      <ProjectDetailsInteractive project={project} />
    </div>
  );
}
