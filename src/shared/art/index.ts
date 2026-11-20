import type { ComponentType } from "react";
import { Anglerfish } from "./anglerfish";
import { Boat } from "./boat";
import { BurjKhalifa } from "./burj-khalifa";
import { CloudLarge, CloudSmall } from "./clouds";
import { Diver } from "./diver";
import { AbyssalPlain, ABYSSAL_PLAIN_X } from "./abyssal-plain";
import { Amphipod } from "./amphipod";
import { BLUE_WHALE_X, BlueWhale } from "./blue-whale";
import { CuviersWhale } from "./cuviers-whale";
import { DumboOctopus } from "./dumbo-octopus";
import { EmperorPenguin } from "./emperor-penguin";
import { FleeingSquid } from "./fleeing-squid";
import { Flag } from "./flag";
import { GiantSquid } from "./giant-squid";
import { Leatherback } from "./leatherback";
import { MarineSnow, MARINE_SNOW_HEIGHT } from "./marine-snow";
import { MountEverest } from "./mount-everest";
import { Seafloor } from "./seafloor";
import { SeaPig } from "./sea-pig";
import { SpermWhale } from "./sperm-whale";
import { Titanic } from "./titanic";
import { TriesteSub } from "./trieste-sub";
import { VampireSquid } from "./vampire-squid";
import { Snailfish } from "./snailfish";
import { WaveLine, WAVE_PERIOD } from "./wave-line";

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
  /** Wider than the content: drawn across the window, centred (`front` of the text, or `behind` it). */
  bleed?: "front" | "behind";
}

export const ART = {
  diver: { Component: Diver, x: 600, dy: -6 },
  anglerfish: { Component: Anglerfish, x: 690, dy: -60 },
  snailfish: { Component: Snailfish, x: 440, dy: 0 },
  blueWhale: { Component: BlueWhale, x: BLUE_WHALE_X, dy: -4, desktopOnly: true, bleed: "front" },
  leatherback: { Component: Leatherback, x: 780, dy: 10 },
  giantSquid: { Component: GiantSquid, x: 0, dy: -2, desktopOnly: true },
  emperorPenguin: { Component: EmperorPenguin, x: 182, dy: -20 },
  vampireSquid: { Component: VampireSquid, x: 620, dy: -20 },
  spermWhale: { Component: SpermWhale, x: 540, dy: -30, desktopOnly: true },
  fleeingSquid: { Component: FleeingSquid, x: 1074, dy: 0, desktopOnly: true },
  cuviersWhale: { Component: CuviersWhale, x: 700, dy: -10 },
  titanic: { Component: Titanic, x: 770, dy: -44, desktopOnly: true },
  abyssalPlain: { Component: AbyssalPlain, x: ABYSSAL_PLAIN_X, dy: -32, desktopOnly: true, bleed: "behind" },
  seaPig: { Component: SeaPig, x: 290, dy: -56 },
  amphipod: { Component: Amphipod, x: 896, dy: -26 },
  triesteSub: { Component: TriesteSub, x: 560, dy: 104 },
  flag: { Component: Flag, x: 850, dy: 154 },
  everest: { Component: MountEverest, x: 640, dy: 0, desktopOnly: true },
  seafloor: { Component: Seafloor, x: -680, dy: -18, desktopOnly: true, bleed: "behind" },
  marineSnow: { Component: MarineSnow, x: -680, dy: 0, desktopOnly: true, bleed: "behind" },
  dumboOctopus: { Component: DumboOctopus, x: 700, dy: -10 },
} satisfies Record<string, ArtPlacement>;

export type ArtId = keyof typeof ART;

/** Scenery with its own placement (the surface and the Burj Khalifa). */
export { Boat, BurjKhalifa, CloudLarge, CloudSmall, MARINE_SNOW_HEIGHT, WAVE_PERIOD, WaveLine };
