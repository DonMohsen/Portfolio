"use client";
import React, { useEffect, useState } from "react";
import { CircleChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import Link from "next/link";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import clsx from "clsx";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 500, damping: 25 } },
};

const childVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const RoutesItem = ({ webRoute, className }: { webRoute: webRoutesType; className?: string }) => {
  const { routesChildren, route, isActive, text, filledIcon, emptyIcon } = webRoute;
  const [openChildren, setOpenChildren] = useState(false);
  const hamburgerState = useHamburgerMenu((state) => state.hamburgerMenuState);
  const hamburgerToggle = useHamburgerMenu((state) => state.toggleHamburgerMenuState);

  useEffect(() => {
    if (!hamburgerState) setOpenChildren(false);
  }, [hamburgerState]);

  const closeHamburgerAfterClick = () => hamburgerToggle();

  return (
    <>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={clsx("my-2 flex flex-col", className)}
      >
        {/* Main Route Item */}
        <motion.div
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-black transition cursor-pointer"
    >
      {routesChildren && routesChildren.length > 0 && (
        <button
          onClick={() => setOpenChildren(!openChildren)}
className="p-1 w-[50%] flex items-center justify-center bg-slate-300 dark:bg-slate-900 rounded-xl " // Button takes 50% width
        >
          <CircleChevronLeft className={clsx(`w-6 h-6 transition-all duration-300`,openChildren&&"-rotate-90")} />
        </button>
      )}
      <Link
        onClick={closeHamburgerAfterClick}
        href={route}
        className="flex items-center space-x-3 w-full"
      >
        <span
          className="text-lg font-medium text-right"
          style={{ flex: 1, wordWrap: "break-word" }} // This allows the text to wrap
          >
          {text}
        </span>
          {isActive ? (
            <webRoute.filledIcon className="w-6 h-6 text-blue-500" />
          ) : (
            <webRoute.emptyIcon className="w-6 h-6 text-gray-500" />
          )}
      </Link>

    </motion.div>
      </motion.div>

      {/* Child Routes Animation */}
      <AnimatePresence>
        {openChildren && routesChildren && (
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mr-4 overflow-hidden origin-top space-y-1"
          >
            {routesChildren.map((child: webRoutesType, index) => (
              <motion.div
                key={child.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.5 }} // Stagger effect
              >
                <RoutesItem webRoute={child} className="pl-1" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoutesItem;
