import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBerlinClock } from "@/lib/use-berlin-clock";

export function Readme() {
  const time = useBerlinClock();

  useEffect(() => {
    document.title = "Paulo Ramirez - Builder, Engineer, Designer";
  }, []);

  return (
    <article>
      <div
        className="mb-8 inline-block"
        style={{
          padding: 4,
          borderRadius: 14,
          background: "var(--panel-solid)",
          border: "1px solid var(--hairline)",
          boxShadow: "var(--shadow-img)",
          transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(3deg) scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
      >
        <img
          src="/three.png"
          alt="Paulo Ramirez"
          width={96}
          height={96}
          className="block object-cover"
          style={{ borderRadius: 10 }}
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h1 className="text-[40px] leading-[1.05]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
          Paulo Angel Ramirez Cedeños
        </h1>
        <p className="font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          Berlin, DE · {time}
        </p>
      </div>

      <p className="mt-6 text-[17px] leading-[1.7]" style={{ color: "var(--prose)" }}>
        Optimizing for experiences.
      </p>

      <p className="mt-4 text-[17px] leading-[1.7]" style={{ color: "var(--prose)" }}>
        Currently Co-Founder &amp; CTO of{" "}
        <a
          href="https://www.vetpal.de"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
          style={{ color: "var(--accent)" }}
        >
          <strong>Vetpal</strong>
        </a>
        , the operating system for vet clinics and practices.
      </p>

      <h2 className="mt-12 text-[22px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
        Explore:
      </h2>
      <ul className="mt-4 flex flex-col gap-2 text-[15.5px]" style={{ color: "var(--prose)" }}>
        <li>
          <Link to="/principles" className="underline underline-offset-4" style={{ color: "var(--accent)" }}>
            principles.md
          </Link>{" "}
          : the ideas I try to operate by.
        </li>
        <li>
          <Link to="/facts" className="underline underline-offset-4" style={{ color: "var(--accent)" }}>
            facts.md
          </Link>{" "}
          : a few things that make me, me.
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
