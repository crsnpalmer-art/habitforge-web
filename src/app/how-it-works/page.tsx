"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import SiteFooter from "@/components/SiteFooter";
import ScrollAnimator from "@/components/ScrollAnimator";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign in with Apple, Google, or Email — secure authentication in seconds. Your data is encrypted from the first tap.",
    screenshot: "/screenshots/01-auth.png",
  },
  {
    num: "02",
    title: "Personalized Onboarding",
    desc: "Enter your name, pick your first habit, and choose its dimension. HabitForge calibrates to your growth priorities from day one.",
    screenshot: "/screenshots/02-onboarding.png",
  },
  {
    num: "03",
    title: "Build Your Daily Habits",
    desc: "Check off habits across all four dimensions — Mental, Physical, Spiritual, Financial. Every completion counts toward your Forge Score.",
    screenshot: "/screenshots/03-dashboard.png",
  },
  {
    num: "04",
    title: "Track Streaks & Forge Score",
    desc: "Your dashboard shows current streaks, longest streaks, and your daily Forge Score. Watch the analytics tell the story of your consistency.",
    screenshot: "/screenshots/04-progress.png",
  },
  {
    num: "05",
    title: "Join Groups & Compete",
    desc: "Enter a group code to join friends or teammates. The leaderboard tracks rank, score, and rank changes — accountability with teeth.",
    screenshot: "/screenshots/05-leaderboard.png",
  },
  {
    num: "06",
    title: "Build Your Routine",
    desc: "Use Routine Wizards to instantly set up Morning Routines, Digital Detox plans, and more — or build custom habits from scratch with difficulty levels and score multipliers.",
    screenshot: "/screenshots/08-add-habit.png",
  },
];

const faqs = [
  {
    q: "When does HabitForge launch on the App Store?",
    a: "We're in the final stages of App Store review preparation. Join the waitlist to be notified the moment it's live.",
  },
  {
    q: "What iOS version do I need?",
    a: "HabitForge requires iOS 17.0 or later.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All data stays on your device. No accounts required, no cloud uploads, no third-party tracking.",
  },

];

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="bg-stone-900 rounded-[2.5rem] p-2 shadow-2xl"
      style={{ width: 300, maxWidth: "100%" }}
    >
      <div className="overflow-hidden rounded-[2rem] border border-stone-700">
        <Image
          src={src}
          alt={alt}
          width={296}
          height={640}
          className="w-full h-auto block"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 group"
      >
        <span className="text-stone-800 font-medium text-[15px]">{q}</span>
        <svg
          className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="mt-3 text-stone-500 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      <ScrollAnimator />

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm text-stone-500 font-medium">
            <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
            <Link href="/how-it-works" className="text-stone-900 font-semibold hover:text-stone-800 transition-colors">How It Works</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
          </div>
          <MobileMenu links={NAV_LINKS} activeHref="/how-it-works" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-6">
            How It Works
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Build better habits with structure, momentum, and accountability.
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed mb-10 max-w-xl mx-auto">
            HabitForge helps you track daily actions across mental, physical, spiritual, and financial growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="/#waitlist"
              className="px-7 py-3.5 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-700 transition-colors"
            >
              Join the Waitlist
            </a>
            <a
              href="#steps"
              className="px-7 py-3.5 rounded-full border border-stone-300 text-stone-700 font-semibold text-sm hover:border-stone-400 transition-colors"
            >
              See the App
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold tracking-[0.18em] text-stone-400 uppercase">
            <span>iOS 17+</span>
            <span className="text-stone-300">·</span>
            <span>Private by Design</span>
            <span className="text-stone-300">·</span>
            <span>Available Soon</span>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-28">
          {steps.map((step, i) => {
            const imageLeft = i % 2 === 1; // even index = image right, odd = image left
            return (
              <div
                key={step.num}
                className={`scroll-animate flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
              >
                {/* Phone */}
                <div className="shrink-0 flex justify-center">
                  <PhoneMockup src={step.screenshot} alt={step.title} />
                </div>

                {/* Text */}
                <div className="flex-1 relative">
                  <span
                    className="absolute -top-6 left-0 text-[9rem] font-black leading-none select-none pointer-events-none"
                    style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,0,0,0.04)" }}
                  >
                    {step.num}
                  </span>
                  <div className="relative z-10">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                      Step {step.num}
                    </p>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-4 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-stone-500 text-base leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HABIT DETAIL HIGHLIGHT ── */}
      <section className="py-24 px-6 bg-[#F5F0E8]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
              Habit Detail
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every streak tells a story.
            </h2>
            <p className="text-stone-500 text-base leading-relaxed max-w-md">
              Inspect individual habit history and fine-tune your routine with precision. Every streak tells a story.
            </p>
          </div>
          <div className="shrink-0 order-1 md:order-2 flex justify-center">
            <PhoneMockup src="/screenshots/07-habit-detail.png" alt="Habit Detail" />
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-3">FAQ</p>
            <h2
              className="text-4xl font-bold text-stone-800 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Questions answered.
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="py-20 px-6 bg-[#F5F0E8] text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ready to forge your habits?
        </h2>
        <a
          href="/#waitlist"
          className="inline-flex px-8 py-4 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-700 transition-colors"
        >
          Join the Waitlist
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
