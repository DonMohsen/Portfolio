"use client"

import { GridDemo } from "@/components/GridDemo";
import { InfiniteDemo } from "@/components/InfiniteDemo";
import useShowHeader from "@/store/useShowHeader";
import { useEffect } from "react"
import Image from "next/image";

//! 09jan : add grid acetirnity ui and infinite rolling then do the mobile footer,dark mode, hero.tsx ,header navigating
//! 10jan : build backend and create projects and routes tables, fetch them cliently
export default function Home() {
  const toggleResumeShow=useShowHeader((state)=>state.toggleShowHeaderState)
  useEffect(() => {
    toggleResumeShow()
  }, [])
  
  return (
   <div className="  h-[300vh]">
    <div className="w-full absolute items-center h-[100vh] justify-center">
    <GridDemo/>
    </div>
    <div className="">

    <InfiniteDemo/>
    </div>
   </div>
  );
}