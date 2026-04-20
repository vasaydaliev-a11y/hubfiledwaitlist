"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEMO_LINES = [
  { type: "comment", text: "// One API call — any model" },
  { type: "code", text: 'const response = await hubfield.chat({' },
  { type: "code", text: '  model: "auto",  // Smart Router picks the best' },
  { type: "code", text: '  messages: [' },
  { type: "code", text: '    { role: "user", content: prompt }' },
  { type: "code", text: '  ],' },
  { type: "code", text: '  budget: "low"   // cost-optimized' },
  { type: "code", text: '});' },
  { type: "empty", text: "" },
  { type: "result", text: '// → Routed to Claude Sonnet (0.003s, $0.002)' },
  { type: "result", text: '// → 42% cheaper than direct API call' },
];

function TypingDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (visibleLines >= DEMO_LINES.length) {
      const restart = setTimeout(() => {
        setVisibleLines(0);
        setCycle((c) => c + 1);
      }, 4000);
      return () => clearTimeout(restart);
    }
    const delay = DEMO_LINES[visibleLines]?.type === "empty" ? 400 : 120;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines, cycle]);

  return (
    <div className="font-mono text-[13px] leading-6">
      {DEMO_LINES.map((line, i) => {
        if (i >= visibleLines) return null;
        return (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={
              line.type === "comment"
                ? "text-violet-300/30"
                : line.type === "result"
                  ? "text-cyan-400/60"
                  : "text-white/60"
            }
          >
            {line.text || "\u00A0"}
          </motion.div>
        );
      })}
      {visibleLines < DEMO_LINES.length && (
        <span className="inline-block h-4 w-1.5 animate-pulse bg-violet-400/70" />
      )}
      {visibleLines >= DEMO_LINES.length && (
        <motion.div
          key={`done-${cycle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 flex items-center gap-2 text-violet-400/50"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.4 }}
          >
            ✓
          </motion.span>
          Ready to ship
        </motion.div>
      )}
    </div>
  );
}

export default function DemoPreview() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          See it in action
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Ship AI in <span className="text-brand-gradient">minutes</span>, not
          weeks
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(139,92,246,0.08)",
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.95), rgba(3,0,20,0.8))",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(139,92,246,0.04)",
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-violet-500/[0.06] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.03] px-3 py-1 text-xs text-white/25">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            api.hubfield.uz/v1/chat
          </div>
        </div>

        {/* Code area */}
        <div className="p-5 sm:p-6">
          <TypingDemo />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-violet-500/[0.06] px-4 py-2 text-[11px] text-white/20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
              Connected
            </span>
            <span>TypeScript</span>
          </div>
          <span>hubfield-sdk v1.0</span>
        </div>
      </motion.div>

      {/* Feature chips */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {[
          "TypeScript SDK",
          "Python SDK",
          "REST API",
          "Streaming",
          "Function Calling",
        ].map((chip) => (
          <span
            key={chip}
            className="rounded-full px-3 py-1 text-xs text-white/35"
            style={{
              border: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {chip}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
