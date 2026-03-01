import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "HabitForge vs. Other Habit Trackers — Which One Is Right for You?",
  description:
    "Comparing HabitForge to Habitica, Streaks, Way of Life, Habitify, and Done. See how a four-dimension system stacks up against single-list habit apps.",
  keywords: [
    "HabitForge alternative",
    "best habit tracker app",
    "HabitForge vs Habitica",
    "HabitForge vs Streaks",
    "HabitForge vs Habitify",
    "HabitForge vs Way of Life",
    "habit tracker comparison",
    "habit tracking app iOS",
  ],
};

interface CompetitorRow {
  feature: string;
  habitforge: string | boolean;
  others: string;
}

const COMPARISON: CompetitorRow[] = [
  {
    feature: "Tracks Mental, Physical, Spiritual & Financial habits",
    habitforge: true,
    others: "Most track a flat list only",
  },
  {
    feature: "Daily Forge Score (cross-dimension performance index)",
    habitforge: true,
    others: "Rare — most apps use streaks or XP",
  },
  {
    feature: "Streak tracking",
    habitforge: true,
    others: "Common",
  },
  {
    feature: "Group leaderboards & accountability",
    habitforge: true,
    others: "Uncommon on iOS; Habitica has social",
  },
  {
    feature: "Privacy-first (fully local, no account required)",
    habitforge: true,
    others: "Most require an account & cloud sync",
  },
  {
    feature: "iOS 17+ native experience",
    habitforge: true,
    others: "Varies widely",
  },
  {
    feature: "Gamification / RPG layer",
    habitforge: "Planned",
    others: "Habitica specializes here",
  },
  {
    feature: "Android support",
    habitforge: "Planned",
    others: "Most cross-platform apps support it",
  },
  {
    feature: "Price",
    habitforge: "Free at launch",
    others: "Range from free to $4.99/mo subscriptions",
  },
];

interface Alternative {
  name: string;
  tagline: string;
  strength: string;
  weakness: string;
  verdict: string;
}

