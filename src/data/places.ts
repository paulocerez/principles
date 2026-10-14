// Coordinates for the Places map, as [longitude, latitude].
// City names match the entries in countries.ts (without the years in brackets).
// A city without coordinates still shows up in the index, just not on the map.

export const HOME = { name: "Berlin", coords: [13.405, 52.52] as [number, number] };

export const cityCoords: Record<string, [number, number]> = {
  Barcelona: [2.17, 41.39],
  Tenerife: [-16.63, 28.29],
  Florence: [11.26, 43.77],
  Venice: [12.32, 45.44],
  Bologna: [11.34, 44.49],
  Verona: [10.99, 45.44],
  Pisa: [10.4, 43.72],
  Paris: [2.35, 48.86],
  London: [-0.13, 51.51],
  Budapest: [19.04, 47.5],
  Zamárdi: [17.95, 46.88],
  Siófok: [18.05, 46.9],
  "Cluj-Napoca": [23.6, 46.77],
  Kętrzyn: [21.38, 54.08],
  Beijing: [116.4, 39.9],
  Shanghai: [121.47, 31.23],
  "Xi'an": [108.94, 34.34],
  "San Francisco": [-122.42, 37.77],
  Thessaloniki: [22.94, 40.64],
  Prague: [14.42, 50.08],
};

export const continentOf: Record<string, string> = {
  CN: "Asia",
  US: "North America",
  CU: "North America",
};
