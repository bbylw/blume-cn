import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const entries = (await getCollection("docs")).sort((a, b) =>
    (b.data.updated?.getTime() ?? 0) - (a.data.updated?.getTime() ?? 0),
  );

  return rss({
    title: "Blume 中文文档",
    description: "面向人类与智能体的开源文档框架 —— 简体中文完整镜像。",
    site: context.site ?? "https://blume.ndjp.net",
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? "",
      link: `/docs/${entry.id}`.replace(/\/$/, ""),
      pubDate: entry.data.updated,
    })),
    customData: "<language>zh-CN</language>",
  });
};
