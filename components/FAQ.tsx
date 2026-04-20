"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

const faqs = [
  {
    q: "Is HUBFIELD free to use?",
    a: "We offer a generous free tier with access to popular models. The first 500 waitlist members get 3 months of Pro — completely free. After that, you can stay on Free or upgrade.",
  },
  {
    q: "When will HUBFIELD launch?",
    a: "We're currently in closed beta with select users in Tashkent. Public launch is planned for Q3 2026. Join the waitlist to get early access and help shape the product.",
  },
  {
    q: "Which AI models are available?",
    a: "50+ models from OpenAI, Anthropic, Google, Meta, Mistral, Cohere, and Stability AI. Text, image, video, audio, and code generation — all through one unified API.",
  },
  {
    q: "Where is my data stored?",
    a: "All data is processed and stored in our Tashkent data center. We're SOC2 and GDPR compliant. Enterprise customers get dedicated infrastructure with full audit logs.",
  },
  {
    q: "What does the Pro plan include?",
    a: "Pro unlocks higher rate limits, priority model access, Smart Router with cost optimization, team workspaces, and access to the AI Talent Marketplace for hiring specialists.",
  },
  {
    q: "Can I use HUBFIELD for my business?",
    a: "Absolutely. Our Enterprise tier includes SSO, custom SLAs, dedicated support, and UZS billing. We're built for production workloads from day one.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, i: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (i + 1) % faqs.length;
        (document.getElementById(`faq-btn-${next}`) as HTMLElement)?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (i - 1 + faqs.length) % faqs.length;
        (document.getElementById(`faq-btn-${prev}`) as HTMLElement)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        (document.getElementById("faq-btn-0") as HTMLElement)?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        (
          document.getElementById(`faq-btn-${faqs.length - 1}`) as HTMLElement
        )?.focus();
      }
    },
    []
  );

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto w-full max-w-3xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          FAQ
        </p>
        <h2 id="faq-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Common questions
        </h2>
      </motion.div>

      <div className="flex flex-col gap-2" role="list">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;

          return (
            <motion.div
              key={i}
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-xl transition-all duration-300"
              style={{
                border: `1px solid ${isOpen ? "rgba(139, 92, 246, 0.2)" : "rgba(139,92,246,0.04)"}`,
                background: isOpen
                  ? "linear-gradient(160deg, rgba(17,1,38,0.85), rgba(10,1,24,0.6))"
                  : "linear-gradient(160deg, rgba(10,1,24,0.8), rgba(3,0,20,0.5))",
                boxShadow: isOpen
                  ? "0 4px 24px rgba(139,92,246,0.06), inset 0 1px 0 rgba(139,92,246,0.06)"
                  : "none",
              }}
            >
              <button
                id={btnId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.01]"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums transition-colors duration-300"
                    style={{
                      color: isOpen
                        ? "rgba(196,132,252,0.8)"
                        : "rgba(139,92,246,0.3)",
                      background: isOpen
                        ? "rgba(139,92,246,0.12)"
                        : "rgba(139,92,246,0.04)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-white/90">
                    {faq.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-violet-400/80"
                  style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.15)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-14 text-base leading-relaxed text-white/40">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
