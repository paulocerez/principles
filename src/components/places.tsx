import { useMemo, useState } from "react";
import { geoDistance } from "d3-geo";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/data/countries";
import { cityCoords, continentOf, HOME } from "@/data/places";
import grid from "@/data/places-grid.json";
import { H, projectionFor, STEP, W, type View } from "@/lib/places-geo";

interface Place {
  name: string;
  country: string;
  code: string;
  years: number[];
  coords?: [number, number];
}

// "Barcelona (2014, 2022)" -> { name: "Barcelona", years: [2014, 2022] }
function parseCity(raw: string) {
  const match = raw.match(/^(.*?)\s*\((.*)\)\s*$/);
  const name = (match ? match[1] : raw).trim();
  const years = match ? (match[2].match(/\d{4}/g) ?? []).map(Number) : [];
  return { name, years };
}

const places: Place[] = countries.flatMap((c) =>
  c.cities.map((raw) => {
    const { name, years } = parseCity(raw);
    return { name, years, country: c.name, code: c.code, coords: cityCoords[name] };
  }),
);

// Land as a grid of dots, precomputed by scripts/build-places-grid.ts (flat [x, y, x, y, …]).
function landDots(view: View) {
  const flat = (grid as Record<View, number[]>)[view];
  const dots: [number, number][] = [];
  for (let i = 0; i < flat.length; i += 2) dots.push([flat[i], flat[i + 1]]);
  return dots;
}

function arcPath(from: [number, number], to: [number, number]) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  // Bend every arc upwards, proportional to its length.
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bend = len * 0.22;
  return `M${x1},${y1} Q${mx + nx * bend},${my + ny * bend} ${x2},${y2}`;
}

function PlacesMap({
  view,
  interactive,
  highlightCountry,
}: {
  view: View;
  interactive: boolean;
  highlightCountry: string | null;
}) {
  const projection = useMemo(() => projectionFor(view), [view]);
  const dots = useMemo(() => landDots(view), [view]);
  const [hovered, setHovered] = useState<string | null>(null);

  const home = projection(HOME.coords)!;
  const mapped = places
    .filter((p) => p.coords)
    .map((p) => ({ ...p, xy: projection(p.coords!)! }))
    .filter((p) => p.xy[0] >= 0 && p.xy[0] <= W && p.xy[1] >= 0 && p.xy[1] <= H);
  const hoveredPlace = mapped.find((p) => p.name === hovered);

  return (
    <div className="relative">
      <svg key={view} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Map of places I have been">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={STEP[view] * 0.24} fill="var(--faint)" opacity={0.6} />
        ))}

        {mapped.map((p, i) => {
          const dim = highlightCountry && p.country !== highlightCountry;
          return (
            <path
              key={p.name}
              d={arcPath(home, p.xy)}
              pathLength={1}
              className="places-arc"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={hovered === p.name ? 2 : 1.2}
              strokeLinecap="round"
              opacity={dim ? 0.12 : hovered && hovered !== p.name ? 0.25 : 0.75}
              style={{ animationDelay: `${i * 40}ms`, transition: "opacity 0.2s" }}
            />
          );
        })}

        {mapped.map((p) => {
          const dim = highlightCountry && p.country !== highlightCountry;
          const active = hovered === p.name || highlightCountry === p.country;
          const size = 3.5 + Math.min(p.years.length, 4);
          return (
            <g key={p.name} opacity={dim ? 0.25 : 1} style={{ transition: "opacity 0.2s" }}>
              <circle cx={p.xy[0]} cy={p.xy[1]} r={active ? size + 2 : size} fill="var(--accent)" style={{ transition: "r 0.2s" }} />
              {interactive && (
                <circle
                  cx={p.xy[0]}
                  cy={p.xy[1]}
                  r={14}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(p.name)}
                  onMouseLeave={() => setHovered(null)}
                />
              )}
            </g>
          );
        })}

        <circle cx={home[0]} cy={home[1]} r={7} fill="var(--ink)" />
        <circle cx={home[0]} cy={home[1]} r={13} fill="none" stroke="var(--ink)" strokeWidth={1} opacity={0.35} />
        {interactive && (
          <text x={home[0] + 14} y={home[1] - 12} fontSize={13} fontWeight={500} fill="var(--ink)">
            Berlin
          </text>
        )}
      </svg>

      {hoveredPlace && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg px-3 py-2 text-[13px] shadow-lg"
          style={{
            left: `${(hoveredPlace.xy[0] / W) * 100}%`,
            top: `calc(${(hoveredPlace.xy[1] / H) * 100}% - 14px)`,
            background: "var(--panel)",
            border: "1px solid var(--hairline)",
          }}
        >
          <div className="whitespace-nowrap" style={{ fontWeight: 500, color: "var(--ink)" }}>
            {hoveredPlace.name}
          </div>
          <div className="whitespace-nowrap font-mono text-[11px]" style={{ color: "var(--muted)" }}>
            {hoveredPlace.country}
            {hoveredPlace.years.length > 0 && ` · ${hoveredPlace.years.join(", ")}`}
          </div>
        </div>
      )}
    </div>
  );
}

