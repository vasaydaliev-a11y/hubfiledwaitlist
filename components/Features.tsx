"use client";

import { motion } from "framer-motion";
import GradientBorder from "@/components/GradientBorder";
import TiltCard from "@/components/TiltCard";
import Marquee from "@/components/Marquee";

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

const logos = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "Meta Llama",
  "Stability AI",
  "Midjourney",
  "Mistral",
  "Cohere"
];

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
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/60">Features</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Everything AI. One Platform.
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <GradientBorder key={feature.title} borderRadius="1rem">
            <TiltCard className="group">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="neo-glass cursor-default rounded-2xl p-6 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -8, 8, 0],
                    boxShadow:
                      "inset 4px 4px 10px rgba(0,0,0,0.6), inset -3px -3px 8px rgba(255,255,255,0.03), 0 0 20px rgba(124,58,237,0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-neo-inner"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(18,18,32,0.9), rgba(10,11,22,0.7))"
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {feature.description}
                </p>
              </motion.article>
            </TiltCard>
          </GradientBorder>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="neo-glass-subtle mt-16 rounded-2xl px-2 py-7 sm:px-4"
      >
        <p className="mb-5 text-center text-xs uppercase tracking-[0.22em] text-white/40">
          Supported models
        </p>
        <Marquee items={logos} speed={25} />
      </motion.div>
    </section>
  );
}
