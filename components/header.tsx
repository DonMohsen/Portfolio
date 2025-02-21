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
import useHamburgerMenu from "@/store/useHamburgerMenu";

export const Header = () => {
  const [downloadLoading, setDownloadLoading] = useState(false)
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

  const handleDownload = () => {
    setDownloadLoading(true);
  
    // File URL (served from Next.js public folder)
    const fileUrl = "/MohsenKhPersianCV.pdf"; // Relative to the public folder
  
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "MohsenKhPersianCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setTimeout(() => {
      setDownloadLoading(false);
    }, 1500);
  };
  
  return (
    <div className="font-IRANSansXExtraBold">
      {/* Resume Header */}
      {resumeShow&&
      <div
      className={clsx(
        "fixed bg-[#151515] top-0 h-[30px] w-full z-10"
      )}
      ></div>
    }

      {/* Animated Resume Header */}
      <AnimatePresence>
      <AnimatePresence>
     
{resumeShow && (
  <motion.div
    initial={{ top: 0, opacity: 1 }}
    animate={{ top: showTopZero ? "0rem" : "60px", opacity: 1 }}
    exit={{ top: "-60px", opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className="fixed w-full z-[60] h-10 md:h-[52px] bg-white  dark:bg-black border-b border-black/[0.2] text-black dark:text-white dark:border-white/[0.2]"
  >
    <div className="relative flex text-xs md:text-sm items-center gap-4 max-sm:gap-2 justify-center w-full h-full px-0 md:px-[20%]">
      {/* 🏆 Improved Download Button with File Download */}
      <Button
  onClick={handleDownload}
  disabled={downloadLoading}
  className="group rounded-full text-xs md:text-sm border-2 font-IR
  ANSansXRegular  border-black dark:border-white shadow-none hover:bg-slate-200 dark:hover:bg-[#362144] flex items-center justify-center"
>
  {downloadLoading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center">
      {/* ✅ Add transition here to fix animation issue */}
      <ArrowDown className="w-8 h-8 group-hover:translate-y-[6px] max-sm:translate-y-[6px] transition-transform duration-300" />
      <Space className="w-8 h-8 -translate-y-1" />
    </div>
  )}
  <p className="flex items-center justify-center">
    دانلود رزومه
  </p>
</Button>


      {/* 🌟 Improved Heading */}
      <p className=" font-IRANSansXRegular text-center">
        نگاهی به رزومه‌ ی من بندازید
      </p>

      {/* ❌ Enhanced Close Button */}
      <X
        onClick={resumeToggle}
        className="right-4 max-sm:right-3 text-red-700 cursor-pointer hover:text-red-500 transition-colors"
        aria-label="بستن پنجره"
      />
    </div>
  </motion.div>
)}

</AnimatePresence>


      </AnimatePresence>

      {/* Main Header */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "dark:bg-[#160d1c] bg-white border-b  border-black/[0.1] dark:border-white/[0.1] h-[60px] text-[#dddada]  flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3 font-extralight items-center justify-between space-x-10"
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
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="absolute left-0 top-full w-[250px] dark:bg-[#1a0a1b] bg-white  origin-top shadow-lg rounded-md border border-gray-700"
    >
      <div className="p-4">
        {item.routesChildren.map((child) => (
          <Link
            key={child.id}
            href={child.route}
            className="block py-2 px-4 text-black dark:text-white text-right hover:bg-gray-800 hover:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
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
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="z-50 text-white w-full md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5 ">
            <ThemeToggle />
            <HamburgerMenu />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};