"use client";

import Link from "next/link";
import { preparePageTransition } from "@/components/page-transition/prefetch";
import { motion } from "framer-motion";
import { scale, slide } from "./anim";
import styles from "./curve-menu-link.module.css";

type CurveMenuLinkProps = {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  onNavigate?: () => void;
};

export default function CurveMenuLink({
  data,
  isActive,
  setSelectedIndicator,
  onNavigate,
}: CurveMenuLinkProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      />
      <Link
        href={href}
        onClick={onNavigate}
        onPointerEnter={preparePageTransition}
        onFocus={preparePageTransition}
      >
        {title}
      </Link>
    </motion.div>
  );
}
