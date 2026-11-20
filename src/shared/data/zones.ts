import { colors } from "@/shared/theme/tokens";

/** A band of sea colour, hard-edged, from one depth to the next. */
export interface Band {
  from: number;
  to: number;
  color: string;
}

export const BANDS: readonly Band[] = [
  { from: 0, to: 30, color: "#8FD3F4" },
  { from: 30, to: 150, color: "#5BB8E6" },
  { from: 150, to: 200, color: "#2E8FC9" },
  { from: 200, to: 400, color: "#1C6AA0" },
  { from: 400, to: 650, color: "#144C78" },
  { from: 650, to: 1000, color: "#0E3557" },
  { from: 1000, to: 2000, color: "#0A243D" },
  { from: 2000, to: 3000, color: "#07182A" },
  { from: 3000, to: 4000, color: "#050F1C" },
  { from: 4000, to: 6000, color: "#030912" },
  { from: 6000, to: 10935, color: colors.abyss },
];

/** Text flips from navy to pale aqua once the water gets dark. */
export const INK_FLIP_DEPTH = 200;
export const inkAt = (depth: number) => (depth < INK_FLIP_DEPTH ? colors.navy : colors.aqua);

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
export const SCALE_NOTES: readonly { depth: number; text: string }[] = [
  { depth: 200, text: "SCALE: 1 px = 1 m from here. (It was 1 px = 0.5 m up top. A lot happens up there.)" },
  { depth: 1000, text: "SCALE CHANGE: 1 px = 2 m. Nothing happens for a while, so we sped up." },
  { depth: 6000, text: "SCALE CHANGE: 1 px = 4 m. Still nothing. Faster." },
  { depth: 8000, text: "SCALE: back to 1 px = 2 m. Things are about to happen." },
];
