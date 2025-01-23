import { Projects } from "@prisma/client"
import Image from "next/image"

const ProjectsDemo = ({projects}:{projects:Projects[]}) => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-slate-100 dark:bg-[#160d1c] px-[20%] max-sm:px-[10%]">
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="font-extrabold text-[40px] tracking-wider">My latest projects</div>
      <p className="pt-10">
        Here are some projects built by me Mohsen Khojasteh Nejad. Feel free
        to check the source code and the live website if available, and do not forget to give the ones you liked a star on GitHub!
      </p>
    </div>
    <div className="w-full h-full bg-white dark:bg-black grid grid-cols-2 rounded-[15px] max-lg:grid-cols-1 gap-4 p-4">
      {projects.map((project)=>(
      <div key={project.id} className="bg-purple-500 text-white flex flex-col items-center justify-center p-4 rounded-[10px]">
        {project.image&&
        <Image
        src={project.image} 
        
        alt={project.name}
        width={1919}              // Width for large screens (adjust as needed)
        height={975}             // Height for large screens (adjust as needed)
        quality={100}            // Ensure high quality (0-100, where 100 is the highest)
        priority={true}          // Optionally mark the image as high-priority if it's above the fold
        layout="responsive"    
         />     }
        {project.name}
    </div>
      ))}
     
    </div>
  </div>
  
  )
}

export default ProjectsDemo