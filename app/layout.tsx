import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hubfield.uz"),
  title: "HUBFIELD | Future of AI in One Platform",
  description:
    "50+ AI models, one API. Smart Router, Generative Studio, and AI Talent Marketplace. Built in Tashkent, made for the world. Join the waitlist.",
  keywords: [
    "AI platform",
    "AI aggregator",
    "GPT",
    "Claude",
    "Gemini",
    "Uzbekistan",
    "HUBFIELD",
    "AI marketplace",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hubfield.uz",
    siteName: "HUBFIELD",
    title: "HUBFIELD — The Future of AI, In One Platform",
    description:
      "50+ AI models. One API. Smart Router picks the best model automatically. Join 1,200+ builders on the waitlist.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUBFIELD — AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUBFIELD — The Future of AI, In One Platform",
    description:
      "50+ AI models. One API. Smart Router. Built in Tashkent. Join the waitlist.",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background antialiased`}>
        <a href="#waitlist" className="skip-link">
          Skip to waitlist
        </a>
        {children}
      </body>
    </html>
  );
}
