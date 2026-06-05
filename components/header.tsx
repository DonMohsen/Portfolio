"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import HamburgerMenu from "./hamburger-menu";
import LanguageSwitcher from "./language-switcher";
import DeferredThemeToggle from "./DeferredThemeToggle";

const DesktopHeaderNav = dynamic(() => import("./DesktopHeaderNav"), {
  ssr: false,
  loading: () => <div className="hidden md:block h-[60px] w-full" aria-hidden />,
});

export const Header = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(media.matches);
    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setBackgroundOpacity(Math.min(1, Math.max(0, window.scrollY / 120)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-IRANSansXExtraBold">
      <div
        className={clsx(
          "h-[60px] text-[#dddada] flex w-full fixed z-[5000] top-0 inset-x-0 mx-auto px-3 max-md:pt-3 font-extralight items-center justify-between space-x-10 transition-colors duration-300"
        )}
        style={{
          backgroundColor: isDark
            ? `rgba(22, 13, 28, ${backgroundOpacity})`
            : `rgba(255, 255, 255, ${backgroundOpacity})`,
          borderBottom: `1px solid ${
            isDark
              ? `rgba(255, 255, 255, ${backgroundOpacity * 0.1})`
              : `rgba(0, 0, 0, ${backgroundOpacity * 0.1})`
          }`,
        }}
      >
        {isDesktop ? (
          <DesktopHeaderNav />
        ) : (
          <div className="hidden md:block h-[60px] w-full" aria-hidden />
        )}

        <div className="z-50 text-white w-full md:hidden flex items-center gap-3 justify-end -translate-y-1 translate-x-5">
          <LanguageSwitcher />
          <DeferredThemeToggle />
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
};
