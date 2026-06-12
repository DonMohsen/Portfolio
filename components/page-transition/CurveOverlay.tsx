"use client";

import { motion, type Variants } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { curvePath, routeText } from "./anim";
import { getCurveGeometry } from "./curve-geometry";
import styles from "./page-transition.module.css";

export type CurvePhase = "cover" | "reveal";

type CurveOverlayProps = {
  routeLabel: string;
  phase: CurvePhase;
  /** History back/forward — skip cover rise, start fully covered then reveal. */
  fromCovered?: boolean;
  onPhaseComplete: () => void;
};

function phaseKeys(phase: CurvePhase, fromCovered: boolean) {
  if (fromCovered && phase === "reveal") {
    return { initial: "coverTo", animate: "revealTo" } as const;
  }
  return {
    initial: phase === "cover" ? "coverFrom" : "revealFrom",
    animate: phase === "cover" ? "coverTo" : "revealTo",
  } as const;
}

function motionPhaseProps(
  variants: Variants,
  phase: CurvePhase,
  fromCovered: boolean,
  onComplete: () => void
) {
  const { initial, animate } = phaseKeys(phase, fromCovered);
  return {
    variants,
    initial,
    animate,
    onAnimationComplete: (definition: string) => {
      if (definition === animate) onComplete();
    },
  };
}

function CurveSvg({
  width,
  height,
  phase,
  fromCovered,
  onPhaseComplete,
}: {
  width: number;
  height: number;
  phase: CurvePhase;
  fromCovered: boolean;
  onPhaseComplete: () => void;
}) {
  const { initialPath, targetPath, translateVariants } = getCurveGeometry(
    width,
    height
  );

  return (
    <motion.svg
      className={styles.svgOverlay}
      aria-hidden
      {...motionPhaseProps(
        translateVariants,
        phase,
        fromCovered,
        onPhaseComplete
      )}
    >
      <motion.path
        {...motionPhaseProps(
          curvePath(initialPath, targetPath),
          phase,
          fromCovered,
          () => {}
        )}
      />
    </motion.svg>
  );
}

export default function CurveOverlay({
  routeLabel,
  phase,
  fromCovered = false,
  onPhaseComplete,
}: CurveOverlayProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : null
  );

  useLayoutEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={styles.pageCurve} aria-hidden>
      <div
        className={styles.background}
        style={{
          opacity: dimensions == null || fromCovered ? 1 : 0,
        }}
      />
      <motion.p
        className={styles.route}
        style={{ x: "-50%", y: "-50%" }}
        {...motionPhaseProps(routeText, phase, fromCovered, () => {})}
      >
        {routeLabel}
      </motion.p>
      {dimensions != null ? (
        <CurveSvg
          width={dimensions.width}
          height={dimensions.height}
          phase={phase}
          fromCovered={fromCovered}
          onPhaseComplete={onPhaseComplete}
        />
      ) : null}
    </div>
  );
}
