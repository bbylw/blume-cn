import type { APIContext, APIRoute } from "astro";
import { getCollection } from "astro:content";
import { navGroups, navItems, slugToHref } from "../lib/nav";

export const prerender = true;

const HREF_OF = (id: string) => slugToHref(id);

/** llms.txt 索引 —— 给编程智能体与聊天助手的站点地图 */
export const GET: APIRoute = async ({ site }: APIContext) => {
  const entries = await getCollection("docs", ({ data }) => !data.noindex);
  const byHref = new Map(entries.map((e) => [HREF_OF(e.id), e]));

  const origin = site?.href.replace(/\/$/, "") ?? "";
  const lines: string[] = [
    "# Blume 中文文档",
    "",
    "> 面向人类与智能体的开源文档框架（Blume）的简体中文完整镜像。",
    "> 框架本身即模板：把 Markdown 或 MDX 丢进一个文件夹即可得到生产级文档站点。",
    "",
    "英文原文：https://useblume.dev/docs",
    "本翻译由社区维护，以英文原文为准。",
    "",
  ];

  for (const group of navGroups) {
    lines.push(`## ${group.title}`, "");
    for (const item of group.items) {
      const entry = byHref.get(item.href);
      const url = `${origin}${item.href}`;
      const desc = entry?.data.description ?? item.description;
      lines.push(`- [${item.title}](${url}): ${desc}`);
    }
    lines.push("");
  }

  lines.push("## 智能体资源", "");
  lines.push(`- [llms-full.txt](${origin}/llms-full.txt): 全部页面的完整 Markdown 语料。`);
  lines.push(`- [RSS 订阅](${origin}/rss.xml): 文档更新订阅源。`);
  lines.push(`- [JSON API](${origin}/api/docs/pages.json): 页面索引、导航与搜索接口。`);
  lines.push("");
  lines.push(`页面总数：${navItems.length}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
