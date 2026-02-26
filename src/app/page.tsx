import Image from "next/image";

// Replace with your Formspree form ID from https://formspree.io
// Or remove form action and use mailto: below
const FORMSPREE_ID = "xqapogjv"; // placeholder — update with real ID

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(34,197,94,0.08) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="animate-float mb-8">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 60px rgba(34,197,94,0.25), 0 0 120px rgba(139,92,246,0.15)",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="HabitForge Logo"
              width={140}
              height={140}
              className="rounded-3xl"
              priority
            />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
          <span className="gradient-text">HabitForge</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-stone-600 font-light max-w-xl mb-10 leading-relaxed">
          Your habits are your DNA.{" "}
          <span className="text-stone-800 font-medium">
            Build them intentionally.
          </span>
        </p>

        {/* App Store CTA — non-clickable */}
        <button
          disabled
          aria-label="Coming Soon to the App Store"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg cursor-not-allowed select-none shadow-xl opacity-85"
          style={{
            background:
              "linear-gradient(135deg, #22c55e 0%, #06b6d4 50%, #8b5cf6 100%)",
          }}
        >
          {/* Apple icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Coming Soon to the App Store
        </button>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 opacity-40">
          <span className="text-xs text-stone-500 tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-stone-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── 4 PILLARS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Four Dimensions of Growth
            </h2>
            <p className="text-lg text-stone-500 max-w-xl mx-auto">
              HabitForge tracks every strand of who you&apos;re becoming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🧠",
                label: "Mental",
                gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                bg: "#f5f3ff",
                border: "#ede9fe",
                desc: "Sharpen focus, build discipline, and cultivate the mindset that compounds over time.",
              },
              {
                emoji: "💪",
                label: "Physical",
                gradient: "linear-gradient(135deg, #4ade80, #16a34a)",
                bg: "#f0fdf4",
                border: "#dcfce7",
                desc: "Move daily. Train smart. Build a body that performs as well as it looks.",
              },
              {
                emoji: "🙏",
                label: "Spiritual",
                gradient: "linear-gradient(135deg, #fbbf24, #ea580c)",
                bg: "#fffbeb",
                border: "#fef3c7",
                desc: "Ground yourself in purpose. Daily practices that connect you to something greater.",
              },
              {
                emoji: "💰",
                label: "Financial",
                gradient: "linear-gradient(135deg, #22d3ee, #2563eb)",
                bg: "#ecfeff",
                border: "#cffafe",
                desc: "Build the habits that build wealth — spending, saving, and investing with intention.",
              },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-3xl p-8 flex flex-col items-start gap-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: pillar.bg,
                  border: `1px solid ${pillar.border}`,
                }}
              >
                <div
                  className="text-4xl w-16 h-16 flex items-center justify-center rounded-2xl shadow-md"
                  style={{ background: pillar.gradient }}
                >
                  {pillar.emoji}
                </div>
                <h3 className="text-2xl font-bold text-stone-800">
                  {pillar.label}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(6,182,212,0.06), rgba(139,92,246,0.06))",
              border: "1px solid rgba(139,92,246,0.18)",
            }}
          >
            <h2 className="text-4xl font-bold text-stone-800 mb-3">
              Be First in Line
            </h2>
            <p className="text-stone-500 mb-8">
              Join the waitlist and get early access when HabitForge launches.
            </p>

            <form
              action={`https://formspree.io/f/${FORMSPREE_ID}`}
              method="POST"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-2xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              <button
                type="submit"
                className="px-7 py-4 rounded-2xl text-white font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #06b6d4 50%, #8b5cf6 100%)",
                }}
              >
                Get Early Access
              </button>
            </form>

            <p className="text-xs text-stone-400 mt-5">
              No spam. Just the launch date — and something special for early
              believers.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 border-t border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="HabitForge"
              width={28}
              height={28}
              className="rounded-lg opacity-80"
            />
            <span className="font-medium text-stone-600">HabitForge</span>
            <span className="text-stone-300">·</span>
            <a
              href="https://habitforgeai.com"
              className="hover:text-stone-600 transition-colors"
            >
              habitforgeai.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/HabitForgeAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @HabitForgeAI
            </a>
            <span>© {new Date().getFullYear()} HabitForge</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
