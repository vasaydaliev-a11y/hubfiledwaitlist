import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";
import CursorGlow from "@/components/CursorGlow";
import GradientBorder from "@/components/GradientBorder";

export default function Home() {
  return (
    <main className="noise-overlay vignette relative overflow-hidden bg-background text-white">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Features />

      <section className="mx-auto mb-24 w-full max-w-5xl px-4 sm:px-6">
        <GradientBorder borderRadius="1.5rem">
          <div
            className="neo-glass-raised rounded-3xl p-8 text-center sm:p-14"
            style={{
              background:
                "linear-gradient(145deg, rgba(18,18,32,0.92), rgba(10,11,22,0.75)), radial-gradient(circle at top, rgba(124,58,237,0.25), transparent 55%)"
            }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">
              Early Access
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Be Among the First</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/65 sm:text-base">
              Early access members get 3 months free Pro plan.
            </p>

            <div className="mt-8 flex justify-center">
              <WaitlistForm compact />
            </div>
          </div>
        </GradientBorder>
      </section>

      <Footer />
    </main>
  );
}
