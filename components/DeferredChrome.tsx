"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useHamburgerMenu from "@/store/useHamburgerMenu";

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((mod) => mod.Toaster),
  { ssr: false }
);

function scheduleMount(onReady: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(onReady, { timeout: 4000 });
      return;
    }
    window.setTimeout(onReady, 2000);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}

export default function DeferredChrome() {
  const [navbarReady, setNavbarReady] = useState(false);
  const menuOpen = useHamburgerMenu((state) => state.hamburgerMenuState);

  useEffect(() => {
    scheduleMount(() => setNavbarReady(true));
  }, []);

  useEffect(() => {
    if (menuOpen) setNavbarReady(true);
  }, [menuOpen]);

  return (
    <>
      {navbarReady && <Navbar />}
      <Toaster />
    </>
  );
}
