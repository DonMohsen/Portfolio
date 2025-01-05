"use client"
import React from "react";
import { webRoutes } from "../utils/webRoutes";
import { webRoutesType } from "../Types/webRoutesTypes";
import RoutesItem from "./routes-item";
import { motion } from "framer-motion";

const HamburgerMenu = () => {
  return (
    <motion.div className="fixed w-full h-full bg-transparent  flex items-center justify-end ">
      <div className="w-full h-full  bg-transparent"></div>
      <div className="w-full h-full  bg-slate-50 flex flex-col items-center justify-center ">
        {webRoutes.map((item:webRoutesType)=>
        { 

            return(

            <RoutesItem emptyIcon={item.emptyIcon} filledIcon={item.filledIcon} text={item.text} isActive={item.isActive} key={item.text} route={item.route} 
            children={item.children}  />
            )
        }
      
        )}
      </div>
    </motion.div>
  );
};

export default HamburgerMenu;
