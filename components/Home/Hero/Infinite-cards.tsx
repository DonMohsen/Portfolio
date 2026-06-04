"use client";
import { AllTechstackType } from "@/app/Types/AllTechstackTypes";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
  compact = false
}: {
  items: AllTechstackType[]
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow" | "xslow";
  pauseOnHover?: boolean;
  className?: string;
  compact?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();

  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "slow") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller bg-transparent z-[51] relative   max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) =>
        {


            return (
              <li
                 className={cn(
                  "bg-slate-100 border-none relative rounded-2xl border dark:bg-gradient-to-b from-slate-800 to-slate-600 flex-shrink-0 flex items-center justify-center",
                  compact
                    ? "w-[170px] max-md:w-[130px]"
                    : "w-[250px] max-md:w-[150px]"
                 )}
            // style={{
            //   background:
            //     "linear-gradient(180deg, var(--slate-600), var(--slate-900)",
            // }}
            key={item.id}
          >
            <div className={cn("flex flex-col items-center justify-center", compact ? "py-3 max-md:py-2" : "py-5 max-md:py-2")}>
              
                  <Image 
                  className={cn(compact ? "w-8 h-8 max-md:w-6 max-md:h-6" : "w-12 h-12 max-md:w-8 max-md:h-8")}
                  alt="nextjs-icon" src={item.src} width={70} height={70}/>
                    <p className={cn("text-black", compact ? "text-xs mt-1" : "text-base")}>
                        {item.name}
                    </p>
             
            </div>
              </li>
            )
        }
    )
        }
            
      </ul>
    </div>
  );
};

