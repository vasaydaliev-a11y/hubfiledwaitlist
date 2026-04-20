import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import StarField from "@/components/StarField";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import DemoPreview from "@/components/DemoPreview";
import Features from "@/components/Features";
import TrustBadges from "@/components/TrustBadges";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import WaitlistForm from "@/components/WaitlistForm";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import Footer from "@/components/Footer";
import { getFeaturedProducts } from "@/lib/shopify";

function CosmicDivider() {
  return (
    <div className="mx-auto w-full max-w-xl px-4">
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 20%, rgba(6,182,212,0.2) 50%, rgba(236,72,153,0.15) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default async function Home() {
  const products = await getFeaturedProducts(6);

  return (
    <main className="noise-overlay vignette relative overflow-hidden bg-background text-white">
      <Preloader />
      <StarField />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <CosmicDivider />
      <DemoPreview />
      <Features />
      <TrustBadges />
      <CosmicDivider />
      <Comparison />
      <HowItWorks />
      <CosmicDivider />
      <Testimonials />
      <FeaturedProducts products={products} />
      <CosmicDivider />
      <Pricing />
      <FAQ />

      <section className="mx-auto mb-28 w-full max-w-4xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-center sm:p-12"
          style={{
            border: "1px solid rgba(139, 92, 246, 0.12)",
            background:
              "linear-gradient(160deg, rgba(10,1,24,0.92), rgba(3,0,20,0.7))",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08), transparent 55%)",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Get early access
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-white/40">
              First 500 members get 3 months of Pro — free.
            </p>

            <div className="mt-7 flex justify-center">
              <WaitlistForm compact />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
