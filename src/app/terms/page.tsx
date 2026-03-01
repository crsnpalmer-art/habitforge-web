import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Terms of Use — HabitForge",
  description: "HabitForge terms of use.",
};

export default function TermsPage() {
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
          Terms of Use
        </h1>
        <p className="text-stone-400 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-bold prose-headings:text-stone-800 prose-p:text-stone-600 prose-p:leading-relaxed">

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing habitforgeai.com or using the HabitForge app, you agree to these Terms of Use.
            If you do not agree, please do not use our services.
          </p>

          <h2>Use of the App</h2>
          <p>
            HabitForge is provided as a personal habit tracking tool. You are responsible for how you use
            the app and for any data you enter into it. You agree to use HabitForge only for lawful
            purposes and in accordance with these terms.
          </p>

          <h2>No Medical Advice</h2>
          <p>
            <strong>HabitForge is not a medical product and does not provide medical advice.</strong> Content
            published on habitforgeai.com — including blog articles about supplements, peptides, health
            protocols, or wellness practices — is for informational and educational purposes only. Nothing
            on this site or in the app constitutes professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always consult a qualified healthcare professional before beginning any supplement regimen,
            peptide protocol, or significant change to your health routine. Do not disregard professional
            medical advice or delay seeking it because of content you read here.
          </p>

          <h2>Your Data</h2>
          <p>
            All habit and personal data you create within the HabitForge app is stored on your device.
            You are solely responsible for maintaining backups of your data. HabitForge is not liable for
            any loss of data resulting from device failure, app deletion, or iOS updates.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on habitforgeai.com — including text, design, graphics, and the HabitForge
            name and logo — is the property of HabitForge and may not be reproduced without permission.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            HabitForge is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express
            or implied, including but not limited to fitness for a particular purpose, accuracy, or
            reliability. We do not guarantee that the app or website will be error-free or uninterrupted.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, HabitForge shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of — or inability to use —
            the app or website.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the app or website following
            any changes constitutes acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
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
