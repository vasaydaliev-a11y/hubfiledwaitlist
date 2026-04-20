"use client";

import { motion } from "framer-motion";
import { ModelsIcon, StudioIcon, MarketplaceIcon, RouterIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";
import Marquee from "@/components/Marquee";

const features = [
  {
    icon: ModelsIcon,
    title: "50+ AI Models",
    description: "GPT-4o, Claude, Gemini, Llama — one API, every frontier model.",
    accent: "rgba(139, 92, 246, 0.12)",
    accentBorder: "rgba(139, 92, 246, 0.15)",
    span: "sm:col-span-2"
  },
  {
    icon: StudioIcon,
    title: "Generative Studio",
    description: "Text, images, video, audio, code. One canvas for everything.",
    accent: "rgba(6, 182, 212, 0.1)",
    accentBorder: "rgba(6, 182, 212, 0.12)",
    span: ""
  },
  {
    icon: RouterIcon,
    title: "Smart Router",
    description: "Picks the fastest, cheapest, or most capable model — automatically.",
    accent: "rgba(236, 72, 153, 0.1)",
    accentBorder: "rgba(236, 72, 153, 0.12)",
    span: ""
  },
  {
    icon: MarketplaceIcon,
    title: "AI Talent Marketplace",
    description: "Vetted specialists ready to build, fine-tune, and deploy for you.",
    accent: "rgba(196, 132, 252, 0.1)",
    accentBorder: "rgba(196, 132, 252, 0.12)",
    span: "sm:col-span-2"
  },
  {
    icon: ShieldIcon,
    title: "Enterprise Grade",
    description: "SOC2 & GDPR. Team workspaces. Audit logs. Built for serious work.",
    accent: "rgba(59, 130, 246, 0.1)",
    accentBorder: "rgba(59, 130, 246, 0.1)",
    span: ""
  },
  {
    icon: GlobeIcon,
    title: "Made for Central Asia",
    description: "Local infrastructure, UZS billing, Uzbek & Russian language support.",
    accent: "rgba(6, 182, 212, 0.08)",
    accentBorder: "rgba(6, 182, 212, 0.1)",
    span: "sm:col-span-2 lg:col-span-1"
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
    <section className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">What you get</p>
        <h2 className="mt-3 text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
          One platform. Zero compromises.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`group relative cursor-default overflow-hidden rounded-2xl p-5 transition-all duration-500 ${feature.span}`}
              style={{
                border: `1px solid ${feature.accentBorder}`,
                background: "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.65))"
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 30% 0%, ${feature.accent}, transparent 65%)`
                }}
              />

              <div className="relative z-10">
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: feature.accent,
                    border: `1px solid ${feature.accentBorder}`
                  }}
                >
                  <Icon className="h-[18px] w-[18px] text-white/80" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-white/45">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-16 rounded-2xl px-2 py-5 sm:px-4"
        style={{ border: "1px solid rgba(139,92,246,0.06)" }}
      >
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-white/25">
          Supported providers
        </p>
        <Marquee items={logos} speed={28} />
      </motion.div>
    </section>
  );
}
