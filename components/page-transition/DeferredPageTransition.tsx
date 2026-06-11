"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { scheduleAfterLoadIdle } from "@/lib/schedule-idle";

const PageTransitionProvider = dynamic(
  () => import("./PageTransitionProvider"),
  { ssr: false }
);

export default function DeferredPageTransition() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterLoadIdle(() => setReady(true), {
      minDelayMs: 5000,
      idleTimeoutMs: 12000,
    });
  }, []);

  if (!ready) return null;

  return <PageTransitionProvider />;
}
