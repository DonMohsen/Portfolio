"use client";

import { useEffect, useState, type ComponentType } from "react";

export default function DesktopSpaceSection() {
  const [SpaceSectionComponent, setSpaceSectionComponent] = useState<null | ComponentType>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
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
    if (!isDesktop || SpaceSectionComponent) return;

    let isMounted = true;
    import("./SpaceSection").then((mod) => {
      if (isMounted) setSpaceSectionComponent(() => mod.default);
    });

    return () => {
      isMounted = false;
    };
  }, [isDesktop, SpaceSectionComponent]);

  if (!isDesktop || !SpaceSectionComponent) return null;

  return <SpaceSectionComponent />;
}
