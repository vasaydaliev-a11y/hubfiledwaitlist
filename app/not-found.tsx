import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | HUBFIELD",
  description:
    "The page you're looking for doesn't exist. Return to HUBFIELD — the AI platform with 50+ models and one unified API.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="noise-overlay vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center text-white">
      {/* Nebula glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* 404 number */}
        <h1
          className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[12rem]"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.1) 50%, rgba(236,72,153,0.08) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "1px rgba(139,92,246,0.2)",
          }}
        >
          404
        </h1>

        <h2 className="text-xl font-medium text-white/60 sm:text-2xl">
          Lost in the cosmos
        </h2>

        <p className="max-w-md text-base text-white/30">
          The page you&apos;re looking for drifted into a black hole.
          Let&apos;s navigate you back to safety.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow:
              "0 0 20px rgba(139,92,246,0.1), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Return home
        </Link>
      </div>
    </main>
  );
}