// Static world map for the project card.
export function PlacesCover() {
  return (
    <div className="flex h-full w-full items-center justify-center px-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]" style={{ background: "var(--panel)" }}>
      <div className="w-full">
        <PlacesMap view="world" interactive={false} highlightCountry={null} />
      </div>
    </div>
  );
}

export default function Places() {
  const [view, setView] = useState<View>("europe");
  const [highlightCountry, setHighlightCountry] = useState<string | null>(null);

  const stats = useMemo(() => {
    const continents = new Set(countries.map((c) => continentOf[c.code] ?? "Europe"));
    const furthest = Math.max(
      ...places.filter((p) => p.coords).map((p) => geoDistance(HOME.coords, p.coords!) * 6371),
    );
    return [
      { value: String(countries.length), label: "countries" },
      { value: String(places.length), label: "cities" },
      { value: String(continents.size), label: "continents" },
      { value: `${Math.round(furthest / 100) * 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","), label: "km furthest from home" },
    ];
  }, []);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[34px] leading-none tabular-nums" style={{ fontWeight: 500, letterSpacing: "-0.03em" }}>
              {s.value}
            </div>
            <div className="mt-2 text-[14px]" style={{ color: "var(--muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[10px] p-4 sm:p-6" style={{ border: "1px solid var(--hairline)", background: "var(--panel)" }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[12px]" style={{ color: "var(--faint)" }}>
            Every trip starts in Berlin
          </span>
          <div className="flex rounded-full p-1" style={{ background: "var(--kbd-bg)" }}>
            {(["europe", "world"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className="rounded-full px-3 py-1 text-[13px] capitalize transition-colors"
                style={{
                  background: view === v ? "var(--panel)" : "transparent",
                  color: view === v ? "var(--ink)" : "var(--muted)",
                  boxShadow: view === v ? "0 1px 3px rgba(35, 33, 28, 0.12)" : "none",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <PlacesMap view={view} interactive highlightCountry={highlightCountry} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {countries.map((c) => {
          const cities = places.filter((p) => p.country === c.name);
          return (
            <div
              key={c.slug}
              className="flex gap-4 py-4 transition-opacity"
              style={{
                borderTop: "1px solid var(--hairline)",
                opacity: highlightCountry && highlightCountry !== c.name ? 0.4 : 1,
              }}
              onMouseEnter={() => setHighlightCountry(c.name)}
              onMouseLeave={() => setHighlightCountry(null)}
            >
              <ReactCountryFlag countryCode={c.code} svg style={{ width: "1.5em", height: "1.5em", borderRadius: 3, flexShrink: 0 }} />
              <div className="min-w-0">
                <div className="text-[16px]" style={{ fontWeight: 500, color: "var(--ink)" }}>
                  {c.name}
                  {c.code === "DE" && (
                    <span className="ml-2 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                      home
                    </span>
                  )}
                </div>
                {cities.length > 0 && (
                  <div className="mt-1 text-[14px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                    {cities.map((p, i) => (
                      <span key={p.name}>
                        {p.name}
                        {p.years.length > 0 && (
                          <span className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>
                            {" "}
                            {p.years.join(" · ")}
                          </span>
                        )}
                        {i < cities.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
