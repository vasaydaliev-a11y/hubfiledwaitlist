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
        pointerEvents: visible ? "auto" : "none",
        background:
          "linear-gradient(to top, rgba(3,0,20,0.95) 60%, transparent)",
        backdropFilter: "blur(12px)",
      }}
      aria-hidden={!visible}
    >
      <a
        href="#waitlist"
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-center text-sm font-semibold text-white"
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #6d28d9, #06B6D4)",
          boxShadow:
            "0 4px 20px rgba(139,92,246,0.3), 0 0 40px rgba(6,182,212,0.1)",
        }}
      >
        Join Waitlist
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium tabular-nums">
          127 spots left
        </span>
      </a>
    </motion.div>
  );
}
