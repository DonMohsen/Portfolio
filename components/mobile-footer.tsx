"use client";

import useWebRoutes from "@/app/utils/useWebRoutes";
import MobileItem from "./mobile-route-item";

const MobileFooter = () => {
  const routes = useWebRoutes();
  return (
    <div
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-[80] 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem key={route.id} route={route} />
      ))}
    </div>
  );
};

export default MobileFooter;
