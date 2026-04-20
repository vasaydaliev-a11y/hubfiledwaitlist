"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import WaitlistForm from "@/components/WaitlistForm";

const heroItems = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: "easeOut"
    }
  })
};

const headlineWords = ["The", "Future", "of", "AI,"];

function TypewriterHeadline() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (visibleCount < headlineWords.length) {
        setVisibleCount((prev) => prev + 1);
      }
    }, 180);
    return () => clearTimeout(timeout);
  }, [visibleCount]);

  return (
    <span className="text-brand-gradient">
      {headlineWords.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={
            index < visibleCount
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Spotlight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "min(700px, 90vw)",
          height: "70vh",
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(124,58,237,0.12) 47%, rgba(6,182,212,0.08) 50%, rgba(124,58,237,0.12) 53%, transparent 60%)",
          maskImage: "linear-gradient(to bottom, white 10%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 10%, transparent 90%)"
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/50 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 300,
          height: 180,
          background: "radial-gradient(ellipse, rgba(124,58,237,0.18), transparent 70%)",
          filter: "blur(40px)"
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-16 sm:px-6">
      <Spotlight />
      <ParticleBackground />

      <div className="section-glow relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="neo-glass-subtle mb-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs text-white/90 sm:text-sm"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-200" />
          </span>
          Now accepting early access
        </motion.div>

        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <TypewriterHeadline />
          <br />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
          >
            In One Platform
          </motion.span>
        </motion.h1>

        <motion.p
          custom={0.35}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="mt-6 max-w-3xl text-balance text-sm leading-relaxed text-white/70 sm:text-lg"
        >
          Access 50+ AI models, hire AI specialists, and automate your workflow — all in one place.
          Powered by the world&apos;s most advanced generative AI.
        </motion.p>

        <motion.div custom={0.5} initial="hidden" animate="visible" variants={heroItems} className="mt-10 w-full">
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
}
