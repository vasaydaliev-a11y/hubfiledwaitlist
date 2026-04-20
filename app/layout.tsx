import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hubfield.uz"),
  title:
    "HUBFIELD — Unified AI API Platform | 50+ Models, One SDK",
  description:
    "Ship AI features 10x faster. Access GPT-4o, Claude, Gemini & 50+ AI models through one API. Smart Router auto-picks the best model. Free tier — start building now.",
  keywords: [
    "AI API platform",
    "unified AI API",
    "SaaS AI solutions",
    "AI model aggregator",
    "GPT-4o API",
    "Claude API",
    "Gemini API",
    "creative AI tools",
    "AI smart router",
    "generative AI platform",
    "AI talent marketplace",
    "AI SDK",
    "multi-model AI API",
    "enterprise AI platform",
    "HUBFIELD",
  ],
  alternates: {
    canonical: "https://hubfield.uz",
    languages: {
      "en": "https://hubfield.uz",
      "x-default": "https://hubfield.uz",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hubfield.uz",
    siteName: "HUBFIELD",
    title: "Ship AI 10x Faster — 50+ Models, One API | HUBFIELD",
    description:
      "Stop juggling APIs. Access GPT-4o, Claude, Gemini & 50+ AI models through one unified SDK. Smart Router saves 30% on costs. Join 1,200+ builders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUBFIELD — Unified AI API Platform with 50+ models including GPT-4o, Claude, and Gemini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hubfield",
    creator: "@hubfield",
    title: "Ship AI 10x Faster — 50+ Models, One API | HUBFIELD",
    description:
      "One SDK for GPT-4o, Claude, Gemini & 50+ AI models. Smart Router auto-picks the best model. Free tier available → Start building now.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hubfield.uz/#organization",
    name: "HUBFIELD",
    url: "https://hubfield.uz",
    logo: "https://hubfield.uz/icon.svg",
    description:
      "AI-SaaS company providing a unified API platform to access 50+ AI models from OpenAI, Anthropic, Google, Meta, and more.",
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Tashkent, Uzbekistan",
    },
    sameAs: [
      "https://github.com/hubfield",
      "https://x.com/hubfield",
      "https://t.me/hubfield",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@hubfield.uz",
      contactType: "sales",
      availableLanguage: ["English", "Russian", "Uzbek"],
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Generative AI",
      "AI API Aggregation",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hubfield.uz/#website",
    url: "https://hubfield.uz",
    name: "HUBFIELD — Unified AI API Platform",
    publisher: { "@id": "https://hubfield.uz/#organization" },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hubfield.uz/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://hubfield.uz/#software",
    name: "HUBFIELD AI Platform",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "AI API Aggregation Platform",
    operatingSystem: "Web",
    description:
      "Unified AI API platform with access to 50+ models (GPT-4o, Claude, Gemini, Llama). Features include Smart Router for automatic model selection, Generative Studio for multi-modal content creation, and AI Talent Marketplace.",
    url: "https://hubfield.uz",
    author: { "@id": "https://hubfield.uz/#organization" },
    featureList: [
      "50+ AI models via one unified API (GPT-4o, Claude, Gemini, Llama)",
      "Smart Router — auto-selects optimal model by cost, speed, or quality",
      "Generative Studio — text, image, video, audio, and code generation",
      "AI Talent Marketplace — hire vetted AI/ML specialists",
      "Team workspaces with role-based access and audit logs",
      "SOC2 & GDPR compliant with local data residency",
      "TypeScript & Python SDKs with streaming support",
      "Enterprise SSO, custom SLAs, and UZS billing",
    ],
    screenshot: "https://hubfield.uz/og-image.png",
    softwareVersion: "1.0-beta",
    releaseNotes: "Closed beta with Smart Router and Generative Studio",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "10 models, 1,000 requests/month, community support, basic analytics",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "39",
        priceCurrency: "USD",
        priceValidUntil: "2027-01-01",
        description:
          "All 50+ models, unlimited requests, Smart Router, team workspaces (5 seats), priority support",
        availability: "https://schema.org/PreOrder",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "0",
        priceCurrency: "USD",
        description:
          "Custom pricing — dedicated infrastructure, SSO/SAML, 99.99% SLA, UZS billing",
        availability: "https://schema.org/PreOrder",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "12",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is HUBFIELD free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. HUBFIELD offers a generous free tier with access to 10 popular AI models and 1,000 requests per month. The first 500 waitlist members get 3 months of Pro — completely free.",
        },
      },
      {
        "@type": "Question",
        name: "When will HUBFIELD launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HUBFIELD is currently in closed beta with select users. Public launch is planned for Q3 2026. Join the waitlist to get early access and help shape the product.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI models are available on HUBFIELD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HUBFIELD provides access to 50+ AI models from OpenAI (GPT-4o), Anthropic (Claude), Google (Gemini), Meta (Llama), Mistral, Cohere, and Stability AI. All models support text, image, video, audio, and code generation through one unified API.",
        },
      },
      {
        "@type": "Question",
        name: "How does HUBFIELD's Smart Router work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Smart Router automatically selects the optimal AI model for each request based on your preferences — fastest response, lowest cost, or highest quality. It can reduce inference costs by up to 30% compared to direct API calls.",
        },
      },
      {
        "@type": "Question",
        name: "Where is my data stored on HUBFIELD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All data is processed and stored in HUBFIELD's Tashkent data center. The platform is SOC2 and GDPR compliant. Enterprise customers get dedicated infrastructure with full audit logs and data residency guarantees.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use HUBFIELD for my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. HUBFIELD's Enterprise tier includes SSO/SAML, custom SLAs with 99.99% uptime, dedicated account manager, and UZS billing. It's built for production AI workloads from day one.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background antialiased`}>
        <a href="#waitlist" className="skip-link">
          Skip to waitlist
        </a>
        {children}
      </body>
    </html>
  );
}
