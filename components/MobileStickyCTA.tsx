"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function MobileStickyCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-[9996] block p-3 sm:hidden"
      style={{
        background:
          "linear-gradient(to top, rgba(5,5,8,0.95) 60%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <a
        href="#waitlist"
        className="block w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white"
        style={{
          background: "linear-gradient(135deg, #f59e0b, #ea580c, #7C3AED)",
          boxShadow:
            "0 4px 20px rgba(245,158,11,0.25), 0 0 40px rgba(124,58,237,0.1)",
        }}
      >
        Join Waitlist
      </a>
    </motion.div>
  );
}
