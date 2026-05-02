import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type RateLimitState = {
  count: number;
  resetAt: number;
};

declare global {
  var __habitforgeRateLimitStore: Map<string, RateLimitState> | undefined;
}

const rateLimitStore =
  globalThis.__habitforgeRateLimitStore ?? (globalThis.__habitforgeRateLimitStore = new Map());

function cleanupExpired(now: number) {
  if (rateLimitStore.size < 256) {
    return;
  }

  for (const [key, state] of rateLimitStore.entries()) {
    if (state.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function takeRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  cleanupExpired(now);

  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }

  if (current.count >= limit) {
    return {
      ok: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { ok: true as const };
}

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "unknown";
}

function isLocalHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function ensureTrustedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");

  if (!origin || !host) {
    return NextResponse.json({ error: "Unsupported request origin" }, { status: 403 });
  }

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return NextResponse.json({ error: "Unsupported request origin" }, { status: 403 });
  }

  if (originUrl.host === host) {
    return null;
  }

  if (process.env.NODE_ENV !== "production" && isLocalHostname(originUrl.hostname)) {
    return null;
  }

  return NextResponse.json({ error: "Unsupported request origin" }, { status: 403 });
}

export function guardWaitlistRequest(
  req: NextRequest,
  args: { email: string; honeypot?: string; startedAt?: number | string | null }
) {
  const originError = ensureTrustedOrigin(req);
  if (originError) {
    return originError;
  }

  if (args.honeypot?.trim()) {
    return NextResponse.json({ success: true });
  }

  const startedAt =
    typeof args.startedAt === "number"
      ? args.startedAt
      : typeof args.startedAt === "string"
        ? Number.parseInt(args.startedAt, 10)
        : NaN;
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : NaN;
  if (!Number.isFinite(elapsedMs) || elapsedMs < 1200 || elapsedMs > 1000 * 60 * 60 * 6) {
    return NextResponse.json({ error: "Please retry the form submission." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const emailDigest = digest(args.email.trim().toLowerCase());
  const ipLimit = takeRateLimit(`waitlist:ip:${ip}`, 8, 1000 * 60 * 15);
  if (!ipLimit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a bit and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(ipLimit.retryAfterSeconds) },
      }
    );
  }

  const emailLimit = takeRateLimit(`waitlist:email:${emailDigest}`, 3, 1000 * 60 * 60 * 24);
  if (!emailLimit.ok) {
    return NextResponse.json(
      { error: "That address was already submitted recently." },
      {
        status: 429,
        headers: { "Retry-After": String(emailLimit.retryAfterSeconds) },
      }
    );
  }

  return null;
}

export function guardSequenceRequest(req: NextRequest, email: string) {
  const ip = getClientIp(req);
  const emailDigest = digest(email.trim().toLowerCase());

  const ipLimit = takeRateLimit(`sequence:ip:${ip}`, 20, 1000 * 60 * 60);
  if (!ipLimit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a bit and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(ipLimit.retryAfterSeconds) },
      }
    );
  }

  const emailLimit = takeRateLimit(`sequence:email:${emailDigest}`, 3, 1000 * 60 * 60 * 24);
  if (!emailLimit.ok) {
    return NextResponse.json(
      { error: "That sequence was already triggered recently." },
      {
        status: 429,
        headers: { "Retry-After": String(emailLimit.retryAfterSeconds) },
      }
    );
  }

  return null;
}

export function tokensMatch(expected: string | undefined, provided: string | undefined) {
  if (!expected || !provided) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}
