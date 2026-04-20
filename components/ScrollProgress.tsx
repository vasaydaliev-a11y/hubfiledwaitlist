"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #f59e0b, #7C3AED, #06B6D4)"
      }}
    />
  );
}
