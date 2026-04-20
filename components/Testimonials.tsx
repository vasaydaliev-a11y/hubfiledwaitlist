"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "HUBFIELD replaced three different APIs in our pipeline. One SDK, one bill, and the Smart Router saves us 30% on inference costs.",
    name: "Aziz Karimov",
    role: "CTO, DataPulse",
    avatar: "AK",
    accent: "rgba(139, 92, 246, 0.12)",
    accentBorder: "rgba(139, 92, 246, 0.15)",
  },
  {
    quote:
      "The Generative Studio is incredible. Our content team went from using 5 tools to one dashboard. Plus, local data residency was a dealbreaker we couldn't get elsewhere.",
    name: "Nodira Rustamova",
    role: "Head of AI, CreativeUz",
    avatar: "NR",
    accent: "rgba(124, 58, 237, 0.1)",
    accentBorder: "rgba(124, 58, 237, 0.12)",
  },
  {
    quote:
      "We hired a fine-tuning specialist through the marketplace in 48 hours. They shipped a custom model that outperforms GPT-4 on our domain.",
    name: "Timur Bekmurodov",
    role: "Founder, AgriAI",
    avatar: "TB",
    accent: "rgba(6, 182, 212, 0.1)",
    accentBorder: "rgba(6, 182, 212, 0.12)",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          Early users
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Loved by builders
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{
              y: -6,
              boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${t.accent}`,
              transition: { duration: 0.3 },
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-500"
            style={{
              border: `1px solid ${t.accentBorder}`,
              background:
                "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.65))",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${t.accent}, transparent 65%)`,
              }}
            />

            {/* Quote mark with glow */}
            <div className="relative z-10 mb-4">
              <svg
                className="h-6 w-6 text-white/10 transition-colors duration-300 group-hover:text-violet-400/20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11.3 2.6C6.1 5.1 3 9.7 3 14.5c0 3.2 2 5.5 4.5 5.5 2.3 0 4-1.7 4-4 0-2.2-1.6-3.8-3.5-4-.3 0-.5 0-.8.1.6-3 3-5.8 5.8-7.3L11.3 2.6zm10 0C16.1 5.1 13 9.7 13 14.5c0 3.2 2 5.5 4.5 5.5 2.3 0 4-1.7 4-4 0-2.2-1.6-3.8-3.5-4-.3 0-.5 0-.8.1.6-3 3-5.8 5.8-7.3L21.3 2.6z" />
              </svg>
            </div>

            <p className="relative z-10 flex-1 text-base leading-relaxed text-white/50">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="relative z-10 mt-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white/80"
                style={{
                  background: t.accent,
                  border: `1px solid ${t.accentBorder}`,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">{t.name}</p>
                <p className="text-xs text-white/30">{t.role}</p>
              </div>
            </div>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
