/**
 * One scale drives every output: it turns a real depth (metres) into a
 * vertical position (px) on the page. The scale changes by zone so the
 * busy top of the ocean gets room and the empty middle goes by faster.
 * The ruler and the "SCALE CHANGE" notes on the page show where it changes.
 */

/** [fromDepth m, toDepth m, px per metre] */
export type ScaleSegment = readonly [from: number, to: number, pxPerMetre: number];

export const SCALE: readonly ScaleSegment[] = [
  [0, 200, 2],
  [200, 1000, 1],
  [1000, 6000, 0.5],
  [6000, 8000, 0.25],
  [8000, 10935, 0.5],
];

/** The bottom of the Challenger Deep, in metres. */
export const MAX_DEPTH = 10935;

/** Depth in metres → y in px from the sea surface. */
export function depthToY(depth: number): number {
  let y = 0;
  for (const [from, to, k] of SCALE) {
    if (depth <= to) return y + (depth - from) * k;
    y += (to - from) * k;
  }
  return y;
}

/** Total height of the sea, surface to seafloor, in px. */
export const SEA_HEIGHT = Math.round(depthToY(MAX_DEPTH));
