import { ImageResponse } from "next/og";

export const alt = "Gab — Product Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ghost "01" */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 400,
            fontWeight: 900,
            color: "#E2E8F0",
            lineHeight: 0.8,
          }}
        >
          01
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0EA5E9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "monospace",
            }}
          >
            {"> HELLO, I'M"}
          </div>

          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            Gab
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#64748B",
              marginTop: 20,
              fontWeight: 300,
            }}
          >
            Product Developer
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 32,
            }}
          >
            <div
              style={{
                background: "#0EA5E9",
                color: "white",
                padding: "12px 32px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              View My Work
            </div>
            <div
              style={{
                border: "2px solid #CBD5E1",
                color: "#334155",
                padding: "12px 32px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Get In Touch
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "#94A3B8",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: "#0EA5E9" }}>&lt;</span>G<span style={{ color: "#0EA5E9" }}>/&gt;</span>
          <span style={{ marginLeft: 16 }}>komakahol.online</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
