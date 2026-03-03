"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import MobileMenu from "@/components/MobileMenu";
import { APP_STORE_LIVE, APP_STORE_URL, WAITLIST_COUNT } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

const features = [
  {
    icon: "◈",
    name: "Four Dimensions",
    desc: "Mental, Physical, Spiritual, Financial — every habit is mapped to what it actually builds in your life.",
  },
  {
    icon: "◎",
    name: "Forge Score",
    desc: "A single daily score weighted by difficulty and consistency across all four dimensions. Watch it compound.",
  },
  {
    icon: "⬡",
    name: "Streaks",
    desc: "Current and longest streaks tracked per habit. Break one, feel it. Rebuild it, own it.",
  },
  {
    icon: "★",
    name: "Ember AI Coach",
    desc: "On-device AI coach powered by Apple Intelligence. Personalized insights based on your real habit data — private, fast, no cloud required.",
  },
  {
    icon: "◑",
    name: "Forge Shields",
    desc: "Earn a shield every 14-day streak. Use it to protect a streak after a missed day. Your safety net for hard weeks.",
  },
  {
    icon: "◻",
    name: "Habit Chains",
    desc: "Link habits into ordered routines. Morning routine, evening wind-down — chain them together and track as one flow.",
  },
  {
    icon: "◉",
    name: "Focus Timer",
    desc: "Built-in Pomodoro-style timer tied to your habits. Complete a full session and the habit marks itself done.",
  },
  {
    icon: "⊕",
    name: "Mood & Energy Tracking",
    desc: "Daily mood and energy check-ins reveal the link between your habits and how you feel. Data-backed self-awareness.",
  },
  {
    icon: "◇",
    name: "Groups & Leaderboard",
    desc: "Join a group with a 6-character code, compete on a streak leaderboard, and hold each other accountable.",
  },
  {
    icon: "⊞",
    name: "15 Achievement Badges",
    desc: "Unlock badges from First Step to Year of Iron. Eight Forge Levels from Apprentice to Mythic.",
  },
  {
    icon: "⊟",
    name: "Local-First Storage",
    desc: "Your habit data lives on your device. Face ID and Touch ID keep it locked. Export as JSON anytime.",
  },
  {
    icon: "◌",
    name: "Home Screen Widget",
    desc: "Interactive widget lets you check off habits without opening the app. Three sizes, full iOS 26 support.",
  },
];


