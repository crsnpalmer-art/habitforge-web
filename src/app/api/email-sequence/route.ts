/**
 * /api/email-sequence
 *
 * Trigger Day 3 or Day 7 follow-up emails for waitlist members.
 *
 * POST body: { email: string; goal?: string; day: 3 | 7; token: string }
 *
 * The `token` must match SEQUENCE_API_TOKEN env var (set in Vercel).
 * Call this from a cron job (Vercel Cron, GitHub Actions, Inngest, etc.)
 * after collecting subscriber emails into your CRM / DB.
 *
 * Until a DB is wired in, use this route manually per subscriber:
 *   curl -X POST https://habitforgeai.com/api/email-sequence \
 *     -H "Content-Type: application/json" \
 *     -d '{"email":"user@example.com","day":3,"token":"your-token"}'
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

const GOAL_LABELS: Record<string, string> = {
  Mental: "🧠 Mental",
  Physical: "💪 Physical",
  Spiritual: "✨ Spiritual",
  Financial: "💰 Financial",
};

function day3Email(goal?: string): { subject: string; html: string } {
  const goalContext = goal
    ? `<p style="font-size:15px;line-height:1.7;color:#57534e;">You're building toward <strong>${GOAL_LABELS[goal] ?? goal}</strong> habits. Here's what the research shows about where most people get it wrong.</p>`
    : `<p style="font-size:15px;line-height:1.7;color:#57534e;">Here's what the research shows about where most people get habit-building wrong.</p>`;

  return {
    subject: "One habit that changes everything",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
        <img src="https://habitforgeai.com/logo.jpg" width="60" style="border-radius: 12px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Day 3. The real reason habits fail.</h1>
        ${goalContext}
        <p style="font-size:15px;line-height:1.7;color:#57534e;margin-top:16px;">
          Most people track <em>behavior</em>. HabitForge tracks <em>identity</em>. The Forge Score isn't about streaks — it's about showing you who you're becoming across four dimensions: Mental, Physical, Spiritual, Financial.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#57534e;margin-top:16px;">
          When the app launches, you'll see this in motion. Until then — read the science behind it:
        </p>
        <p style="margin-top:20px;">
          <a href="https://habitforgeai.com/blog/identity-based-habits" style="color:#1c1917;font-weight:bold;">Identity-Based Habits →</a>
        </p>
        <p style="font-size: 14px; color: #a8a29e; margin-top: 40px;">— The HabitForge Team</p>
        <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
        <p style="font-size: 11px; color: #d6d3d1;">You joined the HabitForge waitlist at habitforgeai.com.</p>
      </div>
    `,
  };
}

function day7Email(goal?: string): { subject: string; html: string } {
  const goalContext = goal
    ? `<p style="font-size:15px;line-height:1.7;color:#57534e;">Your focus area: <strong>${GOAL_LABELS[goal] ?? goal}</strong>. HabitForge will show you exactly how your daily actions build toward that dimension.</p>`
    : `<p style="font-size:15px;line-height:1.7;color:#57534e;">HabitForge will show you exactly how your daily actions build toward who you want to become.</p>`;

  return {
    subject: "Your first week. What we noticed.",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
        <img src="https://habitforgeai.com/logo.jpg" width="60" style="border-radius: 12px; margin-bottom: 24px;" />
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Week one. Still here.</h1>
        <p style="font-size:15px;line-height:1.7;color:#57534e;">Most people forget they signed up for something within 48 hours. You didn't.</p>
        ${goalContext}
        <p style="font-size:15px;line-height:1.7;color:#57534e;margin-top:16px;">
          HabitForge is in final preparation for the App Store. When it launches, you'll get access before anyone else.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#57534e;margin-top:16px;">
          In the meantime — the blog is active:
        </p>
        <p style="margin-top:20px;">
          <a href="https://habitforgeai.com/blog" style="color:#1c1917;font-weight:bold;">habitforgeai.com/blog →</a>
        </p>
        <p style="font-size: 14px; color: #a8a29e; margin-top: 40px;">— The HabitForge Team</p>
        <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
        <p style="font-size: 11px; color: #d6d3d1;">You joined the HabitForge waitlist at habitforgeai.com.</p>
      </div>
    `,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { email, goal, day, token } = await req.json() as {
      email?: string;
      goal?: string;
      day?: number;
      token?: string;
    };

    // Token guard
    const expectedToken = process.env.SEQUENCE_API_TOKEN;
    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (day !== 3 && day !== 7) {
      return NextResponse.json({ error: "day must be 3 or 7" }, { status: 400 });
    }

    const validGoals = ["Mental", "Physical", "Spiritual", "Financial"];
    const cleanGoal = goal && validGoals.includes(goal) ? goal : undefined;

    const { subject, html } = day === 3 ? day3Email(cleanGoal) : day7Email(cleanGoal);

    await resend.emails.send({
      from: "HabitForge <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true, day });
  } catch (err) {
    console.error("Email sequence error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
