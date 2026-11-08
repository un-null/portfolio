import { ImageResponse } from "next/og";

import { getAllBlogs } from "@/utils/notion";

export const alt = "null — blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getAllBlogs();
  const post = data.find((d) => d?.id === id);

  const title = truncate(post?.title ?? "Blog", 120);
  const date = post?.created_at ? post.created_at.slice(0, 10) : "";

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
          BLOG
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#8A9096",
          }}
        >
          <span>null</span>
          <span>{date}</span>
        </div>
      </div>
    ),
    size,
  );
}
