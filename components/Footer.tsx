import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-base sm:flex-row sm:px-6">
        <Logo size={24} />
        <p className="text-white/35">&copy; 2026 HUBFIELD. Made in Uzbekistan</p>
        <div className="flex items-center gap-5 text-white/35">
          <a href="#" className="transition hover:text-white/60">Privacy</a>
          <a href="#" className="transition hover:text-white/60">Terms</a>
          <a href="#" className="transition hover:text-white/60">Contact</a>
        </div>
      </div>
    </footer>
  );
}
