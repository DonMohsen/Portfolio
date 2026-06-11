"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
import HamburgerMenu from "./hamburger-menu";
import DeferredThemeToggle from "./DeferredThemeToggle";
import useHamburgerMenu from "@/store/useHamburgerMenu";

const LanguageSwitcher = dynamic(() => import("./language-switcher"), {
  ssr: false,
  loading: () => (
    <div
      className="h-9 w-9 rounded-lg border border-black/10 dark:border-white/20"
      aria-hidden
    />
  ),
});

export default function MobileHeaderBar() {
  const menuOpen = useHamburgerMenu((state) => state.hamburgerMenuState);

  return (
    <div
      className={clsx(
        "flex h-[60px] w-full fixed inset-x-0 top-0 z-[7000] mx-auto items-center justify-end bg-page/80 px-3 backdrop-blur-sm transition-colors duration-300 max-md:pt-3 md:hidden",
        menuOpen && "pointer-events-none"
      )}
    >
      <div className="pointer-events-auto relative z-[7001] flex items-center gap-3 -translate-y-1 translate-x-5">
        <LanguageSwitcher />
        <DeferredThemeToggle />
        <HamburgerMenu />
      </div>
    </div>
  );
}
