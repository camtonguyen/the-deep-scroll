import { defineTheme } from "@hyper-elements/react";
import { colors, fonts } from "./tokens";

/**
 * The brand, written once. Every root (Page, Email, Document, Canvas)
 * takes it as `theme`, so all four outputs stay on brand.
 */
export const theme = defineTheme({
  colors: {
    background: colors.abyss,
    foreground: colors.navy,
    primary: colors.navy,
    primaryForeground: colors.sky,
    border: colors.aqua,
  },
  fonts: {
    body: fonts.display,
    heading: fonts.display,
  },
  styles: {
    mono: { fontFamily: fonts.mono, fontSize: 13, letterSpacing: 0.5 },
  },
});

/** Web fonts for Page and Email roots (Fontsource CDN). */
const cdn = (family: string, file: string) => `https://cdn.jsdelivr.net/fontsource/fonts/${family}@latest/${file}.woff2`;

export const webFonts = [
  { family: "Bricolage Grotesque", src: cdn("bricolage-grotesque", "latin-400-normal"), weight: 400 },
  { family: "Bricolage Grotesque", src: cdn("bricolage-grotesque", "latin-800-normal"), weight: 800 },
  { family: "IBM Plex Mono", src: cdn("ibm-plex-mono", "latin-400-normal"), weight: 400 },
  { family: "IBM Plex Mono", src: cdn("ibm-plex-mono", "latin-600-normal"), weight: 600 },
] as const;
