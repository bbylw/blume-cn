import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** 侧边栏显示名，默认取 nav.ts */
    sidebar: z
      .object({
        label: z.string().optional(),
        order: z.number().optional(),
        hidden: z.boolean().optional(),
      })
      .optional(),
    /** 覆盖 nav.ts 中的标题（用于展示更短的名字） */
    navTitle: z.string().optional(),
    /** 原始英文页面地址，便于对照 */
    source: z.string().url().optional(),
    /** 从 llms.txt / sitemap 中排除 */
    noindex: z.boolean().optional(),
    /** 高亮为「新版」 */
    badge: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { docs };
