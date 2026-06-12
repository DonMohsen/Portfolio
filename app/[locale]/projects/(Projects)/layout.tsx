import { Suspense } from "react";
import ProjectsFilters from "@/components/Projects/projects-filters";
import type { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";
  return {
    title: isFa ? "پروژه‌های محسن خجسته نژاد" : "Projects | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "پروژه‌های تمرینی و واقعی محسن خجسته نژاد"
      : "Practice and production projects by Mohsen Khojasteh Nezhad.",
    alternates: {
      canonical: `/${locale}/projects`,
    },
  };
}

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row items-start justify-center px-5 mt-[100px] max-md:mt-[100px] gap-6">
      <div className="flex-1 min-w-0">{children}</div>
      <aside className="w-[275px] shrink-0 max-lg:hidden sticky top-[100px]">
        <Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-lg" />}>
          <ProjectsFilters />
        </Suspense>
      </aside>
    </div>
  );
}
