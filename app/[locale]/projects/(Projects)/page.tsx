"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Layers, Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPersianNumbers } from "@/utils/numbers";
import ProjectSkeleton from "@/components/Loadings/ProjectSkeletonOne";
import ProjectSkeletonOne from "@/components/Loadings/ProjectSkeletonOne";
import ProjectSkeletonTwo from "@/components/Loadings/ProjectSkeletonTwo";
import ProjectSkeletonThree from "@/components/Loadings/ProjectSkeletonThree";
import { useLocale } from "next-intl";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const isFa = locale === "fa";
  const order = searchParams.get("order") || "desc";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const [searchInput, setSearchInput] = useState(search);

  const [projects, setProjects] = useState<ProjectsWithTechsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    startTransition(() => {
      fetch(`/api/project?search=${search}&order=${order}&type=${type}`)
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  }, [search, order, type]);

  useEffect(() => {
    setSearchInput(search || "");
  }, [searchParams, search]);

  const handleOrderChange = (newOrder: string) => {
    updateFilters({ order: newOrder });
  };

  const updateFilters = (
    newFilters: Partial<{ type: string; order: string; search: string }>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`/${locale}/projects?${params.toString()}`);
  };

  return (
    <div className="flex flex-col bg-page">
      <Head>
        <title>{isFa ? "پروژه ها | محسن خجسته نژاد" : "Projects | Mohsen Khojasteh Nezhad"}</title>
      </Head>
      <div className="w-full  flex flex-col justify-center items-center">
        <form
          className="w-full flex items-center justify-end"
          onSubmit={(e) => {
            e.preventDefault();
            updateFilters({ search: searchInput });
          }}
        >
          <div className="flex items-center border border-black/[0.1] dark:border-white/[0.1] rounded-md my-4  overflow-hidden">
            <button
              type="submit"
              className="flex group items-center justify-center w-[80px] h-10 bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-gray-300  transition-all rounded-md"
            >
              <Search className="w-5 h-5 group-hover:w-7 group-hover:h-7 transition-all duration-300 text-gray-600" />
            </button>
            <input
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              dir={isFa ? "rtl" : "ltr"}
              placeholder={isFa ? "جستجو در پروژه ها" : "Search projects"}
              className="flex-1 bg-transparent dark:placeholder:text-white/[0.3] border-none outline-none px-2 text-right placeholder:font-IRANSansXUltraLight font-IRANSansXRegular"
            />
          </div>
        </form>
        <div className="flex gap-4 items-center justify-between w-full bg-slate-200 dark:bg-slate-900 p-3 max-lg:p-[6px] rounded-xl text-[12px]  font-IRANSansXLight font-medium">
          <div className="w-full pl-2  max-lg:hidden">
            {loading || isPending ? (
              <div className="animate-pulse bg-slate-100 dark:bg-gray-700 h-5 w-10 rounded-md"></div>
            ) : (
              <div>
                {isFa
                  ? `نتیجه \u200E${getPersianNumbers(projects.length.toString())}`
                  : `Results ${projects.length}`}
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center justify-end w-full">
            <SlidersHorizontal className="cursor-pointer hover:scale-125 transition-all duration-300 lg:hidden" />
            <button onClick={() => handleOrderChange("asc")} className={`p-2 rounded transition-colors ${order === "asc" ? "text-teal-600 font-IRANSansXRegular font-bold" : " text-black dark:text-white"}`}>{isFa ? "قدیمی ترین" : "Oldest"}</button>
            <button onClick={() => handleOrderChange("desc")} className={`p-2 rounded transition-colors ${order === "desc" ? "text-teal-600 font-IRANSansXRegular font-bold" : " text-black dark:text-white"}`}>{isFa ? "جدید ترین" : "Newest"}</button>
            <div className="flex items-center justify-center gap-3">
              <p className=" font-IRANSansXMedium">{isFa ? ":ترتیب" : "Sort:"}</p>
              <Layers />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full   lg:hidden text-[12px] mt-5 text-right  flex items-center justify-end pr-1">
        {loading || isPending ? (
          <div className="animate-pulse bg-slate-100 dark:bg-gray-700 h-5 w-[50px] rounded-md right-0"></div>
        ) : (
          <div className="font-IRANSansXLight">
            {isFa
              ? `نتیجه \u200E${getPersianNumbers(projects.length.toString())}`
              : `Results ${projects.length}`}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 mt-5" dir={isFa ? "rtl" : "ltr"}>
        {loading || isPending ? (
          <>
            <ProjectSkeletonOne /> <ProjectSkeletonThree />
            <ProjectSkeletonTwo />
            <ProjectSkeletonTwo />
            <ProjectSkeletonThree />
            <ProjectSkeletonOne />{" "}
          </>
        ) : (
          projects.map((project) => <ProjectCardItem project={project} key={project.id} />)
        )}
      </div>
    </div>
  );
}
