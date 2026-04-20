"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 1.5 + (i % 3),
  top: (i * 17 + 5) % 100,
  left: (i * 29 + 7) % 100,
  duration: 10 + (i % 6) * 2
}));

const orbs = [
  { top: "12%", left: "18%", size: 350, color: "rgba(124,58,237,0.14)", blur: 90, duration: 20 },
  { top: "58%", left: "68%", size: 380, color: "rgba(6,182,212,0.09)", blur: 100, duration: 25 }
];

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(124,58,237,0.14),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_65%,_rgba(6,182,212,0.08),_transparent_45%)]" />

      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 40% 40%, ${orb.color}, transparent 70%)`,
            filter: `blur(${orb.blur}px)`
          }}
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -20, 12, 0]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`
          }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.id * 0.15
          }}
        />
      ))}
    </div>
  );
}
