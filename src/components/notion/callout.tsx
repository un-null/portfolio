import type { ReactNode } from "react";

import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { RichText } from "./rich-text";

export const Callout = ({
  block,
  children,
}: {
  block: CalloutBlockObjectResponse;
  children?: ReactNode;
}) => {
  const icon = block.callout.icon;
  const emoji = icon?.type === "emoji" ? icon.emoji : null;
  const hasText = block.callout.rich_text.length > 0;

  return (
    <div className="my-4 flex gap-3 rounded-lg border border-[#454B4E] bg-[#232323] p-4">
      {emoji ? (
        <span className="shrink-0" aria-hidden>
          {emoji}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        {hasText ? <RichText text={block.callout.rich_text} /> : null}
        {children}
      </div>
    </div>
  );
};
