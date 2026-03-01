import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Roadmap & Changelog — HabitForge",
  description:
    "See what's shipped, what's in progress, and where HabitForge is headed. Built transparently in public.",
};

type Status = "shipped" | "in-progress" | "planned";

interface RoadmapItem {
  version?: string;
  date?: string;
  status: Status;
  title: string;
  items: string[];
}

const ROADMAP: RoadmapItem[] = [
  {
    version: "v1.0",
    date: "Feb 2026",
    status: "shipped",
    title: "Beta Launch",
    items: [
      "Four-dimension habit tracking (Mental, Physical, Spiritual, Financial)",
      "Daily Forge Score calculation",
      "Streak tracking with visual momentum",
      "Group leaderboards & accountability",
      "Privacy-first: all data stored locally on device",
      "iOS 17+ support",
    ],
  },
  {
    status: "in-progress",
    title: "Now Building",
    items: [
      "App Store submission & review",
      "Onboarding refinements based on beta feedback",
      "Widget support (home screen & lock screen)",
      "Habit scheduling with smart reminders",
    ],
  },
  {
    status: "planned",
    title: "Coming Next",
    items: [
      "iCloud sync (opt-in)",
      "Apple Health integration",
      "Habit templates library",
      "Forge Challenges — community-run 30-day sprints",
      "iPad & macOS companion app",
      "Shortcuts & Automations support",
    ],
  },
  {
    status: "planned",
    title: "Considering",
    items: [
      "Android / Wear OS",
      "Partner accountability (1:1 check-ins)",
      "AI habit coach (private, on-device)",
      "CSV/JSON data export",
    ],
  },
];

const STATUS_STYLES: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  shipped: {
    label: "Shipped",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-400",
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  planned: {
    label: "Planned",
    dot: "bg-stone-300",
    bg: "bg-stone-50 border-stone-200",
    text: "text-stone-500",
  },
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-stone-900">
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.jpg" alt="HabitForge" width={30} height={30} className="rounded-lg" />
          <span className="text-[13px] font-bold tracking-tight text-stone-800">HabitForge</span>
        </Link>
        <div className="flex items-center gap-6 text-[13px] font-medium text-stone-500">
          <Link href="/roadmap" className="text-stone-900 font-semibold">Roadmap</Link>
          <Link href="/blog" className="hover:text-stone-900 transition-colors hidden sm:block">Blog</Link>
          <Link href="/#waitlist" className="rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-4">
            Roadmap & Changelog
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.0]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Built in the open.
          </h1>
          <p className="mt-5 text-[18px] text-stone-500 leading-relaxed max-w-xl">
            Here's what we've shipped, what we're building right now, and where we're headed. 
            No corporate fluff — just the work.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {ROADMAP.map((section, i) => {
            const s = STATUS_STYLES[section.status];
            return (
              <div key={i} className={`rounded-2xl border p-7 ${s.bg}`}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    {section.version && (
                      <p className="text-[12px] font-semibold tracking-wider text-stone-400 uppercase mb-1">
                        {section.version} {section.date && `· ${section.date}`}
                      </p>
                    )}
                    <h2 className="text-[20px] font-bold text-stone-900">{section.title}</h2>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border ${s.bg} ${s.text} whitespace-nowrap`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] text-stone-600 leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer nudge */}
        <div className="mt-16 rounded-2xl bg-[#1c1917] px-8 py-10 text-center">
          <h3
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Have a feature request?
          </h3>
          <p className="text-stone-400 text-[15px] mb-6">
            We read every waitlist reply. Join the list and tell us what you'd love to see.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex rounded-full px-6 py-3 text-[14px] font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
