"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, useCallback } from "react";
import {
  ModelsIcon,
  StudioIcon,
  MarketplaceIcon,
  RouterIcon,
  ShieldIcon,
  GlobeIcon,
} from "@/components/Icons";
import Marquee from "@/components/Marquee";

const features = [
  {
    icon: ModelsIcon,
    title: "50+ AI Models",
    description:
      "GPT-4o, Claude, Gemini, Llama — one API, every frontier model.",
    accent: "rgba(139, 92, 246, 0.12)",
    accentBorder: "rgba(139, 92, 246, 0.15)",
    spotlightColor: "rgba(139,92,246,0.12)",
    span: "sm:col-span-2",
    badge: null,
  },
  {
    icon: StudioIcon,
    title: "Generative Studio",
    description:
      "Text, images, video, audio, code. One canvas for everything.",
    accent: "rgba(6, 182, 212, 0.1)",
    accentBorder: "rgba(6, 182, 212, 0.12)",
    spotlightColor: "rgba(6,182,212,0.12)",
    span: "",
    badge: "New" as const,
  },
  {
    icon: RouterIcon,
    title: "Smart Router",
    description:
      "Picks the fastest, cheapest, or most capable model — automatically.",
    accent: "rgba(236, 72, 153, 0.1)",
    accentBorder: "rgba(236, 72, 153, 0.12)",
    spotlightColor: "rgba(236,72,153,0.1)",
    span: "",
    badge: null,
  },
  {
    icon: MarketplaceIcon,
    title: "AI Talent Marketplace",
    description:
      "Vetted specialists ready to build, fine-tune, and deploy for you.",
    accent: "rgba(196, 132, 252, 0.1)",
    accentBorder: "rgba(196, 132, 252, 0.12)",
    spotlightColor: "rgba(196,132,252,0.1)",
    span: "sm:col-span-2",
    badge: "Beta" as const,
  },
  {
    icon: ShieldIcon,
    title: "Enterprise Grade",
    description:
      "SOC2 & GDPR. Team workspaces. Audit logs. Built for serious work.",
    accent: "rgba(59, 130, 246, 0.1)",
    accentBorder: "rgba(59, 130, 246, 0.1)",
    spotlightColor: "rgba(59,130,246,0.1)",
    span: "",
    badge: null,
  },
  {
    icon: GlobeIcon,
    title: "Made for Central Asia",
    description:
      "Local infrastructure, UZS billing, Uzbek & Russian language support.",
    accent: "rgba(6, 182, 212, 0.08)",
    accentBorder: "rgba(6, 182, 212, 0.1)",
    spotlightColor: "rgba(6,182,212,0.08)",
    span: "sm:col-span-2 lg:col-span-1",
    badge: null,
  },
];

function OpenAILogo() {
  return (
    <svg width="100" height="20" viewBox="0 0 120 24" fill="none" aria-label="OpenAI">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.1 0 2.1.3 3 .8L7.8 15c-.5-.9-.8-1.9-.8-3 0-3.3 2.7-5 5-5zm0 14c-1.1 0-2.1-.3-3-.8L16.2 9c.5.9.8 1.9.8 3 0 2.8-2.2 5-5 5z" fill="rgba(255,255,255,0.6)"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">OpenAI</text>
    </svg>
  );
}

function AnthropicLogo() {
  return (
    <svg width="110" height="20" viewBox="0 0 130 24" fill="none" aria-label="Anthropic">
      <path d="M13.5 4L7 20h3l1.5-3.8h6L19 20h3L15.5 4h-2zm-1 9.8L14.5 8l2 5.8h-4z" fill="rgba(255,255,255,0.6)"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Anthropic</text>
    </svg>
  );
}

function GeminiLogo() {
  return (
    <svg width="98" height="20" viewBox="0 0 115 24" fill="none" aria-label="Google Gemini">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <path d="M12 6v12M6 12h12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Gemini</text>
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg width="90" height="20" viewBox="0 0 100 24" fill="none" aria-label="Meta Llama">
      <path d="M4 19c2-6 4-12 8-12s6 6 8 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M10 19c2-6 4-12 8-12s6 6 8 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <text x="32" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Meta</text>
    </svg>
  );
}

function StabilityLogo() {
  return (
    <svg width="110" height="20" viewBox="0 0 135 24" fill="none" aria-label="Stability AI">
      <path d="M6 12h4l2-6 2 12 2-9 2 3h4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Stability AI</text>
    </svg>
  );
}

function MistralLogo() {
  return (
    <svg width="88" height="20" viewBox="0 0 105 24" fill="none" aria-label="Mistral">
      <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.55)"/>
      <rect x="10" y="4" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
      <rect x="16" y="4" width="4" height="4" fill="rgba(255,255,255,0.55)"/>
      <rect x="4" y="10" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
      <rect x="10" y="10" width="4" height="4" fill="rgba(255,255,255,0.55)"/>
      <rect x="16" y="10" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
      <rect x="4" y="16" width="4" height="4" fill="rgba(255,255,255,0.55)"/>
      <rect x="10" y="16" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
      <rect x="16" y="16" width="4" height="4" fill="rgba(255,255,255,0.55)"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Mistral</text>
    </svg>
  );
}

function CohereLogo() {
  return (
    <svg width="94" height="20" viewBox="0 0 110 24" fill="none" aria-label="Cohere">
      <circle cx="12" cy="12" r="8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.45)"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Cohere</text>
    </svg>
  );
}

function MidjourneyLogo() {
  return (
    <svg width="116" height="20" viewBox="0 0 140 24" fill="none" aria-label="Midjourney">
      <path d="M5 18V6l4 6 4-6v12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="28" y="16.5" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" fontFamily="system-ui">Midjourney</text>
    </svg>
  );
}

const providerLogos = [
  <OpenAILogo key="openai" />,
  <AnthropicLogo key="anthropic" />,
  <GeminiLogo key="gemini" />,
  <MetaLogo key="meta" />,
  <StabilityLogo key="stability" />,
  <MistralLogo key="mistral" />,
  <CohereLogo key="cohere" />,
  <MidjourneyLogo key="midjourney" />,
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Icon = feature.icon;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    damping: 22,
    stiffness: 180,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), {
    damping: 22,
    stiffness: 180,
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      style={tiltStyle}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`group relative cursor-default overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${feature.span}`}
    >
      {/* Base background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `1px solid ${feature.accentBorder}`,
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
              `radial-gradient(circle 200px at ${x}% ${y}%, ${feature.spotlightColor}, transparent 70%)`
          ),
        }}
      />

      {/* Top hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${feature.accent}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px] group-hover:shadow-current/20"
            style={{
              background: feature.accent,
              border: `1px solid ${feature.accentBorder}`,
            }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-[18px] w-[18px] text-white/80 transition-colors group-hover:text-white" />
            </motion.div>
          </div>
          {feature.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                feature.badge === "New"
                  ? "bg-cyan-500/10 text-cyan-400/80"
                  : "bg-violet-500/10 text-violet-400/80"
              }`}
            >
              {feature.badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
        <p className="mt-1.5 text-base leading-relaxed text-white/45 transition-colors group-hover:text-white/55">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30">
          What you get
        </p>
        <h2 id="features-heading" className="mt-3 text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
          One platform. Zero compromises.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-16 rounded-2xl px-2 py-5 sm:px-4"
        style={{ border: "1px solid rgba(139,92,246,0.06)" }}
      >
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-white/25">
          Supported providers
        </p>
        <Marquee speed={28}>{providerLogos}</Marquee>
      </motion.div>
    </section>
  );
}
