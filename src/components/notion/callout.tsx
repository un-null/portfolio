import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { RichText } from "./rich-text";

export const Callout = ({ block }: { block: CalloutBlockObjectResponse }) => {
  const icon = block.callout.icon;
  const emoji = icon?.type === "emoji" ? icon.emoji : "•";

  return (
    <div className="my-4 flex gap-3 rounded-lg border border-[#454B4E] bg-[#232323] p-4">
      <span className="shrink-0" aria-hidden>
        {emoji}
      </span>
      <div className="min-w-0">
        <RichText text={block.callout.rich_text} />
      </div>
    </div>
  );
};
