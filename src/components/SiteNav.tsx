import Link from "next/link";
import { APP_STORE_LIVE, PRIMARY_CTA_LABEL, PRIMARY_CTA_URL } from "@/lib/config";
import MobileMenu from "@/components/MobileMenu";
import BrandMark from "@/components/BrandMark";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Download", href: "/download" },
];

export default function SiteNav({ activeHref = "/", variant = "light" }: { activeHref?: string; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <nav className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 backdrop-blur-md sm:px-6 ${
          isDark
            ? "rounded-[1.75rem] border border-white/10 bg-white/10 shadow-[0_12px_40px_rgba(7,12,20,0.16)] sm:rounded-full"
            : "rounded-full border border-black/8 bg-white/70 shadow-[0_12px_40px_rgba(23,23,23,0.06)]"
        }`}
      >
        <BrandMark size={42} dark={isDark} />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isDark
                    ? isActive
                      ? "text-sm text-white"
                      : "text-sm text-white/72 transition-colors hover:text-white"
                    : isActive
                      ? "text-sm text-[#171717]"
                      : "text-sm text-gray-600 transition-colors hover:text-gray-900"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <a
            href={PRIMARY_CTA_URL}
            target={APP_STORE_LIVE ? "_blank" : undefined}
            rel={APP_STORE_LIVE ? "noopener noreferrer" : undefined}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03] active:scale-[0.97] ${
              isDark ? "bg-gray-900 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {PRIMARY_CTA_LABEL}
          </a>
        </div>

        <div className="md:hidden">
          <MobileMenu
            links={NAV_LINKS}
            activeHref={activeHref}
            ctaHref={PRIMARY_CTA_URL}
            ctaLabel={PRIMARY_CTA_LABEL}
            ctaExternal={APP_STORE_LIVE}
            variant={variant}
          />
        </div>
      </div>
    </nav>
  );
}
