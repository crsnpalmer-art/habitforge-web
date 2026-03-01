/**
 * Centralized app config.
 *
 * App Store launch mode:
 *   NEXT_PUBLIC_APP_STORE_LIVE=true        → show App Store CTA instead of waitlist
 *   NEXT_PUBLIC_APP_STORE_URL=https://...  → link to the App Store listing
 */
export const APP_STORE_LIVE = process.env.NEXT_PUBLIC_APP_STORE_LIVE === "true";
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/app/habitforge/id0000000000";

export const SITE_URL = "https://habitforgeai.com";
export const SITE_NAME = "HabitForge";
