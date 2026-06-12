type ProjectsToolbarSkeletonProps = {
  locale?: string;
};

export default function ProjectsToolbarSkeleton({
  locale,
}: ProjectsToolbarSkeletonProps = {}) {
  const isFa = locale === "fa";

  return (
    <div className="w-full flex flex-col justify-center items-center" aria-hidden>
      <div className="w-full max-w-xl h-10 bg-slate-200 dark:bg-slate-800 rounded-md my-4 animate-pulse" />
      <div className="flex gap-4 items-center justify-between w-full bg-slate-200 dark:bg-slate-800 p-3 rounded-xl h-12 animate-pulse">
        <span className="sr-only">
          {locale
            ? isFa
              ? "بارگذاری ابزارها"
              : "Loading toolbar"
            : "Loading toolbar"}
        </span>
      </div>
    </div>
  );
}
