"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import HamburgerMenu from "./hamburger-menu";

export const Header = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  //FOR showinf the extra layer of header on top0 or top-7
  const [showTopZero, setShowTopZero] = useState(false);
  const [changeHamburgerMenuOpen, setChangedleHamburgerMenuOpen] = useState(false)
  
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
        setShowTopZero(false);
      } else {
        if (direction < 0) {
          setVisible(true);
          setShowTopZero(false);
        } else {
          setVisible(false);
          setShowTopZero(true);
        }
      }
    }
  });
 
  return (
    <>
      <div className=" fixed bg-[#151515] top-0 h-[30px] w-full z-10"></div>
      <AnimatePresence>
        <motion.div
          initial={{
            top: 0,
          }}
          animate={{
            top: showTopZero ? "0rem" : "60px",
          }}
          transition={{
            duration: 0.2,
          }}
          className={clsx(
            `w-full z-50  h-[40px] max-md:h-[52px] fixed bg-[#151515] border-[#6a6868] border-b-[0.5px]`
          )}
        >
          <div className="w-full h-full bg-white flex items-center justify-center">
            <h2>Hi</h2>
            <button>Click</button>
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={clsx(
            "bg-[#151515] h-[60px] text-[#dddada]  font-signika flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3  font-extralight items-center justify-between space-x-10",
            className
          )}
        >
          <div className="flex items-center justify-center w-full gap-[3%]  max-md:hidden">

          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={clsx(
                "relative dark:text-neutral-50 items-center  flex space-x-1  dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className=" text-xs !cursor-pointer">{navItem?.name}</span>
            </Link>
          ))}
                      <ThemeToggle/>

          </div>
          {/* <div className="flex items-center justify-end bg-red-700 w-full">

          <ThemeToggle />
          </div> */}
          <div
          className=" z-50 text-white  w-full  md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5"
          >
            <ThemeToggle/>
              <HamburgerMenu/>
            
          </div>

          
        </motion.div>
      </AnimatePresence>
    </>
  );
};
