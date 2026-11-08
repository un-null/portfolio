import { headingText, type HeadingBlock } from "./heading";
import { RichText } from "./rich-text";

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
              <RichText text={headingText(heading)} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
