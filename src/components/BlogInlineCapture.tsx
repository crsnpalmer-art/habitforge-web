"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Non-intrusive inline email capture placed mid-article in blog posts.
 * Links to the main /#waitlist anchor so the form handles submission.
 */
export default function BlogInlineCapture() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="my-12 rounded-2xl border border-stone-200 bg-white px-6 py-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-800 text-[15px] mb-0.5">
          Build habits that stick.
        </p>
        <p className="text-sm text-stone-500">
          HabitForge is coming to iOS. Get early access.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href="/#waitlist"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-stone-100 bg-stone-900 hover:bg-stone-700 transition-colors"
          onClick={() => trackEvent("cta_click", { destination: "waitlist", variant: "blog_inline" })}
        >
          Join Waitlist
        </a>
        <button
          onClick={() => {
            setDismissed(true);
            trackEvent("blog_inline_dismissed");
          }}
          aria-label="Dismiss"
          className="text-stone-400 hover:text-stone-600 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
