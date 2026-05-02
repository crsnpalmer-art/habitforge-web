import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import ScrollAnimator from "@/components/ScrollAnimator";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "About — HabitForge",
  description:
    "The story behind HabitForge — why habits are your DNA, and how a recurring dream became a mission to help people build intentionally.",
};

const pillars = [
  {
    label: "Mental",
    letter: "M",
    desc: "Sharpen focus, build discipline, and cultivate the mindset that compounds over time.",
  },
  {
    label: "Physical",
    letter: "P",
    desc: "Move daily. Build a body that performs as well as it looks. Energy supports everything else.",
  },
  {
    label: "Spiritual",
    letter: "S",
    desc: "Ground yourself in purpose. Daily practices that connect you to meaning, presence, and peace.",
  },
  {
    label: "Financial",
    letter: "F",
    desc: "Build the habits that build wealth — spending, saving, and investing with intention.",
  },
];

const features = [
  "Daily check-ins that make consistency visible",
  "Weekly reflection that makes patterns easier to understand",
  "Recovery-friendly prompts for missed or messy days",
  "Habit detail screens that show where the pattern breaks",
  "Ember AI reflection tied to your actual history",
  "A clean, premium interface designed to reduce noise",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14110d] text-white">
      <ScrollAnimator />

      <div className="pointer-events-none absolute inset-0">
        <video
          className="fixed inset-0 h-full w-full object-cover opacity-26"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.60)_0%,rgba(20,17,13,0.92)_100%)]" />
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.36)_0%,rgba(20,17,13,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.18),transparent_32%),linear-gradient(245deg,rgba(91,117,89,0.20),transparent_30%)]" />

        <div className="relative z-10 pb-20">
          <SiteNav activeHref="/about" variant="dark" />

          <section className="px-6 pb-8 pt-10 sm:pt-16 text-center">
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">About HabitForge</p>
              <h1 className="font-display mx-auto max-w-[22rem] text-4xl leading-[1.08] tracking-tight text-white sm:max-w-4xl sm:text-6xl md:text-7xl">
                <span className="block">Built for people</span>
                <span className="block">who want to become</span>
                <span className="block">someone stronger.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[19rem] text-lg leading-relaxed text-white/78 sm:max-w-2xl">
                HabitForge was created to make personal growth feel structured, meaningful, and sustainable instead of chaotic or performative.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-6 py-28 text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        >
          <source src="/videos/dna_helix_warm.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-3xl rounded-[2.5rem] border border-white/8 bg-[rgba(20,17,13,0.46)] p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-12">
          <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">The origin</p>
          <h2 className="font-display text-center text-4xl leading-[1.08] tracking-tight text-white sm:text-6xl">
            It started with a dream.
          </h2>
          <div className="mt-12 space-y-7 text-lg leading-[1.9] text-white/78">
            <p>In college, the founder kept having the same dream.</p>
            <p>
              He would zoom in. Deep into something invisible, something cellular. Until he was looking at a helix.
              Spiraling strands, glowing faintly. And woven between them, like puzzle pieces, were memories,
              moments, and earlier versions of himself.
            </p>
            <p>Years later, building HabitForge, it clicked.</p>
            <p>
              Your DNA doesn&apos;t just carry biology. It carries story. Every habit you&apos;ve built or broken, every
              choice that moved you forward or held you back — none of it is wasted.
            </p>
            <p>
              HabitForge was built to give that process a home. A calm place to see the full picture as it comes together.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f2cc8f]">The framework</p>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">Four strands of the helix.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/68">
              HabitForge tracks four dimensions of growth because real life doesn&apos;t happen in one category.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.label} className="scroll-animate relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/5 p-8">
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7rem] font-semibold text-white/6">
                  {pillar.letter}
                </span>
                <h3 className="relative z-10 text-xl font-medium text-white">{pillar.label}</h3>
                <p className="relative z-10 mt-3 max-w-sm text-sm leading-7 text-white/68">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f2cc8f]">The metaphor</p>
          <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">Every piece matters.</h2>
          <blockquote className="font-display mx-auto mt-10 max-w-3xl text-2xl leading-[1.7] text-white/72 italic">
            “Habits are the quiet architecture of a life. They write the lines of our character, shape how we show up for others, and slowly assemble the person we become.”
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.9] text-white/68">
            Some pieces fit perfectly. Some you&apos;re still figuring out. HabitForge gives you the space to see the full
            picture as it comes together.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm md:grid-cols-[220px_1fr] md:items-center md:p-12">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="HabitForge logo"
              width={176}
              height={176}
              className="rounded-[2rem] object-cover shadow-[0_22px_60px_rgba(23,23,23,0.16)]"
            />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f2cc8f]">The mark</p>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white">The logo is the thesis.</h2>
            <p className="mt-5 text-lg leading-[1.9] text-white/68">
              The HabitForge mark points back to the whole system: habits are your code. The visual language is warm,
              forged, and calm because the product is meant to feel steady — not loud.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/8 bg-white/5 p-8 shadow-[0_22px_60px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f2cc8f]">What&apos;s inside</p>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl">Everything you need.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/68">
              Designed to disappear. Powerful enough to matter.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature} className="rounded-[2rem] border border-white/8 bg-white/5 p-7 shadow-[0_18px_50px_rgba(7,12,20,0.12)]">
                <h3 className="text-lg font-medium text-white">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">See how the product works.</h2>
          <p className="mt-5 text-base leading-relaxed text-white/68">
            The next page walks through the real app screens and the core systems behind HabitForge.
          </p>
          <Link
            href="/download"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-base font-semibold text-[#171717] transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Start Forging
          </Link>
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
