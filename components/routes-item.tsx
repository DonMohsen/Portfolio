"use client";
import React, { useEffect, useState } from "react";
import { CircleChevronRight } from "lucide-react";
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
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-black dark:hover:bg-slate-800 hover:bg-gray-200 transition cursor-pointer"
        >
          <Link onClick={closeHamburgerAfterClick} href={route} className="flex items-center space-x-3">
            {isActive ? <webRoute.filledIcon className="w-6 h-6 text-blue-500" /> : <webRoute.emptyIcon className="w-6 h-6 text-gray-500" />}
            <span className="text-lg font-medium">{text}</span>
          </Link>

          {routesChildren && routesChildren.length > 0 && (
            <motion.button
              onClick={() => setOpenChildren(!openChildren)}
              animate={{ rotate: openChildren ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-1 transition-transform"
            >
              <CircleChevronRight className="w-6 h-6" />
            </motion.button>
          )}
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
            className="ml-6 overflow-hidden origin-top space-y-1"
          >
            {routesChildren.map((child: webRoutesType, index) => (
              <motion.div
                key={child.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }} // Stagger effect
              >
                <RoutesItem webRoute={child} className="pl-4" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoutesItem;
