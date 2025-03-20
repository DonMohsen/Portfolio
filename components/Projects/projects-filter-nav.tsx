"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ProjectsFilterNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    searchParams.get("type") === type?params.delete("type",type):
    params.set("type", type);
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="w-full p-4">
    <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col">
      <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

      {/* Practice Checkbox */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={searchParams.get("type") === "Practice" }
          onChange={() => handleFilterClick("Practice")}
          className="hidden"
        />
        <div
          className={`w-5 h-5 border rounded-md flex items-center justify-center  ${
             searchParams.get("type") === "Practice" ? "bg-blue-500 border-blue-500" : "border-gray-500"

          }`}
        >
          {searchParams.get("type") === "Practice"  && <span className="text-white">✔</span>}
        </div>
        <span className="">Practice</span>
      </label>

      {/* Copy Checkbox */}
      <label className="flex items-center space-x-2 cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={searchParams.get("type") === "Copy" }
          onChange={() => handleFilterClick("Copy")}
          className="hidden"
        />
        <div
          className={`w-5 h-5 border rounded-md flex items-center justify-center ${
             searchParams.get("type") === "Copy" ? "bg-blue-500 border-blue-500" : "border-gray-500"

          }`}
        >
          {searchParams.get("type") === "Copy"  && <span className="text-white">✔</span>}
        </div>
        <span className="">Copy</span>
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
