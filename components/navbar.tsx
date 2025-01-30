"use client";
import React from "react";
import RoutesItem from "./routes-item";
import { AnimatePresence, motion } from "framer-motion";
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
      {hamValue && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="mt-[60px] z-[70] fixed w-full h-full flex justify-end bg-black/30"
        >
          {/* Overlay for closing menu */}
          <div onClick={toggleHamburger} className="w-full h-full"></div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="fixed h-full w-[85%] md:w-[40%] lg:w-[30%] bg-white dark:bg-[#160d1c] shadow-xl flex flex-col px-4 py-6"
          >
            {webRoutes.map((item: webRoutesType) => (
              <RoutesItem key={item.id} webRoute={item} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
