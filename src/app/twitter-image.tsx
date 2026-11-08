import { ImageResponse } from "next/og";

export const alt = "null — portfolio";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#161616",
          padding: "96px 88px",
          color: "#EEEEEE",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 220,
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
            marginTop: 32,
            fontSize: 44,
            color: "#B3B8BD",
          }}
        >
          portfolio by null
        </div>
      </div>
    ),
    size,
  );
}
