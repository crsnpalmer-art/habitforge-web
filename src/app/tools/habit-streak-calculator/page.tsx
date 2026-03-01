import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import HabitStreakClient from "./HabitStreakClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habit Streak Calculator — HabitForge",
  description: "Calculate your habit streak probability and see how consistency compounds over time.",
};

export default function HabitStreakPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      <nav
        className="sticky top-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.92)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm text-stone-500 font-medium">
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
            <Link href="/tools" className="text-stone-900 font-semibold">Tools</Link>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors">
            ← All Tools
          </Link>
        </div>
      </nav>

      <HabitStreakClient />

      <SiteFooter />
    </main>
  );
}
