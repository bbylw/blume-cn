import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Doc {
  href: string;
  title: string;
  group: string;
  description: string;
  headings: string[];
  text: string;
}

interface Hit {
  doc: Doc;
  score: number;
  snippet: string;
}

/** 中文没有空格，额外索引单字与二元组 */
function tokenize(query: string): string[] {
  const tokens = new Set<string>();
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  for (const part of lower.split(/\s+/)) {
    tokens.add(part);
    const cjk = part.replace(/[^\p{Script=Han}]/gu, "");
    for (const ch of cjk) tokens.add(ch);
    for (let i = 0; i + 1 < cjk.length; i++) tokens.add(cjk.slice(i, i + 2));
  }
  tokens.delete("");
  return [...tokens];
}

function snippetOf(doc: Doc, tokens: string[]): string {
  const hay = `${doc.title}。${doc.description}。${doc.headings.join("。")}。${doc.text}`;
  const lower = hay.toLowerCase();
  let at = -1;
  for (const t of tokens) {
    const i = lower.indexOf(t);
    if (i >= 0 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return doc.description;
  const start = Math.max(0, at - 45);
  return `${start > 0 ? "…" : ""}${hay.slice(start, start + 130)}…`;
}

function scoreDoc(doc: Doc, raw: string, tokens: string[]): number {
  const title = doc.title.toLowerCase();
  const desc = doc.description.toLowerCase();
  const heads = doc.headings.join(" ").toLowerCase();
  const text = doc.text.toLowerCase();

  if (!title.includes(raw)) {
    // 标题里必须至少有一个 token 命中，避免全库噪音
    if (!tokens.some((t) => title.includes(t))) return 0;
  }

  let score = 0;
  if (title === raw) score += 120;
  if (title.includes(raw)) score += 60;
  for (const t of tokens) {
    if (t.length < 2) {
      if (title.includes(t)) score += 6;
      if (desc.includes(t)) score += 3;
      if (heads.includes(t)) score += 2;
      continue;
    }
    if (title.includes(t)) score += 18;
    if (desc.includes(t)) score += 9;
    if (heads.includes(t)) score += 7;
    if (text.includes(t)) score += 3;
  }
  return score;
}

export default function Search() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (docs !== null) return;
    const ctrl = new AbortController();
    void fetch("/search-index.json", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data: Doc[]) => setDocs(data))
      .catch(() => undefined);
    return () => ctrl.abort();
  }, [docs]);

  const hits = useMemo<Hit[]>(() => {
    const raw = query.toLowerCase().trim();
    if (!docs || raw.length === 0) return [];
    const tokens = tokenize(raw);
    return docs
      .map((doc) => ({ doc, score: scoreDoc(doc, raw, tokens) }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((h) => ({ ...h, snippet: snippetOf(h.doc, tokens) }));
  }, [docs, query]);

  const show = useCallback(() => {
    setOpen(true);
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isK = event.key === "k" && (event.metaKey || event.ctrlKey);
      if (isK) {
        event.preventDefault();
        open ? hide() : show();
        return;
      }
      if (event.key === "/" && !open && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        show();
        return;
      }
      if (!open) return;
      if (event.key === "Escape") hide();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, hits.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Enter") {
        const target = hits[active];
        if (target) window.location.href = target.doc.href;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, active, show, hide]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, hits]);

  const go = (href: string) => {
    window.location.href = href;
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="group flex h-9 w-full max-w-[19rem] items-center gap-2 rounded-lg border border-line bg-bg-subtle px-2.5 text-left text-sm text-fg-subtle transition-colors hover:border-line-strong hover:text-fg-muted"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <circle cx="7" cy="7" r="4.25" />
          <path d="m10.2 10.2 3 3" />
        </svg>
        <span className="flex-1 truncate">搜索文档…</span>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-950/45 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) hide();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="搜索文档"
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="shrink-0 text-fg-subtle" aria-hidden="true">
                <circle cx="7" cy="7" r="4.25" />
                <path d="m10.2 10.2 3 3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="搜索页面、标题与正文…"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-fg-subtle"
                autoComplete="off"
              />
              <button type="button" onClick={hide} className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-subtle hover:text-fg">
                ESC
              </button>
            </div>

            <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-1.5">
              {hits.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-fg-subtle">
                  {query ? "没有找到相关内容，试试别的关键词。" : "输入关键词开始搜索。"}
                </li>
              )}
              {hits.map((hit, i) => (
                <li key={hit.doc.href}>
                  <button
                    type="button"
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(hit.doc.href)}
                    className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors data-[active=true]:bg-accent-soft"
                  >
                    <span className="flex w-full items-center gap-2">
                      <span className="truncate text-sm font-semibold text-fg">{hit.doc.title}</span>
                      <span className="shrink-0 rounded bg-bg-muted px-1.5 py-0.5 text-[10px] text-fg-subtle">{hit.doc.group}</span>
                    </span>
                    <span className="line-clamp-2 w-full text-xs leading-relaxed text-fg-muted">{hit.snippet}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-line bg-bg-subtle px-4 py-2 text-[11px] text-fg-subtle">
              <span>↑↓ 选择 · Enter 打开</span>
              <span>本地索引，无需联网</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
