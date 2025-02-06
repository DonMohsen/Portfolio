import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import useProjectForm from "@/store/useProjectForm";
import ProjectForm from "../Modals/project-form";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ConfirmModal, { ModalEnum } from "../Modals/confirm-modal";
import useConfirmModal from "@/store/useConfirmModal";
import { useToast } from "@/hooks/use-toast";
// export type ProjectsWithTechsType = Projects & {
//   techStack: {
//     technology: {
//       name: string,
//       image:string
//     };
//   }[];
// };
const AdminAllCards = () => {
  const [formType, setFormType] = useState<"put" | "post" | "delete">("put");
  const [currentProject, setCurrentProject] = useState<ProjectsWithTechsType>();
  const { isOpen, setFormState, toggleForm } = useProjectForm();
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<
    number | undefined
  >();
  const { toast } = useToast(); // Access the toast function

  async function fetchProjects(): Promise<ProjectsWithTechsType[]> {
    const response = await axios.get("/api/project");
    return response.data;
  }
  const { isModalOpen, setModalState, toggleModal } = useConfirmModal();

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchProjects,
  });
  const openTheForm = (id: number) => {
    data?.map((project) => {
      project.id === id && setCurrentProject(project);
    });
    console.log(currentProject);
    setFormType("put");
    console.log(isOpen);
    setFormState(true);
  };
  const handleAddProject = () => {
    setFormType("post");
    setFormState(true);
  };
  const handleDeleteProject = async () => {
    try {
      setDeletionLoading(true);

      const deletedProject = await axios
        .delete(`/api/project/${deletingProjectId}`)

        .then((response) => {
          const deletedProjectData = response.data.deleted;

          toast({
            title: "Success",
            description: ` ${deletedProjectData.name} successfully deleted! 🎉`,
          });
          console.log("Project deleted:", response);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `Failed to delete project. Please try again.`,
            variant: "destructive",
          });
          console.error("Error deleting project:", error);
        })
        .finally(() => {
          setDeletionLoading(false);
          setModalState(false);
        });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error in form deleting:", error);
      setDeletionLoading(false);
      setModalState(false);
    }
  };
  const handleOpenForm = (id: number) => {
    setFormType("put");
    openTheForm(id);
  };
  const handleDeleteButton = async (id: number) => {
    setFormType("delete");
    setDeletingProjectId(id);
    setModalState(true);
  };
  return (
    <div className="min-h-[110vh] gap-4 flex flex-col items-center justify-center  pt-[150px]">
      <Button
        className="bg-green-400 hover:bg-green-300 w-[50%] float items-center justify-center"
        onClick={handleAddProject}
      >
        Add
      </Button>

      <AnimatePresence>
        {isOpen === true && (
          <ProjectForm type={formType} project={currentProject} />
        )}
      </AnimatePresence>
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full dark:bg-[#0d0d0d] bg-[#ececec] h-full flex-col items-center justify-center animate-pulse"
          >
            <div className="w-full flex items-center justify-start">
              <div className="w-[300px] bg-opacity-5 dark:bg-opacity-5 rounded-[15px] mx-3 min-w-[300px] max-sm:w-[200px] max-sm:min-w-[200px] flex min-h-[100px] h-[100px] md:h-[200px] sm:min-h-[200px]">
                <div className="w-full h-full bg-gray-300 rounded-md"></div>
              </div>
              <div className="px-3 font-bold w-full h-4 bg-gray-300 rounded"></div>
              <div className="flex max-sm:hidden gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex w-full gap-4 items-center justify-end pr-5">
                <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="md:hidden font-bold pl-10 bg-gray-300 h-4 rounded"></div>
          </div>
        ))}
      {isModalOpen && formType === "delete" && (
        <ConfirmModal
          description="This actions cannot be undone"
          onSubmit={handleDeleteProject}
          title="Delete this project"
          type={ModalEnum.Delete}
          submitText="Delete forever"
          isLoading={deletionLoading}
        />
      )}
      {data?.map((project) => (
        <div
          className=" w-full dark:bg-[#0d0d0d] bg-[#ececec]  h-full flex-col items-center justify-center  "
          key={project.id}

          // href={`/Projects/${project.id}`}
        >
          <div className="w-full flex items-center justify-start ">
            <div className="w-[300px]  bg-opacity-5  dark:bg-opacity-5 rounded-[15px] mx-3 min-w-[300px] max-sm:w-[200px] max-sm:min-w-[200px] flex min-h-[100px] h-[100px] md:h-[200px] sm:min-h-[200px]">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.name} image`}
                  width={1919}
                  height={975}
                  quality={100}
                  priority={true}
                  className=" p-3 transition-all duration-500 w-full h-full object-contain z-20  "
                />
              )}
            </div>
            <div className="px-3 font-bold w-full truncate max-md:hidden">
              {project.name}
            </div>
            <div className="flex max-sm:hidden">
              {project.techStack.slice(0, 2).map((tech, _index) => (
                <div
                  key={tech.technology.id}
                  style={{
                    transform: `translateX(-${_index * 10}px)`, // Dynamic translation
                  }}
                  className="w-10 h-10 dark:bg-black bg-white border dark:border-white/[.2] border-black/[.2] top-0 right-0 rounded-full z-0 flex items-center justify-center"
                >
                  <img
                    src={tech.technology.imageUrl}
                    alt={`${tech.technology.name} image`}
                    className="w-8 h-8 dark:text-white z-10"
                  />
                </div>
              ))}
              {/* Display "+N" if there are more than 2 items */}
              {project.techStack.length > 2 && (
                <div
                  style={{
                    transform: `translateX(-${2 * 10}px)`, // Adjust based on position
                  }}
                  className="w-10 h-10 dark:bg-black bg-white border dark:border-white/[.2] border-black/[.2] top-0 right-0 rounded-full z-0 flex items-center justify-center"
                >
                  <span className="text-sm font-semibold dark:text-white text-black">
                    +{project.techStack.length - 2}
                  </span>
                </div>
              )}
            </div>
            <div className=" flex w-full gap-4 items-center justify-end pr-5 ">
              <Button
                onClick={() => handleOpenForm(project.id)}
                className="bg-blue-500 hover:bg-blue-400"
              >
                <Pencil />
              </Button>
              <Button
                onClick={() => handleDeleteButton(project.id)}
                className="bg-red-500 hover:bg-red-400"
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="md:hidden font-bold pl-10">{project.name}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminAllCards;
