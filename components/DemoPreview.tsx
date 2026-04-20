"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEMO_LINES = [
  { type: "comment", text: "// One API call — any model" },
  { type: "keyword", text: "const", after: " response = ", highlight: "await", end: " hubfield.chat({" },
  { type: "prop", text: '  model: ', value: '"auto"', after: ",  ", comment: "// Smart Router picks the best" },
  { type: "prop", text: "  messages: [" },
  { type: "prop", text: '    { role: ', value: '"user"', after: ", content: prompt }" },
  { type: "prop", text: "  ]," },
  { type: "prop", text: '  budget: ', value: '"low"', after: "   ", comment: "// cost-optimized" },
  { type: "code", text: "});" },
  { type: "empty", text: "" },
  { type: "result", text: "// → Routed to Claude Sonnet (0.003s, $0.002)" },
  { type: "result", text: "// → 42% cheaper than direct API call" },
];

function SyntaxLine({ line }: { line: (typeof DEMO_LINES)[number] }) {
  if (line.type === "empty") return <span>&nbsp;</span>;

  if (line.type === "comment") {
    return <span className="text-white/20 italic">{line.text}</span>;
  }
  if (line.type === "result") {
    return <span className="text-emerald-400/55">{line.text}</span>;
  }
  if (line.type === "code") {
    return <span className="text-white/55">{line.text}</span>;
  }

  if (line.type === "keyword") {
    return (
      <>
        <span className="text-violet-400/80">{line.text}</span>
        <span className="text-white/55">{line.after}</span>
        <span className="text-cyan-400/70">{line.highlight}</span>
        <span className="text-white/55">{line.end}</span>
      </>
    );
  }

  return (
    <>
      <span className="text-white/45">{line.text}</span>
      {line.value && <span className="text-amber-300/70">{line.value}</span>}
      {line.after && <span className="text-white/45">{line.after}</span>}
      {line.comment && <span className="text-white/15 italic">{line.comment}</span>}
    </>
  );
}

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
    <div className="font-mono text-[13px] leading-7">
      {DEMO_LINES.map((line, i) => {
        if (i >= visibleLines) return null;
        return (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            <span className="mr-4 inline-block w-5 select-none text-right text-white/10">
              {i + 1}
            </span>
            <span className="flex-1">
              <SyntaxLine line={line} />
            </span>
          </motion.div>
        );
      })}
      {visibleLines < DEMO_LINES.length && (
        <div className="flex">
          <span className="mr-4 inline-block w-5 select-none text-right text-white/10">
            {visibleLines + 1}
          </span>
          <span className="inline-block h-5 w-1.5 animate-pulse rounded-sm bg-violet-400/70" />
        </div>
      )}
      {visibleLines >= DEMO_LINES.length && (
        <motion.div
          key={`done-${cycle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 text-emerald-400/60"
          style={{ background: "rgba(52,211,153,0.04)" }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.4 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.span>
          <span className="text-xs">Ready to ship</span>
        </motion.div>
      )}
    </div>
  );
}

const chips = [
  { label: "TypeScript SDK", color: "rgba(6,182,212,0.15)" },
  { label: "Python SDK", color: "rgba(139,92,246,0.15)" },
  { label: "REST API", color: "rgba(236,72,153,0.12)" },
  { label: "Streaming", color: "rgba(52,211,153,0.12)" },
  { label: "Function Calling", color: "rgba(245,158,11,0.12)" },
];

export default function DemoPreview() {
  return (
    <section aria-labelledby="demo-heading" className="mx-auto w-full max-w-4xl px-4 pb-28 sm:px-6">
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
        <h2 id="demo-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
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
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/20" />
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
        {chips.map((chip, i) => (
          <motion.span
            key={chip.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.05 }}
            whileHover={{
              y: -2,
              boxShadow: `0 6px 20px ${chip.color}`,
              transition: { duration: 0.2 },
            }}
            className="rounded-full px-3 py-1.5 text-xs text-white/40 transition-colors hover:text-white/60"
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {chip.label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
