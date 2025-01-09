"use client";
import NextjsIcon from "../public/icons/react-svgrepo-com.svg"
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./Infinite-cards";

export function InfiniteDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-end relative overflow-hidden">
      <InfiniteMovingCards
        // items={logos}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const logos = [
  {
    src:"/public/icons/react-svgrepo-com.svg"
  },
  {
    src:"/public/icons/icons8-nextjs.svg"
  },
  {
    src:"/public/icons/icons8-nextjs.svg"
  },
  {
    src:"/public/icons/icons8-nextjs.svg"
  },
];
