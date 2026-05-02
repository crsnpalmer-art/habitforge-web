import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  title: "HabitForge — Calm habit building for real life",
  description:
    "A calm daily habit system for Mental, Physical, Spiritual, and Financial growth, with private AI reflection and structure that holds up during real weeks.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "HabitForge — Calm habit building for real life",
    description:
      "Build high-impact habits across four dimensions with daily check-ins, private AI reflection, and a recovery-friendly system.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/logo.jpg", width: 800, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabitForge — Calm habit building for real life",
    description:
      "Build high-impact habits across four dimensions with daily check-ins, private AI reflection, and a recovery-friendly system.",
    creator: "@HabitForgeAI",
    images: ["/logo.jpg"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "A focused, private habit operating system for building consistency across mental, physical, spiritual, and financial dimensions.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
