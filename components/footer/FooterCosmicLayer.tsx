"use client";

import { useEffect, useRef } from "react";
import { isDarkTheme } from "@/lib/brand";
import {
  cosmicConnectionLineAlpha,
  cosmicConnectionStroke,
  pickCosmicStarColor,
} from "@/lib/cosmic-palette";
import {
  bounceParticleInRect,
  integrateParticleWithBounce,
} from "@/lib/cosmic-particle-bounds";

const DESKTOP_STARS = 28;
const MOBILE_STARS = 18;
const CONNECTION_DISTANCE_DESKTOP = 102;
const CONNECTION_DISTANCE_MOBILE = 84;
const MAX_SM = 640;
const CENTER_EXCLUDE_RX = 0.3;
const CENTER_EXCLUDE_RY = 0.34;

type Star = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  glow: boolean;
};

function isInsideCenterExclusion(
  x: number,
  y: number,
  width: number,
  height: number
) {
  const cx = width / 2;
  const cy = height * 0.46;
  const rx = width * CENTER_EXCLUDE_RX;
  const ry = height * CENTER_EXCLUDE_RY;
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy < 1;
}

function createStar(width: number, height: number, isDark: boolean): Star {
  let x = 0;
  let y = 0;

  for (let attempt = 0; attempt < 24; attempt += 1) {
    x = Math.random() * width;
    y = Math.random() * height;
    if (!isInsideCenterExclusion(x, y, width, height)) break;
  }

  return {
    x,
    y,
    size: Math.random() * 1.6 + 0.45,
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24,
    color: pickCosmicStarColor(isDark),
    glow: isDark,
  };
}

function drawStar(ctx: CanvasRenderingContext2D, star: Star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  if (star.glow) {
    ctx.shadowBlur = star.size * 2.2;
    ctx.shadowColor = star.color;
  }
  ctx.fill();
  ctx.shadowBlur = 0;
}

export default function FooterCosmicLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let disposed = false;

    const starCount = () =>
      window.innerWidth < MAX_SM ? MOBILE_STARS : DESKTOP_STARS;
    const linkDistance = () =>
      window.innerWidth < MAX_SM
        ? CONNECTION_DISTANCE_MOBILE
        : CONNECTION_DISTANCE_DESKTOP;

    const keepStarOutsideCenter = (star: Star) => {
      if (!isInsideCenterExclusion(star.x, star.y, width, height)) return;

      const cx = width / 2;
      const cy = height * 0.46;
      const angle = Math.atan2(star.y - cy, star.x - cx);
      const rx = width * CENTER_EXCLUDE_RX;
      const ry = height * CENTER_EXCLUDE_RY;
      const push = 1.08;
      star.x = cx + Math.cos(angle) * rx * push;
      star.y = cy + Math.sin(angle) * ry * push;
      star.vx = Math.cos(angle) * Math.abs(star.vx);
      star.vy = Math.sin(angle) * Math.abs(star.vy);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDark = isDarkTheme();
      stars = Array.from({ length: starCount() }, () =>
        createStar(width, height, isDark)
      );
    };

    const drawLinks = (mobile: boolean, isDark: boolean) => {
      const distance = linkDistance();
      const lineAlpha = cosmicConnectionLineAlpha(isDark, mobile);

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= distance) continue;

          const alpha = ((distance - dist) / distance) * lineAlpha;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = cosmicConnectionStroke(alpha, isDark);
          ctx.lineWidth = mobile ? 0.68 : 0.55;
          ctx.stroke();
        }
      }
    };

    const drawFrame = (mobile: boolean) => {
      const isDark = isDarkTheme();
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!reducedMotion) {
          integrateParticleWithBounce(
            star,
            { minX: 0, maxX: width, minY: 0, maxY: height },
            star.size + 1
          );
          keepStarOutsideCenter(star);
          bounceParticleInRect(
            star,
            { minX: 0, maxX: width, minY: 0, maxY: height },
            star.size + 1
          );
        }
        drawStar(ctx, star);
      }

      drawLinks(mobile, isDark);
    };

    const tick = () => {
      if (disposed) return;
      drawFrame(window.innerWidth < MAX_SM);
      frameId = window.requestAnimationFrame(tick);
    };

    resize();
    drawFrame(window.innerWidth < MAX_SM);

    if (!reducedMotion) {
      frameId = window.requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      drawFrame(window.innerWidth < MAX_SM);
    };

    window.addEventListener("resize", onResize, { passive: true });

    const themeObserver = new MutationObserver(() => {
      const isDark = isDarkTheme();
      stars = stars.map((star) => ({
        ...star,
        color: pickCosmicStarColor(isDark),
        glow: isDark,
      }));
      drawFrame(window.innerWidth < MAX_SM);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
