import { z } from "zod";

const zennArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  emoji: z.string(),
  published_at: z.string(),
  path: z.string(),
});

const zennResponseSchema = z.object({
  articles: z.array(zennArticleSchema),
});

export type Zenn = z.infer<typeof zennArticleSchema>;

export const getZennBlogs = async (): Promise<{ data: Zenn[] }> => {
  const res = await fetch(
    "https://zenn.dev/api/articles?username=nu_______ll&order=latest",
  );

  if (!res.ok) {
    console.error(`Failed to fetch Zenn articles: ${res.status}`);
    return { data: [] };
  }

  const parsed = zennResponseSchema.safeParse(await res.json());

  if (!parsed.success) {
    console.error("Failed to parse Zenn articles", parsed.error);
    return { data: [] };
  }

  return { data: parsed.data.articles };
};
