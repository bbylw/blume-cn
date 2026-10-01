/// <reference types="astro/client" />

// 裸 tsc 解析不了 .astro 导入（Astro 只在自己的语言服务里提供 .astro 类型），
// 没有这条声明 `tsc --noEmit` 会在每个 .astro 导入上报 TS2307。
// .astro 内部的真实类型检查由 `astro check` 负责。
declare module "*.astro" {
  const component: (props: Record<string, unknown>) => unknown;
  export default component;
}
