"use client";

import dynamic from "next/dynamic";
import HamburgerMenu from "./hamburger-menu";
import DeferredThemeToggle from "./DeferredThemeToggle";

const LanguageSwitcher = dynamic(() => import("./language-switcher"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[26px] w-[72px] rounded-md border border-black/10 dark:border-white/20"
      aria-hidden
    />
  ),
});

export default function MobileHeaderBar() {
  return (
    <div className="flex h-[60px] w-full fixed inset-x-0 top-0 z-[5000] mx-auto items-center justify-end border-b border-tech-card-border bg-page/80 px-3 backdrop-blur-sm transition-colors duration-300 max-md:pt-3 md:hidden">
      <div className="z-50 flex items-center gap-3 -translate-y-1 translate-x-5">
        <LanguageSwitcher />
        <DeferredThemeToggle />
        <HamburgerMenu />
      </div>
    </div>
  );
}
