"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

const ORBIT_DOTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (360 / 8) * i,
  radius: 120 + Math.random() * 40,
  size: 2 + Math.random() * 2,
  duration: 15 + Math.random() * 10,
  color: [
    "rgba(139,92,246,0.5)",
    "rgba(6,182,212,0.4)",
    "rgba(236,72,153,0.35)",
    "rgba(196,132,252,0.45)",
  ][i % 4],
}));

export default function NotFound() {
  return (
    <main className="noise-overlay vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center text-white">
      {/* Background stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Nebula glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Orbiting particles around 404 */}
        <div className="relative" aria-hidden="true">
          {ORBIT_DOTS.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: dot.size,
                height: dot.size,
                background: dot.color,
                boxShadow: `0 0 6px ${dot.color}`,
                marginLeft: -dot.size / 2,
                marginTop: -dot.size / 2,
              }}
              animate={{
                x: [
                  Math.cos((dot.angle * Math.PI) / 180) * dot.radius,
                  Math.cos(((dot.angle + 360) * Math.PI) / 180) * dot.radius,
                ],
                y: [
                  Math.sin((dot.angle * Math.PI) / 180) * dot.radius * 0.4,
                  Math.sin(((dot.angle + 360) * Math.PI) / 180) *
                    dot.radius *
                    0.4,
                ],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* 404 number */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[12rem]"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.12) 50%, rgba(236,72,153,0.1) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(139,92,246,0.25)",
            }}
          >
            404
          </motion.h1>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-medium text-white/60 sm:text-2xl"
        >
          Lost in the cosmos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="max-w-md text-base text-white/30"
        >
          The page you&apos;re looking for drifted into a black hole.
          Let&apos;s navigate you back to safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow:
                "0 0 20px rgba(139,92,246,0.1), 0 8px 32px rgba(0,0,0,0.3)",
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
