"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  size: 1.5 + (index % 5),
  top: (index * 13 + 7) % 100,
  left: (index * 23 + 11) % 100,
  duration: 7 + (index % 8) * 1.6
}));

const orbs = [
  { top: "15%", left: "20%", size: 280, color: "rgba(124, 58, 237, 0.18)", delay: 0 },
  { top: "60%", left: "70%", size: 340, color: "rgba(6, 182, 212, 0.12)", delay: 2 },
  { top: "80%", left: "30%", size: 200, color: "rgba(124, 58, 237, 0.1)", delay: 4 }
];

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(124,58,237,0.2),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,_rgba(6,182,212,0.13),_transparent_45%)]" />

      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)"
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay
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
            background: `radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.1))`,
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
