"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ProjectsFilterNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = (type: string) => {
    const newUrl = `/projects?type=${type}`;
    router.push(newUrl);
  };

  return (
    <div className="w-full p-4">
      <p className="text-right font-IRANSansXExtraBold">پروژه ها</p>
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] mt-10 p-4 flex flex-col">
        <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

        <button
          onClick={() => handleFilterClick("Practice")}
          className="w-full bg-slate-400 p-2 text-white text-center"
        >
          Practice
        </button>

        <button
          onClick={() => handleFilterClick("Copy")}
          className="w-full bg-slate-400 p-2 text-white text-center mt-2"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ProjectsFilterNav;
