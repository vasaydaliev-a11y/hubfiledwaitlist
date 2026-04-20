"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";

export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 1200);
  });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const circumference = 2 * Math.PI * 16;

  return (
    <motion.button
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 20,
      }}
      transition={{ duration: 0.25 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-20 right-4 z-[9995] hidden h-11 w-11 items-center justify-center rounded-xl text-white/50 backdrop-blur-md transition-colors hover:text-white/80 sm:bottom-6 sm:right-6 sm:flex"
      style={{
        pointerEvents: visible ? "auto" : "none",
        border: "1px solid rgba(139,92,246,0.12)",
        background:
          "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.7))",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        className="absolute inset-0 m-auto -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="rgba(139,92,246,0.08)"
          strokeWidth="2"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: useTransform(
              strokeDashoffset,
              (v) => (v / 100) * circumference
            ),
          }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="relative"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  );
}
