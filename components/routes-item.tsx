"use client";

import { useEffect, useState } from "react";
import { CircleChevronLeft } from "lucide-react";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import Link from "next/link";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import clsx from "clsx";
import { prefetchPageTransition } from "@/components/page-transition/prefetch";

const RoutesItem = ({
  webRoute,
  className,
  childIsActive,
  inCurveMenu = false,
}: {
  webRoute: webRoutesType;
  className?: string;
  childIsActive?: boolean;
  inCurveMenu?: boolean;
}) => {
  const { routesChildren, route, isActive, text, isAChild } = webRoute;
  const [openChildren, setOpenChildren] = useState(false);
  const hamburgerState = useHamburgerMenu((state) => state.hamburgerMenuState);
  const hamburgerToggle = useHamburgerMenu((state) => state.toggleHamburgerMenuState);

  useEffect(() => {
    if (!hamburgerState) setOpenChildren(false);
  }, [hamburgerState]);

  const closeHamburgerAfterClick = () => hamburgerToggle();

  return (
    <div className={clsx("my-2 flex min-w-0 max-w-full flex-col", className)}>
      <div
        className={clsx(
          "flex w-full min-w-0 cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition",
          inCurveMenu
            ? "bg-page-text/[0.06] text-page-text dark:bg-white/10 dark:text-white"
            : "bg-gray-100 dark:bg-black"
        )}
      >
        {routesChildren && routesChildren.length > 0 && (
          <button
            onClick={() => setOpenChildren(!openChildren)}
            className={clsx(
              "flex w-[50%] items-center justify-center rounded-xl p-1",
              inCurveMenu
                ? "bg-page-text/10 dark:bg-white/15"
                : "bg-slate-300 dark:bg-slate-900"
            )}
            type="button"
            aria-expanded={openChildren}
          >
            <CircleChevronLeft
              className={clsx(
                "w-6 h-6 transition-transform duration-300",
                openChildren && "-rotate-90"
              )}
            />
          </button>
        )}
        <Link
          onClick={closeHamburgerAfterClick}
          onPointerEnter={prefetchPageTransition}
          onFocus={prefetchPageTransition}
          href={route}
          className="flex items-center space-x-3 w-full"
        >
          <span
            className={clsx(
              "text-right",
              isAChild ? "text-[16px] font-bold" : "text-lg font-bold"
            )}
            style={{ flex: 1, wordWrap: "break-word" }}
          >
            {text}
          </span>
          {isActive || childIsActive ? (
            <webRoute.filledIcon className="w-6 h-6 text-blue-500" />
          ) : (
            <webRoute.emptyIcon className="w-6 h-6 text-gray-500" />
          )}
        </Link>
      </div>

      {openChildren && routesChildren && (
        <div className="nav-children-expand mr-2 min-w-0 max-w-full origin-top space-y-1 overflow-hidden">
          {routesChildren.map((child: webRoutesType) => (
            <RoutesItem
              key={child.id}
              webRoute={child}
              className="pl-1"
              inCurveMenu={inCurveMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutesItem;
