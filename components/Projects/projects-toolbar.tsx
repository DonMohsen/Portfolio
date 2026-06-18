"use client";

import nextDynamic from "next/dynamic";
import { Layers, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const ProjectsFilterDrawer = nextDynamic(
  () => import("./projects-filter-drawer"),
  { ssr: false }
);

type ProjectsToolbarProps = {
  locale: string;
  resultCount?: number;
};

export default function ProjectsToolbar({
  locale,
  resultCount,
}: ProjectsToolbarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFa = locale === "fa";
  const order = searchParams.get("order") || "desc";
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const [isPending, startTransition] = useTransition();

  const updateFilters = (
    newFilters: Partial<{ type: string; order: string; search: string }>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    startTransition(() => {
      router.replace(`/${locale}/projects?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const handleOrderChange = (newOrder: string) => {
    updateFilters({ order: newOrder });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <form
        className="w-full flex items-center justify-end"
        onSubmit={(e) => {
          e.preventDefault();
          updateFilters({ search: searchInput.trim() });
        }}
      >
        <div className="flex items-center border border-black/[0.1] dark:border-white/[0.1] rounded-md my-4 overflow-hidden w-full max-w-xl">
          <button
            type="submit"
            className="flex group items-center justify-center w-[80px] h-10 bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-gray-300 transition-all rounded-md shrink-0"
            aria-label={isFa ? "جستجو" : "Search"}
          >
            <Search className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all duration-300 text-gray-600" />
          </button>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            dir={isFa ? "rtl" : "ltr"}
            placeholder={isFa ? "جستجو در پروژه‌ها" : "Search projects"}
            className="flex-1 min-w-0 bg-transparent dark:placeholder:text-white/[0.3] border-none outline-none px-2 text-right placeholder:font-IRANSansXUltraLight font-IRANSansXRegular"
          />
        </div>
      </form>

      <div
        className={`flex gap-4 items-center justify-between w-full bg-slate-200 dark:bg-slate-900 p-3 max-lg:p-[6px] rounded-xl text-[12px] font-IRANSansXLight font-medium transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}
      >
        <div className="w-full pl-2 max-lg:hidden">
          {typeof resultCount === "number" && (
            <div>
              {isFa ? `نتیجه \u200E${resultCount}` : `Results ${resultCount}`}
            </div>
          )}
        </div>
        <div className="flex gap-3 sm:gap-4 items-center justify-end w-full">
          <ProjectsFilterDrawer />
          <button
            type="button"
            onClick={() => handleOrderChange("asc")}
            className={`p-2 rounded transition-colors ${order === "asc" ? "text-teal-600 font-IRANSansXRegular font-bold" : "text-black dark:text-white"}`}
          >
            {isFa ? "قدیمی‌ترین" : "Oldest"}
          </button>
          <button
            type="button"
            onClick={() => handleOrderChange("desc")}
            className={`p-2 rounded transition-colors ${order === "desc" ? "text-teal-600 font-IRANSansXRegular font-bold" : "text-black dark:text-white"}`}
          >
            {isFa ? "جدیدترین" : "Newest"}
          </button>
          <div className="flex items-center justify-center gap-2 shrink-0">
            <p className="font-IRANSansXMedium hidden sm:block">
              {isFa ? "ترتیب:" : "Sort:"}
            </p>
            <Layers className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="w-full lg:hidden text-[12px] mt-3 text-right flex items-center justify-end pr-1">
        {typeof resultCount === "number" && (
          <div className="font-IRANSansXLight">
            {isFa ? `نتیجه \u200E${resultCount}` : `Results ${resultCount}`}
          </div>
        )}
      </div>
    </div>
  );
}
