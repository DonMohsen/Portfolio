"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MobileHeaderBar from "./MobileHeaderBar";

const DesktopHeaderNav = dynamic(() => import("./DesktopHeaderNav"), {
  ssr: false,
  loading: () => <div className="hidden md:block h-[60px] w-full" aria-hidden />,
});

function scheduleIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 2500 });
    return;
  }
  window.setTimeout(callback, 1200);
}

export const Header = () => {
  const [showDesktopNav, setShowDesktopNav] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    if (!media.matches) return;

    const enableDesktop = () => setShowDesktopNav(true);
    scheduleIdle(enableDesktop);

    const onChange = () => {
      if (media.matches) scheduleIdle(enableDesktop);
      else setShowDesktopNav(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <MobileHeaderBar />
      <div className="hidden md:block">
        <div className="h-[60px] flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 items-center justify-between bg-page/80 backdrop-blur-sm border-b border-tech-card-border transition-colors duration-300">
          {showDesktopNav ? (
            <DesktopHeaderNav />
          ) : (
            <div className="h-[60px] w-full" aria-hidden />
          )}
        </div>
      </div>
    </>
  );
};
