"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "AI models",
    color: "rgba(139,92,246,0.5)",
    glowColor: "#8b5cf6",
  },
  {
    value: 1200,
    suffix: "+",
    label: "On the waitlist",
    color: "rgba(6,182,212,0.5)",
    glowColor: "#06b6d4",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime target",
    color: "rgba(236,72,153,0.5)",
    glowColor: "#ec4899",
  },
];

function GlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.span
      className="absolute left-1/2 top-0 -translate-x-1/2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <span
        className="block h-1.5 w-1.5 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
        }}
      />
    </motion.span>
  );
}

export default function Stats() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-4 sm:px-6">
      <div
        className="relative grid grid-cols-1 rounded-2xl sm:grid-cols-3"
        style={{
          border: "1px solid rgba(139,92,246,0.06)",
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.6), rgba(3,0,20,0.4))",
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative px-4 py-6 text-center sm:py-8"
          >
            {/* Vertical divider on desktop, horizontal on mobile */}
            {index > 0 && (
              <>
                {/* Desktop vertical */}
                <div
                  className="absolute left-0 top-[15%] hidden h-[70%] w-px sm:block"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${stat.color} 50%, transparent 100%)`,
                  }}
                />
                {/* Mobile horizontal */}
                <div
                  className="absolute left-[15%] top-0 h-px w-[70%] sm:hidden"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${stat.color} 50%, transparent 100%)`,
                  }}
                />
                {/* Glow dot at intersection */}
                <div className="hidden sm:block">
                  <GlowDot color={stat.glowColor} delay={0.3 + index * 0.1} />
                </div>
              </>
            )}

            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${stat.color.replace("0.5", "0.06")}, transparent 70%)`,
              }}
            />

            <motion.p
              className="relative text-3xl font-bold text-white sm:text-4xl"
              whileHover={{
                scale: 1.05,
                textShadow: `0 0 20px ${stat.color}`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {stat.suffix === "%" ? (
                <span>{stat.value}%</span>
              ) : (
                <AnimatedCounter
                  target={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                />
              )}
            </motion.p>
            <p className="mt-2 text-sm text-white/30 transition-colors group-hover:text-white/45">
              {stat.label}
              <span
                className="mx-auto mt-1 block h-px w-0 rounded-full transition-all duration-500 group-hover:w-full"
                style={{ background: stat.color }}
              />
            </p>

            {/* Bottom accent line */}
            <motion.div
              className="mx-auto mt-3 h-px w-8 rounded-full"
              style={{ background: stat.color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
