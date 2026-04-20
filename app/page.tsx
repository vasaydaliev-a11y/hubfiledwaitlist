import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import StarField from "@/components/StarField";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import { getFeaturedProducts } from "@/lib/shopify";

const DemoPreview = dynamic(() => import("@/components/DemoPreview"));
const Features = dynamic(() => import("@/components/Features"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const MobileStickyCTA = dynamic(() => import("@/components/MobileStickyCTA"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));

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
          className="product-card relative overflow-hidden rounded-2xl p-8 text-center sm:p-12"
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
                "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.1), transparent 55%)",
            }}
          />

          <div className="relative z-10">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-amber-300/70"
              style={{
                border: "1px solid rgba(245,158,11,0.15)",
                background: "rgba(245,158,11,0.06)",
              }}
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
              </span>
              Only 127 spots remaining
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Get early access
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-white/40">
              First 500 members get 3 months of Pro — free.
              <br />
              <span className="text-white/25">No credit card required.</span>
            </p>

            <div className="mt-7 flex justify-center">
              <WaitlistForm compact />
            </div>

            <div
              className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(139,92,246,0.04)",
                border: "1px solid rgba(139,92,246,0.06)",
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white/80"
                style={{ background: "rgba(139,92,246,0.15)" }}
              >
                AK
              </div>
              <p className="text-left text-xs leading-relaxed text-white/35">
                &ldquo;HUBFIELD replaced three APIs in our pipeline. One SDK, one bill.&rdquo;
                <span className="mt-0.5 block text-[10px] text-white/20">
                  — Aziz K., CTO at DataPulse
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
      <BackToTop />
    </main>
  );
}
