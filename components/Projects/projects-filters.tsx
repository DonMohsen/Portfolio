"use client";

import { Square, SquareCheckBig } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { ProjectIndustry, ProjectTypes } from "@prisma/client";
import {
  PROJECT_INDUSTRY_FILTERS,
  PROJECT_INDUSTRY_LABELS,
} from "@/lib/projects/project-industry-labels";
import {
  PROJECT_TYPE_FILTERS,
  PROJECT_TYPE_LABELS,
} from "@/lib/projects/project-type-labels";
import { cn } from "@/lib/utils";

type ProjectsFiltersProps = {
  className?: string;
  onFilterApplied?: () => void;
};

export default function ProjectsFilters({
  className,
  onFilterApplied,
}: ProjectsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isFa = locale === "fa";
  const activeType = searchParams.get("type");
  const activeIndustry = searchParams.get("industry");
  const featuredOnly =
    searchParams.get("featured") === "true" ||
    searchParams.get("featured") === "1";

  const replaceParams = (params: URLSearchParams) => {
    router.replace(`/${locale}/work?${params.toString()}`, {
      scroll: false,
    });
    onFilterApplied?.();
  };

  const handleIndustryClick = (industry: ProjectIndustry) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeIndustry === industry) {
      params.delete("industry");
    } else {
      params.set("industry", industry);
    }

    replaceParams(params);
  };

  const handleTypeClick = (type: ProjectTypes) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    replaceParams(params);
  };

  const toggleFeatured = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (featuredOnly) {
      params.delete("featured");
    } else {
      params.set("featured", "true");
    }

    replaceParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("industry");
    params.delete("featured");
    replaceParams(params);
  };

  const hasActiveFilters = Boolean(activeType || activeIndustry || featuredOnly);

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col font-IRANSansXMedium">
        <div className="flex items-center justify-between py-3">
          <p className="font-IRANSansXBold">
            {isFa ? "فیلترها" : "Filters"}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-teal-600 hover:underline font-IRANSansXRegular"
            >
              {isFa ? "پاک کردن" : "Clear"}
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground pb-2 font-IRANSansXRegular">
          {isFa ? "صنعت" : "Industry"}
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {PROJECT_INDUSTRY_FILTERS.map((industry) => {
            const labels = PROJECT_INDUSTRY_LABELS[industry];
            const isActive = activeIndustry === industry;

            return (
              <label
                key={industry}
                className="flex items-center gap-2 cursor-pointer justify-end py-1"
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleIndustryClick(industry)}
                  className="hidden"
                />
                <div className="shrink-0">
                  {isActive ? (
                    <SquareCheckBig className="text-black dark:text-white w-5 h-5" />
                  ) : (
                    <Square className="text-black dark:text-white w-5 h-5" />
                  )}
                </div>
                <span className="font-IRANSansXRegular">
                  {isFa ? labels.fa : labels.en}
                </span>
              </label>
            );
          })}
        </div>

        <label className="flex items-center gap-2 cursor-pointer justify-end py-1 mb-4 border-t border-black/[0.1] dark:border-white/[0.1] pt-3">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={toggleFeatured}
            className="hidden"
          />
          <div className="shrink-0">
            {featuredOnly ? (
              <SquareCheckBig className="text-black dark:text-white w-5 h-5" />
            ) : (
              <Square className="text-black dark:text-white w-5 h-5" />
            )}
          </div>
          <span className="font-IRANSansXRegular">
            {isFa ? "فقط ویژه" : "Featured only"}
          </span>
        </label>

        <p className="text-xs text-muted-foreground pb-2 font-IRANSansXRegular">
          {isFa ? "پیشرفته — نوع پروژه" : "Advanced — project type"}
        </p>
        <div className="flex flex-col gap-2">
          {PROJECT_TYPE_FILTERS.map((type) => {
            const labels = PROJECT_TYPE_LABELS[type];
            const isActive = activeType === type;

            return (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer justify-end py-1"
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleTypeClick(type)}
                  className="hidden"
                />
                <div className="shrink-0">
                  {isActive ? (
                    <SquareCheckBig className="text-black dark:text-white w-5 h-5" />
                  ) : (
                    <Square className="text-black dark:text-white w-5 h-5" />
                  )}
                </div>
                <span className="font-IRANSansXRegular">
                  {isFa ? labels.fa : labels.en}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
