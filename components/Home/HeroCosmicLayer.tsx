"use client";

import { useEffect, useRef, useState } from "react";
import { isDarkTheme, readPageBg } from "@/lib/brand";

type HeroCosmicLayerProps = {
  align?: "left" | "right";
};

const DESKTOP_STARS = 48;
const MOBILE_STARS = 30;
const CONNECTION_DISTANCE_DESKTOP = 110;
const CONNECTION_DISTANCE_MOBILE = 92;
const MOUSE_RADIUS = 150;
const MAX_SM_BREAKPOINT = 640;

type StarParticle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  glow: boolean;
  update: (bounds: StarBounds) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

type StarBounds = {
  minX: number;
  maxX: number;
  minY: number;
  height: number;
};

function isMaxSm(width = window.innerWidth) {
  return width < MAX_SM_BREAKPOINT;
}

function isMobileLayout(width = window.innerWidth) {
  return width < 1024;
}

function getBounds(width: number, height: number, align: "left" | "right") {
  if (isMaxSm(width)) {
    return {
      minX: width * 0.06,
      maxX: width * 0.94,
      minY: height * 0.46,
    };
  }

  if (isMobileLayout(width)) {
    return {
      minX: width * 0.06,
      maxX: width * 0.94,
      minY: 0,
    };
  }

  if (align === "left") {
    return { minX: 0, maxX: width * 0.55, minY: 0 };
  }

  return { minX: width * 0.45, maxX: width, minY: 0 };
}

function pickStarColor(isDark: boolean): string {
  const rand = Math.random();
  if (isDark) {
    if (rand > 0.85) return "rgba(248, 183, 140, 0.75)";
    if (rand > 0.65) return "rgba(142, 214, 245, 0.6)";
    if (rand > 0.45) return "rgba(217, 179, 255, 0.55)";
    return "rgba(255, 255, 255, 0.65)";
  }
  if (rand > 0.85) return "rgba(201, 149, 106, 0.9)";
  if (rand > 0.65) return "rgba(26, 39, 68, 0.72)";
  if (rand > 0.45) return "rgba(74, 84, 112, 0.58)";
  return "rgba(42, 52, 82, 0.78)";
}

function createStar(
  width: number,
  height: number,
  minX: number,
  maxX: number,
  isDark: boolean,
  dense = false,
  minY = 0
): StarParticle {
  const x = minX + Math.random() * (maxX - minX);
  const span = Math.max(height - minY, 1);
  const y = minY + Math.random() * span;
  const size = dense
    ? Math.random() * 2.1 + 0.65
    : Math.random() * 1.8 + 0.4;
  const vx = (Math.random() - 0.5) * 0.3;
  const vy = (Math.random() - 0.5) * 0.3;
  const color = pickStarColor(isDark);

  return {
    x,
    y,
    size,
    vx,
    vy,
    color,
    glow: isDark,
    update(bounds) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < bounds.minX) {
        this.vx = Math.abs(this.vx);
        this.x = bounds.minX + 1;
      } else if (this.x > bounds.maxX) {
        this.vx = -Math.abs(this.vx);
        this.x = bounds.maxX - 1;
      }

      if (this.y < bounds.minY) {
        this.vy = Math.abs(this.vy);
        this.y = bounds.minY + 1;
      } else if (this.y > bounds.height) {
        this.vy = -Math.abs(this.vy);
        this.y = bounds.height - 1;
      }
    },
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fillStyle = this.color;
      if (this.glow) {
        context.shadowBlur = this.size * 2.5;
        context.shadowColor = this.color;
      }
      context.fill();
      context.shadowBlur = 0;
    },
  };
}

const TECH_STACK_SELECTOR = "[data-tech-stack-section]";

function getFadeProgress() {
  const el = document.querySelector(TECH_STACK_SELECTOR);
  const vh = window.innerHeight;
  if (!el || vh <= 0) return 0;

  const top = el.getBoundingClientRect().top;

  if (top >= vh) return 0;
  if (top <= 0) return 1;

  return (vh - top) / vh;
}

