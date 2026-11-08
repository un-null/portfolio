import { ImageResponse } from "next/og";

export const alt = "null — portfolio";
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
          backgroundColor: "#161616",
          padding: "72px 80px",
          color: "#EEEEEE",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.3em",
            color: "#7FB89F",
          }}
        >
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            null
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              color: "#B3B8BD",
            }}
          >
            portfolio by Keita Kawabata
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 26,
            color: "#8A9096",
          }}
        >
          <span>@nu_____ll</span>
        </div>
      </div>
    ),
    size,
  );
}
