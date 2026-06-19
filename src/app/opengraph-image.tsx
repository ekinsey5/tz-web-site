import { ImageResponse } from "next/og";

export const alt =
  "Tether-Zero — Become debt-free with a plan you can actually follow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F9FAFB",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#0D9488",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            TZ
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#101828" }}>
            Tether-Zero
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#101828",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Become debt-free with a plan you can actually follow.
          </div>
          <div style={{ fontSize: 28, color: "#6B7280", maxWidth: 900 }}>
            Debt payoff, budgeting and a personal AI coach in one calm app.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Read-only bank access", "AES-256-GCM encrypted", "30-day free trial"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  fontSize: 22,
                  color: "#0F766E",
                  background: "#CCFBF1",
                  padding: "8px 18px",
                  borderRadius: 999,
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
