"use client";
import { ArrowRight, Github, LucideLink } from "lucide-react";
import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import useShowHeader from "@/store/useShowHeader";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Projects } from "@prisma/client";
import { techColors } from "./client-project-card";
import { useTheme } from "next-themes";
import CompetencyCircle from "../CompetencyMeter";
import { LinkPreview } from "../ui/link-preview";

const ProjectDetails = ({ project }: { project: ProjectsWithTechsType }) => {
  console.log(project);

  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

  // Refs for different sections (Fixed TypeScript Error)
  const imagesRef = useRef<HTMLDivElement>(null!);
  const specificationsRef = useRef<HTMLDivElement>(null!);
  const linksRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();
  // Function to smoothly scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 70, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    setActiveSection("images");
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 75; // Adjusted for header

      const sectionPositions = [
        { id: "images", ref: imagesRef },
        { id: "specifications", ref: specificationsRef },
        { id: "links", ref: linksRef },
      ];

      for (const section of sectionPositions) {
        if (
          section.ref.current &&
          scrollPosition >= section.ref.current.offsetTop &&
          scrollPosition <
            section.ref.current.offsetTop + section.ref.current.clientHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle sticky header visibility on scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const handleImageOpening = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-[400dvh] mt-[70px] max-w-4xl flex flex-col items-center w-full">
      {/* Image Container */}
      <div
        ref={imagesRef}
        className="w-full max-md:h-[400px] h-[550px] relative"
      >
        {/* Skeleton Loader */}
        <div className="z-10 bg-slate-300 animate-pulse absolute w-full h-full rounded-[8px]"></div>

        {/* Clickable Image */}
        <Image
          width={1920}
          height={400}
          src={project.image || "/image-placeholder.webp"}
          alt={`${project.name} image`}
          className="absolute w-full h-full object-cover z-20 rounded-[8px] cursor-pointer"
          onClick={handleImageOpening}
        />

        {/* Back Button */}
        <div
          onClick={() => router.back()}
          className="z-20 bg-white text-black  absolute top-4 right-4 bg-opacity-80 rounded-md p-2 cursor-pointer  lg:hidden"
        >
          <ArrowRight />
        </div>
      </div>

      {/* Modal with Animation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-max"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Image Wrapper with Scale Animation */}
            <motion.div
              className="relative p-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on the image
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-white text-xl bg-red-700  bg-opacity-90 rounded-full px-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              {/* Full-size Image */}
              <Image
                width={1920}
                height={1080}
                src={project.image || "/image-placeholder.webp"}
                alt={`${project.name} full-size image`}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Navigation Bar */}
      <div
        className={clsx(
          "sticky  transition-all duration-300 mt-6 py-3 z-50 w-full bg-white dark:bg-black border-b dark:border-white/[0.3] border-black/[0.3] ",
          visible ? " top-[60px] " : " top-0 "
        )}
      >
        <div className="w-full flex justify-around items-center gap-4   font-IRANSansXDemiBold">
          <Button
            className={clsx(
              " bg-white dark:bg-[#362144] px-5",
              activeSection === "images" && "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(imagesRef)}
          >
            تصاویر
          </Button>
          <Button
            className={clsx(
              " bg-white dark:bg-[#362144] px-5",
              activeSection === "specifications" &&
                "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(specificationsRef)}
          >
            مشخصات
          </Button>
          <Button
            className={clsx(
              " bg-white dark:bg-[#362144] px-5",
              activeSection === "links" && "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(linksRef)}
          >
            لینک ها
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div ref={specificationsRef} className="my-3 w-full max-lg:px-10 ">
        <h2 className="text-[30px] font-extrabold">{project.name}</h2>
        <div className="flex items-center justify-start gap-4 mb-3 mt-1">
          {/* //! type tag */}
          <div
            className={clsx(
              `px-3 py-1 rounded-md flex items-center justify-center`,
              project.projectType === "Practice" ? "bg-blue-300" : project.projectType==="Copy"?'bg-green-300':project.projectType==="Forked"?'bg-purple-300':'bg-red-300'
            )}
          >
            <p
              className={clsx(
                `font-IRANSansXMedium text-sm`,
                project.projectType === "Practice" ? "text-blue-900" :project.projectType==="Copy"?'text-green-900':project.projectType==="Forked"?'text-purple-900':'text-red-900'
              )}
            >
              {project.projectType === "Practice" ? "تمرین شخصی" :project.projectType==="Copy"?'کپی شده':project.projectType==="Forked"?'فورک شده':'واقعی'}
            </p>
          </div>
          {/* //! completed tag */}

          <div
            className={clsx(
              "px-3 py-1 rounded-md bg-yellow-200 items-center justify-center",
              {
                hidden: project.competency !== 100,
                block: project.competency === 100,
              }
            )}
          >
            <p className="text-yellow-950 font-bold">Completed</p>
          </div>
        </div>
        <p className="font-IRANSansXUltraLight">{project.description}</p>
        {/* //! Tech Stack */}
        <div className="flex flex-wrap gap-2 my-4">
  {project.techStack.map(({ technology }) => {
    const [color1, color2] = techColors[technology.name]; // Fallback gradient

    return (
      <motion.span
        key={technology.id}
        className="px-3 py-1 flex items-center justify-center gap-2 text-white  rounded-lg text-sm font-medium"
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to top right, black 30%, ${color2} 100%)` // Dark mode gradient
            : `linear-gradient(to top right, black 30%, ${color2} 100%)`, // Light mode gradient
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          className="w-8 h-8"
          src={technology.imageUrl}
          alt={`${technology.name} image`}
        />
        {technology.name}
      </motion.span>
    );
  })}
</div>
<div className="flex-col flex items-center justify-center gap-2 my-10">
  <p className="font-IRANSansXBlack ">درصد تکامل پروژه</p>
<CompetencyCircle competency={project.competency} filledColor={project.competency>=75?'green':project.competency>=50?'yellow':project.competency>=25?'orange':'red'} unfilledColor="#c7c4c7" size={100} />
    
    </div>

      </div>


      <div ref={linksRef} className="py-20 w-full max-lg:px-4">
        <h2 className="text-xl font-IRANSansXBlack text-center mb-10">لینک ها</h2>
        <div className="flex gap-10 flex-col  items-center justify-center border rounded-md p-5 border-black/[0.2] dark:border-white/[0.2]">
          <div className="flex  max-md:flex-col-reverse gap-2 w-full items-center justify-end">
        <LinkPreview url={project.liveLink||''} className="text-center font-IRANSansXLight">

        <p className="">

          {project?.liveLink}
          {!project.liveLink&&'ندارد'}
        </p>
        </LinkPreview>
        <div className="flex gap-2 items-center justify-center">

            <p className="font-IRANSansXBold">

           : لینک لایو وبسایت 
            </p>
        <LucideLink/>
        </div>
          </div>
          <div className="flex max-md:flex-col-reverse gap-2 w-full items-center justify-end">
        <LinkPreview url={project.githubLink||''} className="text-center font-IRANSansXLight">

        <p className="">

          {project?.githubLink}
          {!project.githubLink&&'ندارد'}
        </p>
        </LinkPreview>
        <div className="flex gap-2 items-center justify-center">



            <p className="font-IRANSansXBold">
           : (لینک گیت هاب) سورس کد
            </p>
        <Github/>
</div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default ProjectDetails;
