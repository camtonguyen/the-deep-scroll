import type { ComponentType } from "react";
import { Anglerfish } from "./anglerfish";
import { Diver } from "./diver";
import { Snailfish } from "./snailfish";

/**
 * Every drawing, by id. Drawings are built only from Svg shapes
 * (Rect, Circle, Ellipse, Line, Polygon, Path), so the same art renders
 * on the page, in the PDF and in the PNG.
 *
 * To add one: port its <svg> into a component
 * here (attributes → props, fill/stroke → style), then register it.
 */
export interface ArtPlacement {
  Component: ComponentType;
  /** Left edge in px within the 1200 px content width. */
  x: number;
  /** Vertical offset in px from the stop's depth. */
  dy: number;
}

export const ART = {
  diver: { Component: Diver, x: 600, dy: -6 },
  anglerfish: { Component: Anglerfish, x: 690, dy: -60 },
  snailfish: { Component: Snailfish, x: 440, dy: 0 },
} satisfies Record<string, ArtPlacement>;

export type ArtId = keyof typeof ART;
