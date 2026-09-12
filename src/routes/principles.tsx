import { useEffect } from "react";
import { principles } from "@/data/principles";

export function Principles() {
  useEffect(() => {
    document.title = "principles.md — Paulo Ramirez";
  }, []);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 600, letterSpacing: "-0.03em" }}>
        Principles
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        The ideas I try to operate by.
      </p>

      <ol className="mt-8 flex flex-col gap-5">
        {principles.map((text, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="shrink-0 select-none pt-1 font-mono text-[12px] tabular-nums" style={{ color: "var(--accent)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[16px] leading-[1.65]" style={{ color: "var(--prose)" }}>
              {text}
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}
