/**
 * Every font, declared once: its family and weight, where the web gets it
 * (Fontsource CDN) and which TTF in assets/fonts the PDF and PNG load.
 * The theme builds the web list from this; the render script reads the TTFs.
 */
export const FONTS = [
  { family: "Roboto", weight: 400, cdn: ["roboto", "latin-400-normal"], ttf: "Roboto-Regular.ttf" },
  { family: "Roboto", weight: 700, cdn: ["roboto", "latin-700-normal"], ttf: "Roboto-Bold.ttf" },
  { family: "Roboto Condensed", weight: 400, cdn: ["roboto-condensed", "latin-400-normal"], ttf: "RobotoCondensed-Regular.ttf" },
  { family: "Roboto Condensed", weight: 700, cdn: ["roboto-condensed", "latin-700-normal"], ttf: "RobotoCondensed-Bold.ttf" },
] as const;

/** Web fonts for Page and Email roots. */
export const webFonts = FONTS.map(({ family, weight, cdn: [pkg, file] }) => ({
  family,
  weight,
  src: `https://cdn.jsdelivr.net/fontsource/fonts/${pkg}@5.3.0/${file}.woff2`,
}));
