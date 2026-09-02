import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { listArticles } from "@/lib/articles";
import { principles } from "@/data/principles";
import { facts } from "@/data/facts";
import { Backdrop } from "@/components/backdrop";
import { useBerlinClock } from "@/lib/use-berlin-clock";

type View = "writings" | "principles" | "facts";

const TABS: { id: View; label: string }[] = [
  { id: "writings", label: "Writing" },
  { id: "principles", label: "Principles" },
  { id: "facts", label: "Facts" },
];

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Segmented({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const refs = useRef<Record<View, HTMLButtonElement | null>>({
    writings: null,
    principles: null,
    facts: null,
  });
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = refs.current[view];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [view]);

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-full p-1"
      role="tablist"
      aria-label="Sections"
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid var(--hairline)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 1px 2px rgba(17,17,18,0.04)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: pill.left,
          width: pill.width,
          top: 4,
          bottom: 4,
          background: "var(--ink)",
          transition: "left 380ms cubic-bezier(0.16,1,0.3,1), width 380ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {TABS.map((tab) => {
        const active = view === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => (refs.current[tab.id] = el)}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className="relative z-10 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200"
            style={{ color: active ? "#fff" : "var(--muted)" }}
          >
            {tab.label}
          </button>
        );
      })}
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

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-20 sm:py-28">
        {/* ---------- Hero ---------- */}
        <header className="rise flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid var(--hairline)",
                color: "var(--muted)",
              }}
            >
              <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--mint)" }} />
              Available for the right thing
            </div>

            <h1
              className="text-[44px] leading-[0.95] sm:text-[58px]"
              style={{ fontWeight: 800, letterSpacing: "-0.05em" }}
            >
              Paulo
              <br />
              Ramirez
            </h1>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--faint)" }}>
              Builder<span className="mx-1.5" style={{ color: "var(--accent)" }}>/</span>
              Engineer<span className="mx-1.5" style={{ color: "var(--accent)" }}>/</span>
              Designer
            </p>
          </div>

          <div className="shrink-0">
            <div
              className="group relative"
              style={{
                padding: 5,
                borderRadius: 20,
                background: "rgba(255,255,255,0.7)",
                border: "1px solid var(--hairline)",
                boxShadow: "0 12px 40px rgba(17,17,18,0.10), 0 2px 8px rgba(17,17,18,0.04)",
                transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(3deg) scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
            >
              <img
                src="/three.png"
                alt="Paulo Ramirez"
                width={104}
                height={104}
                className="block object-cover"
                style={{ borderRadius: 15 }}
              />
            </div>
          </div>
        </header>

        {/* ---------- Intro ---------- */}
        <p
          className="rise rise-1 mt-10 max-w-md text-[17px] leading-[1.6]"
          style={{ color: "var(--muted)", fontWeight: 500, letterSpacing: "-0.015em" }}
        >
          I craft calm, considered software — obsessing over the details most
          people never notice, so the whole thing simply feels right.
        </p>

        {/* ---------- Meta strip ---------- */}
        <div
          className="rise rise-2 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]"
          style={{ color: "var(--faint)" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--warm)" }} />
            Berlin, DE
          </span>
          <span aria-hidden="true">·</span>
          <span style={{ color: "var(--muted)" }}>{time}</span>
          <span aria-hidden="true">·</span>
          <span>52.52°N 13.40°E</span>
        </div>

        {/* ---------- Navigation ---------- */}
        <nav className="rise rise-3 mt-16">
          <Segmented view={view} onChange={setView} />
        </nav>

        {/* ---------- Content ---------- */}
        <section key={view} className="mt-8">
          {view === "writings" ? (
            articles.length === 0 ? (
              <Empty>Nothing published yet — the good stuff is in the oven.</Empty>
            ) : (
              <ul className="stagger">
                {articles.map((article) => {
                  const inner = (
                    <>
                      <div className="flex min-w-0 flex-col gap-1">
                        <span
                          className="flex items-center gap-1.5 text-[16px]"
                          style={{ fontWeight: 650, color: "var(--ink)", letterSpacing: "-0.02em" }}
                        >
                          {article.title}
                          {article.externalUrl ? (
                            <ArrowUpRight size={14} className="opacity-40 transition-opacity group-hover:opacity-100" />
                          ) : null}
                        </span>
                        {article.excerpt ? (
                          <span className="text-[13.5px] leading-[1.55]" style={{ color: "var(--muted)" }}>
                            {article.excerpt}
                          </span>
                        ) : null}
                      </div>
                      <span
                        className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.1em] sm:pt-1 sm:text-right"
                        style={{ color: "var(--faint)" }}
                      >
                        {formatDate(article.publishedAt)}
                      </span>
                    </>
                  );
                  const rowClass =
                    "group relative flex flex-col gap-1 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-white/70 sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6";
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
              if (items.length === 0) return <Empty>Nothing here yet.</Empty>;
              return (
                <ol className="stagger flex flex-col gap-5">
                  {items.map((text, i) => (
                    <li key={i} className="flex gap-4 rounded-2xl px-4 py-3">
                      <span
                        className="select-none font-mono text-[11px] tabular-nums"
                        style={{ color: "var(--accent)", paddingTop: 3 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15.5px] leading-[1.6]" style={{ color: "#33332f", letterSpacing: "-0.012em" }}>
                        {text}
                      </p>
                    </li>
                  ))}
                </ol>
              );
            })()
          )}
        </section>

        {/* ---------- Footer ---------- */}
        <footer
          className="rise rise-4 mt-24 flex items-center justify-between border-t pt-6 font-mono text-[10.5px] uppercase tracking-[0.12em]"
          style={{ borderColor: "var(--hairline)", color: "var(--faint)" }}
        >
          <span>© {new Date().getFullYear()} Paulo Ramirez</span>
          <span className="flex items-center gap-1.5">
            Made with
            <span aria-hidden="true">🎧</span>
            in Berlin
          </span>
        </footer>
      </div>
    </main>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rise px-4 py-8 text-[14px]" style={{ color: "var(--faint)" }}>
      {children}
    </p>
  );
}
