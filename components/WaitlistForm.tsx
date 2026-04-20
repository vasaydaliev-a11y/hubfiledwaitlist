"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type WaitlistFormProps = {
  compact?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
        body: JSON.stringify({ email: trimmedEmail })
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setEmail("");
      setIsSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="waitlist"
      className={
        compact
          ? "neo-glass w-full max-w-xl rounded-2xl p-5"
          : "neo-glass-raised mx-auto w-full max-w-2xl rounded-3xl p-5 sm:p-7"
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void submitWaitlist();
          }}
          placeholder="you@company.com"
          aria-label="Email address"
          className="neo-inset h-13 flex-1 rounded-xl px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-400/50 focus:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.55),inset_-2px_-2px_6px_rgba(255,255,255,0.03),0_0_12px_rgba(6,182,212,0.2)]"
        />

        <motion.button
          type="button"
          disabled={isLoading}
          onClick={() => void submitWaitlist()}
          whileHover={{
            scale: isLoading ? 1 : 1.03,
            boxShadow:
              "6px 6px 20px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04), 0 0 35px rgba(124,58,237,0.45)"
          }}
          whileTap={{
            scale: isLoading ? 1 : 0.97,
            boxShadow:
              "inset 3px 3px 8px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.04)"
          }}
          className="h-13 min-w-[160px] rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-neo-button transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </motion.button>
      </div>

      <p className="mt-4 text-sm text-cyan-100/80">🔥 Join 1,200+ people on the waitlist</p>

      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="neo-glass-subtle mt-4 inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-emerald-200"
          style={{ border: "1px solid rgba(52, 211, 153, 0.25)" }}
        >
          <motion.span
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full shadow-neo-inner"
            style={{ background: "rgba(52, 211, 153, 0.15)" }}
          >
            ✓
          </motion.span>
          You&apos;re on the list! We&apos;ll notify you.
        </motion.div>
      ) : null}
    </div>
  );
}
