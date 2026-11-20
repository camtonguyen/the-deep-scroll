import { BANDS, type Band } from "@/shared/data/zones";

/**
 * The sea, to scale. One scale turns a real depth (metres) into a vertical
 * position (px from the surface); the busy top of the ocean gets room and
 * the empty middle goes by faster. Everything that draws the sea (colour
 * bands, ruler, items, the certificate's stripe) asks this module, so
 * rounding and band edges are decided in one place.
 */

/** [fromDepth m, toDepth m, px per metre] */
type ScaleSegment = readonly [from: number, to: number, pxPerMetre: number];

const SCALE: readonly ScaleSegment[] = [
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

export interface BandRect {
  band: Band;
  /** px from the top of the sea. */
  y: number;
  height: number;
}

/**
 * Each colour band as a rectangle, with whole-px edges that tile the sea
 * exactly. `height` squeezes the sea into a shorter box (the share card's
 * stripe). `overlap` makes every rectangle but the last reach into the next,
 * for drawings that would otherwise show a hairline gap.
 */
export function bandRects(height: number = SEA_HEIGHT, { overlap = 0 }: { overlap?: number } = {}): BandRect[] {
  const k = height / SEA_HEIGHT;
  return BANDS.map((band, i) => {
    const y = Math.round(depthToY(band.from) * k);
    const bottom = i === BANDS.length - 1 ? height : Math.round(depthToY(band.to) * k);
    return { band, y, height: bottom - y + (i === BANDS.length - 1 ? 0 : overlap) };
  });
}

/** A mark every `step` metres, from the surface to the bottom. */
export function ticks(step: number): { depth: number; y: number }[] {
  const list = [];
  for (let depth = 0; depth <= MAX_DEPTH; depth += step) list.push({ depth, y: depthToY(depth) });
  return list;
}
