import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — HabitForge",
  description: "Free interactive tools to help you plan goals, track habits, and build lasting systems.",
};

const tools = [
  {
    href: "/tools/goal-planner",
    icon: "◈",
    title: "Annual Goal Planner",
    desc: "Break an annual goal into quarterly milestones and weekly actions.",
    badge: "Goal Planning",
  },
  {
    href: "/tools/habit-streak-calculator",
    icon: "⬡",
    title: "Habit Streak Calculator",
    desc: "Calculate your current streak potential and estimated success probability.",
    badge: "Habit Science",
  },
];

export default function ToolsIndex() {
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
            <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
            <Link href="/tools" className="text-stone-900 font-semibold">Tools</Link>
          </div>
          <Link href="/#waitlist" className="hidden sm:inline-flex rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-stone-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Free Tools
        </h1>
        <p className="text-xl text-stone-500 mb-12 leading-relaxed">
          Interactive tools to help you plan, track, and compound your progress.
        </p>

        <div className="grid gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group block rounded-2xl border border-stone-200 bg-white p-7 hover:border-violet-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl text-stone-300 flex-shrink-0">{t.icon}</span>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-violet-500 mb-1 block">{t.badge}</span>
                  <h2 className="text-xl font-bold text-stone-800 mb-1.5 group-hover:text-violet-700 transition-colors">{t.title}</h2>
                  <p className="text-sm text-stone-500 leading-relaxed">{t.desc}</p>
                  <span className="inline-block mt-3 text-sm font-semibold text-violet-600">Open tool →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
