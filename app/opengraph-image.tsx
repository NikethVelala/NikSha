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
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          background: "#292622",
        }}
      >
        <img
          src="https://nik-sha.vercel.app/images/hero.jpg"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(180deg, rgba(25,20,16,0.06) 15%, rgba(25,20,16,0.18) 42%, rgba(25,20,16,0.86) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 28,
            display: "flex",
            border: "1px solid rgba(255,239,211,0.72)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 42,
            display: "flex",
            border: "1px solid rgba(255,239,211,0.28)",
          }}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 80px 58px",
            color: "#fffaf2",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "#f0d1ad",
            }}
          >
            The NikSha Wedding
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 70,
              lineHeight: 1,
              letterSpacing: "0.015em",
            }}
          >
            Niketh <span style={{ color: "#f0d1ad", margin: "0 18px" }}>&amp;</span> Sirisha
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 17,
              fontSize: 21,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,250,242,0.86)",
            }}
          >
            18 November 2026 · Visakhapatnam
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 23,
              fontStyle: "italic",
              color: "#f0d1ad",
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
