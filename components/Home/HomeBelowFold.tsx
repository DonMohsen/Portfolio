import { Suspense } from "react";
import { getTwoLatestProjects } from "@/app/actions/getTwoLatestProjects";
import getAllProjectsCount from "@/app/actions/getProjectsAndTechsCount";
import ProjectsDemo from "@/components/Home/ProjectsDemoSection/ProjectsDemo";
import AboutMe from "@/components/Home/AboutMe";

async function HomeBelowFoldContent({ locale }: { locale: string }) {
  const [allProjects, { projectCount }] = await Promise.all([
    getTwoLatestProjects(),
    getAllProjectsCount(),
  ]);

  return (
    <>
      <AboutMe />
      <ProjectsDemo
        projects={allProjects}
        locale={locale}
        projectCount={projectCount}
      />
    </>
  );
}

export default function HomeBelowFold({ locale }: { locale: string }) {
  return (
    <div
      data-below-fold
      className="px-3 py-10 md:px-10 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
    >
      <Suspense fallback={null}>
        <HomeBelowFoldContent locale={locale} />
      </Suspense>
    </div>
  );
}
