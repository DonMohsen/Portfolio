"use client"
import React from "react";
import { webRoutes } from "../utils/webRoutes";
import { webRoutesType } from "../Types/webRoutesTypes";
import RoutesItem from "./routes-item";
import { motion } from "framer-motion";
import clsx from "clsx";
import useHamburgerMenu from "@/store/useHamburgerMenu";

const Navbar = () => {
    const hamValue=useHamburgerMenu((state)=>state.hamburgerMenuState)
    const toggleHamburger = useHamburgerMenu((state) => state.toggleHamburgerMenuState);
  return (
    <>
    <div className={clsx(` fixed w-full h-full bg-transparent  items-center justify-end `,hamValue===true?'flex':'hidden')}>
      <div
      onClick={toggleHamburger}
      className="w-full h-full  bg-transparent"></div>
      <div className="w-full h-full  bg-slate-50 flex flex-col items-center justify-center ">
        {webRoutes.map((item:webRoutesType)=>
        { 
            return(
            <RoutesItem emptyIcon={item.emptyIcon} filledIcon={item.filledIcon} text={item.text} isActive={item.isActive} key={item.text} route={item.route} 
            routesChildren={item.routesChildren}  />
            )
        }
        )}
      </div>
    </div>
    </>
  );
};

export default Navbar;
