/**
 * Every font, declared once: its family and weight, where the web gets it
 * (Fontsource CDN) and which TTF in assets/fonts the PDF and PNG load.
 * The theme builds the web list from this; the render script reads the TTFs.
 */
export const FONTS = [
  { family: "Bricolage Grotesque", weight: 400, cdn: ["bricolage-grotesque", "latin-400-normal"], ttf: "BricolageGrotesque-Regular.ttf" },
  { family: "Bricolage Grotesque", weight: 800, cdn: ["bricolage-grotesque", "latin-800-normal"], ttf: "BricolageGrotesque-ExtraBold.ttf" },
  { family: "IBM Plex Mono", weight: 400, cdn: ["ibm-plex-mono", "latin-400-normal"], ttf: "IBMPlexMono-Regular.ttf" },
  { family: "IBM Plex Mono", weight: 600, cdn: ["ibm-plex-mono", "latin-600-normal"], ttf: "IBMPlexMono-SemiBold.ttf" },
] as const;

/** Web fonts for Page and Email roots. */
export const webFonts = FONTS.map(({ family, weight, cdn: [pkg, file] }) => ({
  family,
  weight,
  src: `https://cdn.jsdelivr.net/fontsource/fonts/${pkg}@latest/${file}.woff2`,
}));
