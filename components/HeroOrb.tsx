"use client";

import { motion } from "framer-motion";

export default function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Outer warm streaks */}
      <motion.div
        className="absolute"
        style={{
          width: "min(520px, 85vw)",
          height: "min(520px, 85vw)",
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(245, 158, 11, 0.12) 45deg, transparent 90deg, rgba(234, 88, 12, 0.1) 135deg, transparent 180deg, rgba(124, 58, 237, 0.1) 225deg, transparent 270deg, rgba(6, 182, 212, 0.08) 315deg, transparent 360deg)",
          filter: "blur(40px)"
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Mid amber glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(320px, 55vw)",
          height: "min(320px, 55vw)",
          background:
            "radial-gradient(ellipse at 30% 35%, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.08) 45%, transparent 70%)",
          filter: "blur(30px)"
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Purple streak */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(280px, 50vw)",
          height: "min(180px, 30vw)",
          background:
            "radial-gradient(ellipse at 70% 60%, rgba(124, 58, 237, 0.2), transparent 65%)",
          filter: "blur(35px)",
          transform: "rotate(-25deg)"
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Central bright core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(100px, 18vw)",
          height: "min(100px, 18vw)",
          background:
            "radial-gradient(circle, rgba(255, 248, 230, 0.45) 0%, rgba(245, 190, 80, 0.25) 30%, rgba(245, 158, 11, 0.1) 55%, transparent 75%)",
          filter: "blur(12px)"
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Innermost white-hot point */}
      <div
        className="absolute rounded-full"
        style={{
          width: "min(28px, 5vw)",
          height: "min(28px, 5vw)",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.7), rgba(255, 240, 200, 0.3) 50%, transparent 80%)",
          filter: "blur(4px)"
        }}
      />

      {/* Cyan accent ray */}
      <motion.div
        className="absolute"
        style={{
          width: "min(180px, 32vw)",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 40%, rgba(6, 182, 212, 0.08) 100%)",
          filter: "blur(3px)",
          transformOrigin: "left center",
          left: "calc(50% + min(30px, 5vw))",
          top: "calc(50% - 8px)"
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Warm accent ray (opposite direction) */}
      <motion.div
        className="absolute"
        style={{
          width: "min(160px, 28vw)",
          height: "2px",
          background:
            "linear-gradient(270deg, transparent 0%, rgba(245, 158, 11, 0.35) 40%, rgba(234, 88, 12, 0.1) 100%)",
          filter: "blur(3px)",
          transformOrigin: "right center",
          right: "calc(50% + min(30px, 5vw))",
          top: "calc(50% + 6px)"
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}
