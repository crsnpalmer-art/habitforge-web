import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import { APP_STORE_LIVE, APP_STORE_URL, SITE_URL, SITE_NAME } from "@/lib/config";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Download HabitForge — iOS App",
  description: "Download HabitForge on the App Store. Track your Mental, Physical, Spiritual, and Financial habits in one place.",
  openGraph: {
    title: "Download HabitForge",
    description: "Track your Mental, Physical, Spiritual, and Financial habits. Available on iOS.",
    url: `${SITE_URL}/download`,
    siteName: SITE_NAME,
  },
};

export default function DownloadPage() {
  // If App Store isn't live yet, redirect to waitlist
  if (!APP_STORE_LIVE) {
    redirect("/#waitlist");
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-stone-900">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.92)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            ← Back
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-6">
          Now Available on iOS
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Forge the person<br />you&apos;re becoming.
        </h1>
        <p className="text-[18px] text-stone-500 leading-relaxed max-w-xl mx-auto mb-10">
          Track your Mental, Physical, Spiritual, and Financial habits in one place. See the system running underneath.
        </p>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-[15px] font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on the App Store
        </a>

        <p className="mt-4 text-[13px] text-stone-400">iOS 17+ · Free to download</p>

        {/* Screenshots */}
        <div className="mt-20 flex items-end justify-center gap-6">
          <div
            className="rounded-[36px] overflow-hidden flex-shrink-0"
            style={{
              width: "min(180px, 42vw)",
              boxShadow: "0 0 0 8px #1a1a1a, 0 0 0 9px #333, 0 30px 60px rgba(0,0,0,0.2)",
              transform: "rotate(-3deg) translateY(16px)",
            }}
          >
            <Image
              src="/screenshots/01-auth.png"
              alt="Sign in to HabitForge"
              width={1170}
              height={2532}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 42vw, 180px"
              loading="lazy"
            />
          </div>
          <div
            className="rounded-[44px] overflow-hidden flex-shrink-0 z-10"
            style={{
              width: "min(240px, 58vw)",
              boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 11px #444, 0 50px 100px rgba(0,0,0,0.28)",
            }}
          >
            <Image
              src="/screenshots/03-dashboard.png"
              alt="HabitForge dashboard"
              width={1170}
              height={2532}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 58vw, 240px"
              priority
            />
          </div>
          <div
            className="rounded-[36px] overflow-hidden flex-shrink-0"
            style={{
              width: "min(180px, 42vw)",
              boxShadow: "0 0 0 8px #1a1a1a, 0 0 0 9px #333, 0 30px 60px rgba(0,0,0,0.2)",
              transform: "rotate(3deg) translateY(16px)",
            }}
          >
            <Image
              src="/screenshots/04-progress.png"
              alt="HabitForge progress analytics"
              width={1170}
              height={2532}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 42vw, 180px"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features quick list */}
      <section className="bg-white border-t border-stone-100 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8">
            What&apos;s Inside
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: "🧠", label: "Mental" },
              { icon: "💪", label: "Physical" },
              { icon: "✨", label: "Spiritual" },
              { icon: "💰", label: "Financial" },
            ].map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{d.icon}</span>
                <span className="text-[13px] font-semibold text-stone-700">{d.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[14px] text-stone-500 leading-relaxed max-w-lg mx-auto">
            One Forge Score. Four dimensions. Group accountability. Streak tracking. All your data stays on your device.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
