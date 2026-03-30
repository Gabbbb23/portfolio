import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0F172A",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#0EA5E9" }}>&lt;</span>
        <span style={{ color: "#FFFFFF" }}>G</span>
        <span style={{ color: "#0EA5E9" }}>/&gt;</span>
      </div>
    ),
    { ...size }
  );
}
