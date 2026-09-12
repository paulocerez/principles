import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBerlinClock } from "@/lib/use-berlin-clock";

export function Readme() {
  const time = useBerlinClock();

  useEffect(() => {
    document.title = "Paulo Ramirez — Builder, Engineer, Designer";
  }, []);

  return (
    <article>
      <h1 className="text-[40px] leading-[1.05]" style={{ fontWeight: 500, letterSpacing: "-0.03em" }}>
        Paulo Ramirez
      </h1>

      <p className="mt-6 text-[17px] leading-[1.7]" style={{ color: "var(--prose)" }}>
        Builder, engineer, and designer crafting calm, considered software in{" "}
        <strong>Berlin</strong>. I like to make things that feel obvious in hindsight —
        and I care as much about how they feel as what they do.
      </p>

      <p className="mt-4 font-mono text-[13px]" style={{ color: "var(--faint)" }}>
        Berlin, DE — {time}
      </p>

      <h2 className="mt-12 text-[22px]" style={{ fontWeight: 500, letterSpacing: "-0.02em" }}>
        Explore:
      </h2>
      <ul className="mt-4 flex flex-col gap-2 text-[15.5px]" style={{ color: "var(--prose)" }}>
        <li>
          <Link to="/principles" className="underline underline-offset-4" style={{ color: "var(--accent)" }}>
            principles.md
          </Link>{" "}
          — the ideas I try to operate by.
        </li>
        <li>
          <Link to="/facts" className="underline underline-offset-4" style={{ color: "var(--accent)" }}>
            facts.md
          </Link>{" "}
          — a few things that make me, me.
        </li>
      </ul>

      <div className="mt-24 flex justify-end border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
        <Link
          to="/principles"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] underline underline-offset-4"
          style={{ color: "var(--ink)" }}
        >
          principles.md <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
