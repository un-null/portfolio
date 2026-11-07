import { Fragment, type ReactNode } from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText = ({ text }: { text: RichTextItemResponse[] }) => {
  if (text.length === 0) {
    return null;
  }

  return (
    <span className="whitespace-pre-wrap break-words">
      {text.map((item, index) => {
        let node: ReactNode = item.plain_text;

        if (item.annotations.code) {
          node = (
            <code className="rounded bg-[#232323] px-1 py-0.5 font-mono text-[0.9em]">
              {node}
            </code>
          );
        }
        if (item.annotations.bold) {
          node = <strong className="font-bold">{node}</strong>;
        }
        if (item.annotations.italic) {
          node = <em>{node}</em>;
        }
        if (item.annotations.strikethrough) {
          node = <s>{node}</s>;
        }
        if (item.annotations.underline) {
          node = <u>{node}</u>;
        }
        if (item.href) {
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
            >
              {node}
            </a>
          );
        }

        return <Fragment key={index}>{node}</Fragment>;
      })}
    </span>
  );
};
