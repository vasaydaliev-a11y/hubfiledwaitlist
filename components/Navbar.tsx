import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-brand-gradient">
          AIHub
        </Link>

        <a
          href="#waitlist"
          className="rounded-full border border-cyan-300/60 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:shadow-cyanGlow"
        >
          Request Access
        </a>
      </nav>
    </header>
  );
}
