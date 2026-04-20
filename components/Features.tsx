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
    description: "Images, video, audio, code - generate anything"
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
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Everything AI. One Platform.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-cyan-300/35 hover:shadow-cyanGlow"
          >
            <span className="text-2xl">{feature.icon}</span>
            <h3 className="mt-4 text-lg font-medium text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/72">{feature.description}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-6 sm:px-6">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-white/45">Supported models</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60 sm:text-base">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
