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
  // 目录式产物（GitHub Pages 默认）：/docs/quickstart/ 直接命中 index.html
  trailingSlash: "always",
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
    "/compare": "/docs/faq",
    "/changelog": "/docs/advanced/changelog",
  },
});
