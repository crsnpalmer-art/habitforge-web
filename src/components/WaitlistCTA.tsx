"use client";

import Link from "next/link";
import { APP_STORE_LIVE, APP_STORE_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface WaitlistCTAProps {
  className?: string;
  label?: string;
  variant?: "primary" | "hero-disabled";
}

/**
 * Globally switchable CTA: shows App Store button when APP_STORE_LIVE=true,
 * otherwise shows waitlist link.
 */
export default function WaitlistCTA({
  className = "",
  label,
  variant = "primary",
}: WaitlistCTAProps) {
  if (APP_STORE_LIVE) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => trackEvent("cta_click", { destination: "app_store", variant })}
      >
        {label || "Download on the App Store"}
      </a>
    );
  }

  return (
    <Link
      href="/#waitlist"
      className={className}
      onClick={() => trackEvent("cta_click", { destination: "waitlist", variant })}
    >
      {label || "Join Waitlist"}
    </Link>
  );
}
