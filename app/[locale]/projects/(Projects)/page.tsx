import { Suspense } from "react";
import { getProjectsListingData } from "@/lib/projects/get-projects-listing";
import ProjectsToolbar from "@/components/Projects/projects-toolbar";
import ProjectsGrid from "@/components/Projects/projects-grid";

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    order?: string;
    type?: string;
  }>;
};

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const search = sp.search ?? "";
  const order = sp.order ?? "desc";
  const type = sp.type ?? "";

  const projects = await getProjectsListingData(search, order, type);

  return (
    <div className="flex flex-col bg-page w-full min-h-[50vh]">
      <Suspense
        fallback={
          <div className="w-full h-32 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-xl my-4" />
        }
      >
        <ProjectsToolbar locale={locale} resultCount={projects.length} />
      </Suspense>
      <ProjectsGrid projects={projects} locale={locale} />
    </div>
  );
}
