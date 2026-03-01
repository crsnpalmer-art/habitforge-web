import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
const NOTIFY_EMAIL = "crsnpalmer@gmail.com";

const GOAL_LABELS: Record<string, string> = {
  Mental: "🧠 Mental",
  Physical: "💪 Physical",
  Spiritual: "✨ Spiritual",
  Financial: "💰 Financial",
};

/** Day 0 welcome email — sent immediately on signup */
function buildWelcomeEmail(email: string, goal?: string): string {
  const goalLine = goal
    ? `<p style="font-size:15px;line-height:1.7;color:#57534e;margin-top:12px;">You flagged <strong style="color:#1c1917;">${GOAL_LABELS[goal] ?? goal}</strong> as your primary focus — we built HabitForge around exactly that kind of clarity.</p>`
    : "";

  return `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
      <img src="https://habitforgeai.com/logo.jpg" width="60" style="border-radius: 12px; margin-bottom: 24px;" />
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 12px;">You're in.</h1>
      <p style="font-size: 16px; line-height: 1.7; color: #57534e;">
        Thanks for joining the HabitForge waitlist. We'll reach out the moment the app is live on the App Store.
      </p>
      ${goalLine}
      <p style="font-size: 16px; line-height: 1.7; color: #57534e; margin-top: 16px;">
        In the meantime, check out the blog at <a href="https://habitforgeai.com/blog" style="color: #1c1917;">habitforgeai.com/blog</a> — we write about habits, health, and the science of becoming who you want to be.
      </p>
      <p style="font-size: 14px; color: #a8a29e; margin-top: 40px;">— The HabitForge Team</p>
      <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
      <p style="font-size: 11px; color: #d6d3d1;">You're receiving this because you joined the HabitForge waitlist at habitforgeai.com.</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, goal } = body as { email?: string; goal?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const validGoals = ["Mental", "Physical", "Spiritual", "Financial"];
    const cleanGoal = goal && validGoals.includes(goal) ? goal : undefined;

    const signupTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

    // Notify Carson — include goal + sequence trigger metadata
    await resend.emails.send({
      from: "HabitForge <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: "New HabitForge Waitlist Signup",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1c1917;">
          <h2 style="margin-bottom: 8px;">New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Primary Goal:</strong> ${cleanGoal ? GOAL_LABELS[cleanGoal] : "Not specified"}</p>
          <p><strong>Time:</strong> ${signupTime} CST</p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0;" />
          <p style="font-size:12px;color:#a8a29e;">
            Email sequence: Day 0 ✓ sent &nbsp;|&nbsp; Day 3 pending &nbsp;|&nbsp; Day 7 pending
          </p>
        </div>
      `,
    });

    // Day 0: Welcome email — sent immediately
    await resend.emails.send({
      from: "HabitForge <onboarding@resend.dev>",
      to: email,
      subject: "You're on the HabitForge waitlist",
      html: buildWelcomeEmail(email, cleanGoal),
    });

    /*
     * EMAIL SEQUENCE HOOKS — Day 3 & Day 7
     *
     * These are scaffolded for future cron / queue integration.
     * When ready to activate:
     *   1. Set up a cron job (Vercel Cron, GitHub Actions, or Inngest)
     *   2. POST to /api/email-sequence with { email, goal, day: 3 | 7, token }
     *   3. The route below sends the appropriate email for that day.
     *
     * Day 3 subject: "One habit that changes everything" — delivers a single insight
     * Day 7 subject: "Your first week. What we noticed." — Forge Score preview + CTA
     *
     * Until the cron is active, these are no-ops (safe to deploy).
     */

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
