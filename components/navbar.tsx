"use client";

import RoutesItem from "./routes-item";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import useWebRoutes from "@/app/utils/useWebRoutes";

const Navbar = () => {
  const webRoutes = useWebRoutes();
  const hamValue = useHamburgerMenu((state) => state.hamburgerMenuState);
  const toggleHamburger = useHamburgerMenu(
    (state) => state.toggleHamburgerMenuState
  );

  if (!hamValue) return null;

  return (
    <div className="nav-overlay fixed inset-0 top-[60px] z-[6000]">
      <div
        onClick={toggleHamburger}
        className="absolute inset-0 bg-black/30"
        aria-hidden
      />

      <aside className="nav-panel fixed right-0 top-[60px] bottom-0 z-10 flex w-[85%] max-w-sm flex-col bg-white px-4 py-6 shadow-xl dark:bg-[#160d1c] md:w-[40%] lg:w-[30%]">
        {webRoutes.map((item: webRoutesType) => (
          <RoutesItem key={item.id} webRoute={item} />
        ))}
      </aside>
    </div>
  );
};

export default Navbar;
