export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/70 sm:flex-row sm:px-6">
        <p className="text-base font-semibold text-brand-gradient">AIHub</p>
        <p>© 2025 AIHub. Made in Uzbekistan 🇺🇿</p>
        <div className="flex items-center gap-4 text-white/65">
          <a href="#" className="transition hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-white">
            Terms
          </a>
          <a href="#" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
