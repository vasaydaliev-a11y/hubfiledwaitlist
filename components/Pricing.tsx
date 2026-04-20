"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, useCallback, useState } from "react";

const plans = [
  {
    name: "Free",
    description: "For side projects and exploration",
    monthly: "$0",
    annual: "$0",
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
    spotlightColor: "rgba(255,255,255,0.06)",
  },
  {
    name: "Pro",
    description: "For teams shipping AI products",
    monthly: "$49",
    annual: "$39",
    period: "/mo",
    features: [
      "All 50+ models",
      "Unlimited requests",
      "Smart Router optimization",
      "Team workspaces (5 seats)",
      "Priority support",
      "Marketplace access",
    ],
    accent: "rgba(139, 92, 246, 0.1)",
    accentBorder: "rgba(139, 92, 246, 0.2)",
    highlighted: true,
    badge: "Most Popular",
    spotlightColor: "rgba(139,92,246,0.15)",
  },
  {
    name: "Enterprise",
    description: "For organizations at scale",
    monthly: "Custom",
    annual: "Custom",
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
    spotlightColor: "rgba(124,58,237,0.1)",
  },
];

function PricingCard({
  plan,
  index,
  annual,
}: {
  plan: (typeof plans)[number];
  index: number;
  annual: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    damping: 20,
    stiffness: 200,
  });

  const spotX = useTransform(mx, [0, 1], [0, 100]);
  const spotY = useTransform(my, [0, 1], [0, 100]);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my]
  );

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 800,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={tiltStyle}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-500 ${
        plan.highlighted ? "md:-mt-3 md:mb-[-12px]" : ""
      }`}
    >
      {/* Base bg */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `1px solid ${plan.accentBorder}`,
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.65))",
        }}
      />

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(circle 250px at ${x}% ${y}%, ${plan.spotlightColor}, transparent 70%)`
          ),
        }}
      />

      {/* Highlighted glow */}
      {plan.highlighted && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08), transparent 60%)",
          }}
        />
      )}

      {/* Animated border on hover for highlighted */}
      {plan.highlighted && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from ${hovering ? "90deg" : "0deg"} at 50% 50%, transparent 40%, rgba(139,92,246,0.4) 48%, rgba(6,182,212,0.3) 52%, transparent 60%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />
      )}

      <div className="relative z-10 p-6">
        {plan.badge && (
          <div className="text-shimmer mb-4 inline-flex self-start rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
            {plan.badge}
          </div>
        )}

        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
        <p className="mt-1 text-sm text-white/40">{plan.description}</p>

        <div className="mt-5 flex items-baseline gap-1">
          <motion.span
            key={annual ? "a" : "m"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-4xl font-bold text-white"
          >
            {annual ? plan.annual : plan.monthly}
          </motion.span>
          {plan.period && (
            <span className="text-base text-white/30">{plan.period}</span>
          )}
          {annual && plan.monthly !== plan.annual && plan.annual !== "Custom" && (
            <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400/80">
              Save 20%
            </span>
          )}
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {plan.features.map((f, fi) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 + fi * 0.04 }}
              className="flex items-center gap-2.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  plan.highlighted ? "#8b5cf6" : "rgba(255,255,255,0.3)"
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-sm text-white/50">{f}</span>
            </motion.li>
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
              ? "linear-gradient(135deg, #8b5cf6, #6d28d9, #06B6D4)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${plan.highlighted ? "transparent" : "rgba(255,255,255,0.06)"}`,
            boxShadow: plan.highlighted
              ? "0 4px 20px rgba(139,92,246,0.25)"
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
  );
}

function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <span
        className={`text-sm transition-colors ${annual ? "text-white/30" : "text-white/70"}`}
      >
        Monthly
      </span>
      <button
        onClick={() => onChange(!annual)}
        aria-pressed={annual}
        className="relative h-7 w-12 rounded-full transition-colors"
        style={{
          background: annual
            ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
            : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <motion.div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          animate={{ left: annual ? 24 : 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </button>
      <span
        className={`text-sm transition-colors ${annual ? "text-white/70" : "text-white/30"}`}
      >
        Annual
      </span>
      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400/70">
        -20%
      </span>
    </div>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto w-full max-w-5xl px-4 pb-28 sm:px-6">
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
        <h2 id="pricing-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base text-white/40">
          Start free. Scale when you&apos;re ready.
        </p>
        <BillingToggle annual={annual} onChange={setAnnual} />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, i) => (
          <PricingCard key={plan.name} plan={plan} index={i} annual={annual} />
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
