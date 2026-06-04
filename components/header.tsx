"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { ArrowDown, Space, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import HamburgerMenu from "./hamburger-menu";
import { Button } from "@/components/ui/button";
import useShowHeader from "@/store/useShowHeader";
import useWebRoutes from "@/app/utils/useWebRoutes";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import LanguageSwitcher from "./language-switcher";

export const Header = () => {
  const webRoutes = useWebRoutes();
  const { scrollY } = useScroll();
  const resumeToggle = useShowHeader((state) => state.toggleShowHeaderState);

  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [hoveredRouteItem, setHoveredRouteItem] = useState<webRoutesType | null>(null);

  // Toggle resume header on mount
  useEffect(() => {
    resumeToggle();
  }, [resumeToggle]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const value = typeof current === "number" ? current : 0;
    const nextOpacity = Math.min(1, Math.max(0, value / 120));
    setBackgroundOpacity(nextOpacity);
  });

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

 
  return (
    <div className="font-IRANSansXExtraBold">
      {/* Resume Header */}
      {/* {resumeShow&&
      <div
      className={clsx(
        "fixed dark:bg-[#151515] bg-white  top-0 h-[30px] w-full z-10"
      )}
      ></div>
    } */}

      {/* Animated Resume Header */}
    

      {/* Main Header */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "h-[60px] text-[#dddada] flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3 font-extralight items-center justify-between space-x-10 transition-colors duration-300"
          )}
          style={{
            backgroundColor: isDark
              ? `rgba(22, 13, 28, ${backgroundOpacity})`
              : `rgba(255, 255, 255, ${backgroundOpacity})`,
            borderBottom: `1px solid ${
              isDark
                ? `rgba(255, 255, 255, ${backgroundOpacity * 0.1})`
                : `rgba(0, 0, 0, ${backgroundOpacity * 0.1})`
            }`
          }}
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
                 className="text-black dark:text-white flex items-center space-x-1 py-3 px-4 dark:hover:text-neutral-300 hover:text-neutral-500"
               >
                 <span className="text-xs !cursor-pointer ">{item?.text}</span>
               </Link>
             
               {/* Dropdown Menu */}
               <AnimatePresence>
  {item.routesChildren && hoveredRouteItem?.id === item.id && (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      className="absolute right-0 top-full w-[250px] dark:bg-[#1a0a1b] bg-white  origin-top shadow-lg rounded-md border dark:border-white/[0.1] border-black/[0.1]"
    >
      <div className="p-4">
        {item.routesChildren.map((child) => (
          <Link
            key={child.id}
            href={child.route}
            className="block py-2 px-4 text-black dark:text-white text-right dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-md  transition-all"
            aria-label={child.text} // For accessibility
          >
            <div className="flex items-center justify-end gap-2">

            {child.text}
            <child.emptyIcon className="w-7 h-7"/>
            </div>
            
          </Link>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

             </div>
             
              ))}
            </AnimatePresence>
            <LanguageSwitcher />
            <div aria-hidden="false">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="z-50 text-white w-full md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5 ">
            <LanguageSwitcher />
            <div aria-hidden="false">
              <ThemeToggle />
            </div>
            <HamburgerMenu />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};