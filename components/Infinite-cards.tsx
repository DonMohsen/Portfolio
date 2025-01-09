"use client";
import NextjsIcon from "../public/icons8-nextjs-144.png"

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
export const logos = [
    
      {
        src:"/icons/nextjs.svg",
        name:"Next.js"
    },  

    {
      src:"/icons/reactjs.svg",
      name:"React"
  },
         
  {
    src:"/icons/prisma.svg",
    name:"Prisma ORM"
},    

{
  src:"/icons/tailwindcss.svg",
  name:"Tailwind CSS"
},
    
{
    src:"/icons/typescript.svg",
    name:"Typescript"
},
       
{
    src:"/icons/expressjs.svg",
    name:"Express.js"
},
       
{
    src:"/icons/redux.svg",
    name:"Redux"
},
    
{
    src:"/icons/git.svg",
    name:"Git"
},
    
{
    src:"/icons/restapi.svg",
    name:"Rest API"
},
    
{
    src:"/icons/mongodb.svg",
    name:"Mongo DB"
},
   
       
{
    src:"/icons/uiux.svg",
    name:"UI UX Patterns"
},
   
   
 
   
       
   
   
  ];
  
export const InfiniteMovingCards = ({
//   items,
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: {
//   items: {
//     src:string
//   }[];
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
        {logos.map((item,idx) =>
        {


            return (
              <li
                 className="w-[150px]  relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 flex items-center justify-center "
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={idx}
          >
            <div className="flex flex-col items-center justify-center py-5">
              
                  <Image 
                  className="w-12 h-12"
                  alt="nextjs-icon" src={item.src} width={70} height={70}/>
                    <p>
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

