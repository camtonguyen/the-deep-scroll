/**
 * Design tokens: every colour in the project lives in this file (and nowhere
 * else), in three groups. `sea` is the water, `colors` the brand and page,
 * `art` and `lightLoss` the drawings and the red-light chips.
 */

/** The water, hard-edged bands from the surface (0 m) to the Challenger Deep. */
export const sea = {
  shallow: "#8FD3F4",
  light: "#5BB8E6",
  blue: "#2E8FC9",
  twilight: "#1C6AA0",
  twilightDeep: "#144C78",
  dusk: "#0E3557",
  midnight: "#0A243D",
  abyssal0: "#07182A",
  abyssal1: "#050F1C",
  abyssal2: "#030912",
  hadal: "#010407",
} as const;

/** Brand and page colours. */
export const colors = {
  sky: "#E4F5FC",
  surface: sea.shallow,
  navy: sea.midnight,
  /** Text on the lit bands: navy is under 4.5:1 on the 150 to 200 m blue, this is not. */
  ink: "#04121F",
  aqua: "#CFEFFF",
  white: "#FFFFFF",
  abyss: sea.hadal,
  deepCard: sea.abyssal0,
  hull: "#FBFAF4",
  /** The certificate's paper. */
  paper: "#EEF8FC",
  cyan: "#4DF2E3",
  /** Anglerfish yellow: the one "glow" accent, used only in the dark. */
  glow: "#FFE45C",
  /** The yellow button's halo: the glow at 7% and 14% over the deep, blended flat (no opacity needed). */
  glowHalo: "#13140D",
  glowHaloInner: "#252313",
} as const;

/** Colours of the drawings in shared/art, named for what they colour. */
export const art = {
  seabed: "#1B2430",
  seabedGrain: "#2E3D50",
  boatBlue: sea.twilight,
  amphipodShell: "#F0E6D8",
  anglerBody: "#12202B",
  anglerSpot: "#26394A",
  whaleBody: "#3F6F96",
  cuvierBody: "#7A6656",
  cuvierBelly: "#A08D7C",
  diverFin: "#7A5048",
  dumboBelly: "#D88E98",
  dumboFin: "#E8A6AE",
  dumboWeb: "#C47683",
  penguinBeak: "#F2A33A",
  penguinBelly: "#F4F7F8",
  squidBody: "#A8483A",
  squidFin: "#8E3A2F",
  turtleShell: "#24404F",
  turtleHead: "#3A5868",
  everestRock: "#2A3340",
  seaPigBody: "#D9A3C4",
  seaPigLegs: "#C98BB0",
  snailfishBody: "#F2C6CF",
  snailfishFin: "#E9B8C3",
  spermBody: "#3D4A57",
  spermMark: "#5E6E7E",
  titanicHull: "#5A3A2C",
  titanicRust: "#B57A54",
  triesteHull: "#2B4A63",
  triesteWindow: "#3A5A72",
  triesteLight: "#46688A",
  triesteShade: "#1E3548",
  vampireBody: "#6B1E2E",
} as const;

/** The red-light chips at 5 m: a colour's true shade, and how it looks once its light is lost. */
export const lightLoss = {
  red: { truth: "#E0442E", seen: "#5E4A4C" },
  orange: { truth: "#F08A24", seen: "#6F6A5A" },
  yellow: { truth: "#EBCB3A", seen: "#7E9A86" },
  green: { truth: "#3FA34D", seen: "#3E8C8A" },
} as const;

export const fonts = {
  display: "Roboto, system-ui, sans-serif",
  mono: "Roboto Condensed, Roboto, sans-serif",
} as const;

/** Width of the readable content, in px (see shared/ui/container.tsx). */
export const CONTENT_WIDTH = 1200;

/**
 * The Page root's width. It's wider than the content so full-bleed things
 * (the sea's colour bands) reach the window's edges; text stays at
 * CONTENT_WIDTH inside a Container.
 */
export const PAGE_WIDTH = 2560;
