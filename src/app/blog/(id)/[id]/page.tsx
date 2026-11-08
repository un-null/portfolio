import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Icon from "@/components/icons/icon";
import { Blocks } from "@/components/notion/block-to-jsx";
import { getAllBlogs, getPageById } from "@/utils/notion";

export const instant = false;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const { data } = await getAllBlogs();
  const post = data.find((d) => d?.id === id);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary || undefined,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function BlogId(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { data } = await getAllBlogs();
  const post = data.find((d) => d?.id === id);

  if (!post) {
    notFound();
  }

  const blocks = await getPageById(id).catch(() => null);

  if (!blocks || blocks.length === 0) {
    notFound();
  }

  return (
    <article className="text-[#EEEEEE]">
      <Link
        href={"/blog"}
        className="mt-4 flex items-center gap-2 text-sm hover:text-[#EEEEEE]"
      >
        <Icon type="ArrowLeft" size={14} />
        Back
      </Link>
      <h1 className="mt-8 text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 font-mono text-[10px] text-zinc-400">
        {post.created_at.substring(0, 10).replace(/-/g, ".")}
      </p>
      <div className="mt-8 text-sm">
        <Blocks blocks={blocks} />
      </div>
    </article>
  );
}
