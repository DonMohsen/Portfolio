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
    <div className="h-[60px] flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3 items-center justify-end md:hidden">
      <div className="z-50 flex items-center gap-3 -translate-y-1 translate-x-5">
        <LanguageSwitcher />
        <DeferredThemeToggle />
        <HamburgerMenu />
      </div>
    </div>
  );
}
