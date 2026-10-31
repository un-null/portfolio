import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { SelectColor } from "@/types/notion";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getAllWorks = async () => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_WORKS,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
  });

  const data = res.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;
      const public_url = d.public_url;

      const title =
        d.properties["Name"].type === "title"
          ? d.properties["Name"].title.map((title) => title.plain_text)
          : [];

      const date =
        d.properties["Date"].type === "date"
          ? d.properties["Date"].date?.start.substring(0, 4)
          : "";

      const github_url =
        d.properties["Github"].type === "url" ? d.properties["Github"].url : "";
      const langs =
        d.properties["Languages"].type === "multi_select"
          ? d.properties["Languages"].multi_select
          : [];
      return { id, public_url, title, date, github_url, langs };
    } else {
      return undefined;
    }
  });

  return {
    result: data,
  };
};

export const getAllBlogs = async () => {
  const req = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_BLOG,
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
  });

  const data = req.results.map((d) => {
    if (d.object === "page" && "properties" in d) {
      const id = d.id;
      const created_at = d.created_time;

      const title =
        d.properties["Name"].type === "title"
          ? d.properties["Name"].title.map((title) => title.plain_text)
          : [];
      const summary =
        d.properties["Summary"].type === "rich_text"
          ? d.properties["Summary"].rich_text.map((d) => d.plain_text)
          : [];
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
          ? d.properties["Name"].title.map((title) => title.plain_text)
          : [];

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
          ? d.properties["Name"].title.map((title) => title.plain_text)
          : [];

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

export const getPageById = async (id: string) => {
  const results = (
    await notion.blocks.children.list({
      block_id: id,
    })
  ).results;

  return results.filter((d) => "type" in d) as BlockObjectResponse[];
};

export const tagColor = (color: SelectColor) => {
  switch (color) {
    case (color = "gray"):
      return "bg-[#454B4E]";
    case (color = "brown"):
      return "bg-[#434040]";
    case (color = "orange"):
      return "bg-[#594A3A]";
    case (color = "yellow"):
      return "bg-[#59563B]";
    case (color = "green"):
      return "bg-[#354C4B]";
    case (color = "blue"):
      return "bg-[#364954]";
    case (color = "purple"):
      return "bg-[#443F57]";
    case (color = "pink"):
      return "bg-[#533B4C]";
    case (color = "red"):
      return "bg-[#594141]";
    case (color = "default"):
      return "bg-[#454B4E]";
  }
};
