"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Pick a model — or don't",
    description:
      "Choose manually from 50+ models, or let Smart Router handle it. Either way, one API call.",
    color: "#8b5cf6",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build what matters",
    description:
      "Generate text, images, video, code. Combine models. Chain workflows. Ship faster.",
    color: "#06b6d4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scale with your team",
    description:
      "Add teammates, set budgets, track usage. Hire AI specialists when you need extra hands.",
    color: "#ec4899",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

function TimelineNode({
  color,
  index,
}: {
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.1 + index * 0.15,
      }}
      className="absolute left-[19px] top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full sm:left-[23px]"
      style={{
        background: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}40`,
      }}
    />
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="howitworks-heading"
      className="mx-auto w-full max-w-4xl px-4 pb-28 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          Getting started
        </p>
        <h2 id="howitworks-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          How it works
        </h2>
      </motion.div>

      <div className="relative">
        {/* Static track */}
        <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/[0.04] sm:left-[23px]" />

        {/* Scroll-drawn gradient line */}
        <motion.div
          className="absolute left-[19px] top-0 w-px origin-top sm:left-[23px]"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(180deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
            boxShadow:
              "0 0 6px rgba(139,92,246,0.4), 0 0 12px rgba(6,182,212,0.2)",
          }}
        />

        <ol className="relative flex flex-col gap-10">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="group relative flex gap-5 pl-1"
            >
              <TimelineNode color={step.color} index={index} />

              <div
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 group-hover:shadow-lg sm:h-14 sm:w-14"
                style={{
                  border: `1px solid ${step.color}25`,
                  background:
                    "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.7))",
                  color: step.color,
                }}
              >
                <span className="transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                  {step.number}
                </span>
                <span className="absolute inset-0 flex items-center justify-center scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  {step.icon}
                </span>
              </div>

              <div className="pt-1.5 min-w-0 flex-1">
                <h3 className="text-lg font-medium text-white transition-colors group-hover:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-white/40 transition-colors group-hover:text-white/55">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
