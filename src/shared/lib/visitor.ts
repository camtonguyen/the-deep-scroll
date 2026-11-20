import { MAX_DEPTH } from "./sea";

/** A visitor's depth as a whole number of metres from the surface to the bottom. */
export function visitorDepth(depth: number): number {
  return Math.round(Math.min(Math.max(depth, 0), MAX_DEPTH));
}

/** Long names get smaller type, down to `min`, so they stay on a line or two: `size` fits up to `fits` characters. */
export function fitFontSize(text: string, size: number, min: number, fits = 16): number {
  return Math.max(min, Math.floor(size * Math.min(1, fits / Math.max(text.length, 1))));
}
