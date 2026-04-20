"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import WaitlistForm from "@/components/WaitlistForm";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" }
  })
};

const words = ["The", "Future", "of", "AI,"];

function TypewriterLine() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= words.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 200);
    return () => clearTimeout(id);
  }, [count]);

  return (
    <span className="text-brand-gradient">
      {words.map((w, i) => (
        <motion.span
          key={w}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={i < count ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mr-[0.25em] inline-block"
        >
          {w}
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
        transition={{ duration: 2.5, delay: 0.2 }}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "min(600px, 80vw)",
          height: "65vh",
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 42%, rgba(124,58,237,0.1) 48%, rgba(6,182,212,0.06) 50%, rgba(124,58,237,0.1) 52%, transparent 58%)",
          maskImage: "linear-gradient(to bottom, white 5%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 5%, transparent 85%)"
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/40 to-transparent"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-20 pt-16 sm:px-6">
      <Spotlight />
      <ParticleBackground />

      <div className="section-glow relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="neo-glass-subtle mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200" />
          </span>
          Now accepting early access
        </motion.div>

        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.1]"
        >
          <TypewriterLine />
          <br />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            In One Platform
          </motion.span>
        </motion.h1>

        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-white/60 sm:text-base"
        >
          Every major AI model. A marketplace of specialists.
          Workflow automation that actually works. Built in Tashkent, made for the world.
        </motion.p>

        <motion.div custom={0.55} initial="hidden" animate="visible" variants={fade} className="mt-10 w-full">
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
}
