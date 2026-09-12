import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Tab {
  path: string;
  name: string;
}

const STORAGE_KEY = "openTabs";

function load(): Tab[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Tab[];
      if (Array.isArray(parsed) && parsed.every((t) => t?.path && t?.name)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [{ path: "/", name: "README.md" }];
}

export function useTabs(nameFor: (path: string) => string) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<Tab[]>(load);

  // Open (append) the current route as a tab if not already open.
  useEffect(() => {
    setTabs((prev) => {
      if (prev.some((t) => t.path === location.pathname)) return prev;
      return [...prev, { path: location.pathname, name: nameFor(location.pathname) }];
    });
  }, [location.pathname, nameFor]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    } catch {
      /* ignore */
    }
  }, [tabs]);

  const closeTab = useCallback(
    (path: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.path === path);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.path !== path);
        if (location.pathname === path) {
          const neighbor = next[idx] ?? next[idx - 1];
          navigate(neighbor ? neighbor.path : "/");
        }
        return next;
      });
    },
    [location.pathname, navigate]
  );

  return { tabs, activePath: location.pathname, closeTab };
}
