import Hero from "@/components/Home/Hero/hero";
import { getTwoLatestProjects } from "./actions/getTwoLatestProjects";
import ProjectsDemo from "@/components/Home/ProjectsDemoSection/ProjectsDemo";

//! 09jan : add grid acetirnity ui and infinite rolling then do the mobile footer,dark mode, hero.tsx ,header navigating
//! 10jan : build backend and create projects and routes tables, fetch them cliently
//!
//! the problem with mobile ham icon is that the animation of navbar, starts from right and make the width of all page twice as much fix this
export const revalidate = 0;

export default async function Home() {
const allProjects=await getTwoLatestProjects();
  return (
   <div className="  ">
   <Hero/>
   <ProjectsDemo projects={allProjects}/>
  
   </div>
  );
}