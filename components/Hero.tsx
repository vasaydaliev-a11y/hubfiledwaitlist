"use client";

import { motion } from "framer-motion";
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

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-16 sm:px-6">
      <ParticleBackground />

      <div className="section-glow relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur-xl sm:text-sm"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-200" />
          </span>
          Now accepting early access
        </motion.div>

        <motion.h1
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span className="text-brand-gradient">The Future of AI,</span>
          <br />
          In One Platform
        </motion.h1>

        <motion.p
          custom={0.35}
          initial="hidden"
          animate="visible"
          variants={heroItems}
          className="mt-6 max-w-3xl text-balance text-sm leading-relaxed text-white/75 sm:text-lg"
        >
          Access 50+ AI models, hire AI specialists, and automate your workflow - all in one place.
          Powered by the world&apos;s most advanced generative AI.
        </motion.p>

        <motion.div custom={0.5} initial="hidden" animate="visible" variants={heroItems} className="mt-10 w-full">
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
}
