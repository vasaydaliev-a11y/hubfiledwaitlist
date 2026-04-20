"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.04] bg-[rgba(5,5,8,0.75)] backdrop-blur-2xl"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/">
          <Logo size={30} />
        </Link>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full px-5 py-2 text-base font-medium text-white/80 transition-colors hover:text-white"
          style={{
            border: "1px solid rgba(245, 158, 11, 0.25)",
            background:
              "linear-gradient(160deg, rgba(245, 158, 11, 0.08), rgba(124, 58, 237, 0.06))"
          }}
        >
          Request Access
        </motion.a>
      </nav>
    </motion.header>
  );
}
