export default function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 mt-5 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[8px] border border-black/[0.1] dark:border-white/[0.1] overflow-hidden animate-pulse"
        >
          <div className="w-full h-[200px] bg-slate-200 dark:bg-slate-800" />
          <div className="p-3 space-y-3">
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded ms-auto" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
