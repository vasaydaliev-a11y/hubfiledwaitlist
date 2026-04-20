"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-gradient-to-b from-[rgba(12,12,22,0.85)] to-[rgba(8,8,16,0.7)] shadow-neo-outer backdrop-blur-2xl"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-gradient">
          HUBFIELD
        </Link>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-gradient-to-r from-[rgba(15,15,26,0.9)] to-[rgba(10,11,22,0.7)] px-5 py-2.5 text-sm font-medium text-cyan-100 shadow-neo-button transition hover:shadow-neo-glow-cyan"
          style={{
            border: "1px solid rgba(6, 182, 212, 0.3)"
          }}
        >
          Request Access
        </motion.a>
      </nav>
    </motion.header>
  );
}
