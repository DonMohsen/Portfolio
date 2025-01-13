import { Button } from "@/components/ui/button";
import React from "react";
 
export function GridBg  () {
  return (
    <div className="h-full min-h-[500px]  z-[50]   -translate-y-10 w-full relative flex items-center justify-center" >

    <div className="h-full  z-[50] opacity-25 -translate-y-10 w-full dark:bg-black bg-white  dark:bg-grid-purple-900 bg-grid-black/[0.2] fixed flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
        
      </div>
      
    </div>
      <div className=" w-full z-[60] mx-[45px] h-auto flex flex-col text-black  dark:text-white items-center justify-center  bg-opacity-40 py-2 px-6 text-center rounded-xl">
      <h1 className="text-7xl ">Text Text</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, rem reiciendis aliquam facere quod saepe?</p>
      <Button>
        Click
      </Button>
      <div>
        connection
      </div>
      </div>
      
    </div>

  );
}