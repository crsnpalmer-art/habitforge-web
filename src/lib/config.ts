/**
 * Centralized app config.
 *
 * App Store launch mode:
 *   NEXT_PUBLIC_APP_STORE_LIVE=true        → show App Store CTA instead of waitlist
 *   NEXT_PUBLIC_APP_STORE_URL=https://...  → link to the App Store listing
 *
 * Waitlist counter:
 *   NEXT_PUBLIC_WAITLIST_COUNT=412         → show a real or curated count in the hero
 *   Leave unset to hide the counter entirely.
 */
export const APP_STORE_LIVE = process.env.NEXT_PUBLIC_APP_STORE_LIVE === "true";
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/app/habitforge/id0000000000";

export const SITE_URL = "https://habitforgeai.com";
export const SITE_NAME = "HabitForge";
export const PRIMARY_CTA_URL = APP_STORE_LIVE ? APP_STORE_URL : "/download";
export const PRIMARY_CTA_LABEL = APP_STORE_LIVE ? "Download" : "Start Forging";
export const PRIMARY_CTA_LABEL_LONG = APP_STORE_LIVE ? "Download on the App Store" : "Start Forging";

/**
 * Waitlist count shown on the homepage.
 * Set NEXT_PUBLIC_WAITLIST_COUNT to a number to display it.
 * Omit the env var (or set to "0") to hide the badge entirely.
 */
export const WAITLIST_COUNT = (() => {
  const raw = process.env.NEXT_PUBLIC_WAITLIST_COUNT;
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return isNaN(n) || n <= 0 ? null : n;
})();
