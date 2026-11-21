/** Stacking order on the landing page, back to front. One place so the layers never fight. */
export const LAYERS = {
  /** A drawing lifted above the text beside it, so it can be hovered. */
  lifted: 5,
  /** The dark veil over the page that deepens with depth. */
  veil: 40,
  /** The fixed diver and the dive computer. */
  hud: 50,
  /** Controls that must always be reachable. */
  control: 60,
} as const;
