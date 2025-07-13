import React from "react";
import clsx from "clsx";

const ProjectSkeletonOne = () => {
  
  return (
    <div className="relative overflow-hidden border-black/[0.1] dark:border-white/[0.4] border-[0.1px] dark:bg-black bg-white text-white flex flex-col rounded-[8px] w-full animate-pulse">
      {/* Image */}
      <div className="w-full aspect-[16/9] bg-neutral-300/50 dark:bg-neutral-800 rounded-[8px]" />

      {/* Content */}
      <div className="p-2 mt-1 flex flex-col gap-2 justify-center items-start">
        {/* Header row */}
        <div className="w-full flex items-center justify-between">
          {/* Project Type */}
          <div className="h-7 w-10 bg-neutral-300 dark:bg-neutral-700 rounded-[4px]" />

          {/* Competency Circle */}
          <div className="h-[35px] w-[35px] bg-neutral-300 dark:bg-neutral-700 rounded-full" />
        </div>

        {/* Project Name */}
        <div className="w-3/4 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-md " />

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2 w-full">
          {/* Tech stack avatars */}
          <div className="flex -space-x-3" dir="ltr">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-neutral-300 dark:bg-neutral-700 border border-black/[.2] dark:border-neutral-800 rounded-full"
              />
            ))}
            <div className="w-8 h-8 bg-neutral-300 dark:bg-neutral-700 border border-black/[.2] dark:border-neutral-800 rounded-full" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <div className="w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            <div className="w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeletonOne;
