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
}

export default function MobileMenu({ links, activeHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — only visible on mobile (below sm) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg focus:outline-none"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className={`block w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Dropdown overlay */}
      <div
        className={`sm:hidden absolute left-0 right-0 top-full z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(245, 240, 232, 0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: open ? "1px solid rgba(0,0,0,0.08)" : "none",
        }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col px-6 py-5 gap-1">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            const commonClass = `text-[15px] font-semibold py-3 px-1 border-b border-stone-200/60 last:border-0 transition-colors ${
              isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900"
            }`;
            return link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                className={commonClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={commonClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          {/* CTA */}
          <a
            href="/#waitlist"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-xl px-4 py-3 text-center text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors"
          >
            Join Waitlist
          </a>
        </nav>
      </div>
    </>
  );
}
