"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-28 sm:px-6">
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
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Common questions
        </h2>
      </motion.div>

      <div className="flex flex-col gap-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-xl transition-colors"
              style={{
                border: `1px solid ${isOpen ? "rgba(245, 158, 11, 0.15)" : "rgba(255,255,255,0.04)"}`,
                background:
                  "linear-gradient(160deg, rgba(14,14,24,0.8), rgba(8,8,16,0.5))",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
              >
                <span className="text-base font-medium text-white/90">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-amber-400/80"
                  style={{
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "1px solid rgba(245, 158, 11, 0.12)",
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
                  >
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-base leading-relaxed text-white/40">
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
