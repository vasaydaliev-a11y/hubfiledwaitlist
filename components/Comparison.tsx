"use client";

import { motion } from "framer-motion";

const without = [
  { text: "5 different API keys", icon: "x" },
  { text: "Incompatible SDKs", icon: "x" },
  { text: "Manual model routing", icon: "x" },
  { text: "Scattered billing", icon: "x" },
  { text: "No team controls", icon: "x" },
];

const withHub = [
  { text: "1 unified API", icon: "check" },
  { text: "One SDK for everything", icon: "check" },
  { text: "Automatic Smart Router", icon: "check" },
  { text: "Single dashboard & billing", icon: "check" },
  { text: "Team workspaces & audit logs", icon: "check" },
];

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          Why switch
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Stop juggling.{" "}
          <span className="text-brand-gradient">Start building.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Without */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6"
          style={{
            border: "1px solid rgba(239, 68, 68, 0.08)",
            background:
              "linear-gradient(160deg, rgba(10,1,24,0.85), rgba(3,0,20,0.6))",
          }}
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-red-400/70">
            Without HUBFIELD
          </p>
          <ul className="flex flex-col gap-3.5">
            {without.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400/60">
                  <XIcon />
                </span>
                <span className="text-base text-white/40">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* With */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl p-6"
          style={{
            border: "1px solid rgba(139, 92, 246, 0.15)",
            background:
              "linear-gradient(160deg, rgba(10,1,24,0.85), rgba(3,0,20,0.6))",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08), transparent 60%)",
            }}
          />
          <p className="relative mb-5 text-sm font-semibold uppercase tracking-wider text-violet-400/80">
            With HUBFIELD
          </p>
          <ul className="relative flex flex-col gap-3.5">
            {withHub.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                  <CheckIcon />
                </span>
                <span className="text-base text-white/80">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
