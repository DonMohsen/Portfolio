"use client";
import useProjectForm from "@/store/useProjectForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { motion } from "framer-motion";
import CloudinaryUploadButton from "../CloudinaryUploadButton";
import React, { useEffect, useState } from "react";
import { ProjectTypes, Technology } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ProjectFormProps } from "@/app/Types/PropsTypes";

const FormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  liveLink: z.string().url("Must be a valid URL"),
  image: z.string().url("No image found"),
  competency: z
    .number()
    .min(0)
    .max(100, "Competency must be between 0 and 100"),
  projectType: z.enum([
    ProjectTypes.Copy,
    ProjectTypes.Forked,
    ProjectTypes.Practice,
    ProjectTypes.Real,
  ]),
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
const ProjectForm: React.FC<ProjectFormProps> = ({ type, project }) => {
  async function fetchTechs(): Promise<Technology[]> {
    const response = await axios.get("/api/technologies");
    return response.data;
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["alltechs"],
    queryFn: fetchTechs,
  });
  const [imageURL, setImageURL] = useState("");
  const [techStack, setTechStack] = useState<Technology[]>([]);
  const [recievedTechStack, setRecievedTechStack] = useState<Technology[]>([]);

  const [creationLoading, setCreationLoading] = useState(false);
  useEffect(() => {
    project&&
      setTechStack( project?.techStack.map((tech)=>tech.technology))
if (type==='post') {
  setTechStack([])
}
  }, [project]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = (formData: FormData) => {
    try {
      const techStackToSubmit = techStack.map((tech) => ({
        technologyId: tech.id,
        addedBy: tech.name,
      }));

      const formPayload = {
        ...formData,
        techStack: {
          create: techStackToSubmit,
        },
      };

      console.log(formPayload);
      setCreationLoading(true);
      axios
        .post("/api/project/create", formPayload)
        .then((response) => {
          console.log("Project submitted:", response);
        })
        .catch((error) => {
          console.error("Error submitting project:", error);
        })
        .finally(() => {
          setCreationLoading(false);
        });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handleUpload = (url: string) => {
    setImageURL(url); // Update local state
    setValue("image", url, { shouldValidate: true }); // Update React Hook Form state
  };
  useEffect(() => {
    // Map through the selected technologies and update the form field 'techStack'
    const techStackToSubmit = techStack.map((tech) => ({
      technologyId: tech.id,
      addedBy: "Mohsen", // Static value for addedBy
    }));

    setValue("techStack.create", techStackToSubmit, { shouldValidate: true });
  }, [techStack, setValue]);

  const { isOpen, setFormState, toggleForm } = useProjectForm();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset to default
    }
  }, [isOpen]);

  const handleTechClick = (tech: Technology) => {
    setTechStack((prevStack) => {
   
      if (prevStack.some((item) => item.id === tech.id)) {
        // If the tech item is already in the stack, remove it
        return prevStack.filter((item) => item.id !== tech.id);
      } else {
        // Otherwise, add the tech item to the stack
        return [...prevStack, tech];
      }
    });
  };
  // useEffect(() => {
  //   console.log(techStack);
  // }, [techStack]);

  return (
    <div className="fixed w-full h-full bg-transparent top-0 z-[200000]  flex items-center justify-center overflow-hidden">
      <div
        onClick={() => setFormState(false)}
        className="w-full h-full bg-transparent absolute "
      ></div>

      <motion.form
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        key="projectform"
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-slate-800 rounded-lg    h-[70%] w-[80%] max-sm:w-full max-sm:h-[85%] flex items-center justify-start flex-col pt-10 md:px-10 max-md:px-2"
      >
        <CircleX
          onClick={() => setFormState(false)}
          className="absolute text-red-600 top-4 right-4 cursor-pointer hover:fill-red-50 "
        />
        <div className="flex items-start w-full min-h-[100px] gap-5 justify-between h-[150px] max-sm:h-[90px] ">
          {/* //!the image upload */}
          <div className="relative w-[50%] h-full">
            <div className="w-full h-full bg-purple-500 absolute opacity-0  z-[100]">
              <CloudinaryUploadButton onUpload={handleUpload} />
            </div>
            <img
              src={imageURL||type==='put'&& project?.image  || `/image-placeholder.webp`}
              alt="Uploaded"
              className="w-full h-full max-w-[400px] min-h-[100px] rounded-xl object-cover absolute z-[50] "
            />
          </div>
          {/* //!Enum project types */}
          <div>
            <select
              id="status"
              {...register("projectType", { required: "Status is required" })}
            >
              {Object.values(ProjectTypes).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.projectType && (
              <p className="text-red-500 text-sm">
                {errors.projectType.message}
              </p>
            )}
          </div>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        <div>
          <label htmlFor="name" className="block text-sm w-full font-medium">
            Name
          </label>
          <input
            defaultValue={type==="put"&& project?.name||""}
            id="name"
            {...register("name")}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="Description" className="block text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            {...register("description")}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="livelink" className="block text-sm font-medium">
            Live link
          </label>
          <input
            id="livelink"
            {...register("liveLink")}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.liveLink && (
            <p className="text-red-500 text-sm">{errors.liveLink.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="githubLink" className="block text-sm font-medium">
            githubLink
          </label>
          <input
            id="githubLink"
            {...register("githubLink")}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.githubLink && (
            <p className="text-red-500 text-sm">{errors.githubLink.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="competency" className="block text-sm font-medium">
            Competency
          </label>
          <input
            type="number"
            id="competency"
            {...register("competency", {
              required: "Competency is required",
              valueAsNumber: true, // Ensures that input is treated as a number
              min: {
                value: 0,
                message: "Competency must be a positive number",
              },
              max: { value: 100, message: "Competency cannot exceed 100" },
            })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.competency && (
            <p className="text-red-500 text-sm">{errors.competency.message}</p>
          )}
        </div>

        <div>
          <input
            type="hidden"
            id="image"
            value={imageURL}
            {...register("image", {
              required: "Image URL is required",
            })}
            readOnly
            className="block w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex max-w-[100%] flex-wrap text-center items-center justify-center gap-4 mt-5">
          {data?.map((tech) => (
            <div
            key={tech.id}
              onClick={() => handleTechClick(tech)}
              className={clsx(
                `rounded-3xl px-4 py-1 cursor-pointer hover:brightness-50 `,techStack.some((item) => item.id === tech.id)
                  ? "bg-black"
                  : "bg-slate-600"
              )}
            >
              {tech.name}
            </div>
          ))}
        </div>
        <div className="mt-4">
          {/* <label htmlFor="techStack" className="block text-sm font-medium">
            Selected Technologies
          </label> */}
          {/* {project?.techStack.map((tech)=>tech.technology.name).join(", ")} */}
          <input
            // defaultValue={project?.techStack
            //   .map((tech) => tech.technology.name)
            //   .join(", ")}
            id="techStack"
            value={techStack.map((tech) => tech.name).join(", ")} // Display selected tech names
            disabled
            className=" w-full border rounded px-3 py-2 hidden"
          />
          {errors.techStack && (
            <p className="text-red-500 text-sm">{errors.techStack.message}</p>
          )}
        </div>
        <div>
        {recievedTechStack.map((tech)=>(
          tech.name
        ))}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {creationLoading ? "loading" : "submit"}
        </button>
      </motion.form>
    </div>
  );
};
export default ProjectForm;
//!  1.style for deployment ready app(form,buttons,...)                                   2        
//!  2.ask before close or save                                                           1.5
//!  3.behavior after saved                                                               1.5
//!  4.loading state of forms                                                             2
//!  5.simple auth without 0auth etc... just protect admin                                2
//!  6.Projects page with client side loading                                             2
//!  7.projects/[id] and style                                                            2
//!  8.why images dont load?????????????????                                              1.5
//!  9.desktop header fix and style                                                       1.5
//!  10.Create navigation tool (?page=1&s=react) and filtering the projects Not cliently  4


//!  All       In           25  Jan                                                       20