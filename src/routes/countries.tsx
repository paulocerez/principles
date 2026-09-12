import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { ArrowLeft } from "lucide-react";
import { countries, findCountry, type Country } from "@/data/countries";

function FolderFlag({ code }: { code: string }) {
  return (
    <div
      className="relative transition-transform duration-300"
      style={{ width: 76, height: 58 }}
    >
      <div
        style={{
          position: "absolute",
          top: -7,
          left: 9,
          width: 28,
          height: 10,
          background: "var(--panel-solid)",
          border: "1px solid var(--hairline)",
          borderBottom: "none",
          borderRadius: "5px 5px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--panel-solid)",
          border: "1px solid var(--hairline)",
          borderRadius: 9,
          boxShadow: "var(--shadow-img)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactCountryFlag
          countryCode={code}
          svg
          style={{ width: "2.1em", height: "2.1em", borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

export function Countries() {
  useEffect(() => {
    document.title = "countries.md - Paulo Ramirez";
  }, []);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        Countries
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        Countries I've been to. Open a folder to see the cities.
      </p>

      <div className="mt-10 grid gap-x-4 gap-y-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
        {countries.map((c) => (
          <Link
            key={c.slug}
            to={`/countries/${c.slug}`}
            className="group flex flex-col items-center gap-2.5 text-center"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
              <FolderFlag code={c.code} />
            </span>
            <span className="text-[13px] leading-tight" style={{ color: "var(--prose)" }}>
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}

export function CountryDetail() {
  const { slug } = useParams();
  const country: Country | undefined = slug ? findCountry(slug) : undefined;

  useEffect(() => {
    document.title = country ? `${country.slug}.md - Paulo Ramirez` : "countries.md - Paulo Ramirez";
  }, [country]);

  if (!country) {
    return (
      <article>
        <p className="font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          {"// country not found"}
        </p>
        <Link to="/countries" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] underline underline-offset-4" style={{ color: "var(--accent)" }}>
          <ArrowLeft size={14} /> back to countries
        </Link>
      </article>
    );
  }

  return (
    <article>
      <Link
        to="/countries"
        className="inline-flex items-center gap-1.5 font-mono text-[13px] underline underline-offset-4"
        style={{ color: "var(--faint)" }}
      >
        <ArrowLeft size={14} /> countries
      </Link>

      <div className="mt-5 flex items-center gap-4">
        <ReactCountryFlag countryCode={country.code} svg style={{ width: "2.4em", height: "2.4em", borderRadius: 5 }} />
        <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
          {country.name}
        </h1>
      </div>
      <p className="mt-4 text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        Cities I've been to.
      </p>

      {country.cities.length === 0 ? (
        <p className="mt-8 font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          {"// no cities added yet"}
        </p>
      ) : (
        <ol className="mt-8 flex flex-col gap-5">
          {country.cities.map((city, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="shrink-0 select-none pt-1 font-mono text-[12px] tabular-nums" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] leading-[1.65]" style={{ color: "var(--prose)" }}>
                {city}
              </p>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
