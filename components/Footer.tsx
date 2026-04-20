export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 py-10 text-sm text-white/60 sm:flex-row sm:px-6">
        <p className="text-lg font-bold text-brand-gradient">AIHub</p>
        <p className="text-white/50">© 2025 AIHub. Made in Uzbekistan 🇺🇿</p>
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="rounded-lg px-2 py-1 transition hover:text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.2)]"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="rounded-lg px-2 py-1 transition hover:text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.2)]"
          >
            Terms
          </a>
          <a
            href="#"
            className="rounded-lg px-2 py-1 transition hover:text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.2)]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
