import { cacheLife, cacheTag } from "next/cache";

import { Client, collectPaginatedAPI, isFullBlock } from "@notionhq/client";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { SelectColor } from "@/types/notion";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

const plainText = (rich: RichTextItemResponse[] | undefined) =>
  (rich ?? []).map((text) => text.plain_text).join("");

export const getAllWorks = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("works");

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_WORKS,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  const data = res.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;
      const public_url = d.public_url;

      const title =
        d.properties["Name"].type === "title"
          ? plainText(d.properties["Name"].title)
          : "";

      const date =
        d.properties["Date"].type === "date"
          ? d.properties["Date"].date?.start.substring(0, 4)
          : "";

      const github_url =
        d.properties["Github"].type === "url" ? d.properties["Github"].url : "";

      const domain =
        d.properties["Domain"].type === "url" ? d.properties["Domain"].url : "";

      const archived =
        d.properties["Archived"].type === "checkbox"
          ? d.properties["Archived"].checkbox
          : false;

      const langs =
        d.properties["Languages"].type === "multi_select"
          ? d.properties["Languages"].multi_select
          : [];
      return {
        id,
        public_url,
        title,
        date,
        github_url,
        langs,
        domain,
        archived,
      };
    } else {
      return undefined;
    }
  });

  const active = data.filter((item) => !item?.archived);
  const archived = data.filter((item) => item?.archived);

  return {
    result: [...active, ...archived],
  };
};

export const getAllBlogs = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("blogs");

  const req = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_BLOG,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  const data = req.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;
      const created_at = d.created_time;

      const title =
        d.properties["Name"].type === "title"
          ? plainText(d.properties["Name"].title)
          : "";
      const summary =
        d.properties["Summary"].type === "rich_text"
          ? plainText(d.properties["Summary"].rich_text)
          : "";
      const tags =
        d.properties["Tags"].type === "multi_select"
          ? d.properties["Tags"].multi_select.map((tag) => tag)
          : [];

      return { id, created_at, title, summary, tags };
    }
  });

  return {
    data: data ? data : [],
  };
};

export const getPublishedProject = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const home = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECT_HOME,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
    filter: {
      property: "Published",
      select: {
        equals: "true",
      },
    },
  });
  const works = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECT_WORKS,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
    filter: {
      property: "Published",
      select: {
        equals: "true",
      },
    },
  });

  const filterd_home = home.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;

      const title =
        d.properties["Name"].type === "title"
          ? plainText(d.properties["Name"].title)
          : "";

      const status =
        d.properties["Status"].type === "status"
          ? d.properties["Status"].status?.name
          : "";

      const label =
        d.properties["For what"].type === "select"
          ? {
              name: d.properties["For what"].select?.name,
              color: d.properties["For what"].select?.color,
            }
          : {};

      return { id, title, status, label };
    } else {
      return undefined;
    }
  });

  const filterd_works = works.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;

      const title =
        d.properties["Name"].type === "title"
          ? plainText(d.properties["Name"].title)
          : "";

      const status =
        d.properties["Status"].type === "status"
          ? d.properties["Status"].status?.name
          : "";

      const label =
        d.properties["For what"].type === "select"
          ? {
              name: d.properties["For what"].select?.name,
              color: d.properties["For what"].select?.color,
            }
          : {};

      return { id, title, status, label };
    } else {
      return undefined;
    }
  });

  const result = [...filterd_home, ...filterd_works];

  const in_review = result.filter((d) => d?.status === "Next");
  const in_progress = result.filter((d) => d?.status === "In progress");
  const completed = result.filter((d) => d?.status === "Done");

  return {
    result: {
      in_review,
      in_progress,
      completed,
    },
  };
};

const fetchBlocks = async (
  blockId: string,
  depth: number,
): Promise<BlockWithChildren[]> => {
  const blocks = (
    await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: blockId,
    })
  ).filter(isFullBlock);

  if (depth >= 2) {
    return blocks;
  }

  return Promise.all(
    blocks.map(async (block) =>
      block.has_children
        ? { ...block, children: await fetchBlocks(block.id, depth + 1) }
        : block,
    ),
  );
};

export const getPageById = async (id: string): Promise<BlockWithChildren[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag(`blog-${id}`);

  return fetchBlocks(id, 0);
};

export const tagColor = (color: SelectColor) => {
  switch (color) {
    case "gray":
      return "bg-[#454B4E]";
    case "brown":
      return "bg-[#434040]";
    case "orange":
      return "bg-[#594A3A]";
    case "yellow":
      return "bg-[#59563B]";
    case "green":
      return "bg-[#354C4B]";
    case "blue":
      return "bg-[#364954]";
    case "purple":
      return "bg-[#443F57]";
    case "pink":
      return "bg-[#533B4C]";
    case "red":
      return "bg-[#594141]";
    case "default":
      return "bg-[#454B4E]";
  }
};
