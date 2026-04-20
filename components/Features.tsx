"use client";

import { motion } from "framer-motion";
import { ModelsIcon, StudioIcon, MarketplaceIcon, RouterIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";
import TiltCard from "@/components/TiltCard";
import Marquee from "@/components/Marquee";

const features = [
  {
    icon: ModelsIcon,
    title: "50+ AI Models",
    description: "GPT-4o, Claude, Gemini, Llama — one API, every frontier model.",
    span: "sm:col-span-2"
  },
  {
    icon: StudioIcon,
    title: "Generative Studio",
    description: "Text, images, video, audio, code. One canvas for everything.",
    span: ""
  },
  {
    icon: RouterIcon,
    title: "Smart Router",
    description: "Automatically picks the fastest, cheapest, or most capable model for each request.",
    span: ""
  },
  {
    icon: MarketplaceIcon,
    title: "AI Talent Marketplace",
    description: "Vetted specialists ready to build, fine-tune, and deploy for you.",
    span: "sm:col-span-2"
  },
  {
    icon: ShieldIcon,
    title: "Enterprise Grade",
    description: "SOC2 & GDPR. Team workspaces. Audit logs. Built for serious work.",
    span: ""
  },
  {
    icon: GlobeIcon,
    title: "Made for Central Asia",
    description: "Local infrastructure, UZS billing, Uzbek & Russian language support.",
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
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">What you get</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          One platform. Zero compromises.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <TiltCard key={feature.title} className={`group ${feature.span}`}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="neo-glass h-full cursor-default rounded-2xl p-6 transition-all duration-300 hover:border-white/15"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-cyan-200/80 shadow-neo-inner"
                  style={{
                    background: "linear-gradient(145deg, rgba(18,18,32,0.9), rgba(10,11,22,0.7))"
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-medium text-white">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {feature.description}
                </p>
              </motion.article>
            </TiltCard>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 rounded-2xl border border-white/[0.06] px-2 py-6 sm:px-4"
      >
        <p className="mb-4 text-center text-[11px] uppercase tracking-[0.25em] text-white/30">
          Supported providers
        </p>
        <Marquee items={logos} speed={28} />
      </motion.div>
    </section>
  );
}
