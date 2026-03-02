import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Privacy Policy — HabitForge",
  description: "HabitForge privacy policy. Your data stays on your device.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      <nav
        className="sticky top-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.92)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm text-stone-500 font-medium">
            <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-stone-800 transition-colors">How It Works</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
          </div>
          <Link href="/" className="text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors">
            ← Home
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-16">
        <h1
          className="text-4xl md:text-5xl font-black text-stone-800 mb-3 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-bold prose-headings:text-stone-800 prose-p:text-stone-600 prose-p:leading-relaxed">

          <h2>Overview</h2>
          <p>
            HabitForge is built on a simple principle: your personal data belongs to you. We have designed
            the app so that your habits, routines, and behavior data remain on your device and are never
            uploaded to our servers.
          </p>

          <h2>Data We Collect</h2>
          <h3>Waitlist email</h3>
          <p>
            When you join the HabitForge waitlist at habitforgeai.com, we collect your email address. This
            is used exclusively to notify you when the app launches and to send occasional product updates.
            We will never sell, rent, or share your email with third parties. You can unsubscribe at any
            time by clicking the link in any email we send.
          </p>

          <h3>App data (on-device only)</h3>
          <p>
            HabitForge requires an account to use the app. However, all habit tracking data — including
            your routines, check-in history, streaks, and Forge Score — is stored locally on your iPhone.
            HabitForge does not upload this data to any external server. We have no access to it.
          </p>

          <h2>Third-Party Tracking</h2>
          <p>
            HabitForge does not use third-party analytics, advertising SDKs, or tracking tools. There are
            no ad networks, no behavioral profiling, and no data brokers involved.
          </p>

          <h2>Website Analytics</h2>
          <p>
            Our website (habitforgeai.com) may collect basic, anonymized server-side metrics such as page
            views and geographic region via Vercel&rsquo;s infrastructure. This data is aggregate and not
            linked to any individual.
          </p>

          <h2>System Requirements</h2>
          <p>
            HabitForge requires iOS 26 or later. We do not collect any device identifiers.
          </p>

          <h2>Data Retention</h2>
          <p>
            Waitlist email addresses are retained until the app launches and you receive your notification,
            or until you unsubscribe — whichever comes first. App data exists solely on your device and is
            subject to iOS data management (backups, restores) as configured by you.
          </p>

          <h2>Children&rsquo;s Privacy</h2>
          <p>
            HabitForge is not directed to children under 13. We do not knowingly collect personal
            information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy as the app evolves. Material changes will be communicated via email
            to waitlist subscribers and posted to this page with an updated date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions or concerns? Reach us at{" "}
            <a href="mailto:crsnpalmer@gmail.com" className="text-stone-700 underline underline-offset-2">
              crsnpalmer@gmail.com
            </a>
            .
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
