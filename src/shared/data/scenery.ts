import type { ArtId } from "@/shared/art";
import { colors } from "@/shared/theme/tokens";

/** A drawing that belongs to a depth, not to a stop. It sits at the depth plus its own offset (shared/art). */
export interface Scenery {
  art: ArtId;
  depth: number;
}

export const SCENERY: readonly Scenery[] = [
  { art: "marineSnow", depth: 1000 },
  { art: "everest", depth: 6000 },
  { art: "seafloor", depth: 10935 },
];

/** A small label set over the art. Svg has no text, so these are placed like any other item. */
export interface Note {
  id: string;
  depth: number;
  /** px from the depth's position. */
  dy: number;
  /** Left edge in px within the content width. */
  x: number;
  text: string;
  color: string;
  size?: number;
  /** Centre the text in a box this wide. */
  width?: number;
}

export const NOTES: readonly Note[] = [
  {
    id: "everest-continues",
    depth: 6000,
    dy: 12,
    x: 660,
    width: 280,
    size: 12,
    text: "↑ Everest continues up to the surface",
    color: colors.aqua,
  },
  { id: "amphipod-arrow", depth: 10500, dy: -2, x: 928, text: "← this one", color: colors.cyan },
  { id: "trieste-name", depth: 10935, dy: -74, x: 622, size: 14, text: "TRIESTE", color: colors.aqua },
  { id: "you-are-here", depth: 10935, dy: -48, x: 900, text: "YOU ARE HERE", color: colors.glow },
];
