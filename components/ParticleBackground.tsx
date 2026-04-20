"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  size: 1.5 + (index % 5),
  top: (index * 13 + 7) % 100,
  left: (index * 23 + 11) % 100,
  duration: 7 + (index % 8) * 1.6
}));

const meshOrbs = [
  {
    top: "10%",
    left: "15%",
    size: 400,
    colors: ["rgba(124,58,237,0.22)", "rgba(88,28,235,0.08)"],
    blur: 80,
    duration: 18
  },
  {
    top: "55%",
    left: "65%",
    size: 450,
    colors: ["rgba(6,182,212,0.16)", "rgba(8,145,178,0.06)"],
    blur: 90,
    duration: 22
  },
  {
    top: "75%",
    left: "25%",
    size: 300,
    colors: ["rgba(124,58,237,0.12)", "rgba(168,85,247,0.05)"],
    blur: 70,
    duration: 15
  },
  {
    top: "20%",
    left: "80%",
    size: 250,
    colors: ["rgba(6,182,212,0.1)", "rgba(34,211,238,0.04)"],
    blur: 65,
    duration: 20
  }
];

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(124,58,237,0.18),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,_rgba(6,182,212,0.11),_transparent_45%)]" />

      {meshOrbs.map((orb, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 40% 40%, ${orb.colors[0]}, ${orb.colors[1]}, transparent 70%)`,
            filter: `blur(${orb.blur}px)`
          }}
          animate={{
            x: [0, 40, -30, 15, 0],
            y: [0, -35, 20, -10, 0],
            scale: [1, 1.12, 0.92, 1.05, 1],
            rotate: [0, 5, -3, 2, 0]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.1))",
            boxShadow: "0 0 6px rgba(255,255,255,0.15)"
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.15, 0.5, 0.15]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1
          }}
        />
      ))}
    </div>
  );
}
