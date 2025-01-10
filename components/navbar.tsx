"use client";
import React from "react";

import RoutesItem from "./routes-item";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import useWebRoutes from "@/app/utils/useWebRoutes";

const Navbar = () => {
  const webRoutes = useWebRoutes();
  const hamValue = useHamburgerMenu((state) => state.hamburgerMenuState);
  const toggleHamburger = useHamburgerMenu(
    (state) => state.toggleHamburgerMenuState
  );
  return (
    <AnimatePresence>
    {hamValue&&
    

      <motion.div
        initial={{
          x: "50%",
        }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "50%"
        }}
        transition={{
          ease:"easeInOut",
          duration: 0.4,
        }}
        className="
          mt-[60px] md:mt-[60px]  z-[70] absolute w-full h-full bg-transparent  items-center justify-end flex "
      >
        <div
          onClick={toggleHamburger}
          className="w-full h-full  bg-transparent flex"
        ></div>
        <div className=" fixed h-full w-[50%] bg-slate-400">
          {webRoutes.map((item: webRoutesType) => (
            <RoutesItem key={item.id} webRoute={item} />
          ))}
        </div>
      </motion.div>

    }
      </AnimatePresence>

  );
};

export default Navbar;
