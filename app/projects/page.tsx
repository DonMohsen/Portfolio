import ClientProjectCard from "@/components/Projects/client-project-card";
import { getAllProjects } from "../actions/getAllProjects";
import { Input, TextField } from "@mui/material";
import { ChartNoAxesColumn, Search, SlidersHorizontal } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardItem from "@/components/Projects/ProjectCardItem";

export default async function ProjectsPage() {


  const allProjects= await getAllProjects()

    return (
      <div className="min-h-[110vh] bg-white dark:bg-black">
        {/* //! The filtering section */}
        <div className="w-full mt-[100px] bg-white dark:bg-black  flex  flex-col px-[5%] mb-5">
        <div className="w-full  flex items-center justify-between ">
        <div className="flex  items-center border border-gray-400 py-2 rounded-full px-2 my-4">
          <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none outline-none px-2"
        />
      </div>
      <SlidersHorizontal
      className="cursor-pointer hover:scale-125 transition-all duration-300"
      />
     
        </div>
        <div className="w-full ">
        <p>
          34 results
        </p>
        </div>
        </div>
                {/* //! The Cards section */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white dark:bg-black px-5">
         {allProjects.map((project)=>(
            // <ClientProjectCard project={project} key={project.id}/>
          <ProjectCardItem project={project} key={project.id} />
          ))}
          {/* <ProjectCard projects={allProjects}/> */}
        </div>

      </div>
    );
  
}

export const dynamic = "force-dynamic"; // ✅ Ensures the page is always fresh (SSR)