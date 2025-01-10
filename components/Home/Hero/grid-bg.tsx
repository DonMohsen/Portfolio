import React from "react";
 
export function GridBg  () {
  return (
    <div className="h-full  z-[50] opacity-25 -translate-y-10 w-full dark:bg-black bg-white  dark:bg-grid-purple-900 bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
        
      </div>
      
      <div className=" max-w-[300px] h-auto flex items-center justify-center bg-slate-700 bg-opacity-40 py-2 px-6 text-center rounded-xl">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam molestias ex qui ipsam nesciunt ipsum maxime! Est aspernatur, id, provident optio aliquid sit atque aliquam ipsum magnam maxime quisquam doloremque.
      </div>
      
    </div>
  );
}