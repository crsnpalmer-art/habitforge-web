import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { APP_STORE_LIVE, APP_STORE_URL, PRIMARY_CTA_LABEL_LONG, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata = {
  title: "Download HabitForge — iOS App",
  description: "Download HabitForge on the App Store or preview the app before launch.",
  openGraph: {
    title: "Download HabitForge",
    description: "Track your Mental, Physical, Spiritual, and Financial habits in one place.",
    url: `${SITE_URL}/download`,
    siteName: SITE_NAME,
  },
};

const shots = [
  { src: "/screenshots/01-auth.png", alt: "HabitForge sign in" },
  { src: "/screenshots/03-dashboard.png", alt: "HabitForge dashboard" },
  { src: "/screenshots/04-progress.png", alt: "HabitForge progress" },
];

const benefits = [
  {
    title: "One daily system",
    body: "Track the habits that matter without juggling notes, reminders, and a bunch of half-used apps.",
  },
  {
    title: "Built for real life",
    body: "HabitForge is designed for imperfect weeks, low motivation, and the messy middle where most routines die.",
  },
  {
    title: "Clear accountability",
    body: "Reflection, habit detail, and weekly patterns make your momentum visible before the results show up.",
  },
];

const weekOne = [
  "Choose a few habits across mind, body, spirit, or money",
  "Check in daily instead of renegotiating the plan every morning",
  "Use reflections and habit detail to spot where momentum starts slipping",
  "Let Ember reflect the pattern back so you can adjust fast",
];

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14110d] text-white">
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
        <div className="fixed inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.14),transparent_32%),linear-gradient(245deg,rgba(91,117,89,0.18),transparent_30%)]" />
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.34)_0%,rgba(20,17,13,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.18),transparent_32%),linear-gradient(245deg,rgba(91,117,89,0.20),transparent_30%)]" />

        <div className="relative z-10 pb-16">
          <SiteNav activeHref="/download" variant="dark" />

          <section className="px-6 pb-12 pt-10 sm:pt-16">
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                {APP_STORE_LIVE ? "Now available on iOS" : "App preview"}
              </p>
              <h1 className="font-display mx-auto max-w-[22rem] text-4xl leading-[1.08] tracking-tight text-white sm:max-w-4xl sm:text-6xl md:text-7xl">
                <span className="block">A habit app</span>
                <span className="block">for structure</span>
                <span className="block">without noise.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[19rem] text-lg leading-relaxed text-white/78 sm:max-w-3xl">
                HabitForge gives you one calm place to track the habits that matter, keep daily momentum visible, and recover quickly when life knocks your routine sideways.
              </p>

              {APP_STORE_LIVE ? (
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex cursor-pointer items-center rounded-full bg-gray-900 px-8 py-4 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  {PRIMARY_CTA_LABEL_LONG}
                </a>
              ) : (
                <div className="mt-10 inline-flex rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-medium text-white shadow-[0_18px_50px_rgba(7,12,20,0.18)] backdrop-blur-sm">
                  App Store release in progress
                </div>
              )}

              <p className="mt-4 text-sm text-white/62">iOS 26+ · Daily check-ins · Weekly reflection · Ember AI</p>

              <div className="mx-auto mt-8 flex max-w-[19rem] flex-col items-stretch justify-center gap-3 text-sm text-white/74 sm:max-w-3xl sm:flex-row sm:flex-wrap sm:items-center">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">Check in once a day</span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">Track four areas of life in one place</span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">See weak spots before the routine slips</span>
              </div>
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl items-end justify-center gap-4 overflow-hidden sm:gap-6">
              {shots.map((shot, idx) => (
                <div
                  key={shot.src}
                  className={`overflow-hidden rounded-[2.5rem] bg-[#171717] p-2 shadow-[0_28px_80px_rgba(23,23,23,0.18)] ${idx === 1 ? "z-10" : "hidden translate-y-6 scale-95 sm:block"}`}
                  style={{ width: idx === 1 ? "min(260px, 42vw)" : "min(200px, 32vw)" }}
                >
                  <div className="overflow-hidden rounded-[2rem] border border-white/10">
                    <Image src={shot.src} alt={shot.alt} width={1170} height={2532} className="block h-auto w-full" priority={idx === 1} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2cc8f]">Why HabitForge works</p>
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl">It helps you protect momentum, not just log intentions.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-white/8 bg-white/5 p-6">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(217,124,95,0.24),rgba(255,255,255,0.05))] p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Week 1</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">What a new user should expect</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/78">
              {weekOne.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-[#f2cc8f]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/8 bg-white/5 p-8 text-center shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2cc8f]">What you get</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Daily", "Check-ins and progress notes"],
              ["4 areas", "Mental, Physical, Spiritual, Financial"],
              ["Ember", "AI reflection tied to your real data"],
              ["Recovery", "A calmer path after a missed day"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[2rem] border border-white/8 bg-white/5 p-8 text-center">
                <div className="text-4xl font-light tracking-tight text-white">{value}</div>
                <div className="mt-2 text-sm text-white/66">{label}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <h3 className="text-2xl font-medium text-white">If you like the ideas in the journal, this is the tool that helps you actually use them.</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">The blog explains the principles. HabitForge helps you apply them every day without rebuilding your system from scratch every morning.</p>
            {APP_STORE_LIVE ? (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex cursor-pointer items-center rounded-full bg-white px-8 py-4 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                {PRIMARY_CTA_LABEL_LONG}
              </a>
            ) : (
              <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-medium text-white shadow-[0_18px_50px_rgba(7,12,20,0.18)] backdrop-blur-sm">
                App Store release in progress
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
