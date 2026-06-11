"use client";

import { useEffect, useState } from "react";
import { CircleChevronLeft } from "lucide-react";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import Link from "next/link";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import clsx from "clsx";

const RoutesItem = ({
  webRoute,
  className,
  childIsActive,
}: {
  webRoute: webRoutesType;
  className?: string;
  childIsActive?: boolean;
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
    <div className={clsx("my-2 flex flex-col nav-item-enter", className)}>
      <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-black transition cursor-pointer">
        {routesChildren && routesChildren.length > 0 && (
          <button
            onClick={() => setOpenChildren(!openChildren)}
            className="p-1 w-[50%] flex items-center justify-center bg-slate-300 dark:bg-slate-900 rounded-xl"
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
        <div className="nav-children-expand mr-4 overflow-hidden origin-top space-y-1">
          {routesChildren.map((child: webRoutesType) => (
            <RoutesItem key={child.id} webRoute={child} className="pl-1" />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutesItem;
