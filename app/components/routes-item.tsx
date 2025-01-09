"use client";
import React, { useEffect, useState } from "react";
import { webRoutesType } from "../Types/webRoutesTypes";
import { IconType } from "react-icons";
import clsx from "clsx";
import { CircleChevronRight, CircleMinus, CirclePlus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import Link from "next/link";
const RoutesItem = ({webRoute}:{webRoute:webRoutesType}) => {
  const{routesChildren,route,isActive,text,filledIcon,emptyIcon,id}=webRoute;
  const [openChildren, setOpenChildren] = useState<any>({});
  const hamburgerState = useHamburgerMenu((state) => state.hamburgerMenuState);
  const hamburgerToggle = useHamburgerMenu((state) => state.toggleHamburgerMenuState);

  useEffect(() => {
    hamburgerState === false && setOpenChildren({});
  }, [hamburgerState]);

  useEffect(() => {
  }, [openChildren]);
const closeHamburgerAfterClick=()=>{
  hamburgerToggle()
}
  const handleToggleChildren = (currentLabel: string) => {
    setOpenChildren({
      ...openChildren,
      [currentLabel]: !openChildren[currentLabel],
    });

    console.log(openChildren);
  };
  return (
    <div className="ml-2 select-none my-2">
      <div className="flex  items-center    ">
        <Link
        onClick={closeHamburgerAfterClick}
        href={route}
        className="flex cursor-pointer hover:font-bold transition-all duration-300">

        {isActive===true? <webRoute.filledIcon className="mr-2 w-6 h-6"/>: <webRoute.emptyIcon className="mr-2 w-6 h-6"/>}
        {`${text} `}
        </Link>
        {routesChildren && routesChildren.length && (
          <div
            onClick={() => handleToggleChildren(text)}
            className="ml-2 cursor-pointer "
          >
            {
              <CircleChevronRight
                className={clsx(
                  `transition-all duration-200 hover:fill-slate-300 w-8 h-8`,
                  openChildren[text] && "rotate-90"
                )}
              />
            }
          </div>
        )}
      </div>
      {routesChildren &&
        openChildren[text] &&
        routesChildren.map((child: webRoutesType) => 
           
            <AnimatePresence>
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 1000,
                  damping: 15,
                }}
                className={`ml-3`}
                key={child.id}
              >
                <RoutesItem key={child.id} webRoute={child}/>
              </motion.div>
            </AnimatePresence>
          
        )}
    </div>
  );
};

export default RoutesItem;
