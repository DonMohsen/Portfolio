"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { menuEase } from "./anim";
import { readVisualViewportHeight } from "@/lib/viewport";
import styles from "./curve.module.css";

/**
 * Faithful port of olivierlarose/curved-menu Curve — paths use live visual viewport height.
 */
export default function Curve() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const sync = () => setHeight(readVisualViewportHeight());
    sync();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", sync);
    viewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);

    return () => {
      viewport?.removeEventListener("resize", sync);
      viewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  if (height <= 0) return null;

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: menuEase },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: menuEase },
    },
  };

  return (
    <svg className={styles.svgCurve} aria-hidden>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