const ALTERNATIVES: Alternative[] = [
  {
    name: "Streaks",
    tagline: "Apple Design Award winner for iOS",
    strength: "Beautiful, simple, deeply integrated with Apple Health. Great for people who want ≤12 daily tasks.",
    weakness: "Hard limit on habit count. No social layer. No multi-dimension system.",
    verdict:
      "Great for minimalists who want a polished single-list tracker. HabitForge is better if you want to understand *which part of your life* your habits are building.",
  },
  {
    name: "Habitica",
    tagline: "RPG gamification for habits",
    strength: "Strong community, party quests, and XP mechanics make it uniquely motivating for gamers.",
    weakness: "The RPG layer can feel like noise. Privacy trade-offs (account required, cloud data).",
    verdict:
      "Best for people who are motivated by games and social guilds. HabitForge skips the fantasy layer and focuses on real-world dimension tracking.",
  },
  {
    name: "Way of Life",
    tagline: "Color-coded habit journaling",
    strength: "Flexible positive/negative habit tracking. Good analytics. Long-standing iOS app.",
    weakness: "Dated UI. No group accountability. No dimension system.",
    verdict:
      "Solid choice for journaling-style habit review. HabitForge is more structured and social.",
  },
  {
    name: "Habitify",
    tagline: "Cross-platform habit tracker",
    strength: "Clean design, Mac + iOS sync, strong data export.",
    weakness: "Subscription pricing. No local-first option.",
    verdict:
      "Good for power users who want Apple ecosystem sync. HabitForge is currently iOS-focused but local-first and free at launch.",
  },
  {
    name: "Done — A Simple Habit Tracker",
    tagline: "Repeat goals & habits",
    strength: "Very approachable. Supports repeatable goals with flexible scheduling.",
    weakness: "No social features. Basic analytics. No dimension framework.",
    verdict:
      "A gentle on-ramp to habit tracking. HabitForge is a step up in structure and accountability.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-emerald-600 flex-shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-stone-300 flex-shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AlternativesPage() {
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
          <Link href="/blog" className="hover:text-stone-900 transition-colors hidden sm:block">Blog</Link>
          <Link href="/#waitlist" className="rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-4">
            Comparison
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            HabitForge vs.<br />Other Habit Trackers
          </h1>
          <p className="mt-5 text-[18px] text-stone-500 leading-relaxed max-w-2xl">
            Most habit trackers give you a list. HabitForge gives you a system — one that maps your 
            daily actions to the four dimensions that actually define who you're becoming.
          </p>
          <p className="mt-3 text-[13px] text-stone-400 italic">
            Note: This comparison reflects our best understanding of each app as of early 2026. 
            Apps evolve — always check their current feature set before deciding.
          </p>
        </div>

        {/* Feature comparison table */}
        <section className="mb-20">
          <h2
            className="text-2xl font-bold text-stone-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Feature Overview
          </h2>
          <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white">
            <div className="grid grid-cols-[1fr_auto_1fr] text-[13px] font-semibold text-stone-500 uppercase tracking-wider px-6 py-4 bg-stone-50 border-b border-stone-200">
              <span>Feature</span>
              <span className="px-6 text-stone-900">HabitForge</span>
              <span>Other Trackers</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_1fr] items-start px-6 py-4 gap-4 text-[14px] ${
                  i < COMPARISON.length - 1 ? "border-b border-stone-100" : ""
                }`}
              >
                <span className="text-stone-700 leading-snug">{row.feature}</span>
                <div className="px-6 flex justify-center">
                  {row.habitforge === true ? (
                    <CheckIcon />
                  ) : row.habitforge === false ? (
                    <MinusIcon />
                  ) : (
                    <span className="text-[12px] text-amber-600 font-medium whitespace-nowrap">{row.habitforge}</span>
                  )}
                </div>
                <span className="text-stone-400 leading-snug">{row.others}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Per-app breakdown */}
        <section className="mb-20">
          <h2
            className="text-2xl font-bold text-stone-900 mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            App by App
          </h2>
          <p className="text-[15px] text-stone-500 mb-8">
            A fair look at each alternative — what it does well, and where HabitForge takes a different approach.
          </p>
          <div className="space-y-5">
            {ALTERNATIVES.map((alt) => (
              <div key={alt.name} className="rounded-2xl border border-stone-200 bg-white p-7">
                <div className="mb-4">
                  <h3 className="text-[18px] font-bold text-stone-900">{alt.name}</h3>
                  <p className="text-[13px] text-stone-400 italic">{alt.tagline}</p>
                </div>
                <div className="space-y-3 text-[14px]">
                  <div>
                    <span className="font-semibold text-stone-700">Strength: </span>
                    <span className="text-stone-500">{alt.strength}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-700">Limitation: </span>
                    <span className="text-stone-500">{alt.weakness}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100">
                    <span className="font-semibold text-stone-800">Our take: </span>
                    <span className="text-stone-600">{alt.verdict}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why HabitForge */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold text-stone-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Why HabitForge is different
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "A system, not a list",
                desc: "Habits are bucketed into Mental, Physical, Spiritual, and Financial dimensions. You always know what part of yourself you're building.",
              },
              {
                title: "The Forge Score",
                desc: "One number that captures your cross-dimension consistency. A dashboard for the person you're becoming.",
              },
              {
                title: "Group accountability",
                desc: "Leaderboards with friends make consistency social — without turning habits into a game.",
              },
              {
                title: "Privacy by default",
                desc: "Everything lives on your device. No account required. No cloud. Your data is yours.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl bg-stone-900 p-6 text-white">
                <h3 className="font-bold text-[16px] mb-2">{card.title}</h3>
                <p className="text-[14px] text-stone-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-[#1c1917] px-8 py-10 text-center">
          <h3
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to try a different approach?
          </h3>
          <p className="text-stone-400 text-[15px] mb-6">
            HabitForge launches on the App Store soon. Join the waitlist and be first in.
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
