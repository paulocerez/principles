// Precomputes the dotted land grid for the Places map.
// Run with: npx tsx scripts/build-places-grid.ts
import { writeFileSync } from "node:fs";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import land50 from "world-atlas/land-50m.json" with { type: "json" };
import { H, projectionFor, STEP, W, type View } from "../src/lib/places-geo";

const topo = land50 as unknown as Topology;
const land = feature(topo, topo.objects.land as GeometryCollection) as unknown as FeatureCollection<Geometry>;

const out: Record<View, number[]> = { world: [], europe: [] };
for (const view of ["world", "europe"] as View[]) {
  const projection = projectionFor(view);
  const step = STEP[view];
  for (let x = step / 2; x < W; x += step) {
    for (let y = step / 2; y < H; y += step) {
      const lonLat = projection.invert?.([x, y]);
      if (!lonLat || lonLat[1] < -56) continue;
      if (land.features.some((f) => geoContains(f, lonLat))) out[view].push(Math.round(x * 10) / 10, Math.round(y * 10) / 10);
    }
  }
  console.log(view, out[view].length / 2, "dots");
}
writeFileSync("src/data/places-grid.json", JSON.stringify(out));
