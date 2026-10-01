import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { slugToHref } from "../lib/nav";

export const prerender = true;

export const GET: APIRoute = async (context) => {
  // 内容目前没有 updated 日期，按它排序是空转；条目保持内容集合顺序
  const entries = await getCollection("docs");

  return rss({
    title: "Blume 中文文档",
    description: "面向人类与智能体的开源文档框架 —— 简体中文完整镜像。",
    site: context.site ?? "https://blume.ndjp.net",
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? "",
      link: slugToHref(entry.id),
      pubDate: entry.data.updated,
    })),
    customData: `<language>zh-CN</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
};
