"use client"
import Link from "next/link";

import clsx from "clsx";
import { webRoutesType } from "@/app/Types/webRoutesTypes";


const MobileItem = ({route}:{route:webRoutesType}) => {
  
  return ( 
    <Link 
      href={route.route} 
      className={clsx(`
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-gray-100
        z-[80]
      `
      )}>
        {route.isActive?<route.filledIcon className="h-6 w-6" />:<route.emptyIcon className="h-6 w-6" />}
        {route.text}
    </Link>
   );
}
 
export default MobileItem;