import type { BlockWithChildren } from "@/utils/notion";

import { Callout } from "./callout";
import { Heading, type HeadingBlock } from "./heading";
import { ImageBlock } from "./image";
import { Paragraph } from "./paragraph";
import { RichText } from "./rich-text";
import { TableOfContents } from "./table-of-contents";

type ToDoBlock = Extract<BlockWithChildren, { type: "to_do" }>;
type ToggleBlock = Extract<BlockWithChildren, { type: "toggle" }>;

type Group =
  | { kind: "list"; ordered: boolean; items: BlockWithChildren[] }
  | { kind: "block"; block: BlockWithChildren };

const isListItem = (block: BlockWithChildren) =>
  block.type === "bulleted_list_item" || block.type === "numbered_list_item";

const isHeading = (block: BlockWithChildren): block is HeadingBlock =>
  block.type === "heading_1" ||
  block.type === "heading_2" ||
  block.type === "heading_3";

const collectHeadings = (blocks: BlockWithChildren[]): HeadingBlock[] =>
  blocks.flatMap((block) => [
    ...(isHeading(block) ? [block] : []),
    ...(block.children ? collectHeadings(block.children) : []),
  ]);

const groupBlocks = (blocks: BlockWithChildren[]): Group[] => {
  const groups: Group[] = [];

  for (const block of blocks) {
    if (!isListItem(block)) {
      groups.push({ kind: "block", block });
      continue;
    }

    const ordered = block.type === "numbered_list_item";
    const last = groups[groups.length - 1];

    if (last?.kind === "list" && last.ordered === ordered) {
      last.items.push(block);
    } else {
      groups.push({ kind: "list", ordered, items: [block] });
    }
  }

  return groups;
};

const ListGroup = ({
  ordered,
  items,
  headings,
}: {
  ordered: boolean;
  items: BlockWithChildren[];
  headings: HeadingBlock[];
}) => {
  const Tag = ordered ? "ol" : "ul";
  const richTextOf = (block: BlockWithChildren) =>
    block.type === "bulleted_list_item"
      ? block.bulleted_list_item.rich_text
      : block.type === "numbered_list_item"
      ? block.numbered_list_item.rich_text
      : [];

  return (
    <Tag
      className={
        ordered
          ? "my-4 list-decimal space-y-1 pl-6"
          : "my-4 list-disc space-y-1 pl-6"
      }
    >
      {items.map((block) => (
        <li key={block.id}>
          <RichText text={richTextOf(block)} />
          {block.children?.length ? (
            <Blocks blocks={block.children} headings={headings} />
          ) : null}
        </li>
      ))}
    </Tag>
  );
};

const ToDo = ({ block }: { block: ToDoBlock }) => {
  const text = block.to_do.rich_text
    .map((richText) => richText.plain_text)
    .join("");

  return (
    <div className="my-2 flex items-start gap-2">
      <input
        type="checkbox"
        defaultChecked={block.to_do.checked}
        disabled
        aria-label={text || "To-do"}
        className="mt-1.5"
      />
      <span
        className={block.to_do.checked ? "text-[#8A9096] line-through" : ""}
      >
        <RichText text={block.to_do.rich_text} />
      </span>
    </div>
  );
};

const Toggle = ({
  block,
  headings,
}: {
  block: ToggleBlock;
  headings: HeadingBlock[];
}) => (
  <details className="my-2">
    <summary className="cursor-pointer font-medium">
      <RichText text={block.toggle.rich_text} />
    </summary>
    <div className="mt-2 border-l border-[#454B4E] pl-4">
      {block.children?.length ? (
        <Blocks blocks={block.children} headings={headings} />
      ) : null}
    </div>
  </details>
);

export const BlockToJSX = ({
  block,
  headings,
}: {
  block: BlockWithChildren;
  headings: HeadingBlock[];
}) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <Heading block={block} />;
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <ListGroup
          ordered={block.type === "numbered_list_item"}
          items={[block]}
          headings={headings}
        />
      );
    case "image":
      return <ImageBlock block={block} />;
    case "callout":
      return (
        <Callout block={block}>
          {block.children?.length ? (
            <Blocks blocks={block.children} headings={headings} />
          ) : null}
        </Callout>
      );
    case "divider":
      return <hr className="my-6 border-[#454B4E]" />;
    case "to_do":
      return <ToDo block={block} />;
    case "toggle":
      return <Toggle block={block} headings={headings} />;
    default:
      // table_of_contents は Blocks が headings を集めて描画する
      return null;
  }
};

export const Blocks = ({
  blocks,
  headings,
}: {
  blocks: BlockWithChildren[];
  headings?: HeadingBlock[];
}) => {
  const pageHeadings = headings ?? collectHeadings(blocks);

  return (
    <>
      {groupBlocks(blocks).map((group) =>
        group.kind === "list" ? (
          <ListGroup
            key={group.items[0].id}
            ordered={group.ordered}
            items={group.items}
            headings={pageHeadings}
          />
        ) : group.block.type === "table_of_contents" ? (
          <TableOfContents key={group.block.id} headings={pageHeadings} />
        ) : (
          <BlockToJSX
            key={group.block.id}
            block={group.block}
            headings={pageHeadings}
          />
        ),
      )}
    </>
  );
};
