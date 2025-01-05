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
// import ThemeToggle from "./ThemeToggle";

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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
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
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "bg-black text-[#dddada]  font-signika flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-10 py-3 font-extralight items-center justify-center space-x-10",
          className
        )}
        // style={{
        //   backdropFilter: "blur(16px) saturate(180%)",
        //   backgroundColor: "rgba(17, 25, 40, 0.75)",
        //   borderRadius: "12px",
        //   border: "1px solid rgba(255, 255, 255, 0.125)",
        // }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={clsx(
              "relative dark:text-neutral-50 items-center  flex space-x-1  dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-xs !cursor-pointer">{navItem?.name}</span>
          </Link>
        ))}
        <ThemeToggle/>
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};