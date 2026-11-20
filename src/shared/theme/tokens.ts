/** Design tokens. */
export const colors = {
  sky: "#E4F5FC",
  surface: "#8FD3F4",
  navy: "#0A243D",
  aqua: "#CFEFFF",
  abyss: "#010407",
  deepCard: "#07182A",
  hull: "#FBFAF4",
  cyan: "#4DF2E3",
  /** Anglerfish yellow: the one "glow" accent, used only in the dark. */
  glow: "#FFE45C",
} as const;

export const fonts = {
  display: "Bricolage Grotesque, system-ui, sans-serif",
  mono: "IBM Plex Mono, ui-monospace, monospace",
} as const;

/** Width of the readable content, in px (see shared/ui/container.tsx). */
export const CONTENT_WIDTH = 1200;

/**
 * The Page root's width. It's wider than the content so full-bleed things
 * (the sea's colour bands) reach the window's edges; text stays at
 * CONTENT_WIDTH inside a Container.
 */
export const PAGE_WIDTH = 2560;
