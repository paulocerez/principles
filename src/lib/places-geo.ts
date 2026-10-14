import { geoMercator, geoNaturalEarth1, type GeoProjection } from "d3-geo";
import type { Geometry } from "geojson";

// Shared by the Places component and scripts/build-places-grid.ts,
// so the precomputed land dots line up with the cities.
export const W = 960;
export const H = 540;

export type View = "world" | "europe";

export const STEP: Record<View, number> = { world: 6, europe: 5 };

export function projectionFor(view: View): GeoProjection {
  if (view === "world") {
    return geoNaturalEarth1().fitExtent(
      [
        [16, 16],
        [W - 16, H - 16],
      ],
      { type: "MultiPoint", coordinates: [[-170, 75], [180, -56]] } as Geometry,
    );
  }
  return geoMercator().fitExtent(
    [
      [48, 40],
      [W - 48, H - 40],
    ],
    { type: "MultiPoint", coordinates: [[-18, 27], [30, 57]] } as Geometry,
  );
}
