/**
 * 站点导航结构 —— 侧边栏、首页卡片、上一页/下一页、搜索索引的唯一数据源。
 * 每一项都必须与 `src/content/docs/**` 下的文件一一对应。
 */

export interface NavItem {
  /** 侧边栏显示的标题 */
  title: string;
  /** 站内路径 */
  href: string;
  /** 首页卡片与搜索结果里的摘要 */
  description: string;
  /** Lucide 图标名（React 岛） */
  icon?: string;
  /** 侧边栏徽标，例如「新版」「进阶」 */
  badge?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  description: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    id: "start",
    title: "开始",
    description: "从零到上线，只需要几分钟。",
    items: [
      {
        title: "介绍",
        href: "/docs/",
        description: "Blume 是什么，以及它为什么这样设计。",
        icon: "Sparkles",
      },
      {
        title: "快速开始",
        href: "/docs/quickstart/",
        description: "安装、启动、开发、构建，四条命令跑通全流程。",
        icon: "Rocket",
      },
      {
        title: "部署",
        href: "/docs/deployment/",
        description: "把静态文档发往 Vercel、Netlify、Cloudflare 或自己的服务器。",
        icon: "UploadCloud",
      },
      {
        title: "迁移到 Blume",
        href: "/docs/migrating/",
        description: "一条命令把 Mintlify、Fumadocs、Docusaurus 交给智能体迁移。",
        icon: "PlaneTakeoff",
      },
      {
        title: "升级到 Blume 2",
        href: "/docs/upgrading/",
        description: "从 Blume 1 升级到大版本，逐项对照配置变更。",
        icon: "ArrowUpCircle",
      },
      {
        title: "常见问题",
        href: "/docs/faq/",
        description: "与 Mintlify、Fumadocs 等工具的对比，以及那些古怪的问题。",
        icon: "MessageCircleQuestion",
      },
    ],
  },
  {
    id: "content",
    title: "内容",
    description: "文件如何变成页面，导航如何自动推导。",
    items: [
      {
        title: "页面",
        href: "/docs/content/",
        description: "内容文件夹里的文件如何成为路由与页面。",
        icon: "FileText",
      },
      {
        title: "导航",
        href: "/docs/content/navigation/",
        description: "从文件推导侧边栏，并用 frontmatter 或配置精调。",
        icon: "ListTree",
      },
      {
        title: "文件夹元数据",
        href: "/docs/content/meta/",
        description: "用 meta.ts 设置侧边栏分组的标题、图标与顺序。",
        icon: "FolderCog",
      },
      {
        title: "Frontmatter",
        href: "/docs/content/frontmatter/",
        description: "页面接受的全部 frontmatter 字段，全部可选。",
        icon: "Braces",
      },
      {
        title: "语法",
        href: "/docs/content/syntax/",
        description: "Markdown 与 MDX 支持的全部能力：表格、提示框、代码块、公式。",
        icon: "Pilcrow",
      },
      {
        title: "引入",
        href: "/docs/content/includes/",
        description: "在页面之间复用共享的 Markdown、MDX 与代码片段。",
        icon: "Import",
      },
      {
        title: "变量",
        href: "/docs/content/variables/",
        description: "在配置里定义一次，用 {{name}} 在任意页面引用。",
        icon: "BracesIcon",
      },
      {
        title: "组件",
        href: "/docs/content/components/",
        description: "卡片、步骤、标签页、徽章、文件树、类型表等内置组件。",
        icon: "LayoutGrid",
      },
      {
        title: "交互组件",
        href: "/docs/content/islands/",
        description: "把 React / Vue / Svelte 组件放进 islands/ 即可在任意页面使用。",
        icon: "Waves",
      },
      {
        title: "国际化",
        href: "/docs/content/i18n/",
        description: "语言区域路由、按语言划分的导航、翻译后的界面与 SEO。",
        icon: "Languages",
      },
      {
        title: "版本控制",
        href: "/docs/content/versioning/",
        description: "为每次发布冻结一份文档快照，并提供版本切换器。",
        icon: "GitBranch",
      },
    ],
  },
  {
    id: "sources",
    title: "内容来源",
    description: "把远程 Markdown、CMS 与 Obsidian 仓库混进同一个站点。",
    items: [
      {
        title: "内容来源总览",
        href: "/docs/content/sources/",
        description: "适配器、共享选项、缓存快照与预览同步的总览。",
        icon: "Database",
      },
      {
        title: "Obsidian",
        href: "/docs/content/sources/obsidian/",
        description: "直接发布 Obsidian 仓库，wikilink 与图片在构建期解析。",
        icon: "BookOpen",
      },
      {
        title: "远程 MDX",
        href: "/docs/content/sources/remote-mdx/",
        description: "通过 HTTP 从 GitHub 仓库或 raw URL 抓取 Markdown 与 MDX。",
        icon: "CloudDownload",
      },
      {
        title: "GitHub Releases",
        href: "/docs/content/sources/github-releases/",
        description: "把仓库的 GitHub Release 变成更新日志条目。",
        icon: "Tag",
      },
      {
        title: "Sanity",
        href: "/docs/content/sources/sanity/",
        description: "用 GROQ 查询拉取数据集，Portable Text 自动转为 Markdown。",
        icon: "Database",
      },
      {
        title: "Notion",
        href: "/docs/content/sources/notion/",
        description: "导入 Notion 数据库：行变页面，属性变 frontmatter。",
        icon: "PanelsTopLeft",
      },
      {
        title: "Contentful",
        href: "/docs/content/sources/contentful/",
        description: "通过 Delivery API 读取内容类型，无需额外安装。",
        icon: "Database",
      },
      {
        title: "Payload",
        href: "/docs/content/sources/payload/",
        description: "通过 REST API 读取 Payload 集合，Lexical 正文转 Markdown。",
        icon: "Database",
      },
      {
        title: "Strapi",
        href: "/docs/content/sources/strapi/",
        description: "通过 REST API 读取 Strapi 4 与 Strapi 5 的内容类型。",
        icon: "Database",
      },
      {
        title: "自定义来源",
        href: "/docs/content/sources/custom/",
        description: "实现 ContentSource 接口，接入任意后端。",
        icon: "Plug",
      },
    ],
  },
  {
    id: "configuration",
    title: "配置",
    description: "blume.config.ts 里的每一项功能开关。",
    items: [
      {
        title: "配置文件",
        href: "/docs/configuration/",
        description: "站点元数据、内容来源与各功能指南的完整入口。",
        icon: "Settings2",
      },
      {
        title: "主题",
        href: "/docs/configuration/theming/",
        description: "配置令牌、theme.css 覆盖与 Tailwind 工具类。",
        icon: "Palette",
      },
      {
        title: "自定义",
        href: "/docs/configuration/customization/",
        description: "组件覆盖、交互岛、自定义页面、注册表组件与 eject。",
        icon: "Paintbrush",
      },
      {
        title: "搜索",
        href: "/docs/configuration/search/",
        description: "开箱即用的本地搜索，以及可随时切换的托管与语义搜索适配器。",
        icon: "Search",
      },
      {
        title: "助手",
        href: "/docs/configuration/assistant/",
        description: "基于你的文档的页内助手，含 OpenAI、Anthropic、Gemini 等适配器。",
        icon: "Sparkles",
      },
      {
        title: "速率限制",
        href: "/docs/configuration/rate-limiting/",
        description: "限制单个读者调用助手、API 演练场与服务器端搜索的频率。",
        icon: "Gauge",
      },
      {
        title: "朗读",
        href: "/docs/configuration/narration/",
        description: "「听本页」播放器，逐句朗读并高亮当前句子。",
        icon: "AudioLines",
      },
      {
        title: "分析",
        href: "/docs/configuration/analytics/",
        description: "第一方分析：Plausible、PostHog、Google Analytics 等适配器。",
        icon: "ChartNoAxesColumn",
      },
      {
        title: "Cookie 同意",
        href: "/docs/configuration/consent/",
        description: "在分析脚本运行前征得读者同意，内置横幅或托管平台。",
        icon: "ShieldCheck",
      },
      {
        title: "导出",
        href: "/docs/configuration/export/",
        description: "让读者把任意页面下载为 PDF 或 EPUB，纯客户端渲染。",
        icon: "FileDown",
      },
    ],
  },
  {
    id: "discoverability",
    title: "可发现性",
    description: "让搜索引擎、社交平台与编程智能体都能找到你。",
    items: [
      {
        title: "SEO 与 GEO",
        href: "/docs/discoverability/",
        description: "Blume 站点如何同时被搜索引擎与 AI 助手发现。",
        icon: "Compass",
      },
      {
        title: "元数据",
        href: "/docs/discoverability/metadata/",
        description: "title、description、canonical、Open Graph 与 X 卡片标签。",
        icon: "Tags",
      },
      {
        title: "Open Graph 图片",
        href: "/docs/discoverability/open-graph/",
        description: "构建期渲染的 1200×630 社交卡片。",
        icon: "Image",
      },
      {
        title: "结构化数据",
        href: "/docs/discoverability/structured-data/",
        description: "每个页面自带的 schema.org JSON-LD。",
        icon: "BracketsCurly",
      },
      {
        title: "RSS 订阅",
        href: "/docs/discoverability/rss/",
        description: "为每个带日期的内容类型生成一个订阅源。",
        icon: "Rss",
      },
      {
        title: "站点地图与 robots",
        href: "/docs/discoverability/sitemap-and-robots/",
        description: "sitemap.xml、robots.txt 与给 AI 爬虫的 Content-Signal。",
        icon: "Map",
      },
      {
        title: "llms.txt",
        href: "/docs/discoverability/llms-txt/",
        description: "为编程智能体与聊天助手生成的索引与全量语料。",
        icon: "FileType",
      },
      {
        title: "面向智能体的 Markdown",
        href: "/docs/discoverability/markdown/",
        description: "任意页面加 .md 即可取回原始 Markdown。",
        icon: "FileCode2",
      },
      {
        title: "JSON API",
        href: "/docs/discoverability/json-api/",
        description: "每个站点都附带的只读 JSON API 与 OpenAPI 描述。",
        icon: "Braces",
      },
      {
        title: "MCP 服务器",
        href: "/docs/discoverability/mcp/",
        description: "托管一个 MCP 服务器，让 Claude Code 与 Cursor 直接检索文档。",
        icon: "Network",
      },
      {
        title: "智能体发现",
        href: "/docs/discoverability/agent-discovery/",
        description: "机器可读清单、Link 头、RFC 9727 API 目录与 WebMCP。",
        icon: "ScanSearch",
      },
    ],
  },
  {
    id: "references",
    title: "API 参考",
    description: "把规范文件渲染成原生参考页面。",
    items: [
      {
        title: "OpenAPI",
        href: "/docs/references/openapi/",
        description: "每个操作一个真实页面，含 schema、鉴权与请求演练场。",
        icon: "FileJson",
      },
      {
        title: "AsyncAPI",
        href: "/docs/references/asyncapi/",
        description: "每个 send / receive 操作一个事件参考页面。",
        icon: "Radio",
      },
      {
        title: "GraphQL",
        href: "/docs/references/graphql/",
        description: "每个操作与每个类型一个原生参考页面。",
        icon: "Waypoints",
      },
      {
        title: "Scalar",
        href: "/docs/references/scalar/",
        description: "把 Scalar 自带的 API 参考界面嵌入单个路由。",
        icon: "PanelTop",
      },
      {
        title: "手写 API 页面",
        href: "/docs/references/api-pages/",
        description: "不用规范文件，直接用 MDX 写端点文档。",
        icon: "PenLine",
      },
    ],
  },
  {
    id: "cli",
    title: "命令行",
    description: "每一个 blume 命令、参数与用法。",
    items: [
      {
        title: "概览",
        href: "/docs/cli/",
        description: "全部命令、每个命令接受的参数，以及边跑边验证的方法。",
        icon: "Terminal",
      },
      {
        title: "doctor",
        href: "/docs/cli/doctor/",
        description: "构建前诊断配置与内容问题。",
        icon: "Stethoscope",
      },
      {
        title: "validate",
        href: "/docs/cli/validate/",
        description: "检查每个链接、锚点与资源，失效时让 CI 失败。",
        icon: "Link2",
      },
      {
        title: "audit",
        href: "/docs/cli/audit/",
        description: "爬取已构建站点，报告 SEO 与站点健康度问题。",
        icon: "ClipboardCheck",
      },
      {
        title: "eval",
        href: "/docs/cli/evals/",
        description: "让智能体只看文档回答问题，文档答不上来就让 CI 失败。",
        icon: "GraduationCap",
      },
      {
        title: "translate",
        href: "/docs/cli/translate/",
        description: "用本地智能体 CLI 补齐各语言区域，并守住翻译滞后。",
        icon: "Languages",
      },
      {
        title: "version",
        href: "/docs/cli/version/",
        description: "把当前文档冻结为一个归档版本。",
        icon: "Archive",
      },
    ],
  },
  {
    id: "advanced",
    title: "进阶",
    description: "脱离默认形态的玩法。",
    items: [
      {
        title: "智能体技能",
        href: "/docs/advanced/skills/",
        description: "随附的智能体技能，教编程智能体搭建并维护你的文档站点。",
        icon: "Bot",
      },
      {
        title: "自定义页面",
        href: "/docs/advanced/custom-pages/",
        description: "把完全自定义的 .astro 路由挂载到文档旁边。",
        icon: "LayoutTemplate",
      },
      {
        title: "更新日志",
        href: "/docs/advanced/changelog/",
        description: "把发布说明写成内容文件，自动获得时间线与 RSS。",
        icon: "History",
      },
      {
        title: "博客",
        href: "/docs/advanced/blog/",
        description: "把文章作为内容发布，自定义索引页。",
        icon: "Newspaper",
      },
    ],
  },
];

/** 全部页面（扁平），用于上一篇 / 下一篇与搜索。 */
export const navItems: NavItem[] = navGroups.flatMap((g) => g.items);

const hrefSet = new Set(navItems.map((i) => i.href));

export function getNavItem(href: string): NavItem | undefined {
  return navItems.find((i) => i.href === href);
}

/** 页面 slug（去掉 /docs 前缀与尾斜杠），例如 /docs/content/meta/ -> content/meta */
export function hrefToSlug(href: string): string {
  return href.replace(/^\/docs\/?/, "").replace(/\/$/, "");
}

/** 站内链接一律带尾斜杠：与 GitHub Pages 的目录式产物一一对应，避免 301 */
export function slugToHref(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return clean ? `/docs/${clean}/` : "/docs/";
}

/** 归一化任意来源的 href，用于比较（/docs/x 与 /docs/x/ 视为同一页） */
export function normalizeHref(href: string): string {
  if (href === "/docs" || href === "/docs/") return "/docs/";
  return href.replace(/\/+$/, "/");
}

export function isKnownPage(href: string): boolean {
  return hrefSet.has(href);
}
