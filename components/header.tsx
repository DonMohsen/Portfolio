"use client";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import useShowHeader from "@/store/useShowHeader";
import { X } from "lucide-react";
import useWebRoutes from "@/app/utils/useWebRoutes";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import HeaderChildItems from "./header-child-items";
import useHamburgerMenu from "@/store/useHamburgerMenu";

export const Header = () => {
  const webRoutes = useWebRoutes();
  const { scrollYProgress } = useScroll();
  const resumeShow = useShowHeader((state) => state.ShowHeaderState);
  const resumeToggle = useShowHeader((state) => state.toggleShowHeaderState);
  const hamburgerMenuState = useHamburgerMenu(
    (state) => state.hamburgerMenuState
  );
  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  const [hoveredRouteItem, setHoveredRouteItem] = useState<webRoutesType>();
  //FOR showinf the extra layer of header on top0 or top-7
  const [showTopZero, setShowTopZero] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05 && hamburgerMenuState == false) {
        // also set true for the initial state
        setVisible(true);
        setShowTopZero(false);
      } else {
        if (direction < 0 && hamburgerMenuState == false) {
          setVisible(true);
          setShowTopZero(false);
        } else {
          hamburgerMenuState == false && setVisible(false);
          hamburgerMenuState == false && setShowTopZero(true);
        }
      }
    }
  });
  useEffect(() => {
    resumeToggle();
  }, []);

  return (
    <div>
      <div
        className={clsx(
          `fixed bg-[#151515] top-0 h-[30px] w-full z-10`,
          resumeShow === false && "hidden"
        )}
      ></div>
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
            `w-full z-[60]  h-[40px] max-md:h-[52px] fixed bg-[#151515] border-[#6a6868] border-b-[0.5px]`,
            resumeShow === false && "hidden"
          )}
        >
          <div className="relative w-full h-full bg-white flex items-center justify-center gap-[20%]">
            <h2>Take a look at my resume</h2>
            <Button className="rounded-full shadow-none border-2 border-black hover:bg-slate-200 ">
              Download
            </Button>
            <X
              onClick={resumeToggle}
              className="absolute right-0  mr-5 text-red-700 cursor-pointer"
            />
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
            "bg-[#160d1c] h-[60px] text-[#dddada]  font-signika flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3  font-extralight items-center justify-between space-x-10"
          )}
        >
          <div className="flex  items-center justify-center w-full relative gap-[3%]  max-md:hidden">
            <AnimatePresence>
              {webRoutes.map((item: webRoutesType) => (
                <div

                  onMouseEnter={() => setHoveredRouteItem(item)}
                  key={item.id}
                  className=" group "
                >
                  <Link
                    href={item.route}
                    className={clsx(
                      " dark:text-neutral-50 items-center  flex space-x-1 py-3 px-4 dark:hover:text-neutral-300 hover:text-neutral-500"
                    )}
                  >
                    <span className=" text-xs !cursor-pointer">
                      {item?.text}
                    </span>
                  </Link>
                    <AnimatePresence>

                  {item.routesChildren && hoveredRouteItem?.id === item.id && (
                      <motion.div
                      onMouseLeave={()=>setHoveredRouteItem(undefined)}

                      initial={{
                        opacity:0
                      }}
                      animate={{
                        opacity:1
                      }}
                      exit={{
                        opacity:0
                      }}
                      transition={{
                        ease:"easeInOut",
                        duration: 0.1,
                      }}
                      className="fixed top-[50px] w-[100%] right-[0%]">
                        <div className="bg-[#160d1c]  h-[300px] flex items-center flex-col justify-start ">
                          <div className="text-3xl font-extrabold mt-6">
                            {item.text}
                          </div>
                          <div className="w-full  flex items-start justify-center gap-10 flex-wrap mt-10">
                            {item.routesChildren &&
                              item.routesChildren.map((child) => (
                                  <div
                                  key={child.id}
                                  className="flex items-center flex-col justify-center min-w-[200px] font-medium ">
                                    <div>{child.text}</div>
                                    <div>
                                      {child.routesChildren?.map((child) => (
                                          <div 
                                          key={child.id}
                                          className="flex items-center justify-center min-w-[200px] text-xs font-extralight mt-10 ">
                                            {child.text}
                                          </div>
                                      ))}
                                    </div>
                                  </div>
                                
                              ))}
                          </div>
                        </div>
                      </motion.div>
                  )}
                                      </AnimatePresence>

                </div>
              ))}
            </AnimatePresence>
            <ThemeToggle />
          </div>

          <div className=" z-50 text-white  w-full  md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5">
            <ThemeToggle />
            <HamburgerMenu />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
