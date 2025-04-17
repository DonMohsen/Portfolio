export const ProjectSkeleton = () => {
  return (
    <div className="bg-[#f6f6f6] p-[12px] border border-black/[0.1] w-full   dark:border-white/[0.4] dark:bg-black text-white flex flex-col items-end justify-end  rounded-[20px] animate-pulse">
      {/* Image Skeleton */}
      <div className="relative flex w-full overflow-hidden min-h-[200px] h-[200px] rounded-[10px] bg-gray-300 dark:bg-gray-700" />

      {/* Content Section */}
      <div className="mt-[1rem] select-none w-full flex items-end justify-end flex-col ">
        {/* Type Badge Skeleton */}
        <div className="w-[80px] h-[30px] rounded-[4px] bg-gray-300 dark:bg-gray-700 mb-[24px]" />

        {/* Title Skeleton */}
        <div className="h-[28px] w-[60%] bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />

     {/* Progress Bar Skeleton */}
<div className="w-full flex-col mt-6 text-black dark:text-white">
  <div className="h-[20px] relative bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
    {/* Progress bar skeleton (animated) */}
    <div className="h-full w-[80%] absolute right-0 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
    
    {/* Text skeleton - centered */}
    <div className="absolute inset-0 flex items-center justify-center gap-2">
      <div className="w-[80px] h-4 bg-gray-400 dark:bg-gray-600 rounded-md animate-pulse" />
    </div>
  </div>
</div>

        {/* Tech Stack Skeleton */}
        <div className="flex items-center justify-between mt-6">

          {/* Icons Skeleton */}
          <div className="flex items-center justify-center gap-5">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
          <div className="flex -space-x-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full border border-black/[.2] dark:border-neutral-800"
              />
            ))}
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full border border-black/[.2] dark:border-neutral-800 flex items-center justify-center text-sm font-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};
