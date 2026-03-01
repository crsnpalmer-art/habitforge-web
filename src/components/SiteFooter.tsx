import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
        <span>© 2026 HabitForge</span>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
          <span className="text-stone-300">·</span>
          <Link href="/blog" className="hover:text-stone-900 transition-colors">Blog</Link>
          <span className="text-stone-300">·</span>
          <Link href="/tools" className="hover:text-stone-900 transition-colors">Tools</Link>
          <span className="text-stone-300">·</span>
          <Link href="/how-it-works" className="hover:text-stone-900 transition-colors">How It Works</Link>
          <span className="text-stone-300">·</span>
          <Link href="/how-we-research" className="hover:text-stone-900 transition-colors">How We Research</Link>
          <span className="text-stone-300">·</span>
          <Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy</Link>
          <span className="text-stone-300">·</span>
          <Link href="/terms" className="hover:text-stone-900 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
