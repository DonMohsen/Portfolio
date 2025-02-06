import ClientProjectCard from "@/components/Projects/client-project-card";
import { getAllProjects } from "../actions/getAllProjects";

export default async function ProjectsPage() {


  const allProjects= await getAllProjects()

    return (
      <div className="min-h-[110vh]">
        {/* //! The filtering section */}
        <div>

        </div>
                {/* //! The Cards section */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {allProjects.map((project)=>(

           <ClientProjectCard project={project} key={project.id}/>
         ))}
        </div>

      </div>
    );
  
}
