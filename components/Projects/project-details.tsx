"use client";

import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";
import useShowHeader from "@/store/useShowHeader";
import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

const ProjectDetails = ({ project }: { project: ProjectsWithTechsType }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Refs for different sections (Fixed TypeScript Error)
  const imagesRef = useRef<HTMLDivElement>(null!);
  const specificationsRef = useRef<HTMLDivElement>(null!);
  const linksRef = useRef<HTMLDivElement>(null!);

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
    setActiveSection("images")
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
          scrollPosition < section.ref.current.offsetTop + section.ref.current.clientHeight
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


  return (
    <div className="min-h-[400dvh] mt-[70px] max-w-4xl flex flex-col items-center w-full">
      {/* Image Container */}
      <div
      ref={imagesRef}
      className="w-full max-md:h-[400px] h-[550px] relative">
        <div className="z-10 bg-slate-300 animate-pulse absolute w-full h-full"></div>
        <Image
          width={1920}
          height={400}
          src={project.image || "/image-placeholder.webp"}
          alt={`${project.name} image`}
          className="absolute w-full h-full object-cover z-20"
        />
      </div>

      {/* Sticky Navigation Bar */}
      <div className={clsx("sticky  transition-all duration-300 mt-6  z-50", visible ? " top-[65px] " :" top-5 ")}>
        <div className="w-full flex justify-around items-center gap-4">
          <Button
            className={clsx(" bg-white dark:bg-[#160d1c]", activeSection === "images" && "bg-[#ac83c8] dark:bg-[#362144]")}
            onClick={() => scrollToSection(imagesRef)}
          >
            تصاویر
          </Button>
          <Button
            className={clsx(" bg-white dark:bg-[#160d1c]", activeSection === "specifications" && "bg-[#ac83c8] dark:bg-[#362144]")}
            onClick={() => scrollToSection(specificationsRef)}
          >
            مشخصات
          </Button>
          <Button
            className={clsx(" bg-white dark:bg-[#160d1c]", activeSection === "links" && "bg-[#ac83c8] dark:bg-[#362144]")}
            onClick={() => scrollToSection(linksRef)}
          >
            لینک ها
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div 
      ref={specificationsRef}
      className="py-20 w-full">
        <h2 className="text-lg font-semibold">Images Section</h2>
        <p>Content related to images goes here.</p>
      </div>

      <div  className="py-20 w-full">
        <h2 className="text-lg font-semibold">Specifications Section</h2>
        <p>Content related to specifications goes here.</p>
      </div>

      <div ref={linksRef} className="py-20 w-full">
        <h2 className="text-lg font-semibold">Links Section</h2>
        <p>Content related to links goes here.</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
