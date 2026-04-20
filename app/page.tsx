import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
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

export default async function Home() {
  const products = await getFeaturedProducts(6);

  return (
    <main className="noise-overlay vignette relative overflow-hidden bg-background text-white">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <DemoPreview />
      <Features />
      <TrustBadges />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FeaturedProducts products={products} />
      <Pricing />
      <FAQ />

      <section className="mx-auto mb-28 w-full max-w-4xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-center sm:p-12"
          style={{
            border: "1px solid rgba(245, 158, 11, 0.1)",
            background:
              "linear-gradient(160deg, rgba(14,14,24,0.92), rgba(8,8,16,0.7))",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08), transparent 55%)",
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
