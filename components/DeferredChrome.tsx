"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CurveMenuOverlay = dynamic(
  () => import("@/components/curve-menu/CurveMenuOverlay"),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((mod) => mod.Toaster),
  { ssr: false }
);

export default function DeferredChrome() {
  const [menuEverOpened, setMenuEverOpened] = useState(false);

  useEffect(() => {
    const onOpen = () => setMenuEverOpened(true);
    window.addEventListener("curve-menu:open", onOpen);
    return () => window.removeEventListener("curve-menu:open", onOpen);
  }, []);

  return (
    <>
      {menuEverOpened ? <CurveMenuOverlay /> : null}
      <Toaster />
    </>
  );
}
