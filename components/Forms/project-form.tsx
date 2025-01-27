"use client";
import useProjectForm from "@/store/useProjectForm";
import { Controller, useForm } from "react-hook-form";
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
import TextField from "@mui/material/TextField";
import { InputBase, Slider, useTheme } from "@mui/material";

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
  const theme = useTheme();

  const { data, error, isLoading } = useQuery({
    queryKey: ["alltechs"],
    queryFn: fetchTechs,
  });
  const [imageURL, setImageURL] = useState("");
  const [techStack, setTechStack] = useState<Technology[]>([]);
  const [recievedTechStack, setRecievedTechStack] = useState<Technology[]>([]);

  const [creationLoading, setCreationLoading] = useState(false);
  useEffect(() => {
    project && setTechStack(project?.techStack.map((tech) => tech.technology));
    if (type === "post") {
      setTechStack([]);
    }
  }, [project]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = (formData: FormData) => {
    if (type==="post") {
      
    
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
  }
  else if (type==="put") {
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
        .put(`/api/project/${project?.id}`, formPayload)
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
 }
  }
  const handleUpload = (url: string) => {
    setImageURL(url); // Update local state
    setValue("image", url, { shouldValidate: true }); // Update React Hook Form state
  };
  useEffect(() => {
    if (project?.image&&type==="put") {
      setImageURL(project.image)
      console.log(imageURL,"urllllllllllllllllll");
      setValue("image", project?.image, { shouldValidate: true }); // Update React Hook Form state
    }
  

  }, [project,type])
  
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
    <div className="fixed w-full h-full bg-black bg-opacity-75 top-0 z-[200000]  flex items-center justify-center overflow-hidden">
      <div
        onClick={() => setFormState(false)}
        className="w-full h-full bg-transparent absolute "
      ></div>

      <motion.form
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        // exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        key="projectform"
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white sm:rounded-lg dark:bg-[#271731]    h-[85%] w-[80%] max-md:w-full max-md:h-[100%] flex items-center justify-start flex-col pt-10 md:px-10 max-md:px-2"
      >
        <CircleX
          onClick={() => setFormState(false)}
          className="absolute text-red-600 top-4 right-4 cursor-pointer hover:fill-red-50 "
        />
        <div className="flex items-start w-full min-h-[100px] gap-5 justify-between h-[150px] max-sm:h-[90px] ">
          {/* //!the image upload */}
          <div className="relative w-[50%] h-full bg-black bg-opacity-10">
            <div className="w-full h-full bg-purple-500 absolute opacity-0  z-[100]">
              <CloudinaryUploadButton onUpload={handleUpload} />
            </div>
            <img
              src={
                imageURL ||
                (type === "put" && project?.image) ||
                `/image-placeholder.webp`
              }
              alt="Project img"
              className="w-full h-full max-w-[400px] min-h-[100px] rounded-xl object-cover absolute z-[50] "
            />
          </div>
          {/* //!Enum project types */}
          <div className="w-full py-10 px-2">
           
      

            {errors.projectType && (
              <p className="text-red-500 text-sm">
                {errors.projectType.message}
              </p>
            )}
          <div className=" w-full flex flex-col items-start justify-start h-full  ">
           <p>
            Competency
           </p>
           <Controller
           defaultValue={type==="put"?project?.competency:0}
  name="competency"
  control={control}
  render={({ field }) => (
    <Slider
      {...field}
      value={field.value} // Bind the value directly to the form state
      onChange={(_, value) => field.onChange(value)} // Update the form state when slider value changes
      aria-label="Competency Slider"
      valueLabelDisplay="auto"
    />
  )}
/>
           </div>
           <div className="w-full  flex-col flex items-end justify-center gap-2  ">

           <p className="text-xs m-1">

           Project type
           </p>
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
              </div>
          </div>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
        <div className="sm:flex w-full  sm:items-center sm:justify-between mt-10 gap-10">
          <div>
            <TextField
              sx={{
                // Input text color (ensure it overrides all styles)
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                },
                // Placeholder text color
                "& .MuiInputBase-input::placeholder": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                  opacity: 0.7,
                },
                // Label color
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                // Border colors
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
              }}
              helperText={errors?.name?.message}
              error={!!errors.name}
              {...register("name")}
              defaultValue={(type === "put" && project?.name) || ""}
              id="name"
              label="Name"
              variant="outlined"
            />
          </div>
          <div className="w-full max-sm:pt-5 ">
            <TextField
            className="w-full"
              sx={{
                // Input text color (ensure it overrides all styles)
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                },
                // Placeholder text color
                "& .MuiInputBase-input::placeholder": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                  opacity: 0.7,
                },
                // Label color
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                // Border colors
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
              }}
              helperText={errors?.description?.message}
              error={!!errors.description}
              {...register("description")}
              defaultValue={(type === "put" && project?.description) || ""}
              id="description"
              label="Description"
              variant="outlined"
              multiline
            />
          </div>
        </div>
            <div className="sm:flex gap-10 sm:justify-between w-full sm:mt-10 ">

            <div className="w-full max-sm:pt-5 ">
            <TextField
            className="w-full"
              sx={{
                // Input text color (ensure it overrides all styles)
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                },
                // Placeholder text color
                "& .MuiInputBase-input::placeholder": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                  opacity: 0.7,
                },
                // Label color
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                // Border colors
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
              }}
              helperText={errors?.liveLink?.message}
              error={!!errors.liveLink}
              {...register("liveLink")}
              defaultValue={(type === "put" && project?.liveLink) || ""}
              id="livelink"
              label="Live link"
              variant="outlined"
              
            />
          </div>
          <div className="w-full max-sm:pt-5 ">
            <TextField
            className="w-full"
              sx={{
                // Input text color (ensure it overrides all styles)
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                },
                // Placeholder text color
                "& .MuiInputBase-input::placeholder": {
                  color:
                    theme.palette.mode === "dark"
                      ? "white !important"
                      : "inherit",
                  opacity: 0.7,
                },
                // Label color
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.mode === "dark" ? "white" : "inherit",
                },
                // Border colors
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "inherit",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      theme.palette.mode === "dark" ? "white" : "inherit",
                  },
              }}
              helperText={errors?.githubLink?.message}
              error={!!errors.githubLink}
              {...register("githubLink")}
              defaultValue={(type === "put" && project?.githubLink) || ""}
              id="githubLink"
              label="Github link"
              variant="outlined"
              
            />
          </div>
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
          {isLoading&&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl px-4 py-1 bg-gray-300 animate-pulse"
            >
              <div className="flex gap-2 items-center justify-center h-[30px] w-[90px]">
                {/* <div className="w-8 h-8 bg-gray-400 rounded-full"></div> */}
              </div>
            </div>
          ))
          }
          {data?.map((tech) => (
            <div
              key={tech.id}
              onClick={() => handleTechClick(tech)}
              className={clsx(
                `rounded-3xl px-4 py-1 max-md:text-sm max-md:px-3 max-md:py-1 cursor-pointer hover:brightness-50 `,
                techStack.some((item) => item.id === tech.id)
                  ? "bg-black"
                  : "bg-slate-600"
              )}
            >
              <div className="flex gap-2 items-center justify-center">
                <img className="w-8 h-8 max-md:w-5 max-md:h-5" src={tech.imageUrl} alt={tech.name} />
                {tech.name}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
       
      {errors.competency && (
        <p className="text-red-500 text-sm">{errors.competency.message}</p>
      )}
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
        <div>{recievedTechStack.map((tech) => tech.name)}</div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 w-full text-white rounded hover:bg-blue-700"
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
