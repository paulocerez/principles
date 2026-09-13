// Countries I've been to. Each folder drills into the cities visited.

export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  slug: string;
  cities: string[];
}

export const countries: Country[] = [
  { name: "Germany", code: "DE", slug: "germany", cities: [] },
  { name: "Spain", code: "ES", slug: "spain", cities: ["Barcelona", "Tenerife"] },
  { name: "Italy", code: "IT", slug: "italy", cities: ["Florence"] },
  { name: "France", code: "FR", slug: "france", cities: ["Paris"] },
  { name: "United Kingdom", code: "GB", slug: "united-kingdom", cities: ["London"] },
  { name: "Hungary", code: "HU", slug: "hungary", cities: ["Budapest"] },
  { name: "Romania", code: "RO", slug: "romania", cities: [] },
  { name: "Austria", code: "AT", slug: "austria", cities: [] },
  { name: "Poland", code: "PL", slug: "poland", cities: [] },
  { name: "China", code: "CN", slug: "china", cities: [] },
  { name: "USA", code: "US", slug: "usa", cities: ["San Francisco"] },
  { name: "Cuba", code: "CU", slug: "cuba", cities: [] },
  { name: "Greece", code: "GR", slug: "greece", cities: ["Thessaloniki"] },
  { name: "Czech Republic", code: "CZ", slug: "czech-republic", cities: ["Prague"] },
];

export function findCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}
