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
