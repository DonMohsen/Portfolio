"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import HamburgerMenu from "./hamburger-menu";
import { Button } from "@/components/ui/button";
import useShowHeader from "@/store/useShowHeader";
import useWebRoutes from "@/app/utils/useWebRoutes";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import useHamburgerMenu from "@/store/useHamburgerMenu";

export const Header = () => {
  const webRoutes = useWebRoutes();
  const { scrollYProgress } = useScroll();
  const resumeShow = useShowHeader((state) => state.ShowHeaderState);
  const resumeToggle = useShowHeader((state) => state.toggleShowHeaderState);
  const hamburgerMenuState = useHamburgerMenu((state) => state.hamburgerMenuState);

  const [visible, setVisible] = useState(true);
  const [hoveredRouteItem, setHoveredRouteItem] = useState<webRoutesType | null>(null);
  const [showTopZero, setShowTopZero] = useState(false);

  // Handle scroll events to show/hide header
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05 && !hamburgerMenuState) {
        setVisible(true);
        setShowTopZero(false);
      } else {
        if (direction < 0 && !hamburgerMenuState) {
          setVisible(true);
          setShowTopZero(false);
        } else {
          !hamburgerMenuState && setVisible(false);
          !hamburgerMenuState && setShowTopZero(true);
        }
      }
    }
  });

  // Toggle resume header on mount
  useEffect(() => {
    resumeToggle();
  }, [resumeToggle]);

  return (
    <div>
      {/* Resume Header */}
      <div
        className={clsx(
          "fixed bg-[#151515] top-0 h-[30px] w-full z-10",
          !resumeShow && "hidden"
        )}
      ></div>

      {/* Animated Resume Header */}
      <AnimatePresence>
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: showTopZero ? "0rem" : "60px" }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "w-full z-[60] h-[40px] max-md:h-[52px] fixed bg-[#151515] border-[#6a6868] border-b-[0.5px]",
            !resumeShow && "hidden"
          )}
        >
          <div className="relative w-full h-full bg-white flex items-center justify-center gap-[20%]">
            <h2>Take a look at my resume</h2>
            <Button className="rounded-full shadow-none border-2 border-black hover:bg-slate-200">
              Download
            </Button>
            <X
              onClick={resumeToggle}
              className="absolute right-0 mr-5 text-red-700 cursor-pointer"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Header */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "bg-[#160d1c] h-[60px] text-[#dddada] font-signika flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3 font-extralight items-center justify-between space-x-10"
          )}
        >
          {/* Desktop Navigation */}
          <div className="flex items-center justify-center w-full relative gap-[3%] max-md:hidden">
            <AnimatePresence>
              {webRoutes.map((item: webRoutesType) => (
               <div
               key={item.id}
               onMouseEnter={() => setHoveredRouteItem(item)} 
               onMouseLeave={() => setHoveredRouteItem(null)}
               className="relative"
             >
               <Link
                 href={item.route}
                 className="dark:text-neutral-50 flex items-center space-x-1 py-3 px-4 dark:hover:text-neutral-300 hover:text-neutral-500"
               >
                 <span className="text-xs !cursor-pointer">{item?.text}</span>
               </Link>
             
               {/* Dropdown Menu */}
               <AnimatePresence>
                 {item.routesChildren && hoveredRouteItem?.id === item.id && (
                   <motion.div
                     initial={{ scaleY: 0, opacity: 0 }}
                     animate={{ scaleY: 1, opacity: 1 }}
                     exit={{ scaleY: 0, opacity: 0 }}
                     transition={{ ease: "easeInOut", duration: 0.3 }}
                     className="absolute left-0 top-full w-[250px] bg-[#160d1c] origin-top shadow-lg"
                   >
                     <div className="p-4">
                       {item.routesChildren.map((child) => (
                         <Link
                           key={child.id}
                           href={child.route}
                           className="block py-2 px-4 text-white hover:bg-gray-700"
                         >
                           {child.text}
                         </Link>
                       ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
             
              ))}
            </AnimatePresence>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="z-50 text-white w-full md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5">
            <ThemeToggle />
            <HamburgerMenu />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};