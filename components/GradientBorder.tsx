"use client";

import { motion } from "framer-motion";

type GradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
};

export default function GradientBorder({
  children,
  className = "",
  borderRadius = "1.25rem"
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`} style={{ borderRadius }}>
      <motion.div
        className="pointer-events-none absolute -inset-[1px] z-0 overflow-hidden"
        style={{ borderRadius }}
        animate={{
          background: [
            "linear-gradient(0deg, #7C3AED, #06B6D4, #7C3AED)",
            "linear-gradient(120deg, #06B6D4, #7C3AED, #06B6D4)",
            "linear-gradient(240deg, #7C3AED, #06B6D4, #7C3AED)",
            "linear-gradient(360deg, #06B6D4, #7C3AED, #06B6D4)"
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-[1px] bg-background" style={{ borderRadius }} />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
