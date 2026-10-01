import { useEffect, useRef, useState } from "react";

interface Props {
  chart: string;
  className?: string;
}

export default function Mermaid({ chart, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const id = `mmd-${Math.random().toString(36).slice(2, 10)}`;

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: document.documentElement.classList.contains("dark") ? "dark" : "neutral",
          fontFamily: "var(--font-sans)",
        });
        const { svg } = await mermaid.render(id, chart);
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = svg;
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="mermaid-error" data-mermaid-error>
        {chart}
      </pre>
    );
  }

  return <div ref={hostRef} className={className ?? "mermaid"} data-mermaid />;
}
