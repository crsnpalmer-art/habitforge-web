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
      <Link
        href="/download"
        className={className}
        onClick={() => trackEvent("cta_click", { destination: "download", variant })}
      >
        {label || "Download on the App Store"}
      </Link>
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
