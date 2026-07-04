import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listArticles } from "@/lib/articles";
import { principles } from "@/data/principles";
import { facts } from "@/data/facts";

type View = "writings" | "principles" | "facts";

const tabLabels: Record<View, string> = {
  writings: "i write",
  principles: "i think",
  facts: "i am",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const tabBase = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  transition: "color 150ms ease",
};

export function Home() {
  const articles = listArticles();
  const [view, setView] = useState<View>("writings");

  useEffect(() => {
    document.title = "Paulo Ramirez";
  }, []);

  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundColor: "#FAF8F4",
        backgroundImage: "radial-gradient(circle, rgba(175,162,142,0.35) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">

        <section className="animate-fade-up flex items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1
              className="text-[40px] sm:text-[52px]"
              style={{ fontWeight: 800, letterSpacing: "-0.045em", color: "#1A1A18", lineHeight: 1.0 }}
            >
              Paulo Ramirez
            </h1>
            <p
              className="mt-2"
              style={{ fontSize: "13px", fontWeight: 500, color: "#B0AFA9", letterSpacing: "-0.01em" }}
            >
              Berlin, Germany
            </p>
          </div>

          <div
            style={{
              transform: "rotate(-2deg)",
              flexShrink: 0,
              backgroundColor: "#FFFFFF",
              padding: "6px 6px 18px 6px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
              borderRadius: "2px",
            }}
          >
            <img
              src="/three.png"
              alt="Paulo Ramirez"
              width={92}
              height={92}
              className="object-cover"
              style={{ display: "block", borderRadius: "1px" }}
            />
          </div>
        </section>

        <section className="mt-20 sm:mt-28">
          <div
            className="animate-fade-up-delay-1 flex items-center gap-3 flex-wrap"
            role="tablist"
            aria-label="Section"
          >
            {(["writings", "principles", "facts"] as const).map((tab, i) => (
              <div key={tab} className="flex items-center gap-3">
                {i > 0 ? <span style={{ color: "#DAD9D3", fontSize: "10px" }}>·</span> : null}
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === tab}
                  onClick={() => setView(tab)}
                  style={{
                    ...tabBase,
                    color: view === tab ? "#1A1A18" : "#C8C7C2",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { if (view !== tab) e.currentTarget.style.color = "#706F6A"; }}
                  onMouseLeave={(e) => { if (view !== tab) e.currentTarget.style.color = "#C8C7C2"; }}
                >
                  {tabLabels[tab]}
                </button>
              </div>
            ))}
          </div>

          <div key={view} className="animate-fade-up mt-4">
            {view === "writings" ? (
              articles.length === 0 ? (
                <p className="py-6" style={{ fontSize: "13px", color: "#B0AFA9" }}>
                  Nothing published yet. Check back soon.
                </p>
              ) : (
                <ul>
                  {articles.map((article, i) => {
                    const border = i === 0 ? "none" : "1px solid rgba(26,26,24,0.06)";
                    const inner = (
                      <>
                        <div className="flex flex-col gap-1 min-w-0">
                          <span style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A18", letterSpacing: "-0.02em" }}>
                            {article.title}
                          </span>
                          {article.excerpt ? (
                            <span style={{ fontSize: "13px", color: "#8A8A85", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
                              {article.excerpt}
                            </span>
                          ) : null}
                        </div>
                        <span
                          className="sm:text-right sm:pt-1 whitespace-nowrap"
                          style={{ fontSize: "12px", fontWeight: 500, color: "#B0AFA9", letterSpacing: "-0.01em" }}
                        >
                          {formatDate(article.publishedAt)}
                        </span>
                      </>
                    );
                    const rowClass =
                      "group flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-6 py-5 transition-opacity duration-150 hover:opacity-60";
                    return (
                      <li key={article._id} style={{ borderTop: border }}>
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
                const file = view === "principles" ? "src/data/principles.ts" : "src/data/facts.ts";
                if (items.length === 0) {
                  return (
                    <p className="py-6" style={{ fontSize: "13px", color: "#B0AFA9" }}>
                      Nothing yet. Add them in <code style={{ fontSize: "12px", color: "#8A8A85" }}>{file}</code>.
                    </p>
                  );
                }
                return (
                  <div className="flex flex-col gap-6 py-2">
                    {items.map((text, i) => (
                      <p
                        key={i}
                        style={{
                          fontSize: "15px",
                          color: "#3A3A35",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.65,
                        }}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </section>

        <p
          className="animate-fade-up-delay-3 mt-20 sm:mt-28"
          style={{ color: "#C8C7C2", fontSize: "12px", letterSpacing: "-0.01em" }}
        >
          Made with 🎧 in Berlin
        </p>

      </div>
    </main>
  );
}
