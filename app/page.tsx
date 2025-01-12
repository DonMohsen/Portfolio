import Hero from "@/components/Home/Hero/hero";

//! 09jan : add grid acetirnity ui and infinite rolling then do the mobile footer,dark mode, hero.tsx ,header navigating
//! 10jan : build backend and create projects and routes tables, fetch them cliently
//!
//! the problem with mobile ham icon is that the animation of navbar, starts from right and make the width of all page twice as much fix this
export default function Home() {
 
  return (
   <div className="  h-[110vh]">
   <Hero/>
  
   </div>
  );
}