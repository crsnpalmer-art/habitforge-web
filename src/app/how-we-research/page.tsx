import Link from "next/link";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Research — HabitForge",
  description:
    "Our editorial standards, source hierarchy, and commitment to accuracy on health, supplements, and habit science.",
};

const principles = [
  {
    icon: "◈",
    title: "Primary Sources First",
    body: "We cite peer-reviewed studies, systematic reviews, and meta-analyses wherever possible. We link directly to PubMed, journals, or preprint servers so you can read the evidence yourself.",
  },
  {
    icon: "◎",
    title: "Honest Uncertainty",
    body: "If the evidence is mixed, preliminary, or limited to animal studies, we say so. We do not extrapolate beyond what the data supports.",
  },
  {
    icon: "⬡",
    title: "No Financial Conflicts",
    body: "HabitForge does not accept sponsored content or payments from supplement companies in exchange for favorable coverage. When we mention a product, it is because the evidence merited the mention — not a check.",
  },
  {
    icon: "◻",
    title: "Regular Updates",
    body: "Health science evolves. We revisit articles when meaningful new research emerges and note the update date so you know when the content was last reviewed.",
  },
  {
    icon: "◑",
    title: "Expert Review",
    body: "Complex topics — particularly pharmacology, clinical interventions, and advanced protocols — are reviewed against established clinical guidelines and authoritative secondary sources before publication.",
  },
  {
    icon: "◯",
    title: "You Are Not a Study Average",
    body: "Research produces population-level insights. We always recommend working with a qualified healthcare professional to apply any protocol to your individual context.",
  },
];

const sourceHierarchy = [
  { tier: "Tier 1", label: "Systematic reviews & meta-analyses", color: "text-violet-700 bg-violet-50 border-violet-200" },
  { tier: "Tier 2", label: "Randomized controlled trials (RCTs)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { tier: "Tier 3", label: "Prospective cohort studies", color: "text-cyan-700 bg-cyan-50 border-cyan-200" },
  { tier: "Tier 4", label: "Case-control studies & mechanistic data", color: "text-amber-700 bg-amber-50 border-amber-200" },
  { tier: "Tier 5", label: "Expert consensus & clinical guidelines", color: "text-stone-700 bg-stone-100 border-stone-200" },
];

export default function HowWeResearch() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
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
          <Link href="/#waitlist" className="hidden sm:inline-flex rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-3">Editorial Standards</p>
          <h1
            className="text-5xl font-black text-stone-900 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How We Research
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed">
            Every article on HabitForge is written with a commitment to accuracy, transparency, and intellectual honesty. Here's exactly how we approach it.
          </p>
        </div>

        {/* Principles */}
        <div className="grid gap-5 mb-16">
          {principles.map((p) => (
            <div key={p.title} className="rounded-2xl border border-stone-200 bg-white p-6 flex gap-5">
              <span className="text-2xl text-stone-300 flex-shrink-0 mt-0.5">{p.icon}</span>
              <div>
                <h2 className="font-bold text-stone-800 mb-1.5">{p.title}</h2>
                <p className="text-sm text-stone-500 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Source hierarchy */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-stone-800 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Source Hierarchy
          </h2>
          <p className="text-stone-500 mb-6 text-sm leading-relaxed">
            Not all evidence is equal. We weight sources based on study design and the risk of bias:
          </p>
          <div className="space-y-2">
            {sourceHierarchy.map((s, i) => (
              <div
                key={s.tier}
                className={`flex items-center gap-4 rounded-xl border px-5 py-3.5 ${s.color}`}
              >
                <span className="text-xs font-bold w-12 flex-shrink-0">{i + 1}.</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider">{s.tier}</span>
                  <p className="text-sm">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-stone-400 mb-2">Disclaimer</p>
          <p className="text-sm text-stone-500 leading-relaxed">
            The content on HabitForge is for informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any supplement, peptide, or health protocol — especially if you have a pre-existing condition or take prescription medications.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">
            ← Back to the blog
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
