import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-white">
      <Navbar />
      <Hero />
      <Features />

      <section className="mx-auto mb-20 w-full max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.3),_rgba(5,5,8,0.96)_55%)] p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Early Access</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Be Among the First</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            Early access members get 3 months free Pro plan.
          </p>

          <div className="mt-8 flex justify-center">
            <WaitlistForm compact />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
