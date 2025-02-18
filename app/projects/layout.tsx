import ProjectsFilterNav from "@/components/Projects/projects-filter-nav";
import ProjectsHeader from "@/components/Projects/projects-header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "پروژه ها",
  description: "پروژه های تمرینی و واقعی محسن خجسته نژاد",
};

export default async function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex flex-row items-start justify-center px-5">
    <div className="flex-1 flex-shrink-0">
    <ProjectsHeader/>
      {children}
    </div>
    <div className="flex-1 flex-shrink-0 max-w-[275px] mt-[150px] max-lg:hidden">
      <ProjectsFilterNav />
    </div>
  </div>
    </>
  );
}