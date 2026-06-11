"use client";

import { useEffect, useRef, useState } from "react";
import ProjectImageCarousel from "./ProjectImageCarousel";

type ProjectImageCarouselLazyProps = {
  images: string[];
  title: string;
};

export default function ProjectImageCarouselLazy({
  images,
  title,
}: ProjectImageCarouselLazyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "280px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative aspect-[16/7] w-full rounded-t-2xl bg-page/40">
      {visible ? (
        <ProjectImageCarousel images={images} title={title} />
      ) : null}
    </div>
  );
}
