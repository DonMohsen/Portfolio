"use client";
import { AllTechstackType } from "@/app/Types/AllTechstackTypes";
import NextjsIcon from "../public/icons8-nextjs-144.png"

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: {
  items: AllTechstackType[]
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
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
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller bg-transparent z-[51] relative   max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) =>
        {


            return (
              <li
                 className="w-[250px] bg-slate-100 border-none max-md:text-xs  relative rounded-2xl border dark:bg-gradient-to-b from-slate-900 to-slate-700 dark:bg-slate-900  flex-shrink-0  flex items-center justify-center max-md:w-[150px] "
            // style={{
            //   background:
            //     "linear-gradient(180deg, var(--slate-600), var(--slate-900)",
            // }}
            key={item.id}
          >
            <div className="flex flex-col items-center justify-center py-5 max-md:py-2">
              
                  <Image 
                  className="w-12 h-12 max-md:w-8 max-md:h-8"
                  alt="nextjs-icon" src={item.src} width={70} height={70}/>
                    <p className="text-black">
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

