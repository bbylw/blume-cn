import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { navGroups, slugToHref } from "../lib/nav";

interface SearchDoc {
  href: string;
  title: string;
  group: string;
  description: string;
  headings: string[];
  text: string;
}

const GROUP_OF = new Map<string, string>();
for (const g of navGroups) {
  for (const i of g.items) GROUP_OF.set(i.href, g.title);
}

/** 把 Markdown 压成便于索引的纯文本 */
function toPlain(md: string): string {
  return md
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[#>\-*+|:\s]+/gm, " ")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const GET: APIRoute = async () => {
  const entries = await getCollection("docs", ({ data }) => !data.noindex);

  const docs: SearchDoc[] = entries.map((entry) => {
    const href = slugToHref(entry.id);
    const body = entry.body ?? "";
    const headings = [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => {
      return (m[1] ?? "").replace(/\s*\[#[\w-]+\]\s*$/, "").trim();
    });

    return {
      href,
      title: entry.data.title,
      group: GROUP_OF.get(href) ?? "文档",
      description: entry.data.description ?? "",
      headings,
      text: toPlain(body).slice(0, 3000),
    };
  });

  return new Response(JSON.stringify(docs), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
