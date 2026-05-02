import Image from "next/image";
import Link from "next/link";
import { APP_STORE_LIVE, PRIMARY_CTA_LABEL_LONG, PRIMARY_CTA_URL } from "@/lib/config";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Download", href: "/download" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function SiteFooter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <footer className={`px-6 py-12 ${isDark ? "border-t border-white/10 bg-[#0b1520]" : "border-t border-black/8 bg-[#f5f0e8]"}`}>
      <div className={`mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] px-8 py-8 backdrop-blur-sm md:flex-row md:items-center md:justify-between ${isDark ? "border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(7,12,20,0.22)]" : "border border-black/8 bg-white/70 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"}`}>
        <div>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="HabitForge" width={52} height={52} className="rounded-xl object-cover shadow-[0_12px_30px_rgba(23,23,23,0.10)]" />
            <div>
              <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? "text-[#f2cc8f]" : "text-[#9a6a59]"}`}>HabitForge AI</p>
              <p className={`mt-1 max-w-md text-sm leading-7 ${isDark ? "text-white/68" : "text-[#5f5a54]"}`}>
                Warm, private, high-conviction habit building for the long game.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <div className={`flex flex-wrap gap-x-4 gap-y-2 text-sm md:justify-end ${isDark ? "text-white/66" : "text-[#5f5a54]"}`}>
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#171717]"}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {APP_STORE_LIVE ? (
            <a
              href={PRIMARY_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full bg-gray-900 px-6 py-3 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              {PRIMARY_CTA_LABEL_LONG}
            </a>
          ) : (
            <Link
              href={PRIMARY_CTA_URL}
              className="cursor-pointer rounded-full bg-gray-900 px-6 py-3 text-sm text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              {PRIMARY_CTA_LABEL_LONG}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
