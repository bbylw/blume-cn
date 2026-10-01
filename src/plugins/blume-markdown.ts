import { defineMdastPlugin, defineHastPlugin } from "satteri";
import type { Element, Text } from "hast";
import type { BlockContent, Code } from "mdast";

interface ContainerDirective {
  type: "containerDirective";
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: BlockContent[];
}

/** Sätteri 的结构化替换不接受已存在的节点引用，子节点必须深拷贝。 */
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

/* ============================================================
   1. `:::note … :::`  ->  <Callout type="note">
   ============================================================ */
const CALLOUT_TYPES = new Set(["note", "tip", "warning", "danger", "info", "success"]);

const CALLOUT_TITLES: Record<string, string> = {
  note: "说明",
  tip: "提示",
  warning: "注意",
  danger: "危险",
  info: "信息",
  success: "成功",
};

export const blumeCallouts = defineMdastPlugin({
  name: "blume-callouts",
  containerDirective(raw: unknown, ctx) {
    const node = raw as ContainerDirective;
    const type = node.name;
    if (!CALLOUT_TYPES.has(type)) return;

    ctx.replaceNode(node as never, {
      type: "mdxJsxFlowElement",
      name: "Callout",
      attributes: [
        { type: "mdxJsxAttribute", name: "type", value: type },
        {
          type: "mdxJsxAttribute",
          name: "title",
          value: node.attributes?.title ?? CALLOUT_TITLES[type] ?? "说明",
        },
      ],
      children: clone(node.children),
    } as never);
  },
});

/* ============================================================
   2. ```package-install / ```mermaid  ->  组件
   ============================================================ */
export const blumeCodeFences = defineMdastPlugin({
  name: "blume-code-fences",
  code(node: Code, ctx) {
    const lang = node.lang?.split(/\s+/)[0];
    if (lang !== "package-install" && lang !== "mermaid") return;

    ctx.replaceNode(node, {
      type: "mdxJsxFlowElement",
      name: lang === "package-install" ? "PackageInstall" : "Mermaid",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: lang === "package-install" ? "code" : "chart",
          value: node.value,
        },
      ],
      children: [],
    } as never);
  },
});

/* ============================================================
   3. `$$…$$` / `$…$`  ->  <MathBlock> / <MathInline>
   ============================================================ */
export const blumeMath = defineMdastPlugin({
  name: "blume-math",
  math(node, ctx) {
    ctx.replaceNode(node, {
      type: "mdxJsxFlowElement",
      name: "MathBlock",
      attributes: [{ type: "mdxJsxAttribute", name: "value", value: node.value }],
      children: [],
    } as never);
  },
  inlineMath(node, ctx) {
    ctx.replaceNode(node, {
      type: "mdxJsxTextElement",
      name: "MathInline",
      attributes: [{ type: "mdxJsxAttribute", name: "value", value: node.value }],
      children: [],
    } as never);
  },
});

/* ============================================================
   4. `#### 标题 [#anchor]`  ->  显式 id + 锚点链接
   ============================================================ */
const ANCHOR_RE = /\s*\[#([\w-]+)\]\s*$/;

export const blumeHeadingAnchors = defineHastPlugin({
  name: "blume-heading-anchors",
  element: {
    filter: ["h2", "h3", "h4"],
    visit(node: Readonly<Element>, ctx) {
      const children = node.children ?? [];
      const last = children[children.length - 1];
      let explicit: string | undefined;

      if (last?.type === "text") {
        const match = ANCHOR_RE.exec((last as Text).value);
        if (match?.[1]) {
          explicit = match[1];
          const textNode = last as Text;
          ctx.replaceNode(textNode, {
            type: "text",
            value: textNode.value.slice(0, match.index),
          } as never);
        }
      }

      if (explicit) ctx.setProperty(node, "id", explicit);
      const id = explicit ?? (typeof node.properties?.id === "string" ? node.properties.id : "") ?? "";

      ctx.appendChild(node, {
        type: "element",
        tagName: "a",
        properties: { className: ["anchor-hash"], href: `#${id}`, ariaHidden: "true" },
        children: [{ type: "text", value: "#" }],
      } as never);
    },
  },
});

export const blumeMdastPlugins = [blumeCallouts, blumeCodeFences, blumeMath];
export const blumeHastPlugins = [blumeHeadingAnchors];
