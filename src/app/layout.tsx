import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitForge — Your habits are your DNA",
  description:
    "Build powerful habits across every dimension of life — Mental, Physical, Spiritual, and Financial. Coming soon to the App Store.",
  openGraph: {
    title: "HabitForge",
    description: "Your habits are your DNA. Build them intentionally.",
    url: "https://habitforgeai.com",
    siteName: "HabitForge",
    images: [{ url: "/logo.jpg", width: 800, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabitForge",
    description: "Your habits are your DNA. Build them intentionally.",
    creator: "@HabitForgeAI",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
