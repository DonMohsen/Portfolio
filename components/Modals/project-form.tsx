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
import ConfirmModal, { ModalEnum } from "./confirm-modal";
import useConfirmModal from "@/store/useConfirmModal";
import ButtonLoading from "../Loadings/button-loading";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  liveLink: z.string().url("Must be a valid URL"),
  image: z.string().url("No image found"),
  competency: z
    .number()
    .min(1, "Competency must be a percentage 1-100")
    .max(100, "Competency must be a percentage 1-100"),
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
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  // const askFromModal = () => {
  //   setModalState(true);
  // };
 const askFromModal = async () => {
    // Trigger form validation
    const isValid = await handleSubmit((data) => {
      setFormData(data); // Set form data if valid
      setModalState(true); // Open the modal
    }, (errors) => {
      // Handle validation errors
      console.error("Validation errors:", errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
    })();
  
    // If the form is valid, the modal will open automatically
  };
  
  const [formData, setFormData] = useState<FormData | null>(null);

  const { toast } = useToast(); // Access the toast function
  //!new code.............................................
  const handleFormSubmission = () => {
    // This function will be called when modal is confirmed
    if (!formData) return; // formData should come from your form state
  
    const submitHandler = () => {
      const techStackToSubmit = techStack.map((tech) => ({
        technologyId: tech.id,
        addedBy: tech.name,
      }));
  
      const formPayload = {
        ...formData,
        techStack: { create: techStackToSubmit },
      };
  
      setCreationLoading(true);
  
      const apiCall = type === "post" 
        ? axios.post("/api/project/create", formPayload)
        : axios.put(`/api/project/${project?.id}`, formPayload);
  
      apiCall
        .then((response) => {
          toast({
            title: "Success",
            description: `Project successfully ${type === "post" ? "created" : "updated"}! 🎉`,
          });
          console.log("Project submitted:", response);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `Failed to ${type === "post" ? "create" : "update"} project. Please try again.`,
            variant: "destructive",
          });
          console.error("Error submitting project:", error);
        })
        .finally(() => {
          setCreationLoading(false);
          setModalState(false);
          reset(); // If using form reset
        });
    };
  
    // Execute the submission logic
    try {
      submitHandler();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error in form submission:", error);
      setCreationLoading(false);
      setModalState(false);
    }
  };
  
  const onSubmit = (formData: FormData) => {
  
    if (type === "post") {
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
  
        setCreationLoading(true);
  
        axios
          .post("/api/project/create", formPayload)
          .then((response) => {
            toast({
              title: "Success",
              description: "Project successfully created! 🎉",
            });
            console.log("Project submitted:", response);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to create project. Please try again.",
              variant: "destructive", // Red styling for errors
            });
            console.error("Error submitting project:", error);
          })
          .finally(() => {
            setCreationLoading(false);
            setModalState(false);
          });
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        console.error("Error in form submission:", error);
      }
    } else if (type === "put") {
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
  
        setCreationLoading(true);
  
        axios
          .put(`/api/project/${project?.id}`, formPayload)
          .then((response) => {
            toast({
              title: "Success",
              description: "Project successfully updated! 🎉",
            });
            console.log("Project submitted:", response);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to update project. Please try again.",
              variant: "destructive",
            });
            console.error("Error submitting project:", error);
          })
          .finally(() => {
            setCreationLoading(false);
            setModalState(false);
          });
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        console.error("Error in form submission:", error);
      }
    }
  };
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
      "& fieldset": {
        borderColor: theme.palette.mode === "dark" ? "#4B5563" : "#D1D5DB",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.mode === "dark" ? "#9333ea" : "#9333ea",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#9333ea",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.mode === "dark" ? "#9CA3AF" : "#6B7280",
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-1.5rem",
    }
  };
  
  const handleUpload = (url: string) => {
    setImageURL(url); // Update local state
    setValue("image", url, { shouldValidate: true }); // Update React Hook Form state
  };
  useEffect(() => {
    if (project?.image && type === "put") {
      setImageURL(project.image);
      setValue("image", project?.image, { shouldValidate: true }); // Update React Hook Form state
    }
  }, [project, type]);

  useEffect(() => {
    // Map through the selected technologies and update the form field 'techStack'
    const techStackToSubmit = techStack.map((tech) => ({
      technologyId: tech.id,
      addedBy: "Mohsen", // Static value for addedBy
    }));

    setValue("techStack.create", techStackToSubmit, { shouldValidate: true });
  }, [techStack, setValue]);

  const { isOpen, setFormState, toggleForm } = useProjectForm();
  const { isModalOpen, setModalState, toggleModal } = useConfirmModal();
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

  const handleClickOutsideOfForm = () => {
    isModalOpen ? setModalState(false) : setFormState(false);
  };
  return (
    <div className="fixed  w-full h-full bg-black bg-opacity-75 top-0 z-[20000]  flex items-center justify-center overflow-hidden">
      <div
        onClick={handleClickOutsideOfForm}
        className="w-full h-full bg-transparent absolute "
      ></div>

<motion.form
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  key="projectform"
  onSubmit={handleSubmit(onSubmit)}
  className="relative bg-white dark:bg-[#271731] rounded-2xl shadow-xl h-[85vh] w-full max-w-3xl mx-4 flex flex-col items-center p-6 space-y-6 overflow-y-auto"
>
  <CircleX
    onClick={handleClickOutsideOfForm}
    className="absolute text-red-500 top-4 right-6 cursor-pointer hover:text-red-600 transition-colors w-8 h-8"
  />

  {/* Image Upload & Project Type Section */}
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Image Upload */}
    <div className="relative group aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg">
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
        <CloudinaryUploadButton onUpload={handleUpload} />
        <span className="text-white font-medium">Upload Image</span>
      </div>
      <img
        src={imageURL || (type === "put" && project?.image) || `/image-placeholder.webp`}
        alt="Project preview"
        className="w-full h-full object-cover absolute z-0"
      />
    </div>

    {/* Competency & Project Type */}
    <div className="space-y-6">
      {/* Competency Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Competency Level
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {watch('competency')}%
          </span>
        </div>
        <Controller
        defaultValue={type==="put"?project?.competency:0}
          name="competency"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              className="text-primary"
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : '#9333ea',
                '& .MuiSlider-thumb': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#9333ea',
                }
              }}
            />
          )}
        />
        {errors.competency && (
          <p className="text-red-500 text-sm mt-1">{errors.competency.message}</p>
        )}
      </div>

      {/* Project Type Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Type
        </label>
        <select
        defaultValue={type==="put"?project?.projectType:"Practice"}
          id="projectType"
          {...register("projectType")}
          className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        >
          {Object.values(ProjectTypes).map((type) => (
            <option key={type} value={type} className="dark:bg-gray-800">
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
        )}
      </div>
    </div>
  </div>

  {/* Name & Description Fields */}
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
    <TextField
    defaultValue={type==="put"?project?.name:""}
      fullWidth
      label="Project Name"
      error={!!errors.name}
      helperText={errors?.name?.message}
      sx={{ 
        ...textFieldStyles,
        mb: 0 
      }}
      {...register("name")}
    />
    <TextField
    defaultValue={type==="put"?project?.description:""}
      fullWidth
      label="Description"
      multiline
      rows={3}
      error={!!errors.description}
      helperText={errors?.description?.message}
      sx={textFieldStyles}
      {...register("description")}
    />
  </div>

  {/* Links Section */}
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
    <TextField
    defaultValue={type==="put"?project?.liveLink:""}
      fullWidth
      label="Live URL"
      error={!!errors.liveLink}
      helperText={errors?.liveLink?.message}
      sx={textFieldStyles}
      {...register("liveLink")}
    />
    <TextField
    defaultValue={type==="put"?project?.githubLink:""}
      fullWidth
      label="GitHub URL"
      error={!!errors.githubLink}
      helperText={errors?.githubLink?.message}
      sx={textFieldStyles}
      {...register("githubLink")}
    />
  </div>

  {/* Tech Stack Section */}
  <div className="w-full space-y-4">
    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
      Select Technologies
    </h3>
    <div className="flex flex-wrap gap-3">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        ))
      ) : data?.map((tech) => (
        <motion.div
          key={tech.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTechClick(tech)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors",
            techStack.some(t => t.id === tech.id)
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          )}
        >
          <img
            src={tech.imageUrl}
            alt={`${tech.name} image`}
            className="w-6 h-6 object-contain"
          />
          <span className="text-sm">{tech.name}</span>
        </motion.div>
      ))}
    </div>
    {errors.techStack && (
      <p className="text-red-500 text-sm mt-1">{errors.techStack.message}</p>
    )}
  </div>

  {/* Submit Button */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="button"
    onClick={askFromModal}
    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
  >
    {type === "post" ? "Create Project" : "Save Changes"}
  </motion.button>

  {isModalOpen && (
    <ConfirmModal
      type={type === "post" ? ModalEnum.Add : ModalEnum.Update}
      title={type === "post" ? "Create Project" : "Edit Project"}
      description={`Are you sure you want to ${type === "post" ? "create" : "update"} this project?`}
      onSubmit={handleFormSubmission}
      isLoading={creationLoading}
      submitText={type === "post" ? "Create" : "Save Changes"}
    />
  )}
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
