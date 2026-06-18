"use client";

import dynamic from "next/dynamic";
import MobileHeaderBar from "./MobileHeaderBar";
import SiteHeaderShell from "./SiteHeaderShell";

const DesktopHeaderNav = dynamic(() => import("./DesktopHeaderNav"), {
  ssr: false,
  loading: () => <div className="h-[52px] w-full" aria-hidden />,
});

export const Header = () => {
  return (
    <>
      <MobileHeaderBar />
      <SiteHeaderShell className="fixed inset-x-0 top-0 z-[5000] mx-auto hidden h-[52px] w-full items-center justify-between px-3 md:flex">
        <DesktopHeaderNav />
      </SiteHeaderShell>
    </>
  );
};
