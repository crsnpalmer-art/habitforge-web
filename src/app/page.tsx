import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import BrandMark from "@/components/BrandMark";
import { APP_STORE_LIVE, APP_STORE_URL, WAITLIST_COUNT } from "@/lib/config";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Download", href: "/download" },
];

const avatarSeeds = [
  { label: "AL", bg: "from-[#f3d3c2] to-[#d97c5f]" },
  { label: "MK", bg: "from-[#f2cc8f] to-[#c16f53]" },
  { label: "JR", bg: "from-[#d6c4b6] to-[#9f6d59]" },
  { label: "SP", bg: "from-[#efd7c9] to-[#b9654c]" },
  { label: "TN", bg: "from-[#f7e8d4] to-[#d48662]" },
];

const stats = [
  { value: "1 daily check-in", label: "A clear moment to keep the day on track" },
  { value: "4 life areas", label: "Mental, Physical, Spiritual, and Financial" },
  { value: "Weekly reflection", label: "See patterns without pressure mechanics" },
  { value: "Ember AI", label: "Reflection and accountability from your real data" },
];

const highlights = [
  {
    title: "Know exactly what to do each day",
    body: "Set the habits that matter, check in once, and stop relying on memory or motivation to hold your life together.",
  },
  {
    title: "Notice what keeps getting in the way",
    body: "Reflection, habit detail, and weekly patterns make weak spots visible before one rough week turns into a lost month.",
  },
  {
    title: "Recover fast instead of starting over",
    body: "HabitForge is built for real life. Misses happen. The point is to regain rhythm quickly without the usual shame spiral.",
  },
];

