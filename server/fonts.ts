import { readFile } from "node:fs/promises";
import { FONTS } from "../src/shared/theme/fonts";

const FONTS_DIR = new URL("../assets/fonts/", import.meta.url);

let cached: ReturnType<typeof read> | undefined;
const read = () =>
  Promise.all(FONTS.map(async ({ family, weight, ttf }) => ({ family, weight, src: await readFile(new URL(ttf, FONTS_DIR)) })));

/** The PDF and PNG are drawn offline, so they get the font files as bytes (TTF). Read once per process. */
export function loadFonts() {
  return (cached ??= read());
}
