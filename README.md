# Blume

[![npm 下载量](https://img.shields.io/npm/dm/blume.svg)](https://www.npmjs.com/package/blume) [![Socket 徽章](https://badge.socket.dev/npm/package/blume/latest)](https://socket.dev/npm/package/blume/overview/latest) ![CodeRabbit 代码评审](https://img.shields.io/coderabbit/prs/github/haydenbleasel/blume?utm_source=oss&utm_medium=github&utm_campaign=haydenbleasel%2Fblume&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

**面向人类与智能体开源的文档框架。** 快速、AI 就绪、零配置。永久免费且开源。

把 Markdown 或 MDX 文件丢进文件夹，启动开发服务器，就能得到一个生产级的文档站点 —— 导航、搜索、主题、Open Graph 图片，以及丰富的组件库 —— 无需编写或维护任何应用样板。Blume 会为你生成并驱动一个隐藏的 Astro 项目；当你想要完全掌控时，运行 `npx blume eject` 即可获得一个独立的 Astro 应用。

**[文档](https://useblume.dev)** · [快速开始](https://useblume.dev/docs/quickstart) · [组件](https://useblume.dev/docs/content/components) · [命令行](https://useblume.dev/docs/cli)

## 快速开始

Blume 需要 **Node.js 22.12 或更高版本**，以及一个至少包含一个 `.md`/`.mdx` 文件的内容文件夹 —— 除此之外无需任何额外配置。

```bash
npx blume init
```

它会生成 `docs/index.mdx` 与 `blume.config.ts`，向新的 `package.json` 添加 `dev` 与 `build` 脚本，并安装依赖。运行带热重载的开发服务器：

```bash
npm run dev
```

将静态 HTML 连同本地搜索索引一并构建到 `dist/`：

```bash
npm run build
```

如果项目中已经存在 `package.json`，`blume init` 不会改动它：你可以手动把 `"dev": "blume dev"` 与 `"build": "blume build"` 加进它的脚本，或者直接运行 `npx blume dev`。Blume 兼容任何包管理器，也绝不需要你亲自搭建 Astro 或 Tailwind。

要从其他文档框架迁移过来？`npx blume migrate` 会把 Mintlify、Fumadocs、Docusaurus、Starlight 或 Nextra 站点交给 Claude Code 或 Codex 处理 —— 参见 [迁移到 Blume](https://useblume.dev/docs/migrating)。在 Blume 1 上，运行 `npx blume@latest upgrade` —— 参见 [升级到 Blume 2](https://useblume.dev/docs/upgrading)。

## 特性

- **零配置，连模板都是** —— 一个文档文件夹就是一个完整的项目。无需克隆起始模板，无需学习框架。配置是按需启用的，一次只改一个文件。
- **默认即快速** —— 基于 Astro 与 Vite 的静态 HTML；核心主题不携带任何客户端框架 JS，因此页面开箱即可取得良好的 Core Web Vitals 评分。
- **类型安全的配置** —— `blume.config.ts` 与每一个 `meta.ts` 都是真正的 TypeScript，由 schema 校验，并用 `defineConfig` / `defineMeta` 编写，于是你的编辑器能在构建之前就发现错误。
- **组件，无需导入** —— 卡片、分栏、步骤、标签页、手风琴、徽章、代码组、图文框、文件树、类型表、实时组件预览、差异对比等等，可在任意 MDX 页面中使用。
- **本地搜索** —— Orama 在开发与生产环境均运行，无需任何托管服务；FlexSearch、Pagefind、Algolia、Typesense、Orama Cloud 与 Mixedbread 只差一个适配器（`search: pagefind()`，来自 `blume/search`）。
- **AI 就绪** —— `llms.txt` / `llms-full.txt`、任意 `.md` URL 下的原始 Markdown、JSON 文档 API、复制为 Markdown、在聊天中打开、可选的页内助手，以及一个托管的 MCP 服务器，让编程智能体能够直接搜索和阅读你的文档。
- **智能体技能** —— Blume 随附 [智能体技能](https://useblume.dev/docs/advanced/skills)，教会编程智能体搭建、编写并维护你的文档站点。
- **内容来源** —— 将本地文件与远程 MDX、GitHub Releases、Notion、Sanity、Contentful、Payload、Strapi 或任意自定义后端混合进同一个站点。
- **国际化** —— 把翻译好的文件就位，即可获得感知语言区域的路由、按语言划分的导航、翻译后的界面与 SEO。
- **SEO** —— 元信息、Open Graph 图片（构建期由 Takumi 渲染）、站点地图、`robots.txt`、RSS 订阅源与 JSON-LD，全部内置。
- **API 参考** —— 用 `blume/reference` 中的 `openapi()`、`asyncapi()` 与 `graphql()` 把 OpenAPI、AsyncAPI 与 GraphQL 规范渲染成原生参考页面（每个操作一页，含 schema、鉴权与请求演练场），或用 `scalar()` 嵌入 Scalar 的界面。
- **导出** —— 让读者把任意页面下载为 PDF 或 EPUB，完全在客户端完成，因此静态构建依然保持静态。
- **自定义** —— 组件覆盖、React 孤岛、自定义页面、Tailwind v4 主题令牌与 `theme.css`，以及源组件注册表（`blume add`）。
- **弹出（Eject）** —— `npx blume eject` 会生成一个独立的 Astro 项目，且仍使用 `blume` 包。

## 命令行

| 命令 | 说明 |
| --- | --- |
| `blume init [dir]` | 搭建项目（默认交互式）。 |
| `blume dev` | 启动带热重载的开发服务器。 |
| `blume build` | 构建静态（或服务端）站点。 |
| `blume preview` | 预览上一次构建的结果。 |
| `blume add <item>` | 从注册表安装一个源组件。 |
| `blume sync` | 重新拉取远程内容来源并重新生成。 |
| `blume eject` | 将运行时提升为独立的 Astro 应用。 |
| `blume check` | 用 `astro check` 对文档站点做类型检查。 |
| `blume validate` | 校验内部链接、锚点、资源与外部链接。 |
| `blume doctor` | 诊断配置与内容问题。 |
| `blume audit` | 审计已构建站点在 SEO 与健康度方面的问题。 |
| `blume eval` | 测试文档：由一个智能体仅依据文档本身回答你的问题。 |
| `blume translate` | 用本地智能体 CLI 把文档翻译成已配置的语言区域。 |
| `blume version [id]` | 把当前文档冻结为一个归档版本（不带 id 则列出已配置的版本）。 |
| `blume migrate [source]` | 借助 Claude Code 或 Codex，把 Mintlify、Fumadocs、Docusaurus、Starlight 或 Nextra 站点迁移到 Blume。 |
| `blume upgrade` | 升级到新的大版本：先升级 `blume`，再列出遗留的配置变更，或交给 Claude Code / Codex 处理。 |

通过你的包管理器运行（`npx blume <命令>`）或 `package.json` 脚本运行。关于每一个标志，请参阅 [命令行参考](https://useblume.dev/docs/cli)。

## 工作原理

Blume 命令行会加载 `blume.config.ts`，将你的内容扫描成一张图，并在 `.blume/` 下生成一个隐藏的 Astro 项目，由它在开发与构建时驱动。Astro 通过一个全捕获页面渲染，该页面导入 Blume 内置的组件、生成的数据以及你的覆盖项。`.blume/` 在每次运行时重新生成 —— 只写入发生变化的文件，因此热重载依然迅速 —— 直到你 `blume eject` 并接管它为止。

## 部署

`blume build` 会将静态 HTML 输出到 `dist/`，可部署到任意静态托管（Vercel、Netlify、Cloudflare Pages、GitHub Pages、S3 + CloudFront，或任意 CDN）。对于需要请求期特性的功能（如助手或 MCP 服务器），请在 `blume.config.ts` 中从 `blume/deploy` 指定一个托管适配器，这会把构建切换为服务端输出：

```ts
import { defineConfig } from "blume";
import { vercel } from "blume/deploy";

export default defineConfig({
  deployment: vercel(),
});
```

| 适配器 | 用途 |
| --- | --- |
| `vercel()` | Vercel |
| `netlify()` | Netlify Functions |
| `node()` | 自托管的 Node 服务器、容器 |
| `cloudflare()` | Cloudflare Workers 与 Pages |

在 Vercel、Netlify 与 Cloudflare Pages 上，站点 URL 会自动探测到。而适配器本身永远不会被自动探测：必须在 `blume.config.ts` 中显式指定。

## 兼容性

| 要求 | 支持情况 |
| --- | --- |
| Node | 22.12+ |
| 包管理器 | Bun、pnpm、npm、yarn |
| 适配器 | Vercel、Netlify、Node、Cloudflare |

## 开发

本仓库是一个 monorepo：已发布的包位于 `packages/blume`，而 `apps/docs` 是 Blume 自己的文档站点，由 Blume 自身构建。

```bash
bun install
bun run check       # lint + 格式化（Ultracite）
bun run typecheck
bun run test
```

关于架构与约定，请参阅 [CONTRIBUTING.md](https://github.com/haydenbleasel/blume/blob/main/.github/CONTRIBUTING.md)。

## 许可证

[MIT](https://github.com/haydenbleasel/blume/blob/main/LICENSE) © Hayden Bleasel
