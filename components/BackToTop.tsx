"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 1200);
  });

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
      className="fixed bottom-20 right-4 z-[9995] hidden h-10 w-10 items-center justify-center rounded-xl text-white/50 backdrop-blur-md transition-colors hover:text-white/80 sm:bottom-6 sm:right-6 sm:flex"
      style={{
        pointerEvents: visible ? "auto" : "none",
        border: "1px solid rgba(139,92,246,0.12)",
        background:
          "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.7))",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  );
}
