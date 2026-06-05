"use client";

import { useEffect, useRef } from "react";

type HeroCosmicBackgroundProps = {
  /** Star cluster sits on the right for LTR, left for RTL hero layouts. */
  align?: "left" | "right";
};

const DESKTOP_STARS = 48;
const MOBILE_STARS = 10;
const CONNECTION_DISTANCE_DESKTOP = 110;
const CONNECTION_DISTANCE_MOBILE = 65;
const MOUSE_RADIUS = 150;

type StarParticle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  update: (bounds: { minX: number; maxX: number; height: number }) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

function createStar(
  width: number,
  height: number,
  minX: number,
  maxX: number
): StarParticle {
  const x = minX + Math.random() * (maxX - minX);
  const y = Math.random() * height;
  const size = Math.random() * 1.8 + 0.4;
  const vx = (Math.random() - 0.5) * 0.3;
  const vy = (Math.random() - 0.5) * 0.3;

  const rand = Math.random();
  let color = "rgba(255, 255, 255, 0.65)";
  if (rand > 0.85) color = "rgba(248, 183, 140, 0.75)";
  else if (rand > 0.65) color = "rgba(142, 214, 245, 0.6)";
  else if (rand > 0.45) color = "rgba(217, 179, 255, 0.55)";

  return {
    x,
    y,
    size,
    vx,
    vy,
    color,
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

      if (this.y < 0) {
        this.vy = Math.abs(this.vy);
        this.y = 1;
      } else if (this.y > bounds.height) {
        this.vy = -Math.abs(this.vy);
        this.y = bounds.height - 1;
      }
    },
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.shadowBlur = this.size * 2.5;
      context.shadowColor = this.color;
      context.fill();
      context.shadowBlur = 0;
    },
  };
}

export default function HeroCosmicBackground({
  align = "right",
}: HeroCosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const getBounds = (width: number) => {
      if (align === "left") {
        return { minX: 0, maxX: width * 0.55 };
      }
      return { minX: width * 0.45, maxX: width };
    };

    const isMobile = () => window.innerWidth < 768;
    const starCount = () => (isMobile() ? MOBILE_STARS : DESKTOP_STARS);
    const linkDistance = () =>
      isMobile() ? CONNECTION_DISTANCE_MOBILE : CONNECTION_DISTANCE_DESKTOP;

    const initStars = () => {
      const width = canvas.width;
      const height = canvas.height;
      const bounds = getBounds(width);
      stars = Array.from({ length: starCount() }, () =>
        createStar(width, height, bounds.minX, bounds.maxX)
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

    const drawStatic = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const bounds = getBounds(width);
      const distance = linkDistance();

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.draw(ctx);
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i]!.x - stars[j]!.x;
          const dy = stars[i]!.y - stars[j]!.y;
          const dist = Math.hypot(dx, dy);
          if (dist < distance) {
            const alpha = ((distance - dist) / distance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i]!.x, stars[i]!.y);
            ctx.lineTo(stars[j]!.x, stars[j]!.y);
            ctx.strokeStyle = `rgba(248, 183, 140, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      void bounds;
    };

    const animate = () => {
      if (!running || disposed) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const bounds = getBounds(width);
      const distance = linkDistance();

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          star.x -= (dx / dist) * force * 1.5;
          star.y -= (dy / dist) * force * 1.5;
        }

        star.update({ ...bounds, height });
        star.draw(ctx);
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i]!.x - stars[j]!.x;
          const dy = stars[i]!.y - stars[j]!.y;
          const dist = Math.hypot(dx, dy);
          if (dist < distance) {
            const alpha = ((distance - dist) / distance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i]!.x, stars[i]!.y);
            ctx.lineTo(stars[j]!.x, stars[j]!.y);
            ctx.strokeStyle = `rgba(248, 183, 140, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (disposed) return;
      resize();
      if (reducedMotion) {
        drawStatic();
        return;
      }
      running = true;
      animate();
    };

    const scheduleStart = () => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(start, { timeout: 1800 });
        return () => window.cancelIdleCallback(id);
      }
      const id = globalThis.setTimeout(start, 16);
      return () => globalThis.clearTimeout(id);
    };

    const cancelSchedule = scheduleStart();

    const onResize = () => {
      resize();
      if (reducedMotion) drawStatic();
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
      if (!reducedMotion && !running) {
        running = true;
        animate();
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      running = false;
      cancelSchedule();
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [align]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 80%)",
      }}
    />
  );
}
