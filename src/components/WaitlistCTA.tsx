"use client";

import Link from "next/link";
import { APP_STORE_LIVE, PRIMARY_CTA_LABEL_LONG } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface WaitlistCTAProps {
  className?: string;
  label?: string;
  variant?: "primary" | "hero-disabled";
}

/**
 * Globally switchable CTA: routes to the connected download/product flow.
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
        {label || PRIMARY_CTA_LABEL_LONG}
      </Link>
    );
  }

  return (
    <Link
      href="/download"
      className={className}
      onClick={() => trackEvent("cta_click", { destination: "download", variant })}
    >
      {label || PRIMARY_CTA_LABEL_LONG}
    </Link>
  );
}
