import { formatNumber, pressureAtm } from "./format";

/** [depth m, °C]: rough averages, read in between by straight lines. */
export const TEMPERATURES: readonly (readonly [number, number])[] = [
  [0, 28],
  [200, 15],
  [1000, 4],
  [4000, 2],
  [10935, 2],
];

export function temperatureC(depth: number): number {
  const i = TEMPERATURES.findIndex(([d]) => d >= depth);
  if (i <= 0) return TEMPERATURES[0][1];
  const [d0, t0] = TEMPERATURES[i - 1];
  const [d1, t1] = TEMPERATURES[i];
  return t0 + ((t1 - t0) * (depth - d0)) / (d1 - d0);
}

/** [from depth m, what the light is]: sunlight to 200 m, a faint glow to 1,000 m, then only living light. */
export const LIGHT: readonly (readonly [number, string])[] = [
  [0, "sunlight"],
  [200, "dim"],
  [1000, "dark"],
];

export function lightAt(depth: number): string {
  return LIGHT.filter(([from]) => depth >= from).at(-1)![1];
}

/** 4000 → "≈397 atm · 2 °C · dark" */
export function readoutText(depth: number): string {
  return `≈${formatNumber(pressureAtm(depth))} atm · ${Math.round(temperatureC(depth))} °C · ${lightAt(depth)}`;
}
