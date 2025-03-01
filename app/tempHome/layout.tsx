import Presentation from "@/components/Home/Presentation";
import ProjectsDemo from "@/components/Home/ProjectsDemoSection/ProjectsDemo";
import ProjectsFilterNav from "@/components/Projects/projects-filter-nav";
import ProjectsHeader from "@/components/Projects/projects-header";
import type { Metadata } from "next";
import { getTwoLatestProjects } from "../actions/getTwoLatestProjects";
import PersonalCard from "@/components/personal-card";
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const allProjects=await getTwoLatestProjects();
  
  return (
    <>
<div className="flex w-full h-full max-md:flex-col">
  {/* Left Section - Sticky on large screens, normal on small screens */}
  <div className="md:w-[40%] h-[100vh]  lg:w-[40%] xl:w-[30%] md:h-screen max-md:h-[100vh] md:sticky max-md:relative top-0 shadow-lg">
    <PersonalCard />
  </div>

  {/* Right Section - Takes Remaining Space */}
  <div className="flex-1 bg-pink-700 min-h-[300vh] p-4">
    {children}
  </div>
</div>


    </>
  );
}