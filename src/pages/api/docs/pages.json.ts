import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { navGroups, slugToHref } from "../../../lib/nav";

export const prerender = true;

const HREF_OF = (id: string) => slugToHref(id);

/** JSON API：页面索引，供 function-calling 框架与智能体消费 */
export const GET: APIRoute = async ({ site }) => {
  const entries = await getCollection("docs", ({ data }) => !data.noindex);
  const origin = site?.href.replace(/\/$/, "") ?? "";
  const groupOf = new Map<string, string>();
  for (const g of navGroups) for (const i of g.items) groupOf.set(i.href, g.title);

  const pages = entries.map((entry) => {
    const href = HREF_OF(entry.id);
    return {
      id: entry.id,
      href,
      url: `${origin}${href}`,
      markdown: `${origin}${href}.md`,
      title: entry.data.title,
      description: entry.data.description ?? "",
      group: groupOf.get(href) ?? "文档",
      updated: entry.data.updated?.toISOString(),
      source: entry.data.source,
    };
  });

  return new Response(
    JSON.stringify(
      {
        site: "Blume 中文文档",
        count: pages.length,
        generatedAt: new Date().toISOString(),
        pages,
      },
      null,
      2,
    ),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    },
  );
};
