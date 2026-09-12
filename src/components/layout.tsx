import { useCallback, useMemo } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, X } from "lucide-react";
import { buildTree, findFileName, type Tree, type TreeFile } from "@/lib/tree";
import { useTheme } from "@/lib/use-theme";
import { useTabs } from "@/lib/use-tabs";

function FileLink({ file }: { file: TreeFile }) {
  const className = "block truncate rounded px-2 py-1 font-mono text-[12.5px] transition-colors";

  if (file.external) {
    return (
      <a
        href={file.to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ color: "var(--muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        {file.name}
      </a>
    );
  }

  return (
    <NavLink
      to={file.to}
      className={className}
      style={({ isActive }) => ({
        color: isActive ? "var(--accent)" : "var(--muted)",
        background: isActive ? "var(--accent-soft)" : "transparent",
      })}
    >
      {file.name}
    </NavLink>
  );
}

export function Layout() {
  const location = useLocation();
  const tree = useMemo<Tree>(() => buildTree(), []);
  const activeFile = findFileName(tree, location.pathname);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const nameFor = useCallback((path: string) => findFileName(tree, path), [tree]);
  const { tabs, activePath, closeTab } = useTabs(nameFor);

  return (
    <div className="flex min-h-screen flex-col sm:flex-row" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      {/* ---------- Sidebar ---------- */}
      <aside
        className="flex w-full shrink-0 flex-col px-5 py-6 sm:h-screen sm:w-[280px] sm:sticky sm:top-0"
        style={{ borderRight: "1px solid var(--hairline)" }}
      >
        <Link to="/" className="mb-6 inline-block text-[26px] leading-none tracking-tight" style={{ fontWeight: 700 }}>
          paulo
        </Link>

        <button
          type="button"
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <nav className="flex flex-col gap-0.5 overflow-y-auto">
          {tree.root.map((file) => (
            <FileLink key={file.to} file={file} />
          ))}

          {tree.folders.map((folder) => {
            return (
              <div key={folder.name} className="mt-3">
                <div
                  className="flex items-center gap-1 px-1 py-1 font-mono text-[12.5px]"
                  style={{ color: "var(--ink)", fontWeight: 600 }}
                >
                  <ChevronDown size={13} style={{ color: "var(--faint)" }} />
                  /{folder.name}
                </div>
                <div className="ml-3 flex flex-col gap-0.5 border-l pl-2" style={{ borderColor: "var(--hairline)" }}>
                  {folder.files.map((file) => (
                    <FileLink key={file.to + file.name} file={file} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ---------- Main ---------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Tab bar */}
        <div
          className="flex items-center gap-1 overflow-x-auto px-4 pt-3"
          style={{ borderBottom: "1px solid var(--hairline)" }}
        >
          {tabs.map((tab) => {
            const active = tab.path === activePath;
            return (
              <div
                key={tab.path}
                className="group flex shrink-0 items-center gap-2 rounded-t-lg py-2 pl-3 pr-2 font-mono text-[12px]"
                style={{
                  background: active ? "var(--panel-translucent)" : "transparent",
                  border: active ? "1px solid var(--hairline)" : "1px solid transparent",
                  borderBottom: active ? "1px solid var(--bg)" : "1px solid transparent",
                  marginBottom: -1,
                  color: active ? "var(--ink)" : "var(--faint)",
                }}
              >
                <Link
                  to={tab.path}
                  className="transition-colors"
                  style={{ color: "inherit" }}
                >
                  {tab.name}
                </Link>
                <button
                  type="button"
                  aria-label={`Close ${tab.name}`}
                  onClick={() => closeTab(tab.path)}
                  className="rounded p-0.5 opacity-50 transition-opacity hover:opacity-100"
                  style={{ color: "var(--faint)" }}
                >
                  <X size={13} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-14 sm:px-10">
          <div key={location.pathname} className="fade mx-auto max-w-5xl">
            <p className="mb-10 text-center font-mono text-[11px]" style={{ color: "var(--faint)" }}>
              {activeFile}
            </p>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
