/**
 * Lightweight analytics event tracking.
 * Compatible with Vercel Analytics (via @vercel/analytics) or falls back to gtag.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (action: string, params?: Record<string, string | number | boolean>) => void;
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  // Vercel Analytics (web analytics track)
  if (typeof window.va === "function") {
    window.va("event", { name: eventName, ...properties });
    return;
  }

  // Google Analytics / gtag fallback
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, properties);
    return;
  }

  // Development debug
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", eventName, properties);
  }
}
