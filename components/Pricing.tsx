"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    description: "For side projects and exploration",
    price: "$0",
    period: "forever",
    features: [
      "10 models included",
      "1,000 requests / month",
      "Community support",
      "Basic analytics",
    ],
    accent: "rgba(255,255,255,0.06)",
    accentBorder: "rgba(255,255,255,0.06)",
    highlighted: false,
    badge: null,
  },
  {
    name: "Pro",
    description: "For teams shipping AI products",
    price: "$49",
    period: "/mo",
    features: [
      "All 50+ models",
      "Unlimited requests",
      "Smart Router optimization",
      "Team workspaces (5 seats)",
      "Priority support",
      "Marketplace access",
    ],
    accent: "rgba(245, 158, 11, 0.1)",
    accentBorder: "rgba(245, 158, 11, 0.2)",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For organizations at scale",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated infrastructure",
      "SSO & SAML",
      "Custom SLA (99.99%)",
      "UZS billing",
      "Dedicated account manager",
    ],
    accent: "rgba(124, 58, 237, 0.08)",
    accentBorder: "rgba(124, 58, 237, 0.12)",
    highlighted: false,
    badge: null,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base text-white/40">
          Start free. Scale when you&apos;re ready.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
              plan.highlighted ? "md:-mt-3 md:mb-[-12px]" : ""
            }`}
            style={{
              border: `1px solid ${plan.accentBorder}`,
              background:
                "linear-gradient(160deg, rgba(14,14,24,0.9), rgba(8,8,16,0.65))",
            }}
          >
            {plan.highlighted && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08), transparent 60%)",
                }}
              />
            )}

            {plan.badge && (
              <div className="relative z-10 mb-4 inline-flex self-start rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                {plan.badge}
              </div>
            )}

            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-white/40">{plan.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base text-white/30">{plan.period}</span>
                )}
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={plan.highlighted ? "#f59e0b" : "rgba(255,255,255,0.3)"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-white/50">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                style={{
                  background: plan.highlighted
                    ? "linear-gradient(135deg, #f59e0b, #ea580c, #7C3AED)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${plan.highlighted ? "transparent" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: plan.highlighted
                    ? "0 4px 20px rgba(245,158,11,0.2)"
                    : "none",
                }}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Join Waitlist"}
              </a>

              <p className="mt-3 text-center text-xs text-white/25">
                {plan.highlighted
                  ? "First 500 get 3 months free"
                  : "No credit card required"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-4 py-2 text-xs text-white/30">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Prices finalized at launch — locked in for early members
        </span>
      </motion.div>
    </section>
  );
}
