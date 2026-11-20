import { colors, sea } from "@/shared/theme/tokens";

/** A band of sea colour, hard-edged, from one depth to the next. */
export interface Band {
  from: number;
  to: number;
  color: string;
}

export const BANDS: readonly Band[] = [
  { from: 0, to: 30, color: sea.shallow },
  { from: 30, to: 150, color: sea.light },
  { from: 150, to: 200, color: sea.blue },
  { from: 200, to: 400, color: sea.twilight },
  { from: 400, to: 650, color: sea.twilightDeep },
  { from: 650, to: 1000, color: sea.dusk },
  { from: 1000, to: 2000, color: colors.navy },
  { from: 2000, to: 3000, color: colors.deepCard },
  { from: 3000, to: 4000, color: sea.abyssal1 },
  { from: 4000, to: 6000, color: sea.abyssal2 },
  { from: 6000, to: 10935, color: colors.abyss },
];

/** Text flips from navy to pale aqua once the water gets dark. */
export const INK_FLIP_DEPTH = 200;
export const inkAt = (depth: number) => (depth < INK_FLIP_DEPTH ? colors.ink : colors.aqua);

export interface Zone {
  id: string;
  name: string;
  depth: number;
  note: string;
}

export const ZONES: readonly Zone[] = [
  { id: "sunlight", name: "Sunlight zone", depth: 0, note: "" },
  { id: "twilight", name: "Twilight zone", depth: 200, note: "Photosynthesis gives up." },
  { id: "midnight", name: "Midnight zone", depth: 1000, note: "No more sunlight. From here on, the only light is alive." },
  { id: "abyssal", name: "Abyssal zone", depth: 4000, note: "From the Greek abyssos, “bottomless”. It isn’t. Keep going." },
  { id: "hadal", name: "Hadal zone", depth: 6000, note: "Named after Hades, god of the underworld. Only ocean trenches go this deep." },
];

/** Notes printed where the page's scale changes (see shared/lib/sea.ts). */
export interface ScaleNote {
  depth: number;
  /** `{now}` and `{before}` become the metres per px below and above `depth`, read from the scale. */
  text: string;
  /** Left edge in px within the content width (default: the right-hand margin). */
  x?: number;
  /** Text column width in px (default 200). */
  width?: number;
  /** px from the scale change (negative: above it), to clear other text. */
  dy?: number;
}

export const SCALE_NOTES: readonly ScaleNote[] = [
  {
    depth: 200,
    text: "SCALE: 1 px = {now} m from here. (It was 1 px = {before} m up top. A lot happens up there.)",
    // the open space under the leatherback, left of the Burj Khalifa
    x: 945,
    width: 180,
    dy: 94,
  },
  { depth: 1000, text: "SCALE CHANGE: 1 px = {now} m. Nothing happens for a while, so we sped up." },
  { depth: 6000, text: "SCALE CHANGE: 1 px = {now} m. Still nothing. Faster." },
  { depth: 8000, text: "SCALE: back to 1 px = {now} m. Things are about to happen." },
];
