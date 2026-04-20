"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  depth: number;
}

interface Supernova {
  x: number;
  y: number;
  color: [number, number, number];
  birth: number;
  duration: number;
}

// ── Helpers ──

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

const rng = (a: number, b: number) => a + Math.random() * (b - a);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

// ── Factories ──

function makeStars(w: number, h: number): Star[] {
  const n = Math.round(w * h * (w < 768 ? 0.00016 : 0.0003));
  const out: Star[] = [];
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
    out.push({
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
  return out;
}

function makeDust(w: number, h: number): Dust[] {
  const n = w < 768 ? 250 : 700;
  const out: Dust[] = [];
  for (let i = 0; i < n; i++) {
    const depth = Math.random();
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rng(-0.07, 0.07),
      vy: rng(-0.03, 0.06),
      r: rng(0.2, 0.45),
      alpha: rng(0.03, 0.14),
      depth,
    });
  }
  return out;
}

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

const PROXIMITY_R = 180;

export default function StarField() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const dustArr = useRef<Dust[]>([]);
  const meteors = useRef<Meteor[]>([]);
  const sn = useRef<Supernova | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const scrollPos = useRef(0);
  const scrollVel = useRef(0);
  const prevScrollY = useRef(0);
  const prevScrollT = useRef(0);
  const raf = useRef(0);
  const lastMeteorT = useRef(0);
  const nextMeteorD = useRef(rng(2500, 7000));
  const lastSnT = useRef(0);
  const nextSnD = useRef(rng(12000, 30000));
  const reduced = useRef(false);
  const dims = useRef({ w: 0, h: 0 });
  const birthT = useRef(0);

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
      dustArr.current = makeDust(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / dims.current.w;
      mouse.current.y = e.clientY / dims.current.h;
    };
    window.addEventListener("mousemove", onMouse);

    const onScroll = () => {
      const now = performance.now();
      const dt = now - prevScrollT.current;
      const sy = window.scrollY;
      if (dt > 0) {
        scrollVel.current = lerp(
          scrollVel.current,
          Math.abs(sy - prevScrollY.current) / dt,
          0.3
        );
      }
      prevScrollY.current = sy;
      prevScrollT.current = now;
      scrollPos.current = sy;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Render loop ──

    const draw = (ts: number) => {
      if (birthT.current === 0) birthT.current = ts;
      const t = ts * 0.001;
      const age = (ts - birthT.current) / 1000;
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      scrollVel.current *= 0.96;

      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.035);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.035);
      const mx = (smooth.current.x - 0.5) * 2;
      const my = (smooth.current.y - 0.5) * 2;
      const mPx = smooth.current.x * w;
      const mPy = smooth.current.y * h;
      const sc = scrollPos.current;
      const warp = clamp(scrollVel.current * 8, 0, 1);

      const buf = 150;
      const totalH = h + buf * 2;
      const birthR = Math.sqrt(w * w + h * h) * 0.6;

      // ── Cosmic dust ──

      for (let i = 0; i < dustArr.current.length; i++) {
        const d = dustArr.current[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x += w;
        if (d.x > w) d.x -= w;
        if (d.y < 0) d.y += h;
        if (d.y > h) d.y -= h;

        const dpx = mx * d.depth * w * 0.015;
        const dpy = my * d.depth * h * 0.015;
        const dsp = sc * (0.005 + d.depth * 0.05);
        let dy = d.y - dsp + dpy;
        dy = (((dy + buf) % totalH) + totalH) % totalH - buf;

        ctx.fillStyle = `rgba(200,200,220,${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x + dpx, dy, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Stars ──

      for (let i = 0; i < stars.current.length; i++) {
        const s = stars.current[i];
        const px = mx * s.depth * w * 0.03;
        const py = my * s.depth * h * 0.03;
        const sp = sc * (0.012 + s.depth * 0.12);

        const sx = s.x + px;
        let sy = s.y - sp + py;
        sy = (((sy + buf) % totalH) + totalH) % totalH - buf;

        // Birth cascade — stars appear center-outward
        let ba = 1;
        if (age < 3) {
          const dist = Math.sqrt((sx - w / 2) ** 2 + (sy - h / 2) ** 2);
          ba = clamp(((age / 3) * birthR - dist) / 120, 0, 1);
        }
        if (ba <= 0) continue;

        const tw = reduced.current
          ? 1
          : 0.45 + 0.55 * Math.sin(t * s.speed + s.phase);
        let a = s.alpha * (0.3 + 0.7 * tw) * ba;

        const [cr, cg, cb] = s.color;

        // Mouse proximity spotlight
        if (!reduced.current) {
          const dx = sx - mPx;
          const dy = sy - mPy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PROXIMITY_R) {
            const prox = 1 - dist / PROXIMITY_R;
            const boost = prox * prox * 0.6;
            a = clamp(a + boost, 0, 1);

            if (prox > 0.25) {
              const gr = s.r * (3 + prox * 10);
              const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
              g.addColorStop(
                0,
                `rgba(${cr},${cg},${cb},${(prox * 0.18).toFixed(3)})`
              );
              g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(sx, sy, gr, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Warp-speed stretch
        const ws = warp * s.depth * 14;

        // Glow halo for bright stars
        if (s.glow > 0 && !reduced.current && ba > 0.5) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.glow);
          g.addColorStop(
            0,
            `rgba(${cr},${cg},${cb},${(a * 0.3).toFixed(3)})`
          );
          g.addColorStop(
            0.5,
            `rgba(${cr},${cg},${cb},${(a * 0.08).toFixed(3)})`
          );
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, s.glow, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core — circle or warp streak
        const coreColor = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
        if (ws > 1) {
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(a * 0.8).toFixed(3)})`;
          ctx.lineWidth = s.r * 1.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(sx, sy - ws);
          ctx.lineTo(sx, sy + ws);
          ctx.stroke();
        } else {
          ctx.fillStyle = coreColor;
          ctx.beginPath();
          ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cross-spike + diagonal for brightest
        if (
          s.glow > 0 &&
          s.alpha > 0.85 &&
          !reduced.current &&
          ba > 0.8
        ) {
          const sLen = s.glow * 2 * tw;
          const sa = a * 0.13;
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${sa.toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - sLen, sy);
          ctx.lineTo(sx + sLen, sy);
          ctx.moveTo(sx, sy - sLen * 1.3);
          ctx.lineTo(sx, sy + sLen * 1.3);
          ctx.stroke();
          const dLen = sLen * 0.5;
          const da = sa * 0.45;
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${da.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(sx - dLen, sy - dLen);
          ctx.lineTo(sx + dLen, sy + dLen);
          ctx.moveTo(sx + dLen, sy - dLen);
          ctx.lineTo(sx - dLen, sy + dLen);
          ctx.stroke();
        }
      }

      // ── Shooting stars ──

      if (!reduced.current) {
        if (ts - lastMeteorT.current > nextMeteorD.current) {
          meteors.current.push(makeMeteor(w, h));
          lastMeteorT.current = ts;
          nextMeteorD.current = rng(2500, 8000);
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
          const dirX = m.vx / spd;
          const dirY = m.vy / spd;
          const tx = m.x - dirX * m.trail * op;
          const ty = m.y - dirY * m.trail * op;

          const sat = m.hue === 0 ? "0%" : "65%";
          const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
          g.addColorStop(0, `hsla(${m.hue},${sat},92%,0)`);
          g.addColorStop(
            0.4,
            `hsla(${m.hue},${sat},90%,${(op * 0.2).toFixed(3)})`
          );
          g.addColorStop(
            0.85,
            `hsla(${m.hue},${sat},94%,${(op * 0.6).toFixed(3)})`
          );
          g.addColorStop(
            1,
            `hsla(${m.hue},${sat},97%,${(op * 0.9).toFixed(3)})`
          );
          ctx.strokeStyle = g;
          ctx.lineWidth = m.w;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          const hg = ctx.createRadialGradient(
            m.x,
            m.y,
            0,
            m.x,
            m.y,
            m.w * 5
          );
          hg.addColorStop(
            0,
            `hsla(${m.hue},${sat},97%,${(op * 0.8).toFixed(3)})`
          );
          hg.addColorStop(
            0.3,
            `hsla(${m.hue},${sat},92%,${(op * 0.3).toFixed(3)})`
          );
          hg.addColorStop(1, `hsla(${m.hue},${sat},90%,0)`);
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.w * 5, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });
      }

      // ── Supernova ──

      if (!reduced.current) {
        // Spawn
        if (
          !sn.current &&
          ts - lastSnT.current > nextSnD.current
        ) {
          const bright = stars.current.filter((s) => s.glow > 0);
          if (bright.length > 0) {
            const pick = bright[Math.floor(Math.random() * bright.length)];
            const ppx = mx * pick.depth * w * 0.03;
            const ppy = my * pick.depth * h * 0.03;
            const psp = sc * (0.012 + pick.depth * 0.12);
            let psy = pick.y - psp + ppy;
            psy = (((psy + buf) % totalH) + totalH) % totalH - buf;
            sn.current = {
              x: pick.x + ppx,
              y: psy,
              color: pick.color,
              birth: ts,
              duration: 3500,
            };
            lastSnT.current = ts;
            nextSnD.current = rng(18000, 40000);
          }
        }

        // Render
        if (sn.current) {
          const s = sn.current;
          const el = ts - s.birth;
          const p = el / s.duration;
          const [cr, cg, cb] = s.color;

          if (p >= 1) {
            sn.current = null;
          } else if (p < 0.12) {
            // Flash
            const fp = p / 0.12;
            const fr = 4 + fp * 35;
            const fa = fp * 0.7;
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, fr);
            g.addColorStop(
              0,
              `rgba(255,255,255,${fa.toFixed(3)})`
            );
            g.addColorStop(
              0.4,
              `rgba(${cr},${cg},${cb},${(fa * 0.5).toFixed(3)})`
            );
            g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(s.x, s.y, fr, 0, Math.PI * 2);
            ctx.fill();
          } else if (p < 0.55) {
            // Expanding ring
            const rp = (p - 0.12) / 0.43;
            const rr = 35 + rp * 180;
            const rw = 3 - rp * 2.5;
            const ra = (1 - rp) * 0.45;
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${ra.toFixed(3)})`;
            ctx.lineWidth = Math.max(0.4, rw);
            ctx.beginPath();
            ctx.arc(s.x, s.y, rr, 0, Math.PI * 2);
            ctx.stroke();

            const ig = ctx.createRadialGradient(
              s.x,
              s.y,
              0,
              s.x,
              s.y,
              rr * 0.35
            );
            ig.addColorStop(
              0,
              `rgba(255,255,255,${((1 - rp) * 0.25).toFixed(3)})`
            );
            ig.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
            ctx.fillStyle = ig;
            ctx.beginPath();
            ctx.arc(s.x, s.y, rr * 0.35, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Fade
            const fp = (p - 0.55) / 0.45;
            const fr = 215 + fp * 60;
            const fa = (1 - fp) * 0.06;
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, fr);
            g.addColorStop(
              0,
              `rgba(${cr},${cg},${cb},${fa.toFixed(3)})`
            );
            g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(s.x, s.y, fr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
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
      <canvas
        ref={cvs}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Nebula clouds — organic drifting color volumes */}

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
