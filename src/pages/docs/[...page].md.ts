import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const HREF_OF = (id: string) => `/docs/${id}`.replace(/\/$/, "");

export async function getStaticPaths() {
  const entries = await getCollection("docs");
  return entries.map((entry) => ({
    params: { page: entry.id },
    props: { href: HREF_OF(entry.id), entryId: entry.id },
  }));
}

/**
 * 任意页面的原始 Markdown 镜像：`/docs/xxx` -> `/docs/xxx.md`。
 * 给智能体用的「无需解析 HTML」入口。
 */
export const GET: APIRoute = async ({ props, site }) => {
  const { href, entryId } = props as { href: string; entryId: string };
  const entries = await getCollection("docs");
  const entry = entries.find((e) => e.id === entryId);
  if (!entry) return new Response("Not found", { status: 404 });

  const origin = site?.href.replace(/\/$/, "") ?? "";
  const text = [
    `# ${entry.data.title}`,
    `Source: ${origin}${href}`,
    `English: ${entry.data.source ?? "https://useblume.dev/docs"}`,
    "",
    (entry.body ?? "").trim(),
  ].join("\n");

  return new Response(text, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
