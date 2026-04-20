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
  title: "HUBFIELD — 50+ AI Models, One API Platform",
  description:
    "Access GPT-4o, Claude, Gemini & 50+ AI models through one API. Smart Router, Generative Studio, AI Talent Marketplace. Free tier available. Join 1,200+ builders.",
  keywords: [
    "AI platform",
    "AI API aggregator",
    "GPT-4o API",
    "Claude API",
    "Gemini API",
    "AI marketplace",
    "HUBFIELD",
    "Uzbekistan AI",
    "Smart Router AI",
    "generative AI platform",
  ],
  alternates: {
    canonical: "https://hubfield.uz",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hubfield.uz",
    siteName: "HUBFIELD",
    title: "HUBFIELD — 50+ AI Models, One Unified API",
    description:
      "Access GPT-4o, Claude, Gemini & 50+ AI models. Smart Router picks the best model automatically. Join 1,200+ builders on the waitlist.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUBFIELD — AI platform with 50+ models, one API. Built in Tashkent.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUBFIELD — 50+ AI Models, One API Platform",
    description:
      "Access GPT-4o, Claude, Gemini & 50+ models. Smart Router. Generative Studio. Built in Tashkent. Join the waitlist.",
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
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hubfield.uz/#organization",
    name: "HUBFIELD",
    url: "https://hubfield.uz",
    logo: "https://hubfield.uz/icon.svg",
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
      contactType: "customer support",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hubfield.uz/#website",
    url: "https://hubfield.uz",
    name: "HUBFIELD",
    publisher: { "@id": "https://hubfield.uz/#organization" },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HUBFIELD",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Access 50+ AI models through one unified API. Smart Router picks the optimal model automatically. Generative Studio for text, images, video, and code.",
    url: "https://hubfield.uz",
    author: { "@id": "https://hubfield.uz/#organization" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with 10 models and 1,000 requests/month",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "3",
      bestRating: "5",
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
          text: "We offer a generous free tier with access to popular models. The first 500 waitlist members get 3 months of Pro — completely free. After that, you can stay on Free or upgrade.",
        },
      },
      {
        "@type": "Question",
        name: "When will HUBFIELD launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're currently in closed beta with select users in Tashkent. Public launch is planned for Q3 2026. Join the waitlist to get early access and help shape the product.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI models are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "50+ models from OpenAI, Anthropic, Google, Meta, Mistral, Cohere, and Stability AI. Text, image, video, audio, and code generation — all through one unified API.",
        },
      },
      {
        "@type": "Question",
        name: "Where is my data stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All data is processed and stored in our Tashkent data center. We're SOC2 and GDPR compliant. Enterprise customers get dedicated infrastructure with full audit logs.",
        },
      },
      {
        "@type": "Question",
        name: "What does the Pro plan include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pro unlocks higher rate limits, priority model access, Smart Router with cost optimization, team workspaces, and access to the AI Talent Marketplace for hiring specialists.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use HUBFIELD for my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Our Enterprise tier includes SSO, custom SLAs, dedicated support, and UZS billing. We're built for production workloads from day one.",
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
    <html lang="en">
      <head>
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
