import ProjectsGridSkeleton from "@/components/Projects/projects-grid-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col bg-page w-full mt-[100px] px-5">
      <div className="w-full max-w-xl h-10 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md my-4 ms-auto" />
      <div className="w-full h-12 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
      <ProjectsGridSkeleton />
    </div>
  );
}
