"use client"
import React from "react";

import { webRoutesType } from "../Types/webRoutesTypes";
import RoutesItem from "./routes-item";
import { motion } from "framer-motion";
import clsx from "clsx";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import useWebRoutes from "../utils/useWebRoutes";

const Navbar = () => {
  const webRoutes=useWebRoutes()
    const hamValue=useHamburgerMenu((state)=>state.hamburgerMenuState)
    const toggleHamburger = useHamburgerMenu((state) => state.toggleHamburgerMenuState);
  return (
    <>
    <div className={clsx(`mt-[60px] md:mt-[60px]  z-[70] absolute w-full h-full bg-transparent  items-center justify-end  `,hamValue===true?'flex':'hidden')}>
      <div
      onClick={toggleHamburger}
      className="w-full h-full  bg-transparent flex"></div>
      <div className=" fixed h-full w-[50%] bg-slate-400">
        {webRoutes.map((item:webRoutesType)=>
        
            
            <RoutesItem key={item.id} webRoute={item}  />
            
        
        )}
      </div>
    </div>
    </>
  );
};

export default Navbar;
