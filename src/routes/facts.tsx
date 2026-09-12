import { useEffect } from "react";
import { facts } from "@/data/facts";

export function Facts() {
  useEffect(() => {
    document.title = "facts.md - Paulo Ramirez";
  }, []);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        Facts
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        A few things that make me, me.
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {facts.map((text, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="shrink-0 select-none pt-1.5 font-mono text-[12px]" style={{ color: "var(--accent)" }}>
              •
            </span>
            <p className="text-[16px] leading-[1.65]" style={{ color: "var(--prose)" }}>
              {text}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
