"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLElement[];

    // Ensure each heading has an id
    headings.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ?? Math.random().toString(36).slice(2);
      }
    });

    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: parseInt(h.tagName[1]),
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 3) return null;

  return (
    <>
      {/* Desktop sticky sidebar TOC */}
      <aside className="hidden xl:block fixed left-[calc(50%+380px)] top-28 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3">
          On this page
        </p>
        <nav>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block text-[12px] leading-snug py-0.5 transition-colors ${
                    active === item.id
                      ? "text-violet-600 font-semibold"
                      : "text-stone-400 hover:text-stone-700"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile collapsible TOC */}
      <div className="xl:hidden mb-8 rounded-xl border border-stone-200 bg-white overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          aria-expanded={open}
        >
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-stone-500">
            On this page
          </span>
          <span className="text-stone-400 text-xs">{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <nav className="px-5 pb-4 border-t border-stone-100">
            <ul className="space-y-2 mt-3">
              {items.map((item) => (
                <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[13px] text-stone-600 hover:text-violet-600 transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
