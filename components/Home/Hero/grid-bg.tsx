import React from "react";
import Presentation from "../Presentation";
import { InfiniteScrolling } from "./infinite-scrolling";

export function GridBg  () {
  return (
    <div className="h-[100vh] min-h-[800px]  z-[50]      w-full relative flex items-center justify-center" >

    <div className="h-full  z-[50] opacity-25  w-full dark:bg-black bg-white  dark:bg-grid-purple-900 bg-grid-black/[0.2]  flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
        
      </div>
      
    </div>
    <Presentation/>
    <InfiniteScrolling />
 
    </div>

  );
}