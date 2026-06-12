"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { SlidersHorizontal } from "lucide-react";
import { useLocale } from "next-intl";
import ProjectsFilters from "./projects-filters";

export default function ProjectsFilterDrawer() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="lg:hidden p-1 hover:scale-110 transition-transform duration-200"
          aria-label={isFa ? "باز کردن فیلترها" : "Open filters"}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-[101] mt-24 flex max-h-[85vh] flex-col rounded-t-[16px] border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-black outline-none">
          <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="overflow-y-auto px-4 pb-8 pt-2">
            <Drawer.Title className="sr-only">
              {isFa ? "فیلتر پروژه‌ها" : "Project filters"}
            </Drawer.Title>
            <ProjectsFilters onFilterApplied={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
