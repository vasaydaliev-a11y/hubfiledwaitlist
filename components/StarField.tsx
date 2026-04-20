"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Canvas-based particle starfield with:
   - Individual star twinkle at unique rates
   - Mouse-reactive 3D parallax (depth layers)
   - Scroll-reactive vertical parallax
   - Shooting stars (meteors) with glowing trail
   - Organic nebula clouds via framer-motion
   - prefers-reduced-motion support
   - DPR-aware crisp rendering
   ═══════════════════════════════════════════════════════ */

// ── Types ──

interface Star {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  alpha: number;
  speed: number;
  phase: number;
  depth: number;
  glow: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: number;
  life: number;
  maxLife: number;
  w: number;
  hue: number;
}

// ── Constants ──

const COLORS: [number, number, number][] = [
  [255, 255, 255],
  [220, 225, 255],
  [196, 132, 252],
  [6, 182, 212],
  [255, 244, 232],
  [147, 197, 253],
  [236, 72, 153],
  [250, 204, 21],
];

function rng(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── Star factory ──

function makeStars(w: number, h: number): Star[] {
  const density = w < 768 ? 0.00015 : 0.00028;
  const n = Math.round(w * h * density);
  const stars: Star[] = [];

  for (let i = 0; i < n; i++) {
    const depth = Math.random();
    const bright = Math.random() < 0.04;
    const r = bright
      ? rng(1.6, 3)
      : depth < 0.33
        ? rng(0.25, 0.55)
        : depth < 0.66
          ? rng(0.45, 1.1)
          : rng(0.7, 1.6);

    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: bright ? rng(0.75, 1) : rng(0.12, 0.65),
      speed: rng(0.3, 2.8),
      phase: Math.random() * Math.PI * 2,
      depth,
      glow: bright ? r * rng(3.5, 6) : 0,
    });
  }

  return stars;
}

// ── Meteor factory ──

function makeMeteor(w: number, h: number): Meteor {
  const angle = rng(0.18, 0.55) * Math.PI;
  const speed = rng(12, 22);
  const fromTop = Math.random() > 0.35;

  return {
    x: fromTop ? rng(w * 0.05, w * 0.95) : w + 30,
    y: fromTop ? -30 : rng(0, h * 0.3),
    vx: -Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    trail: rng(100, 220),
    life: 0,
    maxLife: rng(45, 90),
    w: rng(1, 2.5),
    hue: [0, 190, 270, 280, 45][Math.floor(Math.random() * 5)],
  };
}

// ── Component ──

