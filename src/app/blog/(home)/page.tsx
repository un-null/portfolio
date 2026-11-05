import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { getAllBlogs, tagColor } from "@/utils/notion";

export default async function NotionBlog() {
  const { data } = await getAllBlogs();

  return (
    <ul className="mx-auto grid h-fit grid-cols-1 gap-4 font-thin md:grid-cols-2">
      {data.map((d) => (
        <li key={d?.id}>
          <Link href={`/blog/${d?.id}`} className="block">
            <ArticleCard>
              <span className="mb-2 font-mono text-[10px] text-zinc-400">
                {d?.created_at.substring(0, 10).replace(/-/g, ".")}
              </span>
              <p className="line-clamp-2 text-xs font-bold leading-snug text-zinc-200 sm:text-sm">
                {d?.title}
              </p>
              <p className="mt-2 line-clamp-2 overflow-hidden text-xs text-zinc-400">
                {d?.summary}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-3 text-[10px]">
                {d?.tags.map((tag) => (
                  <li key={tag.id}>
                    <span
                      className={`${tagColor(
                        tag.color,
                      )} rounded-sm px-1 text-[#EEEEEE]`}
                    >
                      {tag.name}
                    </span>
                  </li>
                ))}
              </ul>
            </ArticleCard>
          </Link>
        </li>
      ))}
    </ul>
  );
}
