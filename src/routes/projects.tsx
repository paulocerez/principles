import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
  useEffect(() => {
    document.title = "projects.md - Paulo Ramirez";
  }, []);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        Projects
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        Things I've built or worked on.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {projects.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4"
          >
            <img
              src={p.logo}
              alt={p.name}
              width={32}
              height={32}
              className="block shrink-0"
              style={{ width: 32, height: 32 }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px]" style={{ color: "var(--ink)" }}>
                  {p.name}
                </span>
                <ArrowUpRight
                  size={15}
                  style={{ color: "var(--faint)" }}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <p className="mt-1.5 text-[14.5px] leading-[1.6]" style={{ color: "var(--prose)" }}>
                {p.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </article>
  );
}
