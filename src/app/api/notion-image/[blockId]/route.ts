import { APIResponseError } from "@notionhq/client";

import { notion } from "@/utils/notion";

const UUID =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blockId: string }> },
) {
  const { blockId } = await params;

  if (!UUID.test(blockId)) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const block = await notion.blocks.retrieve({ block_id: blockId });

    if (!("type" in block) || block.type !== "image") {
      return new Response("Not Found", { status: 404 });
    }

    const url =
      block.image.type === "file"
        ? block.image.file.url
        : block.image.external.url;
    const upstream = await fetch(url, { cache: "no-store" });
    const contentType = upstream.headers.get("content-type") ?? "";

    if (!upstream.ok || !contentType.startsWith("image/")) {
      return new Response("Bad Gateway", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    if (error instanceof APIResponseError && error.status === 404) {
      return new Response("Not Found", { status: 404 });
    }
    return new Response("Bad Gateway", { status: 502 });
  }
}
