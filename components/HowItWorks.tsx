"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick a model — or don't",
    description: "Choose manually from 50+ models, or let Smart Router handle it. Either way, one API call."
  },
  {
    number: "02",
    title: "Build what matters",
    description: "Generate text, images, video, code. Combine models. Chain workflows. Ship faster."
  },
  {
    number: "03",
    title: "Scale with your team",
    description: "Add teammates, set budgets, track usage. Hire AI specialists when you need extra hands."
  }
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          How it works
        </h2>
      </motion.div>

      <div className="relative flex flex-col gap-8">
        <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-violet-400/25 via-cyan-500/15 to-transparent sm:left-[23px]" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex gap-5 pl-1"
          >
            <div
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-brand-gradient sm:h-14 sm:w-14"
              style={{
                border: "1px solid rgba(139, 92, 246, 0.15)",
                background: "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.7))"
              }}
            >
              {step.number}
            </div>
            <div className="pt-1.5">
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-white/40">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
