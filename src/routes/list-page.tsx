import { useEffect } from "react";

interface ListPageProps {
  file: string;
  title: string;
  subtitle: string;
  items: string[];
}

export function ListPage({ file, title, subtitle, items }: ListPageProps) {
  useEffect(() => {
    document.title = `${file} - Paulo Ramirez`;
  }, [file]);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        {title}
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        {subtitle}
      </p>

      {items.length === 0 ? (
        <p className="mt-8 font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          {"// nothing here yet, check back soon"}
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((text, i) => (
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
      )}
    </article>
  );
}
