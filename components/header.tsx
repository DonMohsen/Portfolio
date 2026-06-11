"use client";

import dynamic from "next/dynamic";
import MobileHeaderBar from "./MobileHeaderBar";

const DesktopHeaderNav = dynamic(() => import("./DesktopHeaderNav"), {
  ssr: false,
  loading: () => <div className="h-[60px] w-full" aria-hidden />,
});

export const Header = () => {
  return (
    <>
      <MobileHeaderBar />
      <div className="hidden md:flex h-[60px] w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 items-center justify-between bg-page/80 backdrop-blur-sm transition-colors duration-300">
        <DesktopHeaderNav />
      </div>
    </>
  );
};
