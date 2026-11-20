/** 10935 → "10,935" */
export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** 10935 → "10,935 m" */
export function formatDepth(metres: number): string {
  return `${formatNumber(metres)} m`;
}

/** Hydrostatic pressure, roughly: 1 atm at the surface + 1 atm per ~10.1 m. */
export function pressureAtm(metres: number): number {
  return 1 + metres / 10.1;
}
