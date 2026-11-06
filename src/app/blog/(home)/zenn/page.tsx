import { ArticleCard } from "@/components/article-card";
import { getZennBlogs } from "@/utils/zenn";

export default async function Zenn() {
  const { data } = await getZennBlogs();

  return (
    <ul className="mx-auto grid h-fit grid-cols-1 gap-4 font-thin md:grid-cols-2">
      {data.map((d) => (
        <li key={d?.id}>
          <a
            href={`https://zenn.dev/${d.path}`}
            target="_blank"
            rel="noopener"
            className="block"
          >
            <ArticleCard>
              <span className="mb-2 font-mono text-[10px] text-zinc-400">
                {d?.published_at.substring(0, 10).replace(/-/g, ".")}
              </span>
              <p className="text-center text-5xl">{d.emoji}</p>
              <p className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-zinc-200 sm:text-sm">
                {d.title}
              </p>
              <div className="mt-auto space-y-1 opacity-20">
                <div className="h-1 w-full rounded-full bg-zinc-400" />
                <div className="h-1 w-3/4 rounded-full bg-zinc-400" />
              </div>
            </ArticleCard>
          </a>
        </li>
      ))}
    </ul>
  );
}
