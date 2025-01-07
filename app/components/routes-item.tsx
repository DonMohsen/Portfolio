"use client";
import React, { useEffect, useState } from "react";
import { webRoutesType } from "../Types/webRoutesTypes";
import { IconType } from "react-icons";
import clsx from "clsx";

const RoutesItem = ({
  emptyIcon,
  filledIcon,
  text,
  routesChildren,
  isActive,
  
  route,
}: {
  text: string;
  filledIcon: IconType;
  emptyIcon: IconType;
  isActive?: boolean;
  route?: string;
  routesChildren?: webRoutesType[];
}) => {
  const [openChildren, setOpenChildren] = useState<string[]>([])
  useEffect(() => {
  //  console.log(openChildren);
   
  }, [openChildren])
  
  const handleOpen=(text:string)=>{
    // console.log(text);
    
    if (openChildren.includes(text)) {
      setOpenChildren(openChildren.filter((item)=>item!==text))
    }
    if (!openChildren.includes(text)) {
      setOpenChildren([...openChildren,text])
      
    }
  }
  return (
    <div
    onClick={()=>handleOpen(text)}
      key={text}
      className="cursor-pointer w-full flex flex-col items-center justify-start"
    >
      {routesChildren && "+"}

      {text}
      {routesChildren &&
        routesChildren.map((child: webRoutesType) => {
       
          return (
            <div className={clsx('bg-slate-500 block',openChildren.includes(text&&'hidden'))} key={child.text}>
              <RoutesItem
                emptyIcon={child.emptyIcon}
                filledIcon={child.filledIcon}
                text={child.text}
                isActive={child.isActive}
                key={child.text}
                route={child.route}
                routesChildren={child.routesChildren}
              />{" "}
            </div>
          );
        })}
    </div>
  );
};

export default RoutesItem;
