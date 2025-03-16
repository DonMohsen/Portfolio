"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ProjectsFilterNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="w-full p-4 ">
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col">
        <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

        <button
          onClick={() => handleFilterClick("Practice")}
          className={`w-full p-2 text-white text-center ${
            searchParams.get("type") === "Practice" ? "bg-blue-500" : "bg-slate-400"
          }`}
        >
          Practice
        </button>

        <button
          onClick={() => handleFilterClick("Copy")}
          className={`w-full p-2 text-white text-center ${
            searchParams.get("type") === "Copy" ? "bg-blue-500" : "bg-slate-400"
          }`}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ProjectsFilterNav;
