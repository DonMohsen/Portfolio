export default function WorkSlugLoading() {
  return (
    <div className="w-full flex flex-col items-center mt-[70px] pb-16 px-4 animate-pulse">
      <div className="w-full max-w-4xl mb-4 h-5 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="w-full max-w-4xl max-md:h-[400px] h-[550px] bg-slate-200 dark:bg-slate-800 rounded-[8px]" />
      <div className="w-full max-w-4xl mt-6 space-y-3">
        <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="w-full max-w-4xl mt-8 h-12 bg-slate-200 dark:bg-slate-800 rounded" />
    </div>
  );
}
