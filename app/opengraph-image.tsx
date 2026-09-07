import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Niketh & Sirisha — NikSha wedding invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8f4ee 0%, #fcfaf7 52%, #efe4d5 100%)",
          color: "#292622",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(194,138,73,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 42,
            border: "1px solid rgba(194,138,73,0.18)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 90px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: "#b6978f",
              fontSize: 18,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            <span>Together with our families</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              marginTop: 28,
              color: "#c28a49",
              fontSize: 22,
            }}
          >
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 82,
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            Niketh <span style={{ color: "#c28a49", margin: "0 20px" }}>&amp;</span> Sirisha
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#756f68",
              fontSize: 24,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            18 November 2026 · Visakhapatnam
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 25,
              color: "#7d4f1b",
              fontStyle: "italic",
            }}
          >
            Our forever begins here.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
