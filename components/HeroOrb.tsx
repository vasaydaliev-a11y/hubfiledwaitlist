"use client";

import { motion } from "framer-motion";

export default function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Outer galactic ring */}
      <motion.div
        className="absolute"
        style={{
          width: "min(600px, 90vw)",
          height: "min(600px, 90vw)",
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139,92,246,0.12) 40deg, transparent 80deg, rgba(6,182,212,0.1) 130deg, transparent 170deg, rgba(236,72,153,0.08) 220deg, transparent 260deg, rgba(139,92,246,0.1) 310deg, transparent 360deg)",
          filter: "blur(45px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Nebula cloud — primary */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(380px, 65vw)",
          height: "min(380px, 65vw)",
          background:
            "radial-gradient(ellipse at 35% 30%, rgba(139,92,246,0.25), rgba(6,182,212,0.1) 45%, transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nebula cloud — pink accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(300px, 52vw)",
          height: "min(200px, 35vw)",
          background:
            "radial-gradient(ellipse at 65% 55%, rgba(236,72,153,0.18), transparent 65%)",
          filter: "blur(40px)",
          transform: "rotate(-20deg)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Stellar core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(120px, 20vw)",
          height: "min(120px, 20vw)",
          background:
            "radial-gradient(circle, rgba(196,132,252,0.5) 0%, rgba(139,92,246,0.25) 35%, rgba(6,182,212,0.1) 60%, transparent 80%)",
          filter: "blur(15px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* White-hot center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "min(32px, 6vw)",
          height: "min(32px, 6vw)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8), rgba(196,132,252,0.4) 50%, transparent 80%)",
          filter: "blur(5px)",
        }}
      />

      {/* Cyan accent ray */}
      <motion.div
        className="absolute"
        style={{
          width: "min(200px, 35vw)",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.35) 40%, rgba(6,182,212,0.08) 100%)",
          filter: "blur(3px)",
          transformOrigin: "left center",
          left: "calc(50% + min(35px, 6vw))",
          top: "calc(50% - 10px)",
        }}
        animate={{ opacity: [0.3, 0.75, 0.3], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Purple accent ray */}
      <motion.div
        className="absolute"
        style={{
          width: "min(180px, 30vw)",
          height: "2px",
          background:
            "linear-gradient(270deg, transparent 0%, rgba(139,92,246,0.4) 40%, rgba(236,72,153,0.12) 100%)",
          filter: "blur(3px)",
          transformOrigin: "right center",
          right: "calc(50% + min(35px, 6vw))",
          top: "calc(50% + 8px)",
        }}
        animate={{ opacity: [0.4, 0.85, 0.4], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}
