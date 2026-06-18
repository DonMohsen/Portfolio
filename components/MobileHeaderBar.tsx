"use client";

import clsx from "clsx";
import HamburgerMenu from "./hamburger-menu";
import DeferredThemeToggle from "./DeferredThemeToggle";
import LanguageSwitcher from "./language-switcher";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import SiteHeaderShell from "./SiteHeaderShell";

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
