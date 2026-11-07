import type {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { RichText } from "./rich-text";

export type HeadingBlock =
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse;

export const Heading = ({ block }: { block: HeadingBlock }) => {
  const text =
    "heading_1" in block
      ? block.heading_1.rich_text
      : "heading_2" in block
      ? block.heading_2.rich_text
      : block.heading_3.rich_text;

  if (block.type === "heading_1") {
    return (
      <h1 id={block.id} className="mb-4 mt-10 text-2xl font-bold">
        <RichText text={text} />
      </h1>
    );
  }

  if (block.type === "heading_2") {
    return (
      <h2 id={block.id} className="mb-4 mt-8 text-xl font-bold">
        <RichText text={text} />
      </h2>
    );
  }

  return (
    <h3 id={block.id} className="mb-4 mt-6 text-lg font-bold">
      <RichText text={text} />
    </h3>
  );
};
