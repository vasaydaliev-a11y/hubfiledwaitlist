"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "AI models" },
  { value: 1200, suffix: "+", label: "On the waitlist" },
  { value: 99.9, suffix: "%", label: "Uptime target" }
];

export default function Stats() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-8 pt-4 sm:px-6">
      <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="px-4 py-4 text-center"
          >
            <p className="text-2xl font-semibold text-white sm:text-3xl">
              {stat.suffix === "%" ? (
                <span>{stat.value}%</span>
              ) : (
                <AnimatedCounter target={stat.value} duration={2} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
