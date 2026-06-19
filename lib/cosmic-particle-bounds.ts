export type ParticleBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const MIN_SPEED = 0.06;
const RESTITUTION = 0.88;
const PARTICLE_DRAG = 0.986;
const MAX_PARTICLE_SPEED = 0.28;
const DEFAULT_MOUSE_REPULSION = 0.055;

type MovableParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function ensureMinSpeed(value: number, direction: 1 | -1): number {
  const speed = Math.abs(value);
  if (speed < MIN_SPEED) return direction * MIN_SPEED;
  return value;
}

/** Keep particle inside bounds with elastic bounce — avoids edge clustering. */
export function bounceParticleInRect(
  particle: MovableParticle,
  bounds: ParticleBounds,
  padding = 2
): void {
  const left = bounds.minX + padding;
  const right = bounds.maxX - padding;
  const top = bounds.minY + padding;
  const bottom = bounds.maxY - padding;

  if (left >= right || top >= bottom) return;

  if (particle.x < left) {
    particle.x = left;
    particle.vx = ensureMinSpeed(Math.abs(particle.vx) * RESTITUTION, 1);
  } else if (particle.x > right) {
    particle.x = right;
    particle.vx = ensureMinSpeed(-Math.abs(particle.vx) * RESTITUTION, -1);
  }

  if (particle.y < top) {
    particle.y = top;
    particle.vy = ensureMinSpeed(Math.abs(particle.vy) * RESTITUTION, 1);
  } else if (particle.y > bottom) {
    particle.y = bottom;
    particle.vy = ensureMinSpeed(-Math.abs(particle.vy) * RESTITUTION, -1);
  }
}

export function integrateParticleWithBounce(
  particle: MovableParticle,
  bounds: ParticleBounds,
  padding = 2
): void {
  particle.vx *= PARTICLE_DRAG;
  particle.vy *= PARTICLE_DRAG;
  particle.x += particle.vx;
  particle.y += particle.vy;
  bounceParticleInRect(particle, bounds, padding);
}

function clampParticleSpeed(particle: MovableParticle): void {
  const speed = Math.hypot(particle.vx, particle.vy);
  if (speed > MAX_PARTICLE_SPEED) {
    const scale = MAX_PARTICLE_SPEED / speed;
    particle.vx *= scale;
    particle.vy *= scale;
  }
}

/** Repel via velocity — soft, heavy drift away from the cursor. */
export function applyMouseRepulsion(
  particle: MovableParticle,
  mouseX: number,
  mouseY: number,
  radius: number,
  strength = DEFAULT_MOUSE_REPULSION
): void {
  if (mouseX < -500 || mouseY < -500) return;

  const dx = particle.x - mouseX;
  const dy = particle.y - mouseY;
  const dist = Math.hypot(dx, dy);
  if (dist <= 0 || dist >= radius) return;

  const proximity = (radius - dist) / radius;
  const force = proximity * proximity * strength;
  particle.vx += (dx / dist) * force;
  particle.vy += (dy / dist) * force;
  clampParticleSpeed(particle);
}
