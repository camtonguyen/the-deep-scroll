import { formatNumber, pressureAtm } from "./format";
import { lightAt, tempAt } from "./portable";

/** [depth m, °C]: rough averages, read in between by straight lines. */
export const TEMPERATURES: readonly (readonly [number, number])[] = [
  [0, 28],
  [200, 15],
  [1000, 4],
  [4000, 2],
  [10935, 2],
];

export const temperatureC = (depth: number): number => tempAt(depth, TEMPERATURES);

/** [from depth m, what the light is]: sunlight to 200 m, a faint glow to 1,000 m, then only living light. */
export const LIGHT: readonly (readonly [number, string])[] = [
  [0, "sunlight"],
  [200, "dim"],
  [1000, "dark"],
];

/** 4000 → "≈397 atm · 2 °C · dark" */
export function readoutText(depth: number): string {
  return `≈${formatNumber(pressureAtm(depth))} atm · ${Math.round(temperatureC(depth))} °C · ${lightAt(depth, LIGHT)}`;
}
