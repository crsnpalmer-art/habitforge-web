import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #D97C5F 0%, #F2CC8F 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          fontSize: 18,
          color: "#1B1A17",
          letterSpacing: "-0.02em",
        }}
      >
        HF
      </div>
    ),
    size
  );
}
