"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ContactWidget = dynamic(() => import("@/components/contact/ContactWidget"), {
  ssr: false,
});

const WIDGET_DEFER_MS = 2800;

export default function DeferredContactWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(mount, { timeout: WIDGET_DEFER_MS });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timer = window.setTimeout(mount, WIDGET_DEFER_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return ready ? <ContactWidget /> : null;
}
