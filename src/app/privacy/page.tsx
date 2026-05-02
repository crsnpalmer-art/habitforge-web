import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Privacy Policy — HabitForge",
  description: "HabitForge privacy policy. Your data stays on your device.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#171717]">
      <section className="relative overflow-hidden text-center text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.40)_0%,rgba(10,18,28,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,204,143,0.16),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(217,124,95,0.22),transparent_28%)]" />

        <div className="relative z-10 pb-10">
          <SiteNav activeHref="/privacy" variant="dark" />
          <div className="px-6 pb-6 pt-10 sm:pt-16">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Legal</p>
            <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-white/62">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[2rem] border border-black/8 bg-white/80 p-8 shadow-[0_18px_50px_rgba(23,23,23,0.05)] sm:p-10">
          <div className="prose prose-stone max-w-none prose-headings:font-medium prose-headings:text-[#171717] prose-p:text-[#5f5a54] prose-p:leading-8 prose-a:text-[#b9654c]">
            <h2>Overview</h2>
            <p>
              HabitForge is built on a simple principle: your personal data belongs to you. We designed the app so your habits,
              routines, and behavior data remain on your device.
            </p>

            <h2>Data We Collect</h2>
            <h3>Website and launch interest</h3>
            <p>
              If you contact us or join a launch list in the future, we may collect your email address to send product updates.
              We do not sell or rent your data.
            </p>

            <h3>App data</h3>
            <p>
              HabitForge is designed around local-first ownership. Your routines, check-ins, reflections, and progress history stay tied to your device experience.
            </p>

            <h2>Third-Party Tracking</h2>
            <p>HabitForge does not use ad networks or behavioral profiling tools.</p>

            <h2>Website Analytics</h2>
            <p>
              The site may collect basic aggregate hosting analytics through infrastructure providers. This is not used to build personal advertising profiles.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>HabitForge is not directed to children under 13.</p>

            <h2>Changes</h2>
            <p>We may update this policy as the product evolves. Material changes will be reflected on this page.</p>

            <h2>Contact</h2>
            <p>
              Questions? Reach us at <a href="mailto:crsnpalmer@gmail.com">crsnpalmer@gmail.com</a>.
            </p>
          </div>
        </div>
      </article>

      <SiteFooter variant="dark" />
    </main>
  );
}
