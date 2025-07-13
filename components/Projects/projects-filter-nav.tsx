"use client";

import { Square, SquareCheckBig } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";

const ProjectsFilterNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    searchParams.get("type") === type
      ? params.delete("type", type)
      : params.set("type", type);
    router.replace(`/projects?${params.toString()}`);
  };

  return (
    <div className="w-full p-4">
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col font-IRANSansXMedium">
        <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

        {/* Practice Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer justify-end">
          <input
            type="checkbox"
            checked={searchParams.get("type") === "Practice"}
            onChange={() => handleFilterClick("Practice")}
            className="hidden"
          />
        <div>
              <span className="text-white">
                <Square className={`text-black dark:text-white ${searchParams.get("type") === "Practice" &&'hidden'}`} />
              </span>
            

            {searchParams.get("type") === "Practice" && (
              <span className="text-white">
                <SquareCheckBig className="text-black dark:text-white" />
              </span>
            )}
          </div>
          <span className="">تمرینی</span>
        </label>

        {/* Copy Checkbox */}
        <label className="flex items-center justify-end space-x-2 cursor-pointer mt-2  ">
          <input
            type="checkbox"
            checked={searchParams.get("type") === "Copy"}
            onChange={() => handleFilterClick("Copy")}
            className="hidden"
          />
          <div>
              <span className="text-white">
              <Square className={`text-black dark:text-white ${searchParams.get("type") === "Copy" &&'hidden'}`} />
              </span>

            {searchParams.get("type") === "Copy" && (
              <span className="text-white">
                <SquareCheckBig className="text-black dark:text-white" />
              </span>
            )}
          </div>
          <span className="">کپی شده</span>
        </label>
      </div>
    </div>
    // <div className="w-full p-4 ">
    //   <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col">
    //     <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

    //     <button
    //       onClick={() => handleFilterClick("Practice")}
    //       className={`w-full p-2 text-white text-center ${
    //         searchParams.get("type") === "Practice" ? "bg-blue-500" : "bg-slate-400"
    //       }`}
    //     >
    //       Practice
    //     </button>

    //     <button
    //       onClick={() => handleFilterClick("Copy")}
    //       className={`w-full p-2 text-white text-center ${
    //         searchParams.get("type") === "Copy" ? "bg-blue-500" : "bg-slate-400"
    //       }`}
    //     >
    //       Copy
    //     </button>
    //   </div>
    // </div>
  );
};

export default ProjectsFilterNav;
