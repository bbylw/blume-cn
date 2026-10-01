// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";
import { blumeMdastPlugins, blumeHastPlugins } from "./src/plugins/blume-markdown.ts";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://blume.ndjp.net",
  trailingSlash: "ignore",
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({
      mdastPlugins: blumeMdastPlugins,
      hastPlugins: blumeHastPlugins,
      features: {
        directive: true,
        math: true,
        gfm: true,
      },
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
      defaultColor: false,
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  redirects: {
    // 「内容源」是一个分组，没有独立页面；指向自定义来源作为总览入口
    "/docs/content/sources": "/docs/content/sources/custom",
    "/compare": "/docs/faq",
    "/changelog": "/docs/advanced/changelog",
  },
});
