"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your AI",
    description: "Pick from 50+ models or let Smart Router choose the best one for your task."
  },
  {
    number: "02",
    title: "Generate & Create",
    description: "Text, images, video, code — generate anything with a unified interface."
  },
  {
    number: "03",
    title: "Ship & Scale",
    description: "Integrate via API, hire AI specialists, and scale your workflows instantly."
  }
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/60">How It Works</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Three Steps to AI Mastery
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/30 via-cyan-400/20 to-transparent lg:block" />

        <div className="flex flex-col gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex items-center gap-6 lg:gap-12 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="flex flex-1 items-start gap-5">
                <motion.div
                  whileInView={{
                    boxShadow: [
                      "0 0 0 rgba(124,58,237,0)",
                      "0 0 30px rgba(124,58,237,0.35)",
                      "0 0 10px rgba(124,58,237,0.15)"
                    ]
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className="neo-glass-raised flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                >
                  <span className="text-lg font-bold text-brand-gradient">{step.number}</span>
                </motion.div>

                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </div>

              <div className="hidden flex-1 lg:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
