import type { ComponentType } from "react";
import { Anglerfish } from "./anglerfish";
import { Boat } from "./boat";
import { BurjKhalifa } from "./burj-khalifa";
import { CloudLarge, CloudSmall } from "./clouds";
import { Diver } from "./diver";
import { BLUE_WHALE_X, BlueWhale } from "./blue-whale";
import { CuviersWhale } from "./cuviers-whale";
import { DumboOctopus } from "./dumbo-octopus";
import { EmperorPenguin } from "./emperor-penguin";
import { FleeingSquid } from "./fleeing-squid";
import { GiantSquid } from "./giant-squid";
import { Leatherback } from "./leatherback";
import { SpermWhale } from "./sperm-whale";
import { Titanic } from "./titanic";
import { VampireSquid } from "./vampire-squid";
import { Snailfish } from "./snailfish";
import { WaveLine } from "./wave-line";

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
  /** Too wide for a phone: skipped in the stacked layout. */
  desktopOnly?: boolean;
  /** Wider than the content: drawn across the window, centred, instead of at `x`. */
  bleed?: boolean;
}

export const ART = {
  diver: { Component: Diver, x: 600, dy: -6 },
  anglerfish: { Component: Anglerfish, x: 690, dy: -60 },
  snailfish: { Component: Snailfish, x: 440, dy: 0 },
  blueWhale: { Component: BlueWhale, x: BLUE_WHALE_X, dy: -4, desktopOnly: true, bleed: true },
  leatherback: { Component: Leatherback, x: 440, dy: 4 },
  giantSquid: { Component: GiantSquid, x: 0, dy: 50, desktopOnly: true },
  emperorPenguin: { Component: EmperorPenguin, x: 182, dy: -20 },
  vampireSquid: { Component: VampireSquid, x: 620, dy: -20 },
  spermWhale: { Component: SpermWhale, x: 540, dy: -30, desktopOnly: true },
  fleeingSquid: { Component: FleeingSquid, x: 1074, dy: 0, desktopOnly: true },
  cuviersWhale: { Component: CuviersWhale, x: 700, dy: -10 },
  titanic: { Component: Titanic, x: 770, dy: -44, desktopOnly: true },
  dumboOctopus: { Component: DumboOctopus, x: 700, dy: -10 },
} satisfies Record<string, ArtPlacement>;

export type ArtId = keyof typeof ART;

/** Scenery with its own placement (the surface and the Burj Khalifa). */
export { Boat, BurjKhalifa, CloudLarge, CloudSmall, WaveLine };
