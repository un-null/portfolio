import type { BlockWithChildren } from "@/utils/notion";

import { RichText } from "./rich-text";

type HeadingBlock = Extract<
  BlockWithChildren,
  { type: "heading_1" | "heading_2" | "heading_3" }
>;

const richTextOf = (block: HeadingBlock) =>
  "heading_1" in block
    ? block.heading_1.rich_text
    : "heading_2" in block
    ? block.heading_2.rich_text
    : block.heading_3.rich_text;

export const TableOfContents = ({ headings }: { headings: HeadingBlock[] }) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={
              heading.type === "heading_3"
                ? "pl-4"
                : heading.type === "heading_2"
                ? "pl-2"
                : ""
            }
          >
            <a href={`#${heading.id}`} className="hover:underline">
              <RichText text={richTextOf(heading)} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
