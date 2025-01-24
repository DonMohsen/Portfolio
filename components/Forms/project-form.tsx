"use client"
import useProjectForm from "@/store/useProjectForm"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import {  ProjectTypesSchema } from '@/prisma/generated/zod/schemas'; // Adjust this based on your output folder

const FormSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    liveLink: z.string().url("Must be a valid URL"),
    image: z.string().url("Must be a valid URL"),
    competency: z.number().min(0).max(100, "Competency must be between 0 and 100"),
    projectType: z.enum(["Practice", "Production", "Prototype"]),
    githubLink: z.string().url("Must be a valid URL"),
    techStack: z.object({
      create: z.array(
        z.object({
          technologyId: z.number().nonnegative(),
          addedBy: z.string().nonempty(),
        })
      ),
    }),
  });
  type FormData = z.infer<typeof FormSchema>;
const ProjectForm = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
      });
      const onSubmit = (data: FormData) => {
        console.log(data);
      };
    const{isOpen,setFormState,toggleForm}=useProjectForm()
  return (
    
    <motion.div
    // onClick={()=>setFormState(false)}
    className="absolute w-full h-full bg-transparent z-[200000] flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}
        className="relative bg-slate-800 rounded-lg z-[200000]   h-[70%] w-[80%] flex items-center justify-center flex-col">
            <CircleX
                onClick={()=>setFormState(false)}
            className="absolute text-red-600 top-4 right-4 cursor-pointer hover:fill-red-50 " />
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          id="name"
          {...register('name')}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      
      <div>
        <label htmlFor="Description" className="block text-sm font-medium">Description</label>
        <input
          id="description"
          {...register('description')}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea
          id="message"
          {...register('message')}
          className="block w-full border rounded px-3 py-2"
        />

        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
            {/* <button 
            className="w-full bg-slate-900"
            onClick={()=>setFormState(false)}>
                change

            </button> */}
    </motion.div>
  )
}
export default ProjectForm


// {
//     "name": "School Management",
//     "description": "A project to showcase something awesome.",
//     "liveLink": "https://example.com",
//     "image": "https://res.cloudinary.com/dxqpnhucl/image/upload/v1737667453/Screenshot_2025-01-24_005321_tkidw9.png",
//     "competency": 60,
//     "projectType": "Practice",
//     "githubLink": "https://github.com/example/my-awesome-project",
//     "techStack": {
//       "create": [
//         {
//           "technologyId": 2,
//           "addedBy": "Mohsen"
//         },
//         {
//           "technologyId": 1,
//           "addedBy": "Mohsen"
//         }
//       ]
//     }
//   }
  