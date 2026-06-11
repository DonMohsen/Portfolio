"use client";

import { useEffect } from "react";
import { syncDvhUnit } from "@/lib/viewport";

export default function ViewportLock() {
  useEffect(() => {
    syncDvhUnit();
    window.addEventListener("orientationchange", syncDvhUnit);
    return () => window.removeEventListener("orientationchange", syncDvhUnit);
  }, []);

  return null;
}
