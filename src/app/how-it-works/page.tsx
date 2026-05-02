"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import SiteNav from "@/components/SiteNav";
import { APP_STORE_LIVE, PRIMARY_CTA_LABEL_LONG, PRIMARY_CTA_URL } from "@/lib/config";

const steps = [
  {
    num: "01",
    title: "Create your account",
    desc: "Sign in with Apple, Google, or email. HabitForge gets out of your way fast and lets the real work begin.",
    screenshot: "/screenshots/01-auth.png",
  },
  {
    num: "02",
    title: "Choose your first habit",
    desc: "Pick what matters first and map it to Mental, Physical, Spiritual, or Financial growth.",
    screenshot: "/screenshots/02-onboarding.png",
  },
  {
    num: "03",
    title: "Build the daily rhythm",
    desc: "Check off habits, stack routines, and let the reps accumulate instead of resetting every week.",
    screenshot: "/screenshots/01-Dashboard.png",
  },
  {
    num: "04",
    title: "Review progress without pressure",
    desc: "Habit detail makes your patterns visible so you can adjust the system instead of judging the miss.",
    screenshot: "/screenshots/07-Progress.png",
  },
  {
    num: "05",
    title: "Recover rhythm after missed days",
    desc: "Hard weeks happen. HabitForge helps you restart from the pattern instead of treating one miss like a collapse.",
    screenshot: "/screenshots/02-ForgeShields.png",
  },
  {
    num: "06",
    title: "Let Ember coach the pattern",
    desc: "Ember AI turns your real habit data into encouragement, feedback, and accountability.",
    screenshot: "/screenshots/03-EmberAI.png",
  },
];

const faqs = [
  ["What does HabitForge track?", "HabitForge tracks habits across Mental, Physical, Spiritual, and Financial growth, plus check-ins, reflections, and day-to-day consistency."],
  ["What iOS version do I need?", "HabitForge requires iOS 26 or later."],
  ["What does Ember AI do?", "Ember looks at your actual habit history and gives reflection, encouragement, and accountability based on your real pattern — not generic push notifications."],
  ["Is my data private?", "Yes. HabitForge is designed around calm, private ownership of your routine data rather than ad-driven tracking."],
];

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[2.5rem] bg-[#171717] p-2 shadow-[0_30px_80px_rgba(7,12,20,0.28)]" style={{ width: 300, maxWidth: "100%" }}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10">
        <Image src={src} alt={alt} width={296} height={640} className="block h-auto w-full" />
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5 last:border-b-0">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="text-[15px] font-medium text-white">{q}</span>
        <span className={`text-xl text-[#f2cc8f] transition-transform ${open ? "rotate-45" : "rotate-0"}`}>+</span>
      </button>
      {open && <p className="mt-3 text-sm leading-7 text-white/68">{a}</p>}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14110d] text-white">
      <ScrollAnimator />

      <div className="pointer-events-none absolute inset-0">
        <video
          className="fixed inset-0 h-full w-full object-cover opacity-30"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.58)_0%,rgba(20,17,13,0.92)_100%)]" />
        <div className="fixed inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.12),transparent_32%),linear-gradient(245deg,rgba(91,117,89,0.18),transparent_30%)]" />
      </div>

      <section className="relative z-10 overflow-hidden text-center text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.34)_0%,rgba(20,17,13,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.18),transparent_32%),linear-gradient(245deg,rgba(91,117,89,0.22),transparent_30%)]" />

        <div className="relative z-10 pb-20">
          <SiteNav activeHref="/how-it-works" variant="dark" />

          <div className="px-6 pb-10 pt-10 sm:pt-16">
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">How it works</p>
              <h1 className="font-display mx-auto max-w-[21rem] text-4xl leading-[1.08] tracking-tight text-white sm:max-w-4xl sm:text-6xl md:text-7xl">
                <span className="block">Structure.</span>
                <span className="block">Momentum.</span>
                <span className="block">Accountability.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[19rem] text-lg leading-relaxed text-white/78 sm:max-w-2xl">
                HabitForge helps you build routines across mental, physical, spiritual, and financial growth without feeling like homework.
              </p>
              {APP_STORE_LIVE ? (
                <a href={PRIMARY_CTA_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex rounded-full bg-[#111827] px-8 py-4 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97]">
                  {PRIMARY_CTA_LABEL_LONG}
                </a>
              ) : (
                <Link href={PRIMARY_CTA_URL} className="mt-10 inline-flex rounded-full bg-[#111827] px-8 py-4 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97]">
                  {PRIMARY_CTA_LABEL_LONG}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-6 py-24" id="steps">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.68)_0%,rgba(30,27,21,0.84)_100%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-24">
          {steps.map((step, i) => (
            <div key={step.num} className={`scroll-animate flex flex-col items-center gap-12 rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm ${i % 2 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="flex shrink-0 justify-center">
                <PhoneMockup src={step.screenshot} alt={step.title} />
              </div>
              <div className="relative flex-1">
                <span className="pointer-events-none absolute -top-10 right-0 text-[5rem] font-semibold leading-none text-white/5 md:text-[6rem]">{step.num}</span>
                <div className="relative z-10">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2cc8f]">Step {step.num}</p>
                  <h2 className="font-display max-w-lg text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">{step.title}</h2>
                  <p className="mt-5 max-w-md text-base leading-8 text-white/68">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm md:grid-cols-[1fr_320px] md:items-center md:p-12">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2cc8f]">Habit detail</p>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">Every pattern tells a story.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
              Inspect the pattern, spot the weak point, and adjust before a rough week becomes a lost month.
            </p>
          </div>
          <div className="flex justify-center">
            <PhoneMockup src="/screenshots/07-habit-detail.png" alt="Habit detail" />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2cc8f]">FAQ</p>
          <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white">What people usually want to know.</h2>
          <div className="mt-8">
            {faqs.map(([q, a]) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 pt-6 text-center text-white">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/8 bg-[linear-gradient(135deg,rgba(217,124,95,0.18),rgba(255,255,255,0.04))] p-10 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm">
          <h2 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">See the app in context.</h2>
          <p className="mt-5 text-base leading-relaxed text-white/72">The download page shows the product screens, release path, and what HabitForge is built to help you do every day.</p>
          <Link href="/download" className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.03] active:scale-[0.97]">
            View the app preview
          </Link>
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
