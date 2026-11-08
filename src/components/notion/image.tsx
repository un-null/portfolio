import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const ImageBlock = ({ block }: { block: ImageBlockObjectResponse }) => {
  const caption = block.image.caption.map((text) => text.plain_text).join("");

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/api/notion-image/${block.id}`}
        alt={caption}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg border border-[#454B4E]"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-[#8A9096]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
