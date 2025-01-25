"use client";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const HeaderChildItems = ({ item }: { item: webRoutesType }) => {
  return (
    <div className="fixed top-[50px] w-[100%] right-[0%]">
      <div className="bg-[#160d1c]  h-[300px] flex items-center flex-col justify-start ">
        <div className="text-3xl font-extrabold mt-6">{item.text}</div>
        <div className="w-full  flex items-start justify-center gap-10 flex-wrap mt-10">
          {item.routesChildren &&
            item.routesChildren.map((child) => (
              <>
                <div className="flex items-center flex-col justify-center min-w-[200px] font-medium ">
                  <div>{child.text}</div>
                  <div>
                    {child.routesChildren?.map((child) => (
                      <>
                        <div className="flex items-center justify-center min-w-[200px] text-xs font-extralight mt-10 ">
                          {child.text}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderChildItems;
