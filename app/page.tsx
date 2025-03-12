import Hero from "@/components/Home/Hero/hero";
import { getTwoLatestProjects } from "./actions/getTwoLatestProjects";
import ProjectsDemo from "@/components/Home/ProjectsDemoSection/ProjectsDemo";
import AboutMe from "@/components/Home/AboutMe";
import PersonalCard from "@/components/personal-card";
//! 09jan : add grid acetirnity ui and infinite rolling then do the mobile footer,dark mode, hero.tsx ,header navigating
//! 10jan : build backend and create projects and routes tables, fetch them cliently
//!
//! the problem with mobile ham icon is that the animation of navbar, starts from right and make the width of all page twice as much fix this
export default async function Home() {
  const allProjects = await getTwoLatestProjects();
  return (
    <>
      <div className="flex w-full h-full max-md:flex-col">
        {/* Left Section - Sticky on large screens, normal on small screens */}
        <div className="md:w-[40%] h-[100vh]  lg:w-[40%] xl:w-[30%] md:h-screen max-md:h-[100vh] md:sticky max-md:relative top-0 shadow-lg dark:shadow-white/[0.4]">
          <PersonalCard />
        </div>

        {/* Right Section - Takes Remaining Space */}
        <div className="flex-1  p-4">
          <div className="  ">
            {/* <Hero /> */}
            <AboutMe/>
            <ProjectsDemo projects={allProjects} />
          </div>
        </div>
      </div>
    </>
  );
}
export const revalidate = 600;
