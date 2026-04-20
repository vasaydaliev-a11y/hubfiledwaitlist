"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "AI Models" },
  { value: 10000, suffix: "+", label: "Early Signups" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" }
];

export default function Stats() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="neo-glass rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-brand-gradient sm:text-4xl">
              {stat.suffix === "%" ? (
                <span>{stat.value}%</span>
              ) : (
                <AnimatedCounter target={stat.value} duration={2.2} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-2 text-sm text-white/55">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