export default function Home() {
  const primaryHref = APP_STORE_LIVE ? APP_STORE_URL : "#next-step";
  const primaryLabel = APP_STORE_LIVE ? "Download on the App Store" : "See the system";
  const socialProof = WAITLIST_COUNT
    ? `Join ${WAITLIST_COUNT.toLocaleString()}+ people building better habits with HabitForge.`
    : "Four areas of life. One daily system.";

  return (
    <main className="min-h-screen overflow-hidden bg-[#14110d] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,13,0.28)_0%,rgba(20,17,13,0.66)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(242,204,143,0.18)_0%,transparent_34%),linear-gradient(245deg,rgba(91,117,89,0.24)_0%,transparent_38%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <nav className="mx-auto w-full rounded-[1.75rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:rounded-full sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <BrandMark dark size={42} />

              <div className="hidden items-center gap-8 text-sm text-gray-200/85 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={link.active ? "text-white" : "text-gray-200/75 transition-colors hover:text-white"}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href={primaryHref}
                target={APP_STORE_LIVE ? "_blank" : undefined}
                rel={APP_STORE_LIVE ? "noopener noreferrer" : undefined}
                className="cursor-pointer rounded-full bg-gray-900 px-4 py-2.5 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-6"
              >
                  {APP_STORE_LIVE ? "Download" : "Preview"}
              </a>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-xs text-white/80 md:hidden">
              {navLinks.filter((link) => link.href !== "/").map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="shrink-0 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 transition-colors hover:bg-white/15"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-1 items-center justify-center py-12 text-center sm:py-16 md:pt-28 md:pb-36">
            <div className="w-full max-w-5xl">
              <div className="animate-fade-rise mx-auto mb-6 inline-flex max-w-[95vw] items-center rounded-full border border-white/15 bg-white/20 px-3 py-2 backdrop-blur-sm sm:mb-8 sm:px-4">
                <div className="-space-x-2.5 mr-3 hidden sm:flex">
                  {avatarSeeds.map((avatar) => (
                    <span
                      key={avatar.label}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br ${avatar.bg} text-[10px] font-semibold text-white shadow-sm`}
                    >
                      {avatar.label}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-white/90">{socialProof}</span>
              </div>

              <h1 className="animate-fade-rise mx-auto max-w-[22rem] text-[2.35rem] font-bold leading-[1.05] tracking-0 text-white sm:max-w-5xl sm:text-6xl sm:leading-[0.98] sm:tracking-[-1px] md:text-[4.9rem]">
                <span className="block">Build habits</span>
                <span className="block">that survive</span>
                <span className="block">real life.</span>
              </h1>

              <p className="animate-fade-rise-delay mx-auto mt-5 max-w-[19rem] text-[15px] leading-relaxed text-white/82 sm:mt-6 sm:max-w-3xl sm:text-lg">
                HabitForge is a calm daily system for people who want structure without pressure mechanics: daily check-ins, private AI reflection, and practical direction across mind, body, spirit, and money.
              </p>

              <p className="animate-fade-rise-delay mx-auto mt-3 max-w-[19rem] text-sm leading-relaxed text-white/66 sm:max-w-2xl sm:text-[15px]">
                Built for the days when motivation is low, life is messy, and you still want to keep moving.
              </p>

              <div className="animate-fade-rise-delay-2 mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:gap-4">
                <a
                  href={primaryHref}
                  target={APP_STORE_LIVE ? "_blank" : undefined}
                  rel={APP_STORE_LIVE ? "noopener noreferrer" : undefined}
                  className="cursor-pointer rounded-full bg-gray-900 px-10 py-4 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-12"
                >
                  {primaryLabel}
                </a>
                <Link href="/how-it-works" className="text-sm text-white/72 transition-colors hover:text-white">
                  See how HabitForge works
                </Link>
              </div>

              <div className="mx-auto mt-8 flex max-w-[19rem] flex-col items-stretch justify-center gap-3 text-sm text-white/74 sm:max-w-3xl sm:flex-row sm:flex-wrap sm:items-center">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">Daily check-ins that take minutes</span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">Four areas of life in one system</span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-center">AI reflection tied to your real habit data</span>
              </div>

              <div className="mt-10 md:hidden">
                <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
                  <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="text-2xl font-light tracking-tight text-white sm:text-3xl">{stat.value}</div>
                        <div className="text-xs leading-5 text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-10 hidden max-w-4xl md:block">
                <div className="rounded-[1.75rem] border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-sm">
                  <div className="grid grid-cols-4 gap-5 text-center">
                    {stats.map((stat) => (
                      <div key={stat.label} className="space-y-1.5">
                        <div className="whitespace-nowrap text-xl font-light leading-tight tracking-tight text-white lg:text-2xl">{stat.value}</div>
                        <div className="text-xs leading-5 text-white/70 lg:text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-20 text-[#171717] sm:py-24" id="next-step">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#9a6a59]">What you actually do in HabitForge</p>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-[#171717] sm:text-5xl">
                Less tracking for its own sake. More rhythm you can actually keep.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5f5a54]">
              HabitForge helps you decide what matters, keep the daily reps visible, and recover quickly when life punches a hole in your routine.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.06)] backdrop-blur-sm sm:p-7"
              >
                <h3 className="text-xl font-medium text-[#171717]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#5f5a54]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] bg-[#171717] px-6 py-8 text-white sm:px-8 sm:py-10">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Why this feels different</p>
              <h3 className="mt-2 text-3xl font-medium">Most habit apps track behavior. This one protects follow-through.</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                HabitForge is designed for consistency under normal stress, low motivation, and imperfect weeks — not just your best Monday of the month.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.06)] backdrop-blur-sm sm:p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[#9a6a59]">Week 1</p>
              <h3 className="mt-2 text-2xl font-medium text-[#171717]">What a new user should expect</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#5f5a54]">
                <li>• Pick a few habits that actually matter</li>
                <li>• Check in daily instead of rebuilding the plan every day</li>
                <li>• Notice the pattern, adjust, and keep going</li>
              </ul>
              <Link
                href="/how-it-works"
                className="mt-6 inline-flex cursor-pointer rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                Walk through the product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-6 py-16 text-[#171717] sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-black/8 bg-white/75 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.06)] backdrop-blur-sm sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#9a6a59]">Build notes</p>
            <h2 className="font-display text-3xl leading-[1.08] tracking-tight text-[#171717] sm:text-4xl">
              HabitForge is also a product idea being shaped in public.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f5a54]">
              The app stays focused on the user experience here. The larger workbench keeps the product thinking nearby:
              what problem HabitForge is trying to solve, why pressure mechanics were removed, and how a personal system
              becomes a calmer product.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-[#171717] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">From the ACP workbench</p>
            <p className="mt-3 text-lg leading-8 text-white/78">
              Useful products should leave a trail: the problem, the tradeoffs, the screen decisions, and the parts worth copying.
            </p>
            <a
              href="https://acpdesigns.studio/#project-habitforge"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Read the build note
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
