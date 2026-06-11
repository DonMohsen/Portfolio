"use client";

import { motion } from "framer-motion";
import { menuSlide } from "./anim";
import Curve from "./Curve";
import styles from "./curve-menu.module.css";

type CurveMenuProps = {
  children: React.ReactNode;
  bodyClassName?: string;
};

/**
 * Olivier Larose curved menu panel — https://github.com/olivierlarose/curved-menu
 * Hamburger icon is external; this is only the sliding panel + SVG curve.
 */
export default function CurveMenu({ children, bodyClassName }: CurveMenuProps) {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.menu} md:hidden`}
    >
      <div
        data-curve-menu-body
        className={`${styles.body} ${bodyClassName ?? ""}`.trim()}
      >
        {children}
      </div>
      <Curve />
    </motion.div>
  );
}

export { default as CurveMenuLink } from "./CurveMenuLink";
export * from "./anim";
