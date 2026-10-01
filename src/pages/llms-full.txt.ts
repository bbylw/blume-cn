import type { APIContext, APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const HREF_OF = (id: string) => `/docs/${id}`.replace(/\/$/, "");

/** llms-full.txt —— 全部页面的完整 Markdown 语料 */
export const GET: APIRoute = async ({ site }: APIContext) => {
  const entries = await getCollection("docs", ({ data }) => !data.noindex);
  const origin = site?.href.replace(/\/$/, "") ?? "";

  const chunks = entries.map((entry) => {
    const href = HREF_OF(entry.id);
    return [
      `# ${entry.data.title}`,
      `Source: ${origin}${href}`,
      `English: ${entry.data.source ?? "https://useblume.dev/docs"}`,
      "",
      (entry.body ?? "").trim(),
    ].join("\n");
  });

  return new Response(chunks.join("\n\n---\n\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
