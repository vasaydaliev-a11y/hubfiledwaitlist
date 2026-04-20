"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  size: 2 + (index % 4),
  top: (index * 17) % 100,
  left: (index * 29) % 100,
  duration: 8 + (index % 7) * 1.4
}));

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),_transparent_56%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(6,182,212,0.15),_transparent_45%)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/45"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.top}%`,
            left: `${particle.left}%`
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.2, 0.55, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.12
          }}
        />
      ))}
    </div>
  );
}
