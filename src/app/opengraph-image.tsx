import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HabitForge — Forge Habits That Compound";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1c1917",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          padding: "80px",
        }}
      >
        {/* Logo + name row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://habitforgeai.com/logo.jpg"
            width={72}
            height={72}
            style={{ borderRadius: "18px" }}
            alt=""
          />
          <span
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#f5f0e8",
              letterSpacing: "-0.02em",
            }}
          >
            HabitForge
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            color: "#f5f0e8",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Forge Habits That{" "}
          <span style={{ color: "#e07040" }}>Compound.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#a8a29e",
            fontStyle: "italic",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Build the system. Become the person.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            display: "flex",
            gap: "16px",
          }}
        >
          {["Mental", "Physical", "Spiritual", "Financial"].map((dim) => (
            <div
              key={dim}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "99px",
                padding: "8px 20px",
                fontSize: "14px",
                color: "#78716c",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {dim}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
