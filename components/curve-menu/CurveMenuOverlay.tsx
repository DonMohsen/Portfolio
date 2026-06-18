"use client";

import { AnimatePresence, motion } from "framer-motion";
import CurveMenu from "@/components/curve-menu";
import styles from "@/components/curve-menu/curve-menu.module.css";
import { slide } from "@/components/curve-menu/anim";
import RoutesItem from "@/components/routes-item";
import useHamburgerMenu from "@/store/useHamburgerMenu";
import { webRoutesType } from "@/app/Types/webRoutesTypes";
import useWebRoutes from "@/app/utils/useWebRoutes";

export default function CurveMenuOverlay() {
  const webRoutes = useWebRoutes();
  const menuOpen = useHamburgerMenu((state) => state.hamburgerMenuState);

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
            className={`${styles.backdrop} z-[5999] bg-black/30 md:hidden`}
            aria-hidden
          />

          <CurveMenu key="curve-menu" bodyClassName={styles.portfolioBody}>
            <div className={`${styles.nav} ${styles.portfolioNav}`}>
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
