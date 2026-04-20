"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

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
      className={compact ? "w-full max-w-xl" : "mx-auto w-full max-w-2xl"}
    >
      <div
        className={`rounded-2xl p-5 ${compact ? "" : "sm:p-6"}`}
        style={{
          border: "1px solid rgba(139,92,246,0.08)",
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.9), rgba(3,0,20,0.65))",
          backdropFilter: "blur(20px)"
        }}
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
            className="neo-inset h-14 flex-1 rounded-xl px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/30 focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4),0_0_16px_rgba(139,92,246,0.15)]"
          />

          <motion.button
            type="button"
            disabled={isLoading}
            onClick={() => void submitWaitlist()}
            whileHover={{
              scale: isLoading ? 1 : 1.02,
              boxShadow: "0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(6,182,212,0.15)"
            }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            className="h-14 min-w-[150px] rounded-xl px-6 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9, #06B6D4)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.25)"
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

        <p className="mt-3 text-sm text-white/35">
          <AnimatedCounter target={1200} duration={2} suffix="+" /> people on the waitlist
        </p>

        <div aria-live="polite" aria-atomic="true">
          {error ? <p className="mt-2 text-sm text-rose-400/80">{error}</p> : null}

          {isSuccess ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mt-3 text-sm text-emerald-400/80"
            >
              You&apos;re on the list. We&apos;ll notify you.
            </motion.p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
