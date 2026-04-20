"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <motion.line
        x1="4" x2="20"
        animate={open ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "center" }}
      />
      <motion.line
        x1="4" x2="20" y1="12" y2="12"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="4" x2="20"
        animate={open ? { y1: 12, y2: 12, rotate: -45 } : { y1: 18, y2: 18, rotate: 0 }}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.03, 0.08]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const close = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, close]);

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
        <Link href="/" aria-label="HUBFIELD home" onClick={close}>
          <Logo size={40} />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/[0.03] hover:text-white/70 ${
                  active ? "text-white/80" : "text-white/40"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 h-px w-4 -translate-x-1/2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
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
            onClick={close}
          >
            Request Access
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:text-white/80 sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[57px] z-40 bg-black/50 backdrop-blur-sm sm:hidden"
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-50 border-b border-white/[0.04] sm:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(3,0,20,0.98) 0%, rgba(10,1,24,0.95) 100%)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-xl px-4 py-3 text-base text-white/50 transition-colors hover:bg-white/[0.03] hover:text-white/80"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="my-2 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.1), transparent)" }} />

                <motion.a
                  href="mailto:hello@hubfield.uz"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="rounded-xl px-4 py-3 text-base text-white/40 transition-colors hover:bg-white/[0.03] hover:text-white/70"
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
