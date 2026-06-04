"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useLocale } from "next-intl";

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  driftPhase: number;
  driftSpeed: number;
  connectable: boolean;
};

const NETWORK_DOTS = 52;
const AMBIENT_STARS = 28;
const REPEL_RADIUS = 122;
const REPEL_FORCE = 0.3;
const RETURN_FORCE = 0.026;
const DAMPING = 0.92;
const LINK_DISTANCE = 86;
const MAX_LINKS_PER_DOT = 2;
const NODE_COLORS = ["#f8b78c", "#8ed6f5", "#d9b3ff", "#f0c7de", "#9de8d8"];

const SpaceSection = () => {
  const locale = useLocale();
  const isFa = locale === "fa";
  const infoCards = [
    {
      label: isFa ? "اکنون" : "Currently",
      value: isFa ? "هلدینگ وینا" : "Building SaaS",
      style: { top: "12%", right: "36%", animation: "float 4s ease-in-out 0s infinite" }
    },
    {
      label: isFa ? "استک" : "Stack",
      value: "Next.js + Typescript",
      style: { top: "30%", right: "18%", animation: "float 4s ease-in-out 1.2s infinite" }
    },
    {
      label: isFa ? "موقعیت" : "Location",
      value: isFa ? "تهران، ایران" : "Tehran, Iran",
      style: { left: "6%", bottom: "32%", animation: "float 4s ease-in-out 2.1s infinite" }
    },
    {
      label: isFa ? "وضعیت همکاری" : "Available",
      value: isFa ? "تمام وقت" : "Full-time",
      style: { right: "24%", bottom: "8%", animation: "float 4s ease-in-out 0.6s infinite" }
    }
  ].map((card) => (isFa ? { ...card, style: mirrorCardStyle(card.style) } : card));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const makeDots = (w: number, h: number) => {
      const dots: Dot[] = [];
      const centerX = isFa ? w * 0.26 : w * 0.74;
      const centerY = h * 0.53;
      const radiusX = Math.min(w * 0.32, 250);
      const radiusY = Math.min(h * 0.36, 265);
      const networkCount = NETWORK_DOTS;
      const ambientCount = AMBIENT_STARS;

      // Build a sparse network mostly on the right side, similar to the reference.
      for (let i = 0; i < networkCount; i += 1) {
        const startAngle = isFa ? Math.PI / 2 : -Math.PI / 2;
        const angle = startAngle + (i / Math.max(1, networkCount - 1)) * Math.PI;
        const jitter = (Math.random() - 0.5) * 52;
        const radial = 0.75 + Math.random() * 0.4;
        const x = centerX + Math.cos(angle) * radiusX * radial + jitter * 0.35;
        const y = centerY + Math.sin(angle) * radiusY * radial + jitter * 0.4;
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.2 + 1.2,
          alpha: Math.random() * 0.36 + 0.54,
          color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.42 + 0.16,
          connectable: true
        });
      }

      // Extra stars around the scene without network links.
      for (let i = 0; i < ambientCount; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.4 + 0.8,
          alpha: Math.random() * 0.34 + 0.34,
          color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.28 + 0.08,
          connectable: false
        });
      }

      dotsRef.current = dots;
    };

    const drawFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.012;
      ctx.clearRect(0, 0, w, h);

      for (const dot of dotsRef.current) {
        const driftX = Math.sin(timeRef.current * dot.driftSpeed + dot.driftPhase) * 4.5;
        const driftY = Math.cos(timeRef.current * dot.driftSpeed + dot.driftPhase * 1.2) * 4;
        const homeX = dot.baseX + driftX;
        const homeY = dot.baseY + driftY;

        if (mouseRef.current.active) {
          const dx = dot.x - mouseRef.current.x;
          const dy = dot.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < REPEL_RADIUS) {
            const t = 1 - dist / REPEL_RADIUS;
            const push = t * REPEL_FORCE;
            dot.vx += (dx / dist) * push * 8.8;
            dot.vy += (dy / dist) * push * 8.8;
          }
        }

        dot.vx += (homeX - dot.x) * RETURN_FORCE;
        dot.vy += (homeY - dot.y) * RETURN_FORCE;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;
      }

      for (let i = 0; i < dotsRef.current.length; i += 1) {
        const a = dotsRef.current[i];
        if (!a.connectable) continue;
        let links = 0;
        for (let j = i + 1; j < dotsRef.current.length; j += 1) {
          if (links >= MAX_LINKS_PER_DOT) break;
          const b = dotsRef.current[j];
          if (!b.connectable) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.17;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(184, 193, 244, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            links += 1;
          }
        }
      }

      for (const dot of dotsRef.current) {
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        const rgba = hexToRgba(dot.color, dot.alpha);
        ctx.fillStyle = rgba;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.8, dot.radius * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 245, 232, 0.85)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (mouseRef.current.active) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(248, 183, 140, 0.65)";
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(248, 183, 140, 0.85)";
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeDots(rect.width, rect.height);
      drawFrame();
    };

    const render = () => {
      drawFrame();
      frameRef.current = window.requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    render();
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-none"
      style={{ backgroundColor: "transparent" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {infoCards.map((card) => (
        <div
          key={card.label}
          className="absolute z-10 rounded-xl border px-4 py-3 backdrop-blur-[1px]"
          style={{
            ...card.style,
            backgroundColor: "rgba(17, 21, 47, 0.9)",
            borderColor: "rgba(114, 127, 175, 0.28)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)"
          }}
        >
          <span
            className="block text-[10px] tracking-[0.12em] uppercase"
            style={{ color: "rgba(196, 208, 255, 0.55)" }}
          >
            {card.label}
          </span>
          <span className="mt-0.5 block text-[16px] text-[#e4ebff] md:text-[18px]">
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpaceSection;

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const parsed = Number.parseInt(value, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mirrorCardStyle(style: CSSProperties): CSSProperties {
  const mirrored = { ...style };
  const left = mirrored.left;
  mirrored.left = mirrored.right;
  mirrored.right = left;
  return mirrored;
}