export default function Home() {
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Please try again.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }
    setStatus("loading");
    setErrorMessage("Something went wrong. Please try again.");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail, goal: goal || undefined }),
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
        return;
      }
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setErrorMessage(payload?.error ?? "Could not join the waitlist. Please try again.");
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please try again in a moment.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-stone-900 bg-[#F5F0E8]">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-12 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #FDF9F3 0%, #F5F0E8 100%)",
        }}
      >
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
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-stone-500">
            <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-stone-900 transition-colors">How It Works</Link>
            <Link href="/blog" className="hover:text-stone-900 transition-colors">Blog</Link>
          </div>
          <a
            href="#waitlist"
            className="hidden md:inline-flex rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors"
            onClick={() => trackEvent("cta_click", { destination: "waitlist", variant: "nav" })}
          >
            Get Early Access
          </a>
          <div className="md:hidden">
            <MobileMenu links={[
              { label: "About", href: "/about" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Blog", href: "/blog" },
            ]} />
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <motion.h1
            className="mt-4 font-bold leading-[0.95] text-stone-900"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(52px, 9vw, 112px)",
              letterSpacing: "-0.03em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Forge the person<br />you&apos;re becoming.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-[18px] sm:text-[20px] leading-relaxed text-stone-500"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Anvil-forged habits, one day at a time.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {APP_STORE_LIVE ? (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full px-7 py-3.5 text-[14px] font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors text-center"
                onClick={() => trackEvent("cta_click", { destination: "app_store", variant: "hero" })}
              >
                Download on the App Store
              </a>
            ) : (
              <a
                href="#waitlist"
                className="w-full sm:w-auto rounded-full px-7 py-3.5 text-[14px] font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors text-center"
                onClick={() => trackEvent("cta_click", { destination: "waitlist", variant: "hero" })}
              >
                Get Early Access
              </a>
            )}
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto rounded-full px-7 py-3.5 text-[14px] font-semibold text-stone-800 border border-stone-400 hover:border-stone-700 hover:bg-stone-900/5 transition-all"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-5 text-[13px] text-stone-400 flex items-center gap-3 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <span>Free to download</span>
            <span className="text-stone-600">·</span>
            <span>iOS 26+</span>
            <span className="text-stone-600">·</span>
            <span>No subscription required</span>
            {WAITLIST_COUNT && (
              <>
                <span className="text-stone-600">·</span>
                <span><span className="font-semibold text-stone-600">{WAITLIST_COUNT.toLocaleString()}+</span> on the list</span>
              </>
            )}
          </motion.p>

          {/* Phone mockup */}
          <motion.div
            className="mt-14 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative mx-auto rounded-[44px] overflow-hidden"
              style={{
                width: "min(340px, 86vw)",
                boxShadow:
                  "0 0 0 10px #1a1a1a, 0 0 0 11px #333, 0 40px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <Image
                src="/screenshots/01-Dashboard.png"
                alt="HabitForge dashboard — 14-day streak, Forge Score 537"
                width={1170}
                height={2532}
                className="w-full h-auto block"
                sizes="(max-width: 640px) 86vw, 340px"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-stone-400 text-base"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────────────────── */}
      <div className="bg-[#F5F0E8] border-y border-stone-200/60 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "4", label: "Habit Dimensions" },
            { stat: "1", label: "Unified Forge Score" },
            { stat: "∞", label: "Day Streak Potential" },
            { stat: "0", label: "Compromises on Privacy" },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="font-bold text-stone-900 leading-none"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {stat}
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FORGE EMBER BACKGROUND ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 560 }}>
        <video
          src="/videos/forge_ember_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(15, 10, 8, 0.58)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-amber-500/80 mb-5">
              Anvil-forged habits
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              One day at a time.
            </h2>
            <p className="text-[17px] text-stone-300 max-w-lg mx-auto leading-relaxed mb-10">
              Every check-in feeds your Forge Score. Every dimension tells a story.
            </p>
            <a
              href="#waitlist"
              className="inline-flex rounded-full px-8 py-4 text-[14px] font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors shadow-lg"
              onClick={() => trackEvent("cta_click", { destination: "waitlist", variant: "video" })}
            >
              Get Early Access
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── DEMO VIDEO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#1c1917] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-500 mb-3">
              See it in action
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              30 seconds inside the forge.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden mx-auto"
            style={{ maxWidth: 380, boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5)" }}
          >
            <video
              src="/demo-teaser.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/screenshots/01-Dashboard.png"
              className="w-full h-auto block"
              style={{ background: "#0e0d0b" }}
            />
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#waitlist"
              className="inline-flex rounded-full px-8 py-4 text-[14px] font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors shadow-lg"
              onClick={() => trackEvent("cta_click", { destination: "waitlist", variant: "video" })}
            >
              Get Early Access
            </a>
          </motion.div>
        </div>
      </section>



      {/* ─── PHILOSOPHY STRIP ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#1c1917" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-10 md:gap-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              { stat: "4", label: "Dimensions", sub: "Mental · Physical · Spiritual · Financial" },
              { stat: "1", label: "Forge Score", sub: "One number that compounds daily" },
              { stat: "∞", label: "Day streaks", sub: "No ceiling. No reset unless you miss." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(52px, 7vw, 80px)",
                    background: "linear-gradient(135deg, #D97C5F, #F2CC8F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >{item.stat}</p>
                <p className="text-white font-semibold text-[17px] mb-1">{item.label}</p>
                <p className="text-stone-500 text-[13px] leading-snug">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="mt-16 text-center text-[17px] md:text-[19px] text-stone-400 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Most habit apps track checkboxes. HabitForge tracks the person you&apos;re building — across every dimension that actually matters.
          </motion.p>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F0E8] py-16 md:py-24 px-6 border-t border-stone-200/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="mt-5 text-[17px] text-stone-500 max-w-xl mx-auto leading-relaxed">
              HabitForge is built around one idea: the person you become is the sum of your daily habits.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.name}
                className="bg-white rounded-2xl border border-stone-200/80 p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <span className="text-2xl text-stone-400 block mb-4">{f.icon}</span>
                <h3 className="text-[15px] font-bold text-stone-900 mb-1.5">{f.name}</h3>
                <p className="text-[13px] text-stone-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP SHOWCASE ─────────────────────────────────────────────────── */}
      <section className="bg-[#EDEAE3] py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Built for the way<br />you actually live.
            </h2>
            <p className="mt-5 text-[17px] text-stone-500">
              Check in daily. Track your streaks. Watch the picture emerge.
            </p>
          </motion.div>

          {/* Mobile: single center phone only */}
          <motion.div
            className="flex md:hidden justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-[44px] overflow-hidden"
              style={{
                width: "min(260px, 78vw)",
                boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 11px #444, 0 40px 80px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/screenshots/05-leaderboard.png"
                alt="HabitForge Groups leaderboard — compete with friends"
                width={1170}
                height={2532}
                className="w-full h-auto block"
                sizes="(max-width: 640px) 78vw, 260px"
                priority
              />
            </div>
          </motion.div>

          {/* Desktop: 3-phone angled showcase */}
          <div className="hidden md:flex items-end justify-center gap-6">
            {/* Left */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: 200 }}
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="rounded-[36px] overflow-hidden translate-y-6"
                style={{
                  boxShadow: "0 0 0 8px #1a1a1a, 0 0 0 9px #333, 0 30px 60px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/screenshots/03-EmberAI.png"
                  alt="Ember AI coaching response"
                  width={1170}
                  height={2532}
                  className="w-full h-auto block"
                  sizes="200px"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Center */}
            <motion.div
              className="relative flex-shrink-0 z-10"
              style={{ width: 260 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.05 }}
            >
              <div
                className="rounded-[44px] overflow-hidden"
                style={{
                  boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 11px #444, 0 50px 100px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <Image
                  src="/screenshots/01-Dashboard.png"
                  alt="HabitForge dashboard"
                  width={1170}
                  height={2532}
                  className="w-full h-auto block"
                  sizes="260px"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: 200 }}
              initial={{ opacity: 0, x: 40, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="rounded-[36px] overflow-hidden translate-y-6"
                style={{
                  boxShadow: "0 0 0 8px #1a1a1a, 0 0 0 9px #333, 0 30px 60px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/screenshots/02-ForgeShields.png"
                  alt="Forge Shields — streak protection"
                  width={1170}
                  height={2532}
                  className="w-full h-auto block"
                  sizes="200px"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER NOTE ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 border-t border-stone-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-200">
                <img src="/logo.jpg" alt="HabitForge" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4">From the Founder</p>
              <blockquote className="text-[18px] md:text-[20px] text-stone-700 leading-[1.75] mb-5">
                &ldquo;Somewhere between the hard days and the ordinary ones, a simple truth kept showing up: we are the sum of what we do repeatedly. I built HabitForge because every app I tried tracked too little, or tracked the wrong things. Life isn&apos;t just physical health — it&apos;s your mind, your finances, your spirit. I wanted one place where all of it counted, with an AI coach that knows your data without shipping it to a server. Your daily choices are the pieces. Over time, they form your code.&rdquo;
              </blockquote>
              <p className="text-sm font-semibold text-stone-800">Carson Palmer</p>
              <p className="text-xs text-stone-400 mt-0.5">Founder, HabitForge</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* testimonials — placeholder for real App Store reviews post-launch */}

      {/* ─── BRAND FILM ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <video
          src="/videos/brand_spot.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(12, 8, 6, 0.55)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-500/70 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Anvil-forged habits, one day at a time
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            The anvil is waiting.
          </motion.h2>
        </div>
      </section>

      {/* ─── QUOTE ────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F0E8] py-28 md:py-40 px-6 border-t border-stone-200/40">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <blockquote
            className="font-bold italic text-stone-800 leading-[1.1]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(40px, 6vw, 72px)",
            }}
          >
            &ldquo;Every day you step up<br />to the anvil.&rdquo;
          </blockquote>
          <p className="mt-8 text-[13px] tracking-widest uppercase text-stone-400">— Carson Palmer, Founder of HabitForge</p>
        </motion.div>
      </section>

      {/* ─── PRICING STRIP ────────────────────────────────────────────────── */}
      <section className="bg-[#F5F0E8] border-t border-stone-200/60 py-12 px-6">
        <motion.div
          className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p
              className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Free to download.
            </p>
            <p className="mt-1 text-[15px] text-stone-500">No subscription. No ads. No data sold. iOS 26+.</p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="#waitlist"
              className="inline-block rounded-full px-8 py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #D97C5F, #F2CC8F)" }}
            >
              Get Early Access
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── WAITLIST CTA ─────────────────────────────────────────────────── */}
      <section id="waitlist" className="bg-[#1c1917] py-24 md:py-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Get notified at launch.
            </h2>
            <p className="mt-4 text-[16px] text-stone-400">
              HabitForge is in final App Store review. Leave your email and you'll hear the moment it's live — free to download.
            </p>
            {WAITLIST_COUNT && (
              <p className="mt-2 text-[13px] text-stone-500">
                {WAITLIST_COUNT.toLocaleString()}+ people already waiting.
              </p>
            )}

            {status === "success" ? (
              <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-5">
                <p className="font-semibold text-emerald-300">You&apos;re on the list.</p>
                <p className="mt-1 text-sm text-emerald-100/70">We&apos;ll reach out when HabitForge launches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    disabled={status === "loading"}
                    className="flex-1 rounded-full border border-stone-700 bg-stone-800/60 px-5 py-3.5 text-[14px] text-stone-100 placeholder:text-stone-600 outline-none focus:border-stone-500 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full px-6 py-3.5 text-[14px] font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === "loading" ? "..." : "Join"}
                  </motion.button>
                </div>
                {/* Optional goal segmentation */}
                <div className="mt-3">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full rounded-full border border-stone-700 bg-stone-800/60 px-5 py-3 text-[13px] text-stone-400 outline-none focus:border-stone-500 transition-colors appearance-none"
                    style={{ color: goal ? "#e7e5e4" : undefined }}
                  >
                    <option value="">Primary goal (optional)</option>
                    <option value="Mental">🧠 Mental</option>
                    <option value="Physical">💪 Physical</option>
                    <option value="Spiritual">✨ Spiritual</option>
                    <option value="Financial">💰 Financial</option>
                  </select>
                </div>
                <p className="mt-3 text-[12px] text-stone-600">No spam. One-click unsubscribe.</p>
              </form>
            )}

            <div aria-live="polite" className="min-h-[1.5rem] mt-2">
              {status === "error" && <p className="text-sm text-rose-400">{errorMessage}</p>}
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
