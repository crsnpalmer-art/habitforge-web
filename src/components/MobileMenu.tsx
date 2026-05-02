"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface MobileMenuProps {
  links: NavLink[];
  activeHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
  variant?: "light" | "dark";
}

export default function MobileMenu({
  links,
  activeHref,
  ctaHref = "/download",
  ctaLabel = "Start Forging",
  ctaExternal = false,
  variant = "light",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="sm:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg focus:outline-none"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-300 origin-center ${
            open ? "translate-y-[7px] rotate-45" : ""
          } ${isDark ? "bg-white" : "bg-stone-700"}`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${
            open ? "scale-x-0 opacity-0" : ""
          } ${isDark ? "bg-white" : "bg-stone-700"}`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-300 origin-center ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          } ${isDark ? "bg-white" : "bg-stone-700"}`}
        />
      </button>

      <div
        className={`sm:hidden absolute left-0 right-0 top-full z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
        style={{
          background: isDark ? "rgba(10, 18, 28, 0.92)" : "rgba(255, 252, 248, 0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: open ? (isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)") : "none",
        }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-6 py-5">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            const commonClass = `text-[15px] font-semibold py-3 px-1 last:border-0 transition-colors ${
              isDark
                ? `border-b border-white/10 ${isActive ? "text-white" : "text-white/65 hover:text-white"}`
                : `border-b border-stone-200/60 ${isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900"}`
            }`;

            return link.isExternal ? (
              <a key={link.label} href={link.href} className={commonClass} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={commonClass} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            );
          })}

          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-stone-900 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-stone-800"
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-stone-900 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-stone-800"
            >
              {ctaLabel}
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
