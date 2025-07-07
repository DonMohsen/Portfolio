"use client";
import React, { startTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectsScoutButton = () => {
  const router = useRouter(); 

  const handleClick = () => {
     startTransition(() => {
    router.replace("/projects"); 
  });
  };
  return (
    <Button
      onClick={handleClick}
      className="group rounded-full text-xs md:text-sm border-none font-IRANSansXRegular  z-[50] p-5  shadow-none w-full hover:brightness-75 bg-slate-200 dark:bg-[#362144] flex items-center justify-center"
    >
      <div className="flex items-center justify-center gap-2">
        <ArrowLeft className="md:group-hover:-translate-x-2 -translate-x-1 -translate-y-[1px]  transition-transform duration-300 " />
        <p className="font-IRANSansXDemiBold">پروژه ها</p>
      </div>
    </Button>
  );
};

export default ProjectsScoutButton;