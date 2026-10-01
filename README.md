# Blume 中文文档

[Blume](https://useblume.dev) 的简体中文文档站。63 个页面完整镜像英文原文，构建为纯静态 HTML。

## 技术栈

| | |
| --- | --- |
| 框架 | Astro 7（静态输出，Sätteri Markdown 处理器） |
| 内容 | MDX + Content Collections（glob loader） |
| 交互岛 | React 19（搜索、主题切换、图表） |
| 样式 | Tailwind CSS 4（`@theme` 令牌 + `@tailwindcss/typography`） |
| 语言 | TypeScript 6 |
| 运行时 | Bun |

## 命令

```bash
bun install

bun run dev        # 开发服务器
bun run build      # 构建到 dist/
bun run preview    # 预览上一次构建
bun run check      # astro check（类型检查）
```

## 目录

```
src/
├── components/
│   ├── mdx/        # MDX 组件：Callout、Card、Tabs、TypeTable、PackageInstall…
│   ├── react/      # React 岛：Search、ThemeToggle、Mermaid
│   ├── Header.astro / Sidebar.astro / TableOfContents.astro / Footer.astro
├── content/docs/   # 全部文档内容（MDX）
├── layouts/        # BaseLayout、DocsLayout
├── lib/nav.ts      # 导航结构：侧边栏、首页卡片、上下页的唯一数据源
├── pages/          # 路由与静态端点
├── plugins/        # Sätteri 插件：提示框、代码围栏、数学公式、标题锚点
└── styles/global.css
```

## 内容约定

- 每页 frontmatter 含 `title`、`description`、`source`（英文原文地址）。
- 正文里任何代码、标识符、路径都必须放在反引号内 —— MDX 会把裸露的 `{` 当作 JSX 表达式。
- 中文标题的 slug 与英文不同。凡被其它页面链接的标题，都要写成 `## 中文标题 [#english-slug]`。
- 导航以 `src/lib/nav.ts` 为准，新增页面时同步登记。

## AI 可读端点

| 路径 | 内容 |
| --- | --- |
| `/llms.txt` | 带描述的站点地图 |
| `/llms-full.txt` | 全部页面的完整 Markdown 语料 |
| `/docs/<路径>.md` | 单页的原始 Markdown |
| `/api/docs/pages.json` | 页面索引（标题、分组、Markdown 地址） |
| `/rss.xml` | 更新订阅源 |
| `/search-index.json` | 客户端搜索索引 |

## 部署

构建产物是纯静态文件，`dist/` 可直接托管到任意平台。站点来源地址由 `astro.config.mjs` 里的 `SITE_URL` 决定（默认 `https://blume.ndjp.net`）—— canonical、Open Graph、RSS 与 sitemap 都依赖它。自定义域名写在 `public/CNAME`。

线上地址：**https://blume.ndjp.net**

## 校对说明

本翻译为社区维护，以英文原文为准。若发现与 useblume.dev 不一致之处，请以原文为准。
