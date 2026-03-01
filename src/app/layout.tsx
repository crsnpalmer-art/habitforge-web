import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/config";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HabitForge - Habit Operating System",
  description:
    "A focused, private habit operating system for building consistency across mental, physical, spiritual, and financial dimensions.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "HabitForge - Habit Operating System",
    description:
      "Build high-impact habits across four dimensions with clarity, accountability, and daily momentum.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/logo.jpg", width: 800, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabitForge - Habit Operating System",
    description:
      "Build high-impact habits across four dimensions with clarity, accountability, and daily momentum.",
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
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
