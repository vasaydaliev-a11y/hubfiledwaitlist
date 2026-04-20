"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.03, 0.08]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-2xl"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(3,0,20,${v})`),
        borderBottom: useTransform(
          borderOpacity,
          (v) => `1px solid rgba(139,92,246,${v})`
        ),
      }}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="HUBFIELD home">
          <Logo size={40} />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-white/40 transition-colors hover:bg-white/[0.03] hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full px-5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white sm:text-base"
          style={{
            border: "1px solid rgba(139, 92, 246, 0.25)",
            background:
              "linear-gradient(160deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.06))",
          }}
        >
          Request Access
        </motion.a>
      </nav>
    </motion.header>
  );
}
