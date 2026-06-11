"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useWebRoutes from "@/app/utils/useWebRoutes";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import LanguageSwitcher from "./language-switcher";
import DeferredThemeToggle from "./DeferredThemeToggle";
import { prefetchPageTransition } from "@/components/page-transition/prefetch";

export default function DesktopHeaderNav() {
  const webRoutes = useWebRoutes();
  const [hoveredRouteItem, setHoveredRouteItem] =
    useState<webRoutesType | null>(null);

  return (
    <div className="flex items-center justify-center w-full relative gap-[3%] max-md:hidden">
      {webRoutes.map((item: webRoutesType) => (
        <div
          key={item.id}
          onMouseEnter={() => setHoveredRouteItem(item)}
          onMouseLeave={() => setHoveredRouteItem(null)}
          className="relative"
        >
          <Link
            href={item.route}
            onPointerEnter={prefetchPageTransition}
            onFocus={prefetchPageTransition}
            className="text-black dark:text-white flex items-center space-x-1 py-3 px-4 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <span className="text-xs !cursor-pointer">{item?.text}</span>
          </Link>

          <AnimatePresence>
            {item.routesChildren && hoveredRouteItem?.id === item.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                style={{ transformOrigin: "top center" }}
                className="absolute right-0 top-full w-[250px] dark:bg-[#1a0a1b] bg-white shadow-lg rounded-md border dark:border-white/[0.1] border-black/[0.1] will-change-transform"
              >
                <div className="p-4">
                  {item.routesChildren.map((child) => (
                    <Link
                      key={child.id}
                      href={child.route}
                      onPointerEnter={prefetchPageTransition}
                      onFocus={prefetchPageTransition}
                      className="block py-2 px-4 text-black dark:text-white text-right dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-md transition-all"
                      aria-label={child.text}
                    >
                      <div className="flex items-center justify-end gap-2">
                        {child.text}
                        <child.emptyIcon className="w-7 h-7" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <LanguageSwitcher />
      <DeferredThemeToggle />
    </div>
  );
}
