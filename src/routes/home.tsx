import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { listArticles } from "@/lib/articles";
import { principles } from "@/data/principles";
import { facts } from "@/data/facts";
import { Backdrop } from "@/components/backdrop";
import { useBerlinClock } from "@/lib/use-berlin-clock";

type View = "writings" | "principles" | "facts";

const TABS: { id: View; label: string; file: string }[] = [
  { id: "writings", label: "writing", file: "writing.md" },
  { id: "principles", label: "principles", file: "principles.ts" },
  { id: "facts", label: "facts", file: "facts.ts" },
];

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

/* ---------- Tiny syntax primitives ---------- */
const K = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--kw)" }}>{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--str)" }}>{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--comment)" }}>{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--punct)" }}>{children}</span>;

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: "rgba(255,255,255,0.72)",
        border: "1px solid var(--hairline)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 20px 60px rgba(17,17,18,0.10), 0 2px 8px rgba(17,17,18,0.04)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid var(--hairline)" }}
      >
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span className="ml-2 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export function Home() {
  const articles = listArticles();
  const [view, setView] = useState<View>("writings");
  const time = useBerlinClock();

  useEffect(() => {
    document.title = "Paulo Ramirez — Builder, Engineer, Designer";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "1") setView("writings");
      if (e.key === "2") setView("principles");
      if (e.key === "3") setView("facts");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <div className="grid-bg" aria-hidden="true" />
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 sm:py-24">
        {/* ---------- Hero window ---------- */}
        <div className="rise">
          <Window title="~/paulo-ramirez — zsh">
            <div className="flex items-start justify-between gap-5 p-5 sm:p-6">
              <div className="min-w-0 flex-1 font-mono text-[13px] leading-[1.9]">
                <div style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--str)" }}>$</span> whoami
                </div>
                <h1
                  className="my-1 font-sans text-[34px] leading-[1.0] sm:text-[42px]"
                  style={{ fontWeight: 800, letterSpacing: "-0.045em", color: "var(--ink)" }}
                >
                  Paulo Ramirez
                </h1>

                <div className="mt-3">
                  <K>const</K> <span style={{ color: "var(--ink)" }}>role</span> <P>=</P> <P>[</P>
                  <S>"builder"</S><P>,</P> <S>"engineer"</S><P>,</P> <S>"designer"</S><P>]</P>
                </div>
                <div>
                  <K>const</K> <span style={{ color: "var(--ink)" }}>location</span> <P>=</P> <S>"Berlin, DE"</S>
                  <span className="ml-2"><C>// {time}</C></span>
                </div>

                <div className="mt-4" style={{ color: "var(--comment)" }}>
                  <C>{"// I craft calm, considered software — obsessing over"}</C>
                  <br />
                  <C>{"// the details most people never notice."}</C>
                  <span className="cursor" aria-hidden="true" />
                </div>
              </div>

              <div className="hidden shrink-0 sm:block">
                <div
                  className="group"
                  style={{
                    padding: 4,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid var(--hairline)",
                    boxShadow: "0 8px 24px rgba(17,17,18,0.10)",
                    transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(3deg) scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
                >
                  <img
                    src="/three.png"
                    alt="Paulo Ramirez"
                    width={88}
                    height={88}
                    className="block object-cover"
                    style={{ borderRadius: 9 }}
                  />
                </div>
              </div>
            </div>
          </Window>
        </div>

        {/* ---------- Navigation (editor tabs) ---------- */}
        <nav
          className="rise rise-2 mt-10 flex flex-wrap items-end gap-1"
          role="tablist"
          aria-label="Sections"
        >
          {TABS.map((tab, i) => {
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setView(tab.id)}
                className="group flex items-center gap-2 rounded-t-lg px-3.5 py-2 font-mono text-[12px] transition-colors"
                style={{
                  color: active ? "var(--ink)" : "var(--faint)",
                  background: active ? "rgba(255,255,255,0.72)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "var(--hairline)" : "transparent",
                  borderBottom: active ? "1px solid rgba(255,255,255,0.72)" : "1px solid var(--hairline)",
                  marginBottom: -1,
                }}
              >
                <kbd
                  className="rounded px-1 text-[10px]"
                  style={{
                    background: active ? "var(--accent-soft)" : "rgba(17,17,18,0.05)",
                    color: active ? "var(--accent)" : "var(--faint)",
                  }}
                >
                  {i + 1}
                </kbd>
                {tab.file}
              </button>
            );
          })}
        </nav>

        {/* ---------- Content panel ---------- */}
        <section
          key={view}
          className="rounded-b-xl rounded-tr-xl"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid var(--hairline)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="p-4 sm:p-5">
            {view === "writings" ? (
              articles.length === 0 ? (
                <Empty>{"// nothing published yet — the good stuff is in the oven"}</Empty>
              ) : (
                <ul className="stagger flex flex-col">
                  {articles.map((article, idx) => {
                    const inner = (
                      <>
                        <span
                          className="w-6 shrink-0 select-none pt-0.5 text-right font-mono text-[11px] tabular-nums"
                          style={{ color: "var(--punct)" }}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span
                            className="flex items-center gap-1.5 text-[15px]"
                            style={{ fontWeight: 650, color: "var(--ink)", letterSpacing: "-0.02em" }}
                          >
                            {article.title}
                            {article.externalUrl ? (
                              <ArrowUpRight size={14} className="opacity-40 transition-opacity group-hover:opacity-100" />
                            ) : null}
                          </span>
                          {article.excerpt ? (
                            <span className="text-[13px] leading-[1.55]" style={{ color: "var(--muted)" }}>
                              {article.excerpt}
                            </span>
                          ) : null}
                        </div>
                        <span
                          className="shrink-0 whitespace-nowrap pt-0.5 font-mono text-[11px] tabular-nums"
                          style={{ color: "var(--faint)" }}
                        >
                          {formatDate(article.publishedAt)}
                        </span>
                      </>
                    );
                    const rowClass =
                      "group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-[rgba(91,75,255,0.05)]";
                    return (
                      <li key={article._id}>
                        {article.externalUrl ? (
                          <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
                            {inner}
                          </a>
                        ) : (
                          <Link to={`/writing/${article.slug}`} className={rowClass}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )
            ) : (
              (() => {
                const items = view === "principles" ? principles : facts;
                if (items.length === 0) return <Empty>{"// nothing here yet"}</Empty>;
                return (
                  <ol className="stagger flex flex-col gap-1">
                    {items.map((text, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg px-3 py-2.5">
                        <span
                          className="shrink-0 select-none pt-0.5 font-mono text-[11px] tabular-nums"
                          style={{ color: "var(--accent)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[14.5px] leading-[1.6]" style={{ color: "#33332f", letterSpacing: "-0.01em" }}>
                          {text}
                        </p>
                      </li>
                    ))}
                  </ol>
                );
              })()
            )}
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <footer
          className="rise rise-4 mt-10 flex items-center justify-between font-mono text-[11px]"
          style={{ color: "var(--faint)" }}
        >
          <span>
            <C>{"// press "}</C>
            <kbd className="rounded px-1" style={{ background: "rgba(17,17,18,0.05)" }}>1</kbd>
            <kbd className="ml-0.5 rounded px-1" style={{ background: "rgba(17,17,18,0.05)" }}>2</kbd>
            <kbd className="ml-0.5 rounded px-1" style={{ background: "rgba(17,17,18,0.05)" }}>3</kbd>
            <C>{" to switch"}</C>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rise px-3 py-6 font-mono text-[13px]" style={{ color: "var(--comment)" }}>
      {children}
    </p>
  );
}
