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
        <div
          className="mt-10 grid gap-x-6 gap-y-10"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 text-left">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.label}
                  className="block w-full object-contain"
                  style={{ aspectRatio: "1 / 1" }}
                />
              )}
              <p
                className="text-[15px] leading-snug"
                style={{
                  color: "var(--prose)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
