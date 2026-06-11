"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CurveMenu from "@/components/curve-menu";
import styles from "@/components/curve-menu/curve-menu.module.css";
import { slide } from "@/components/curve-menu/anim";
import RoutesItem from "@/components/routes-item";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import useWebRoutes from "@/app/utils/useWebRoutes";
import { lockPageScroll } from "@/lib/scroll-lock";

const MENU_BODY_SELECTOR = "[data-curve-menu-body]";

export default function CurveMenuOverlay() {
  const webRoutes = useWebRoutes();
  const menuOpen = useHamburgerMenu((state) => state.hamburgerMenuState);
  const closeMenu = useHamburgerMenu((state) => state.closeHamburgerMenuState);

  useEffect(() => {
    if (!menuOpen) return;

    const releaseScroll = lockPageScroll();

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        event.preventDefault();
        return;
      }

      const scrollable = target.closest(MENU_BODY_SELECTOR);
      if (!scrollable || !(scrollable instanceof HTMLElement)) {
        event.preventDefault();
        return;
      }

      if (scrollable.scrollHeight <= scrollable.clientHeight) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      releaseScroll();
    };
  }, [menuOpen]);

  return (
    <AnimatePresence mode="wait">
      {menuOpen ? (
        <>
          <motion.div
            key="curve-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className={`${styles.backdrop} z-[5999] cursor-pointer bg-black/30 md:hidden`}
            onClick={closeMenu}
            aria-hidden
          />

          <CurveMenu key="curve-menu" bodyClassName={styles.portfolioBody}>
            <div className={`${styles.nav} ${styles.portfolioNav}`}>
              <div className={styles.navHeader}>
                <p>Navigation</p>
              </div>
              {webRoutes.map((item: webRoutesType, index) => (
                <motion.div
                  key={item.id}
                  className="min-w-0 max-w-full"
                  custom={index}
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <RoutesItem webRoute={item} inCurveMenu />
                </motion.div>
              ))}
            </div>
          </CurveMenu>
        </>
      ) : null}
    </AnimatePresence>
  );
}
