import assert from "node:assert/strict";
import { test } from "node:test";
import { fitFontSize, visitorDepth } from "./visitor";

test("a depth is clamped to the sea and rounded", () => {
  assert.deepEqual([-5, 150.6, 99999].map(visitorDepth), [0, 151, 10935]);
});

test("long names get smaller type, never below the minimum", () => {
  assert.equal(fitFontSize("Ada Marlowe", 64, 30), 64);
  assert.equal(fitFontSize("A".repeat(32), 64, 30), 32);
  assert.equal(fitFontSize("A".repeat(200), 64, 30), 30);
});
