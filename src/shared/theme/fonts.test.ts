import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { FONTS, webFonts } from "./fonts";
import { fonts } from "./tokens";

const FONT_DIR = new URL("../../../assets/fonts/", import.meta.url);

test("every declared font has its TTF in assets/fonts", () => {
  for (const font of FONTS) {
    assert.ok(existsSync(new URL(font.ttf, FONT_DIR)), `${font.ttf} is missing`);
  }
});

test("every family in the CSS stacks is declared", () => {
  const declared = new Set<string>(FONTS.map((font) => font.family));
  for (const stack of Object.values(fonts)) {
    const family = stack.split(",")[0].trim();
    assert.ok(declared.has(family), `${family} is not in FONTS`);
  }
});

test("web fonts are built from the same list", () => {
  assert.equal(webFonts.length, FONTS.length);
  for (const font of FONTS) {
    assert.ok(webFonts.some((web) => web.family === font.family && web.weight === font.weight));
  }
});
