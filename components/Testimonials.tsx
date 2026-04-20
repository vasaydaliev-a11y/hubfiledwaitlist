"use client";

import { motion } from "framer-motion";

const signals = [
  { label: "Backed by", value: "IT Park Uzbekistan" },
  { label: "Models integrated", value: "50+" },
  { label: "Beta testers", value: "Invite-only" },
  { label: "Data residency", value: "Tashkent DC" }
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-6 sm:p-8"
        style={{
          border: "1px solid rgba(255,255,255,0.04)",
          background: "linear-gradient(160deg, rgba(14,14,24,0.6), rgba(8,8,16,0.4))"
        }}
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {signals.map((s, index) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="text-center"
            >
              <p className="text-lg font-semibold text-white sm:text-xl">{s.value}</p>
              <p className="mt-1 text-[11px] text-white/30">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
