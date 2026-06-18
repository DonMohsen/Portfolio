"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
import HamburgerMenu from "./hamburger-menu";
import DeferredThemeToggle from "./DeferredThemeToggle";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import SiteHeaderShell from "./SiteHeaderShell";

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
    <SiteHeaderShell
      className={clsx(
        "fixed inset-x-0 top-0 z-[7000] mx-auto flex h-[52px] w-full items-center justify-end px-3 md:hidden",
        menuOpen && "pointer-events-none"
      )}
    >
      <div className="pointer-events-auto relative z-[7001] flex items-center gap-2.5">
        <LanguageSwitcher />
        <DeferredThemeToggle />
        <HamburgerMenu />
      </div>
    </SiteHeaderShell>
  );
}
