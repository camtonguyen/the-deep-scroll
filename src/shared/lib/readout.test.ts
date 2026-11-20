import assert from "node:assert/strict";
import { test } from "node:test";
import { SCALE_NOTES } from "@/shared/data/zones";
import { metresPerPx, SCALE_CHANGES } from "./sea";
import { readoutText, temperatureC } from "./readout";

test("readouts: pressure, temperature, light", () => {
  assert.equal(readoutText(1000), "≈100 atm · 4 °C · dark");
  assert.equal(readoutText(4000), "≈397 atm · 2 °C · dark");
  assert.equal(temperatureC(600), 9.5);
});

test("metres per px follows SCALE", () => {
  assert.deepEqual([199, 200, 1000, 6000, 8000].map(metresPerPx), [0.5, 1, 2, 4, 2]);
});

test("the scale notes sit exactly on the scale changes", () => {
  assert.deepEqual(
    SCALE_NOTES.map((n) => n.depth),
    [...SCALE_CHANGES].slice(0, SCALE_NOTES.length),
  );
});
