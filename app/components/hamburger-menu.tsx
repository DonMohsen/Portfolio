"use client"
import React, { useEffect } from "react";
import { webRoutes } from "../utils/webRoutes";
import { webRoutesType } from "../Types/webRoutesTypes";
import RoutesItem from "./routes-item";
import { motion } from "framer-motion";

import useHamburgerMenu from "@/store/useHamburgerMenu";
import clsx from "clsx";
const 
HamburgerMenu = () => {
  // const setHamValue=useHamburgerMenu((state)=>state.setHamburgerMenuState)
 const toggleHamburger=useHamburgerMenu((state)=>state.toggleHamburgerMenuState)
 const hamburgerState=useHamburgerMenu((state)=>state.hamburgerMenuState)
 const handleToggleHamburger=()=>{
  toggleHamburger()

 }
  return (
    <>
    <div className="relative  top-8 right-9">
    
    <div
        onClick={handleToggleHamburger}

    className="absolute">
  <div className={clsx(`btn active`,hamburgerState===false?'not-active':'active')}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

        
<a className="dribbble" href="https://dribbble.com/shots/5505871-Menu-toggle-close-animation" target="_blank"><img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" alt=""/></a>
</div>

    </>
  );
};

export default HamburgerMenu;
