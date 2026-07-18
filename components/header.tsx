"use client";

import { useEffect, useState } from "react";
import MobileHeaderBar from "./MobileHeaderBar";
import SiteHeaderShell from "./SiteHeaderShell";

export const Header = () => {
  return (
    <>
      <MobileHeaderBar />
      <SiteHeaderShell className="fixed inset-x-0 top-0 z-[5000] mx-auto hidden h-[52px] w-full items-center justify-center px-3 md:flex">
        <DesktopHeaderNavGate />
      </SiteHeaderShell>
    </>
  );
};

/**
 * DesktopHeaderNav is CSS-hidden below `md` (see SiteHeaderShell above) but
 * still drags in its own framer-motion copy via next/dynamic. Skipping the
 * import entirely below the `md` breakpoint keeps that chunk off mobile
 * pages, where it would never be shown anyway.
 */
function DesktopHeaderNavGate() {
  const [DesktopHeaderNav, setDesktopHeaderNav] = useState<
    (() => React.JSX.Element) | null
  >(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isDesktop || DesktopHeaderNav) return;

    let isMounted = true;
    import("./DesktopHeaderNav").then((mod) => {
      if (isMounted) setDesktopHeaderNav(() => mod.default);
    });

    return () => {
      isMounted = false;
    };
  }, [isDesktop, DesktopHeaderNav]);

  if (!isDesktop || !DesktopHeaderNav) return null;

  return <DesktopHeaderNav />;
}
