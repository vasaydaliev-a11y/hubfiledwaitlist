import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WaitlistForm from "@/components/WaitlistForm";
import CursorGlow from "@/components/CursorGlow";
import GradientBorder from "@/components/GradientBorder";

export default function Home() {
  return (
    <main className="noise-overlay vignette relative overflow-hidden bg-background text-white">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />

      <section className="mx-auto mb-24 w-full max-w-4xl px-4 sm:px-6">
        <GradientBorder borderRadius="1.25rem">
          <div
            className="neo-glass-raised rounded-2xl p-8 text-center sm:p-12"
            style={{
              background:
                "linear-gradient(145deg, rgba(18,18,32,0.92), rgba(10,11,22,0.75)), radial-gradient(circle at top, rgba(124,58,237,0.2), transparent 55%)"
            }}
          >
            <h2 className="text-2xl font-bold sm:text-3xl">Get early access</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/55">
              First 500 members get 3 months of Pro — free.
            </p>

            <div className="mt-7 flex justify-center">
              <WaitlistForm compact />
            </div>
          </div>
        </GradientBorder>
      </section>

      <Footer />
    </main>
  );
}
