export const ProjectSkeleton = () => {
  return (
    <div className="bg-[#f6f6f6] p-[12px] border border-black/[0.1] dark:border-white/[0.4] dark:bg-black text-white flex flex-col rounded-[20px] animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden min-h-[200px] h-[200px] rounded-[10px] bg-gray-300 dark:bg-gray-700" />

      {/* Content Section */}
      <div className="mt-[1rem] select-none">
        {/* Type Badge Skeleton */}
        <div className="w-[80px] h-[20px] rounded-[4px] bg-gray-300 dark:bg-gray-700 mb-[24px]" />

        {/* Title Skeleton */}
        <div className="h-[28px] w-[60%] bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />

        {/* Progress Bar */}
        <div className="w-full flex-col mt-6">
          <div className="flex justify-between w-full text-[16px] text-gray-400">
            <p>Progress</p>
            <div className="w-[40px] h-[16px] bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
          <div className="h-[4px] bg-gray-200 dark:bg-gray-700 rounded-full mt-2 relative">
            <div className="h-[4px] w-[50%] bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>
        </div>

        {/* Tech Stack Skeleton */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex -space-x-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full border border-black/[.2] dark:border-neutral-800"
              />
            ))}
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full border border-black/[.2] dark:border-neutral-800 flex items-center justify-center text-sm font-medium" />
          </div>

          {/* Icons Skeleton */}
          <div className="flex items-center justify-center gap-5">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
