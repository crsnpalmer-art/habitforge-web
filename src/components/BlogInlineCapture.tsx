"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Non-intrusive inline CTA placed mid-article in blog posts.
 * Routes to the connected product/download page.
 */
export default function BlogInlineCapture() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="my-12 rounded-[1.75rem] border border-[#d8c7bb] bg-[linear-gradient(135deg,rgba(217,124,95,0.08),rgba(242,204,143,0.18))] px-6 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a6a59]">Put this into practice</p>
          <p className="mt-2 text-xl font-medium text-stone-900">Don’t just read about better habits. Build them into your day.</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600">
            HabitForge turns ideas like this into a daily system with check-ins, reflection, and recovery cues that help you keep going when life gets messy.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Link
            href="/download"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-stone-100 transition-colors hover:bg-stone-700"
            onClick={() => trackEvent("cta_click", { destination: "download", variant: "blog_inline" })}
          >
            See the app
          </Link>
          <button
            onClick={() => {
              setDismissed(true);
              trackEvent("blog_inline_dismissed");
            }}
            aria-label="Dismiss"
            className="text-stone-400 transition-colors hover:text-stone-600 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
