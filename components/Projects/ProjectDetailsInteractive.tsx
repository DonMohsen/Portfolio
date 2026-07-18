"use client";

import dynamic from "next/dynamic";
import { Github, LucideLink } from "lucide-react";
import clsx from "clsx";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import TechStackIcon from "@/components/TechStackIcon";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { techColors } from "./client-project-card";
import CompetencyCircle from "../CompetencyMeter";
import { LinkPreview } from "../ui/link-preview";
import { getProjectCompetencyColor } from "@/lib/getProjectCompetencyColor";
import { useLocale } from "next-intl";
import { ProjectDetail } from "@/lib/projects/types";
import CaseStudyBICM from "@/components/CaseStudy/CaseStudyBICM";

const ProjectImageModal = dynamic(() => import("./ProjectImageModal"), {
  ssr: false,
});

type ProjectDetailsInteractiveProps = {
  project: ProjectDetail;
};

export default function ProjectDetailsInteractive({
  project,
}: ProjectDetailsInteractiveProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = useLocale();
  const isFa = locale === "fa";
  const heroImage = project.images[0] ?? "/image-placeholder.webp";

  const imagesRef = useRef<HTMLDivElement>(null!);
  const specificationsRef = useRef<HTMLDivElement>(null!);
  const linksRef = useRef<HTMLDivElement>(null!);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 75;

      const sectionPositions = [
        { id: "images", ref: imagesRef },
        { id: "details", ref: specificationsRef },
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
    <>
      <div
        className={clsx(
          "sticky transition-all duration-300 mt-6 py-3 z-50 w-full max-w-4xl bg-white dark:bg-black border-b dark:border-white/[0.3] border-black/[0.3]",
          visible ? "top-[60px]" : "top-0"
        )}
      >
        <div className="w-full flex justify-around items-center gap-4 font-IRANSansXDemiBold">
          <Button
            type="button"
            className={clsx(
              "bg-white dark:bg-[#362144] px-5 hover:bg-slate-200 dark:hover:bg-[#4f3362]",
              activeSection === "images" && "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(imagesRef)}
          >
            {isFa ? "تصاویر" : "Images"}
          </Button>
          <Button
            type="button"
            className={clsx(
              "bg-white dark:bg-[#362144] px-5 hover:bg-slate-200 dark:hover:bg-[#4f3362]",
              activeSection === "details" && "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(specificationsRef)}
          >
            {isFa ? "مطالعه موردی" : "Case study"}
          </Button>
          <Button
            type="button"
            className={clsx(
              "bg-white dark:bg-[#362144] px-5 hover:bg-slate-200 dark:hover:bg-[#4f3362]",
              activeSection === "links" && "bg-[#ac83c8] dark:bg-[#ac83c8]"
            )}
            onClick={() => scrollToSection(linksRef)}
          >
            {isFa ? "لینک‌ها" : "Links"}
          </Button>
        </div>
      </div>

      <div
        ref={imagesRef}
        className="w-full max-w-4xl max-lg:px-4 mt-4 [content-visibility:auto]"
      >
        <div className="flex flex-wrap gap-3">
          {project.images.map((src, index) => (
            <button
              key={src}
              type="button"
              className="relative w-full sm:w-[calc(50%-0.375rem)] aspect-video rounded-[8px] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ac83c8]"
              onClick={() => setIsModalOpen(true)}
              aria-label={
                isFa
                  ? `نمایش تصویر ${index + 1}`
                  : `View image ${index + 1}`
              }
            >
              <Image
                src={src}
                alt={`${project.name} — ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 448px"
                quality={75}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={specificationsRef}
        className="my-6 w-full max-w-4xl max-lg:px-4 [content-visibility:auto]"
      >
        <CaseStudyBICM project={project} locale={locale} />

        <div className="flex flex-wrap gap-2 my-8">
          {project.techStack.map(({ technology }) => {
            const [, color2] = techColors[technology.name] ?? ["#000", "#888"];

            return (
              <motion.span
                key={technology.id}
                className="px-3 py-1 flex items-center justify-center gap-2 text-white rounded-lg text-sm font-medium"
                style={{
                  backgroundImage: `linear-gradient(to top right, black 30%, ${color2} 100%)`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TechStackIcon
                  src={technology.imageUrl}
                  alt={technology.name}
                  size={32}
                  className="w-8 h-8"
                />
                {technology.name}
              </motion.span>
            );
          })}
        </div>

        <div className="flex-col flex items-center justify-center gap-2 my-10">
          <p className="font-IRANSansXBlack">
            {isFa ? "درصد تکامل پروژه" : "Project completion"}
          </p>
          <CompetencyCircle
            competency={project.competency}
            filledColor={getProjectCompetencyColor(project.competency)}
            unfilledColor="#edebed"
            size={100}
          />
        </div>
      </div>

      <div
        ref={linksRef}
        className="py-20 w-full max-w-4xl max-lg:px-4 [content-visibility:auto]"
      >
        <h2 className="text-xl font-IRANSansXBlack text-center mb-10">
          {isFa ? "لینک‌ها" : "Links"}
        </h2>
        <div className="flex gap-10 flex-col items-center justify-center border rounded-md p-5 border-black/[0.2] dark:border-white/[0.2]">
          <div className="flex max-md:flex-col-reverse gap-2 w-full items-center justify-end">
            <LinkPreview
              url={project.liveLink || ""}
              className="text-center font-IRANSansXLight"
            >
              <p>
                {project.liveLink ?? (isFa ? "ندارد" : "Not available")}
              </p>
            </LinkPreview>
            <div className="flex gap-2 items-center justify-center">
              <p className="font-IRANSansXBold">
                {isFa ? ": لینک لایو وبسایت" : "Website live URL:"}
              </p>
              <LucideLink />
            </div>
          </div>
          <div className="flex max-md:flex-col-reverse gap-2 w-full items-center justify-end">
            <LinkPreview
              url={project.githubLink || ""}
              className="text-center font-IRANSansXLight"
            >
              <p>
                {project.githubLink ?? (isFa ? "ندارد" : "Not available")}
              </p>
            </LinkPreview>
            <div className="flex gap-2 items-center justify-center">
              <p className="font-IRANSansXBold">
                {isFa
                  ? ": (لینک گیت هاب) سورس کد"
                  : "Source code (GitHub):"}
              </p>
              <Github />
            </div>
          </div>
        </div>
      </div>

      <ProjectImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={heroImage}
        alt={`${project.name} image`}
      />
    </>
  );
}
