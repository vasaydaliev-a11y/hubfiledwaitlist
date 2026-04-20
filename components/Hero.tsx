"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroOrb from "@/components/HeroOrb";
import WaitlistForm from "@/components/WaitlistForm";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const headlineWords = ["The", "Future", "of", "AI,"];

function TypewriterLine() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= headlineWords.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 180);
    return () => clearTimeout(id);
  }, [count]);

  return (
    <span className="text-brand-gradient">
      {headlineWords.map((w, i) => (
        <motion.span
          key={w}
          initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
          animate={i < count ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mr-[0.22em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-24 pt-20 sm:px-6">
      <HeroOrb />

      <div className="section-glow relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="neo-glass-subtle mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm tracking-wide text-white/70"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
          </span>
          Now accepting early access
        </motion.div>

        <motion.h1
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="max-w-3xl text-balance text-[3rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[4.2rem] lg:text-[5.4rem]"
        >
          <TypewriterLine />
          <br />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55, ease: "easeOut" }}
          >
            In One Platform
          </motion.span>
        </motion.h1>

        <motion.p
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/50 sm:text-xl"
        >
          Every major AI model. A marketplace of specialists.
          Workflow automation that actually works. Built in Tashkent, made for the world.
        </motion.p>

        <motion.div custom={0.65} initial="hidden" animate="visible" variants={fade} className="mt-10 w-full">
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  );
}
