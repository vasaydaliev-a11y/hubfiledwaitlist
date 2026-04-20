"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode[];
  speed?: number;
};

export default function Marquee({ children, speed = 30 }: MarqueeProps) {
  const duplicated = [...children, ...children, ...children];
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="flex flex-wrap items-center justify-center gap-4"
        aria-hidden="true"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="neo-inset flex items-center justify-center rounded-lg px-5 py-2.5"
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max gap-6"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((child, index) => (
          <div
            key={index}
            className="neo-inset flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_16px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(139,92,246,0.06)]"
            style={{ borderColor: "transparent" }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
