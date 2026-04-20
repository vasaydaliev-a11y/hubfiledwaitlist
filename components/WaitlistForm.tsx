"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type WaitlistFormProps = {
  compact?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const containerClasses = useMemo(
    () =>
      compact
        ? "w-full max-w-xl rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl"
        : "w-full max-w-2xl rounded-3xl border border-white/20 bg-white/5 p-5 backdrop-blur-xl sm:p-6",
    [compact]
  );

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
        headers: {
          "Content-Type": "application/json"
        },
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
    <div id="waitlist" className={containerClasses}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void submitWaitlist();
            }
          }}
          placeholder="you@company.com"
          aria-label="Email address"
          className="h-12 flex-1 rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
        />

        <motion.button
          type="button"
          disabled={isLoading}
          onClick={() => void submitWaitlist()}
          whileHover={{ scale: isLoading ? 1 : 1.03 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          animate={{
            boxShadow: [
              "0 0 0 rgba(124,58,237,0)",
              "0 0 24px rgba(124,58,237,0.45)",
              "0 0 0 rgba(124,58,237,0)"
            ]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity
          }}
          className="h-12 min-w-[160px] rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
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

      <p className="mt-3 text-sm text-cyan-100/90">🔥 Join 1,200+ people on the waitlist</p>

      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-300/40 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-200"
        >
          <motion.span
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-300/20"
          >
            ✓
          </motion.span>
          You&apos;re on the list! We&apos;ll notify you.
        </motion.div>
      ) : null}
    </div>
  );
}
