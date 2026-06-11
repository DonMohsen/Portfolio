"use client";

import { useEffect } from "react";
import { dispatchDvhSync, syncDvhUnit } from "@/lib/viewport";

const DESKTOP_MQ = "(min-width: 1024px)";
const MOBILE_HEIGHT_JUMP_PX = 120;

export default function ViewportLock() {
  useEffect(() => {
    syncDvhUnit();

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    let frame = 0;
    let lastMobileHeight = window.innerHeight;

    const commit = () => {
      syncDvhUnit();
      dispatchDvhSync();
    };

    const onOrientationChange = () => {
      commit();
      lastMobileHeight = window.innerHeight;
    };

    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (desktopMq.matches) {
          commit();
          return;
        }

        const height = window.innerHeight;
        if (Math.abs(height - lastMobileHeight) >= MOBILE_HEIGHT_JUMP_PX) {
          lastMobileHeight = height;
          commit();
        }
      });
    };

    window.addEventListener("orientationchange", onOrientationChange);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("orientationchange", onOrientationChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
