import { useEffect } from "react";

export interface ListItem {
  label: string;
  image?: string;
}

interface ListPageProps {
  file: string;
  title: string;
  subtitle: string;
  items: ListItem[];
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
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-4">
              {item.image ? (
                <span
                  className="shrink-0"
                  style={{
                    padding: 3,
                    borderRadius: 10,
                    background: "var(--panel-solid)",
                    border: "1px solid var(--hairline)",
                    boxShadow: "var(--shadow-img)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    width={48}
                    height={48}
                    className="block object-cover"
                    style={{ borderRadius: 7, width: 48, height: 48 }}
                  />
                </span>
              ) : (
                <span className="shrink-0 select-none font-mono text-[12px]" style={{ color: "var(--accent)" }}>
                  •
                </span>
              )}
              <p className="text-[16px] leading-[1.65]" style={{ color: "var(--prose)" }}>
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
