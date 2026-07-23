"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { scheduleAfterLcp } from "@/lib/schedule-after-lcp";
import { CURVE_MENU_PREPARE_EVENT } from "@/components/curve-menu/prefetch";

type AnyComp = ComponentType<Record<string, never>>;

/**
 * All chrome loads via imperative import() after LCP — avoids next/dynamic
 * prefetch of framer-motion bundles during initial hydration.
 */
export default function DeferredChrome() {
  const [nodes, setNodes] = useState<ReactNode>(null);
  const [menu, setMenu] = useState<ReactNode>(null);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterLcp(() => {
      void Promise.all([
        import("@/components/navigation/CommandPalette"),
        import("@/components/ui/toaster").then((m) => ({
          default: m.Toaster as AnyComp,
        })),
        import("@/components/contact/DeferredContactWidget"),
      ]).then(([cmd, toast, contact]) => {
        if (cancelled) return;
        setNodes(
          <>
            <cmd.default />
            <toast.default />
            <contact.default />
          </>
        );
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!nodes) return;

    let cancelled = false;

    const enableMenu = () => {
      void import("@/components/motion-chrome-bundle").then((mod) => {
        if (cancelled) return;
        const Overlay = mod.CurveMenuOverlay;
        setMenu(<Overlay />);
      });
    };

    window.addEventListener("curve-menu:open", enableMenu);
    window.addEventListener(CURVE_MENU_PREPARE_EVENT, enableMenu);

    return () => {
      cancelled = true;
      window.removeEventListener("curve-menu:open", enableMenu);
      window.removeEventListener(CURVE_MENU_PREPARE_EVENT, enableMenu);
    };
  }, [nodes]);

  return (
    <>
      {nodes}
      {menu}
    </>
  );
}
