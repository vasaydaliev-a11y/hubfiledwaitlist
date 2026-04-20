"use client";

import { motion } from "framer-motion";
import GradientBorder from "@/components/GradientBorder";

const testimonials = [
  {
    quote: "HUBFIELD changed how our team works with AI. One platform, every model — it's a game changer.",
    name: "Aziza Karimova",
    role: "CTO, DataFlow UZ",
    avatar: "AK"
  },
  {
    quote: "The freelance marketplace connected us with incredible AI engineers in days, not months.",
    name: "James Chen",
    role: "VP Engineering, NovaTech",
    avatar: "JC"
  },
  {
    quote: "Smart Model Router alone saved us 40% on API costs. The platform pays for itself.",
    name: "Sardor Alimov",
    role: "Founder, AI Solutions Hub",
    avatar: "SA"
  }
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/60">Testimonials</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What People Are Saying
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <GradientBorder key={t.name} borderRadius="1rem">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="neo-glass flex h-full flex-col rounded-2xl p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-neo-inner"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)"
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.role}</p>
                </div>
              </div>
            </motion.blockquote>
          </GradientBorder>
        ))}
      </div>
    </section>
  );
}
