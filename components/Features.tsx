"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🤖",
    title: "50+ AI Models",
    description: "GPT-4o, Claude, Gemini, Llama and more in one place"
  },
  {
    icon: "🎨",
    title: "Generative AI Studio",
    description: "Images, video, audio, code — generate anything"
  },
  {
    icon: "🧑‍💻",
    title: "AI Freelance Marketplace",
    description: "Hire vetted AI specialists for your projects"
  },
  {
    icon: "⚡",
    title: "Smart Model Router",
    description: "Auto-selects the best AI model for your task"
  },
  {
    icon: "🔒",
    title: "Enterprise Ready",
    description: "SOC2, GDPR compliant, team workspaces"
  },
  {
    icon: "🌍",
    title: "Built for Central Asia",
    description: "Localized for Uzbekistan and CIS markets"
  }
];

const logos = ["OpenAI", "Anthropic", "Google Gemini", "Meta Llama", "Stability AI", "Midjourney"];

export default function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Everything AI. One Platform.
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{
              y: -4,
              boxShadow:
                "10px 10px 30px rgba(0,0,0,0.7), -8px -8px 22px rgba(255,255,255,0.04), 0 0 30px rgba(6,182,212,0.2)"
            }}
            className="neo-glass group cursor-default rounded-2xl p-6 transition-all duration-300"
          >
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-neo-inner"
              style={{
                background: "linear-gradient(145deg, rgba(18,18,32,0.9), rgba(10,11,22,0.7))"
              }}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.description}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="neo-glass-subtle mt-16 rounded-2xl px-5 py-7 sm:px-8"
      >
        <p className="mb-5 text-center text-xs uppercase tracking-[0.22em] text-white/40">
          Supported models
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {logos.map((logo) => (
            <span
              key={logo}
              className="rounded-lg px-3 py-1.5 text-sm text-white/55 shadow-neo-inner transition hover:text-white/80"
              style={{
                background: "linear-gradient(145deg, rgba(12,12,22,0.6), rgba(7,8,16,0.4))"
              }}
            >
              {logo}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
