"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

type WaitlistFormProps = {
  compact?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Celebration particles ──

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  shape: "circle" | "star" | "diamond";
}

const CELEBRATION_COLORS = [
  "#8b5cf6",
  "#c084fc",
  "#06b6d4",
  "#22d3ee",
  "#ec4899",
  "#f59e0b",
  "#34d399",
  "#818cf8",
];

function CelebrationCanvas({ active }: { active: boolean }) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);

  const spawn = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 8;
      const shapes: Particle["shape"][] = ["circle", "star", "diamond"];
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 5,
        color:
          CELEBRATION_COLORS[
            Math.floor(Math.random() * CELEBRATION_COLORS.length)
          ],
        life: 0,
        maxLife: 50 + Math.random() * 40,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        shape: shapes[Math.floor(Math.random() * 3)],
      });
    }
    particles.current = newParticles;
  }, []);

  useEffect(() => {
    if (!active) return;
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const rect = c.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    c.style.width = `${rect.width}px`;
    c.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    spawn();

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      let alive = false;

      for (const p of particles.current) {
        p.life++;
        if (p.life > p.maxLife) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.vx *= 0.985;
        p.rotation += p.rotSpeed;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;

        ctx.save();
        ctx.translate(cx + p.x, cy + p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, alpha);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === "diamond") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          const s = p.size;
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            const a = ((j * 72 - 90) * Math.PI) / 180;
            const ai = (((j * 72 + 36) - 90) * Math.PI) / 180;
            ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
            ctx.lineTo(Math.cos(ai) * s * 0.4, Math.sin(ai) * s * 0.4);
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      if (alive) {
        raf.current = requestAnimationFrame(draw);
      }
    };

    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [active, spawn]);

  if (!active) return null;

  return (
    <canvas
      ref={cvs}
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden="true"
    />
  );
}

// ── Form ──

export default function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const submitWaitlist = async () => {
    if (isLoading) return;

    const trimmedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setEmail("");
      setIsSuccess(true);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id={compact ? undefined : "waitlist"}
      className={compact ? "w-full max-w-xl" : "mx-auto w-full max-w-2xl"}
    >
      <div
        className={`relative overflow-hidden rounded-2xl p-5 ${compact ? "" : "sm:p-6"}`}
        style={{
          border: `1px solid ${isSuccess ? "rgba(52,211,153,0.15)" : "rgba(139,92,246,0.08)"}`,
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.65))",
          backdropFilter: "blur(20px)",
          transition: "border-color 0.5s ease",
        }}
      >
        <CelebrationCanvas active={celebrate} />

        {/* Success glow overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(52,211,153,0.06), transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
          <div className="group/input relative flex-1">
            <input
              type="email"
              id="waitlist-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void submitWaitlist();
              }}
              placeholder=" "
              aria-label="Email address"
              className="neo-inset peer h-14 w-full rounded-xl px-4 pt-4 text-base text-white outline-none transition focus:border-violet-400/30 focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4),0_0_16px_rgba(139,92,246,0.15)]"
            />
            <label
              htmlFor="waitlist-email"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-violet-400/60 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-violet-400/40"
            >
              you@company.com
            </label>
            {/* Focus glow ring */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 peer-focus:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />
          </div>

          <motion.button
            type="button"
            disabled={isLoading}
            onClick={() => void submitWaitlist()}
            whileHover={{
              scale: isLoading ? 1 : 1.02,
              boxShadow:
                "0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(6,182,212,0.15)",
            }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            className="h-14 min-w-[150px] rounded-xl px-6 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, #8b5cf6, #6d28d9, #06B6D4)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.25)",
            }}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Joining...
              </span>
            ) : (
              "Join Waitlist"
            )}
          </motion.button>
        </div>

        <p className="relative z-10 mt-3 text-sm text-white/35">
          <AnimatedCounter target={1200} duration={2} suffix="+" /> people on
          the waitlist
        </p>

        <div className="relative z-10" aria-live="polite" aria-atomic="true">
          {error ? (
            <motion.p
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-2 text-sm text-rose-400/80"
            >
              {error}
            </motion.p>
          ) : null}

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mt-3 flex items-center gap-2 text-sm text-emerald-400/80"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  delay: 0.15,
                }}
              >
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
              </motion.span>
              You&apos;re on the list. We&apos;ll notify you.
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
