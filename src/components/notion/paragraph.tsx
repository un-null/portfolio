import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { RichText } from "./rich-text";

export const Paragraph = ({
  block,
}: {
  block: ParagraphBlockObjectResponse;
}) => {
  const text = block.paragraph.rich_text;

  if (text.length === 0) {
    return <div className="h-4" />;
  }

  return (
    <p className="my-3 leading-loose text-[#EEEEEE]">
      <RichText text={text} />
    </p>
  );
};
