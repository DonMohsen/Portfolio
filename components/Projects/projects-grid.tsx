import { ABOVE_FOLD_PROJECT_CARD_COUNT } from "@/lib/projects/project-card-styles";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import ProjectListingCard from "./ProjectListingCard";

type ProjectsGridProps = {
  projects: ProjectsWithTechsType[];
  locale: string;
};

export default function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
  const isFa = locale === "fa";

  if (projects.length === 0) {
    return (
      <p
        className="mt-10 text-center font-IRANSansXLight text-muted-foreground"
        dir={isFa ? "rtl" : "ltr"}
      >
        {isFa ? "پروژه‌ای یافت نشد." : "No projects found."}
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 mt-5"
      dir={isFa ? "rtl" : "ltr"}
    >
      {projects.map((project, index) => (
        <div key={project.id}>
          <ProjectListingCard
            project={project}
            locale={locale}
            priorityImage={index === 0}
            eagerImage={index > 0 && index < ABOVE_FOLD_PROJECT_CARD_COUNT}
          />
        </div>
      ))}
    </div>
  );
}
