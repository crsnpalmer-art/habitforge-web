import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
const NOTIFY_EMAIL = "crsnpalmer@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Notify Carson
    await resend.emails.send({
      from: "HabitForge <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: "New HabitForge Waitlist Signup",
      html: `<p><strong>${email}</strong> just joined the HabitForge waitlist.</p><p>${new Date().toLocaleString()}</p>`,
    });

    // Confirm to the user
    await resend.emails.send({
      from: "HabitForge <onboarding@resend.dev>",
      to: email,
      subject: "You're on the HabitForge waitlist",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
          <img src="https://habitforgeai.com/logo.jpg" width="60" style="border-radius: 12px; margin-bottom: 24px;" />
          <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 12px;">You're in.</h1>
          <p style="font-size: 16px; line-height: 1.7; color: #57534e;">
            Thanks for joining the HabitForge waitlist. We'll reach out the moment the app is live on the App Store.
          </p>
          <p style="font-size: 16px; line-height: 1.7; color: #57534e; margin-top: 16px;">
            In the meantime, check out the blog at <a href="https://habitforgeai.com/blog" style="color: #1c1917;">habitforgeai.com/blog</a> — we write about habits, health, and the science of becoming who you want to be.
          </p>
          <p style="font-size: 14px; color: #a8a29e; margin-top: 40px;">— The HabitForge Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
