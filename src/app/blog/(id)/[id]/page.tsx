import Link from "next/link";

import { ArrowLeft } from "@/components/icons/left-arrow";
import { BlockToJSX } from "@/components/notion/block-to-jsx";
import { getPageById } from "@/utils/notion";

export default async function BlogId(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const blocks = await getPageById(params.id);

  return (
    <div>
      <Link
        href={"/blog"}
        className="mt-4 flex items-center gap-2 text-sm hover:text-[#EEEEEE]"
      >
        <span>
          <ArrowLeft />
        </span>
        戻る
      </Link>
      <ul className="mx-auto mt-8 text-sm text-[#EEEEEE]">
        {blocks.map((block) => (
          <BlockToJSX key={block.id} block={block} />
        ))}
      </ul>
    </div>
  );
}
