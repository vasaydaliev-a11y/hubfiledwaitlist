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
    <section className="mx-auto w-full max-w-4xl px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How it works
        </h2>
      </motion.div>

      <div className="relative flex flex-col gap-8">
        <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-purple-500/25 via-cyan-400/15 to-transparent sm:left-[23px]" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            className="relative flex gap-5 pl-1"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-background text-sm font-semibold text-brand-gradient shadow-neo-outer sm:h-12 sm:w-12">
              {step.number}
            </div>
            <div className="pt-1">
              <h3 className="text-base font-medium text-white">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
