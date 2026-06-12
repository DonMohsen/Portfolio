"use client";

import { Square, SquareCheckBig } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { ProjectTypes } from "@prisma/client";
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

  const handleFilterClick = (type: ProjectTypes) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    router.replace(`/${locale}/projects?${params.toString()}`, {
      scroll: false,
    });
    onFilterApplied?.();
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    router.replace(`/${locale}/projects?${params.toString()}`, {
      scroll: false,
    });
    onFilterApplied?.();
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col font-IRANSansXMedium">
        <div className="flex items-center justify-between py-3">
          <p className="font-IRANSansXBold">
            {isFa ? "فیلترها" : "Filters"}
          </p>
          {activeType && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-teal-600 hover:underline font-IRANSansXRegular"
            >
              {isFa ? "پاک کردن" : "Clear"}
            </button>
          )}
        </div>

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
                  onChange={() => handleFilterClick(type)}
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