export default function HeroCosmicLayer({ align = "right" }: HeroCosmicLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fadeRef = useRef(0);
  const isDarkRef = useRef(true);
  const [fade, setFade] = useState(0);
  const [veilColor, setVeilColor] = useState("#171a36");

  useEffect(() => {
    const syncThemeTokens = () => {
      setVeilColor(readPageBg());
      isDarkRef.current = isDarkTheme();
    };

    syncThemeTokens();
    const themeObserver = new MutationObserver(syncThemeTokens);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => themeObserver.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateFade = () => {
      const next = getFadeProgress();
      fadeRef.current = next;
      setFade(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFade);
    };

    updateFade();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mouse = { x: -1000, y: -1000 };
    let stars: StarParticle[] = [];
    let frameId = 0;
    let running = false;
    let disposed = false;

    const starCount = () =>
      isMobileLayout() ? MOBILE_STARS : DESKTOP_STARS;
    const linkDistance = () =>
      isMobileLayout()
        ? CONNECTION_DISTANCE_MOBILE
        : CONNECTION_DISTANCE_DESKTOP;

    const initStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const { minX, maxX, minY } = getBounds(width, height, align);
      const isDark = isDarkTheme();
      isDarkRef.current = isDark;
      const dense = isMobileLayout();
      stars = Array.from({ length: starCount() }, () =>
        createStar(width, height, minX, maxX, isDark, dense, minY)
      );
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const connectionStroke = (alpha: number) => {
      if (isDarkRef.current) {
        return `rgba(248, 183, 140, ${alpha})`;
      }
      const strength = Math.min(0.42, alpha * 2.4);
      return `rgba(42, 52, 82, ${strength})`;
    };

    const drawFrame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const { minX, maxX, minY } = getBounds(width, height, align);
      const distance = linkDistance();
      const mobile = isMobileLayout();
      const starBounds: StarBounds = { minX, maxX, minY, height };

      ctx.clearRect(0, minY, width, height - minY);

      for (const star of stars) {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          star.x -= (dx / dist) * force * 1.5;
          star.y -= (dy / dist) * force * 1.5;
        }

        star.update(starBounds);
        star.draw(ctx);
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i]!.x - stars[j]!.x;
          const dy = stars[i]!.y - stars[j]!.y;
          const dist = Math.hypot(dx, dy);
          if (dist < distance) {
            const lineAlpha = isDarkRef.current
              ? mobile
                ? 0.24
                : 0.15
              : mobile
                ? 0.3
                : 0.22;
            const alpha = ((distance - dist) / distance) * lineAlpha;
            ctx.beginPath();
            ctx.moveTo(stars[i]!.x, stars[i]!.y);
            ctx.lineTo(stars[j]!.x, stars[j]!.y);
            ctx.strokeStyle = connectionStroke(alpha);
            ctx.lineWidth = mobile ? 0.68 : 0.55;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!running || disposed) return;
      if (fadeRef.current < 1) {
        drawFrame();
      }
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (disposed) return;
      resize();
      if (reducedMotion) {
        drawFrame();
        return;
      }
      running = true;
      animate();
    };

    const scheduleId = requestAnimationFrame(start);
    const cancelSchedule = () => cancelAnimationFrame(scheduleId);

    const onResize = () => {
      resize();
      if (reducedMotion) drawFrame();
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
        return;
      }
      if (!reducedMotion && !running && fadeRef.current < 1) {
        running = true;
        animate();
      }
    };

    const onThemeChange = () => {
      initStars();
      if (reducedMotion) drawFrame();
    };

    const themeObserver = new MutationObserver(onThemeChange);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      disposed = true;
      running = false;
      cancelSchedule();
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [align]);

  const cosmicOpacity = 1 - fade;
  const hidden = fade >= 1;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1] dark:hidden max-sm:[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_40%,black_52%)] max-sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_40%,black_52%)]"
        style={{
          opacity: cosmicOpacity,
          visibility: hidden ? "hidden" : "visible",
          background: `
            radial-gradient(ellipse 85% 100% at 90% 45%, rgba(255, 205, 130, 0.45) 0%, rgba(255, 222, 175, 0.18) 42%, transparent 74%),
            radial-gradient(ellipse 70% 60% at 92% 88%, rgba(255, 195, 115, 0.35) 0%, transparent 70%)
          `,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none fixed inset-0 z-[1] max-sm:[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_40%,black_52%)] max-sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_40%,black_52%)]"
        style={{
          opacity: cosmicOpacity,
          visibility: hidden ? "hidden" : "visible",
        }}
        aria-hidden
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          opacity: fade,
          visibility: fade > 0 ? "visible" : "hidden",
          backgroundColor: veilColor,
          transition: "background-color 0.45s ease",
        }}
      />
    </>
  );
}
