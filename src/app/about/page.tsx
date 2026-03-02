import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import SiteFooter from "@/components/SiteFooter";
import ScrollAnimator from "@/components/ScrollAnimator";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

export const metadata = {
  title: "About — HabitForge",
  description:
    "The story behind HabitForge — why habits are your DNA, and how a recurring dream became a mission to help people build intentionally.",
};

export default function AboutPage() {
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
            <Link href="/about" className="text-stone-800 font-semibold transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-stone-800 transition-colors">How It Works</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
          </div>
          <Link
            href="/#waitlist"
            className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#1c1917" }}
          >
            Join Waitlist
          </Link>
          <MobileMenu links={NAV_LINKS} activeHref="/about" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center pt-28 pb-20">
        <span className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-6">
          Our Story
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-800 tracking-tight leading-[1.0] mb-8 max-w-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Built on a Simple Belief
        </h1>
        <p className="text-lg md:text-xl text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
          Anvil-forged habits, one day at a time.{" "}
          <span className="text-stone-700 font-medium">HabitForge exists to help you build intentionally.</span>
        </p>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section
        className="relative px-6 py-32 overflow-hidden"
        style={{ background: "#1c1917" }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          style={{ mixBlendMode: "luminosity" }}
        >
          <source src="/dna-helix.mp4" type="video/mp4" />
        </video>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-stone-500 uppercase mb-12 text-center">
            The Origin
          </p>

          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-16 text-center text-stone-100"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            It Started With a Dream
          </h2>

          <div className="space-y-8 text-stone-300 leading-[1.85]">
            <p className="text-lg md:text-xl font-light">
              In college, the founder kept having the same dream.
            </p>

            <p className="text-lg md:text-xl font-light">
              He would zoom in. Deep into something invisible, something cellular. Until he was looking at a
              helix. Spiraling strands, glowing faintly. And woven between them, like fragments of something
              larger:{" "}
              <span className="text-stone-100 font-medium italic">puzzle pieces</span>. Each one a memory. A
              moment. A version of himself he had been.
            </p>

            <p className="text-lg md:text-xl font-light">
              He woke up not knowing what it meant.
            </p>

            <div className="flex items-center gap-4 py-6">
              <div className="h-px flex-1 bg-stone-800" />
              <span className="text-stone-700 text-sm">&#10022;</span>
              <div className="h-px flex-1 bg-stone-800" />
            </div>

            <p className="text-lg md:text-xl font-light">
              Years later, building HabitForge, he did.
            </p>

            <p className="text-lg md:text-xl font-light">
              Your DNA doesn&apos;t just carry your biology. It carries your story. Every experience that shaped
              you, every habit you&apos;ve built or broken, every choice that moved you forward or held you back —
              they&apos;re pieces. Some fit perfectly. Some you&apos;re still finding the place for. None of them are wasted.
            </p>

            <p className="text-lg md:text-xl font-light mt-8">
              HabitForge was built to give that process a home — to help you see the full picture as it comes together.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FRAMEWORK ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase">
              The Framework
            </span>
          </div>
          <div className="text-center mb-6">
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Four Strands of the Helix
            </h2>
          </div>
          <p className="text-base text-stone-500 max-w-xl mx-auto text-center leading-relaxed mb-16">
            Like the four bases that encode all of life, HabitForge tracks four dimensions of growth.
            Each one matters. Each one influences the others.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Mental",
                letter: "M",
                desc: "Sharpen focus, build discipline, and cultivate the mindset that compounds over time. Read more, think deeper, react slower.",
              },
              {
                label: "Physical",
                letter: "P",
                desc: "Move daily. Build a body that performs as well as it looks. Energy is the foundation everything else is built on.",
              },
              {
                label: "Spiritual",
                letter: "S",
                desc: "Ground yourself in purpose. Daily practices that connect you to something greater than productivity — meaning, presence, peace.",
              },
              {
                label: "Financial",
                letter: "F",
                desc: "Build the habits that build wealth — spending, saving, investing with intention. Small decisions, long arcs.",
              },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="scroll-animate relative flex items-start gap-6 rounded-2xl p-8 bg-white border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 overflow-hidden"
              >
                <span
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[8rem] font-black text-stone-100 leading-none select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pillar.letter}
                </span>
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-stone-800 mb-2 tracking-tight">{pillar.label}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PUZZLE ── */}
      <section className="py-32 px-6 bg-[#F5F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-4 block">
            The Metaphor
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Every Piece Matters
          </h2>
          <blockquote
            className="text-xl md:text-2xl text-stone-700 leading-[1.7] max-w-2xl mx-auto italic mb-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;Somewhere between the hard days and the ordinary ones, a simple truth kept showing up: we are the sum of what we do repeatedly. Habits are the quiet architecture of a life. They write the lines of our character, shape how we show up for others, and slowly assemble the person we become.&rdquo;
          </blockquote>
          <p className="text-lg text-stone-600 leading-[1.85] max-w-2xl mx-auto">
            Every experience you&apos;ve had, every setback you&apos;ve overcome, every habit you&apos;ve built — these are
            pieces. Some fit perfectly. Some you&apos;re still figuring out where they go. But none of them are
            wasted.{" "}
            <span className="text-stone-800 font-medium">
              HabitForge gives you the space to see the full picture as it comes together.
            </span>
          </p>
        </div>
      </section>

      {/* ── LOGO STORY ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <div className="shrink-0">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src="/logo.jpg"
                alt="HabitForge Logo"
                className="w-44 h-44 rounded-3xl object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3 block">
              The Mark
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Logo
            </h2>
            <p className="text-lg text-stone-600 leading-[1.85]">
              The HabitForge mark is a DNA double helix — the strands forming the letters H and F. It's not decorative. It's the whole idea.
            </p>
            <p className="text-lg text-stone-600 leading-[1.85] mt-4">
              HabitForge is built around four dimensions of growth: Mental, Physical, Spiritual, and Financial. Track your habits across all four. Watch your streaks build. See your Forge Score rise. The app is designed to show you, in real time, what consistent effort looks like — across every area of life that matters.
            </p>
            <p className="text-lg text-stone-600 leading-[1.85] mt-4">
              The helix in the logo is that system made visible. Your habits are your code. The mark is a reminder that they're always running.
            </p>
          </div>
        </div>
      </section>

      {/* ── APP FEATURES ── */}
      <section className="py-32 px-6 bg-[#F5F0E8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase">
              What&apos;s Inside
            </span>
          </div>
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Everything You Need
            </h2>
            <p className="text-base text-stone-400 max-w-md mx-auto mt-4 leading-relaxed">
              Designed to disappear. Powerful enough to matter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Ember AI Coach",
                desc: "On-device AI coaching powered by Apple Intelligence. Ember analyzes your habits, streaks, and mood trends — privately, without sending data to any server.",
              },
              {
                title: "Forge Score",
                desc: "A daily performance score weighted by difficulty and consistency across all four dimensions. Earn more for harder habits. Watch it compound.",
              },
              {
                title: "Forge Shields",
                desc: "Earn one shield every 14-day streak. Use it to protect a streak after a missed day — your safety net for hard weeks.",
              },
              {
                title: "Habit Chains",
                desc: "Link habits into ordered daily routines. Morning ritual, evening wind-down — chain them together and track the whole sequence as one.",
              },
              {
                title: "Groups & Leaderboard",
                desc: "Join groups via code, compete on a live streak leaderboard, and let shared accountability do the heavy lifting.",
              },
              {
                title: "Local-First & Export",
                desc: "Your data stays on your device — never uploaded to a cloud server. Biometric lock with Face ID and Touch ID. Export as JSON anytime.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="scroll-animate rounded-2xl p-7 bg-white border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-sm font-semibold text-stone-800 mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center"
        style={{ background: "#1c1917" }}
      >
        <div className="max-w-xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-stone-100 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Begin.
          </h2>
          <p className="text-stone-400 mb-12 text-base leading-relaxed">
            Join the waitlist. Be there when HabitForge opens its doors.
          </p>
          <Link
            href="/#waitlist"
            className="inline-block px-8 py-4 rounded-xl bg-stone-100 text-stone-900 font-semibold text-base hover:bg-white active:scale-95 transition-all"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
