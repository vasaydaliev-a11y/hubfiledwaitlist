"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #8b5cf6, #06B6D4, #ec4899)",
        boxShadow:
          "0 0 8px rgba(139,92,246,0.4), 0 0 16px rgba(6,182,212,0.2)",
      }}
    />
  );
}