export default function StarField() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const meteors = useRef<Meteor[]>([]);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const scrollPos = useRef(0);
  const raf = useRef(0);
  const lastMeteor = useRef(0);
  const nextDelay = useRef(rng(2500, 7000));
  const reduced = useRef(false);
  const dims = useRef({ w: 0, h: 0 });

  const { scrollY } = useScroll();
  const nY1 = useTransform(scrollY, [0, 5000], [0, -80]);
  const nY2 = useTransform(scrollY, [0, 5000], [0, -130]);
  const nY3 = useTransform(scrollY, [0, 5000], [0, -180]);
  const nY4 = useTransform(scrollY, [0, 5000], [0, -100]);

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dims.current = { w, h };
      stars.current = makeStars(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / dims.current.w;
      mouse.current.y = e.clientY / dims.current.h;
    };
    window.addEventListener("mousemove", onMouse);

    const onScroll = () => {
      scrollPos.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (ts: number) => {
      const t = ts * 0.001;
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse lerp for silky parallax
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.035);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.035);

      const mx = (smooth.current.x - 0.5) * 2;
      const my = (smooth.current.y - 0.5) * 2;
      const sc = scrollPos.current;

      const buf = 150;
      const totalH = h + buf * 2;

      // ── Draw stars ──
      for (let i = 0; i < stars.current.length; i++) {
        const s = stars.current[i];

        const px = mx * s.depth * w * 0.03;
        const py = my * s.depth * h * 0.03;
        const sp = sc * (0.012 + s.depth * 0.12);

        const sx = s.x + px;
        let sy = s.y - sp + py;
        sy = (((sy + buf) % totalH) + totalH) % totalH - buf;

        // Twinkle
        const tw = reduced.current
          ? 1
          : 0.45 + 0.55 * Math.sin(t * s.speed + s.phase);
        const a = s.alpha * (0.3 + 0.7 * tw);

        const [cr, cg, cb] = s.color;

        // Glow halo for bright stars
        if (s.glow > 0 && !reduced.current) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.glow);
          g.addColorStop(0, `rgba(${cr},${cg},${cb},${(a * 0.3).toFixed(3)})`);
          g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(a * 0.08).toFixed(3)})`);
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, s.glow, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Cross-spike for the brightest stars
        if (s.glow > 0 && s.alpha > 0.85) {
          const spikeLen = s.glow * 1.8 * tw;
          const spikeAlpha = a * 0.15;
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${spikeAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }
      }

      // ── Shooting stars ──
      if (!reduced.current) {
        if (ts - lastMeteor.current > nextDelay.current) {
          meteors.current.push(makeMeteor(w, h));
          lastMeteor.current = ts;
          nextDelay.current = rng(2500, 8000);
        }

        meteors.current = meteors.current.filter((m) => {
          m.x += m.vx;
          m.y += m.vy;
          m.life++;

          if (m.life > m.maxLife) return false;

          const p = m.life / m.maxLife;
          const fi = Math.min(p * 8, 1);
          const fo = 1 - Math.max((p - 0.55) / 0.45, 0);
          const op = fi * fo;

          const spd = Math.sqrt(m.vx ** 2 + m.vy ** 2);
          const dx = m.vx / spd;
          const dy = m.vy / spd;
          const tx = m.x - dx * m.trail * op;
          const ty = m.y - dy * m.trail * op;

          // Trail gradient
          const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
          const sat = m.hue === 0 ? "0%" : "65%";
          g.addColorStop(0, `hsla(${m.hue},${sat},92%,0)`);
          g.addColorStop(0.4, `hsla(${m.hue},${sat},90%,${(op * 0.2).toFixed(3)})`);
          g.addColorStop(0.85, `hsla(${m.hue},${sat},94%,${(op * 0.6).toFixed(3)})`);
          g.addColorStop(1, `hsla(${m.hue},${sat},97%,${(op * 0.9).toFixed(3)})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = m.w;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          // Bright head glow
          const hg = ctx.createRadialGradient(
            m.x, m.y, 0,
            m.x, m.y, m.w * 5
          );
          hg.addColorStop(0, `hsla(${m.hue},${sat},97%,${(op * 0.8).toFixed(3)})`);
          hg.addColorStop(0.3, `hsla(${m.hue},${sat},92%,${(op * 0.3).toFixed(3)})`);
          hg.addColorStop(1, `hsla(${m.hue},${sat},90%,0)`);
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.w * 5, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {/* Canvas — stars + meteors */}
      <canvas
        ref={cvs}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* ── Nebula clouds — organic drifting color volumes ── */}

      {/* Violet nebula — left quadrant */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "38vw",
          left: "-8%",
          top: "10%",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.015) 45%, transparent 70%)",
          filter: "blur(80px)",
          y: nY1,
        }}
        animate={{ x: [0, 100, -40, 0], scale: [1, 1.15, 0.93, 1] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan nebula — right quadrant */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "34vw",
          right: "-12%",
          top: "35%",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.055) 0%, rgba(6,182,212,0.012) 45%, transparent 70%)",
          filter: "blur(90px)",
          y: nY2,
        }}
        animate={{ x: [0, -80, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 75, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pink nebula — center-bottom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "42vw",
          height: "28vw",
          left: "22%",
          top: "58%",
          background:
            "radial-gradient(ellipse, rgba(236,72,153,0.04) 0%, rgba(236,72,153,0.008) 45%, transparent 65%)",
          filter: "blur(80px)",
          y: nY3,
        }}
        animate={{ x: [0, 70, -50, 0], scale: [1, 1.12, 1.03, 1] }}
        transition={{ duration: 90, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep blue accent — top-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "38vw",
          height: "26vw",
          left: "55%",
          top: "5%",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.045) 0%, rgba(59,130,246,0.01) 40%, transparent 65%)",
          filter: "blur(90px)",
          y: nY4,
        }}
        animate={{ x: [0, -55, 40, 0], scale: [1, 1.08, 1.14, 1] }}
        transition={{ duration: 100, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
