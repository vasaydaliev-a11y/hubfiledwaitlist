"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "#030014" }}
        >
          {/* Background pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Expanding rings */}
          {[0, 0.5, 1].map((delay) => (
            <motion.div
              key={delay}
              className="absolute rounded-full border"
              style={{
                width: 80,
                height: 80,
                borderColor: "rgba(139,92,246,0.3)",
              }}
              animate={{
                scale: [0.5, 3],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Core logo orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Animated orb */}
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.6) 90deg, rgba(6,182,212,0.4) 180deg, transparent 270deg)",
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute inset-[3px] rounded-full"
                style={{ background: "#030014" }}
              />
              <div
                className="absolute inset-[6px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(196,132,252,0.4) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
                }}
              />
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, white 0%, rgba(196,132,252,0.5) 60%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Brand text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm font-light tracking-[0.3em] text-white/40"
            >
              HUBFIELD
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="h-px w-24 overflow-hidden rounded-full"
              style={{ background: "rgba(139,92,246,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
