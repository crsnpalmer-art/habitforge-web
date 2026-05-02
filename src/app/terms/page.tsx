import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Terms of Use — HabitForge",
  description: "HabitForge terms of use.",
};

export default function TermsPage() {
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
          <SiteNav activeHref="/terms" variant="dark" />
          <div className="px-6 pb-6 pt-10 sm:pt-16">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Legal</p>
            <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">Terms of Use</h1>
            <p className="mt-3 text-sm text-white/62">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[2rem] border border-black/8 bg-white/80 p-8 shadow-[0_18px_50px_rgba(23,23,23,0.05)] sm:p-10">
          <div className="prose prose-stone max-w-none prose-headings:font-medium prose-headings:text-[#171717] prose-p:text-[#5f5a54] prose-p:leading-8 prose-a:text-[#b9654c] prose-strong:text-[#171717]">
            <h2>Acceptance of Terms</h2>
            <p>By accessing habitforgeai.com or using HabitForge, you agree to these terms.</p>

            <h2>Use of the Product</h2>
            <p>
              HabitForge is provided as a personal habit tracking tool. You are responsible for how you use the product and the information you enter into it.
            </p>

            <h2>No Medical Advice</h2>
            <p>
              <strong>HabitForge is not a medical product and does not provide medical advice.</strong> Content on the site and inside the app is informational only.
            </p>

            <h2>Your Data</h2>
            <p>
              Habit data is intended to remain under your control. You are responsible for your backups and device-level security.
            </p>

            <h2>Intellectual Property</h2>
            <p>Site content, design, graphics, and the HabitForge name and mark may not be reproduced without permission.</p>

            <h2>Disclaimer of Warranties</h2>
            <p>HabitForge is provided “as is” and “as available” without warranties of any kind.</p>

            <h2>Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, HabitForge is not liable for indirect or consequential damages arising from use of the site or app.</p>

            <h2>Changes</h2>
            <p>We may update these terms from time to time. Continued use means you accept the updated version.</p>

            <h2>Contact</h2>
            <p>
              Questions? Contact <a href="mailto:crsnpalmer@gmail.com">crsnpalmer@gmail.com</a>.
            </p>
          </div>
        </div>
      </article>

      <SiteFooter variant="dark" />
    </main>
  );
}
