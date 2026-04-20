"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: number;
};

const SPARKLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.3;
  const dist = 18 + Math.random() * 20;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 0.12,
    color: [
      "#c084fc", "#8b5cf6", "#06b6d4", "#22d3ee",
      "#ec4899", "#f59e0b", "#ffffff", "#a78bfa",
      "#67e8f9", "#f0abfc", "#818cf8", "#34d399",
      "#e9d5ff", "#fde68a",
    ][i],
  };
});

export default function Logo({
  className = "",
  showText = true,
  size = 32,
}: LogoProps) {
  const [hovering, setHovering] = useState(false);
  const iconSize = size;
  const textHeight = size * 0.55;

  return (
    <motion.span
      className={`group relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
    >
      {/* Glow halo behind icon */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            key="halo"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute z-0"
            style={{
              width: iconSize * 2.8,
              height: iconSize * 2.8,
              left: -(iconSize * 0.9),
              top: "50%",
              marginTop: -(iconSize * 1.4),
              background:
                "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Expanding pulse ring */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            key="ring"
            initial={{ opacity: 0.7, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute z-0 rounded-full"
            style={{
              width: iconSize,
              height: iconSize,
              left: 0,
              top: "50%",
              marginTop: -(iconSize / 2),
              border: "1.5px solid rgba(139,92,246,0.45)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle burst */}
      <AnimatePresence>
        {hovering &&
          SPARKLES.map((s) => (
            <motion.span
              key={s.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: s.x,
                y: s.y,
                scale: [0, 1.3, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.75,
                delay: s.delay,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute z-30 rounded-full"
              style={{
                width: s.size,
                height: s.size,
                left: iconSize / 2 - s.size / 2,
                top: "50%",
                marginTop: -(s.size / 2),
                background: s.color,
                boxShadow: `0 0 6px ${s.color}`,
              }}
            />
          ))}
      </AnimatePresence>

      {/* SVG icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="relative z-10 transition-all duration-300"
        style={{
          filter: hovering
            ? "drop-shadow(0 0 10px rgba(139,92,246,0.6)) drop-shadow(0 0 20px rgba(6,182,212,0.2))"
            : "none",
        }}
      >
        <defs>
          <radialGradient id={`core-glow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0e6ff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#c084fc" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`core-inner-${size}`} cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#e9d5ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`streak-purple-${size}`}
            x1="0%"
            y1="100%"
            x2="50%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient
            id={`streak-cyan-${size}`}
            x1="100%"
            y1="100%"
            x2="50%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient
            id={`streak-pink-${size}`}
            x1="0%"
            y1="0%"
            x2="50%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
            <stop offset="40%" stopColor="#d946ef" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient
            id={`streak-blue-${size}`}
            x1="100%"
            y1="0%"
            x2="50%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
          </linearGradient>
          <filter id={`glow-filter-${size}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`soft-glow-${size}`}>
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background glow — expands on hover */}
        <circle
          cx="60"
          cy="60"
          r={hovering ? 34 : 28}
          fill={`url(#core-glow-${size})`}
          filter={`url(#soft-glow-${size})`}
          style={{ transition: "r 0.4s ease" }}
        />

        {/* Energy streaks */}
        <g
          filter={`url(#glow-filter-${size})`}
          style={{
            opacity: hovering ? 1 : 0.85,
            transition: "opacity 0.3s",
          }}
        >
          <path
            d="M 18 102 C 28 82, 42 68, 57 61"
            stroke={`url(#streak-purple-${size})`}
            strokeWidth={hovering ? 3.5 : 2.5}
            strokeLinecap="round"
            fill="none"
            style={{ transition: "stroke-width 0.3s" }}
          />
          <path
            d="M 12 90 C 26 76, 40 66, 56 60"
            stroke={`url(#streak-purple-${size})`}
            strokeWidth={hovering ? 2.5 : 1.5}
            strokeLinecap="round"
            fill="none"
            opacity={hovering ? 0.8 : 0.5}
            style={{ transition: "stroke-width 0.3s, opacity 0.3s" }}
          />

          <path
            d="M 102 102 C 92 82, 78 68, 63 61"
            stroke={`url(#streak-cyan-${size})`}
            strokeWidth={hovering ? 3.5 : 2.5}
            strokeLinecap="round"
            fill="none"
            style={{ transition: "stroke-width 0.3s" }}
          />
          <path
            d="M 108 90 C 94 76, 80 66, 64 60"
            stroke={`url(#streak-cyan-${size})`}
            strokeWidth={hovering ? 2.5 : 1.5}
            strokeLinecap="round"
            fill="none"
            opacity={hovering ? 0.8 : 0.5}
            style={{ transition: "stroke-width 0.3s, opacity 0.3s" }}
          />

          <path
            d="M 18 18 C 28 38, 42 52, 57 59"
            stroke={`url(#streak-pink-${size})`}
            strokeWidth={hovering ? 3.5 : 2.5}
            strokeLinecap="round"
            fill="none"
            style={{ transition: "stroke-width 0.3s" }}
          />
          <path
            d="M 12 30 C 26 44, 40 54, 56 60"
            stroke={`url(#streak-pink-${size})`}
            strokeWidth={hovering ? 2.5 : 1.5}
            strokeLinecap="round"
            fill="none"
            opacity={hovering ? 0.8 : 0.5}
            style={{ transition: "stroke-width 0.3s, opacity 0.3s" }}
          />

          <path
            d="M 102 18 C 92 38, 78 52, 63 59"
            stroke={`url(#streak-blue-${size})`}
            strokeWidth={hovering ? 3.5 : 2.5}
            strokeLinecap="round"
            fill="none"
            style={{ transition: "stroke-width 0.3s" }}
          />
          <path
            d="M 108 30 C 94 44, 80 54, 64 60"
            stroke={`url(#streak-blue-${size})`}
            strokeWidth={hovering ? 2.5 : 1.5}
            strokeLinecap="round"
            fill="none"
            opacity={hovering ? 0.8 : 0.5}
            style={{ transition: "stroke-width 0.3s, opacity 0.3s" }}
          />
        </g>

        {/* Central orb — brightens on hover */}
        <circle
          cx="60"
          cy="60"
          r={hovering ? 18 : 14}
          fill={`url(#core-glow-${size})`}
          style={{ transition: "r 0.3s ease" }}
        />
        <circle
          cx="60"
          cy="60"
          r={hovering ? 9 : 7}
          fill={`url(#core-inner-${size})`}
          style={{ transition: "r 0.3s ease" }}
        />
        <circle
          cx="60"
          cy="60"
          r={hovering ? 4.5 : 3.5}
          fill="white"
          opacity="0.95"
          style={{ transition: "r 0.3s ease" }}
        />
      </svg>

      {/* Text with shimmer sweep on hover */}
      {showText && (
        <span
          style={{ fontSize: textHeight, lineHeight: 1 }}
          className="relative overflow-hidden font-light tracking-wide text-white/90"
        >
          <span className="relative z-10">hubfield</span>
          <AnimatePresence>
            {hovering && (
              <motion.span
                key="shimmer"
                initial={{ x: "-120%" }}
                animate={{ x: "250%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="pointer-events-none absolute inset-y-0 z-20"
                style={{
                  width: "40%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(196,132,252,0.4) 30%, rgba(255,255,255,0.5) 50%, rgba(6,182,212,0.4) 70%, transparent)",
                  filter: "blur(1px)",
                }}
              />
            )}
          </AnimatePresence>
        </span>
      )}
    </motion.span>
  );
}
