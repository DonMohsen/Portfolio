"use client";

/**
 * Hero network canvas — ported from amanrwt.com bundle
 * (`HeroCanvas` in `_next/static/chunks/a6f0bd3a91818cad.js`, module 64371).
 * Card layout matches home page `y` array in `0b69cdfb4f5910e2.js` (module 31713).
 */

import { useEffect, useRef, type CSSProperties } from "react";

/** Exact `n` array from shipped HeroCanvas */
const NODE_COLORS = [
  "#fab387",
  "#cba6f7",
  "#89b4fa",
  "#94e2d5",
  "#f5c2e7",
] as const;

const PEACH = "#fab387";
const MOUSE_RADIUS = 90;
const LINK_DISTANCE = 120;
const LINE_ALPHA_MAX = 0.3;
const MOUSE_PULL = 0.3;
const DAMPING = 0.99;
const PARTICLE_COUNT = 60;
const VELOCITY_SCALE = 0.7;

export type GalaxyInfoCard = {
  label: string;
  value: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  delay?: number;
};

export type GalaxyProps = {
  className?: string;
  /** Defaults match amanrwt hero */
  cards?: GalaxyInfoCard[];
};

const DEFAULT_CARDS: GalaxyInfoCard[] = [
  { label: "Currently", value: "Building SaaS", top: "6%", right: "36%", delay: 0 },
  { label: "Stack", value: "Next.js + Go", top: "30%", right: "18%", delay: 1.2 },
  { label: "Location", value: "Delhi, India", bottom: "32%", left: "6%", delay: 2.1 },
  { label: "Available", value: "Full-time", bottom: "8%", right: "24%", delay: 0.6 },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
};

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const el = canvas.parentElement;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    if (particlesRef.current.length === 0) {
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * VELOCITY_SCALE,
          vy: (Math.random() - 0.5) * VELOCITY_SCALE,
          color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)]!,
          radius: 1.5 * Math.random() + 1,
        });
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    const tick = () => {
      const t = canvas;
      const r = ctx;
      r.clearRect(0, 0, t.width, t.height);

      const pts = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let n = 0; n < pts.length; n++) {
        const a = pts[n]!;
        const dxm = a.x - mx;
        const dym = a.y - my;
        const hm = Math.sqrt(dxm * dxm + dym * dym);
        if (hm < MOUSE_RADIUS && hm > 0) {
          const pull = (MOUSE_RADIUS - hm) / MOUSE_RADIUS;
          a.vx += (dxm / hm) * pull * MOUSE_PULL;
          a.vy += (dym / hm) * pull * MOUSE_PULL;
        }

        a.vx *= DAMPING;
        a.vy *= DAMPING;
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0) {
          a.x = 0;
          a.vx *= -1;
        } else if (a.x > t.width) {
          a.x = t.width;
          a.vx *= -1;
        }
        if (a.y < 0) {
          a.y = 0;
          a.vy *= -1;
        } else if (a.y > t.height) {
          a.y = t.height;
          a.vy *= -1;
        }

        for (let j = n + 1; j < pts.length; j++) {
          const b = pts[j]!;
          const lx = a.x - b.x;
          const ly = a.y - b.y;
          const d = Math.sqrt(lx * lx + ly * ly);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * LINE_ALPHA_MAX;
            r.beginPath();
            r.moveTo(a.x, a.y);
            r.lineTo(b.x, b.y);
            r.strokeStyle = `rgba(250, 179, 135, ${alpha})`;
            r.lineWidth = 0.5;
            r.stroke();
          }
        }

        if (a.color === PEACH) {
          const g = r.createRadialGradient(a.x, a.y, 0, a.x, a.y, 8);
          g.addColorStop(0, "rgba(250, 179, 135, 0.15)");
          g.addColorStop(1, "rgba(250, 179, 135, 0)");
          r.beginPath();
          r.arc(a.x, a.y, 8, 0, 2 * Math.PI);
          r.fillStyle = g;
          r.fill();
        }

        r.beginPath();
        r.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
        r.fillStyle = a.color;
        r.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "transparent" }}
      aria-hidden
    />
  );
}

export default function Galaxy({ className = "", cards = DEFAULT_CARDS }: GalaxyProps) {
  const list = cards.length ? cards : DEFAULT_CARDS;

  return (
    <div
      className={`relative hidden min-h-[500px] lg:block lg:min-h-[600px] ${className}`}
    >
      <HeroCanvas />
      {list.map((c) => (
        <div
          key={c.label}
          className="absolute z-10 rounded-lg border border-[#313244] bg-[#181825] px-4 py-3"
          style={
            {
              top: c.top,
              right: c.right,
              left: c.left,
              bottom: c.bottom,
              animation: `float 4s ease-in-out ${c.delay ?? 0}s infinite`,
            } as CSSProperties
          }
        >
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#6c7086]">
            {c.label}
          </span>
          <span className="mt-0.5 block font-sans text-[13px] text-[#cdd6f4]">
            {c.value}
          </span>
        </div>
      ))}
    </div>
  );
}
