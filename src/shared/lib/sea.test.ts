import assert from "node:assert/strict";
import { test } from "node:test";
import { BANDS } from "@/shared/data/zones";
import { bandRects, depthToY, MAX_DEPTH, SEA_HEIGHT, ticks, yToDepth } from "./sea";

// Worked by hand from SCALE: 2 px/m to 200 m, 1 px/m to 1,000 m, 0.5 to 6,000 m,
// 0.25 to 8,000 m, 0.5 to 10,935 m. So 200 m = 400 px, 1,000 m = 1,200 px,
// 6,000 m = 3,700 px, 8,000 m = 4,200 px, 10,935 m = 5,667.5 px.

test("the sea is 5,668 px tall", () => {
  assert.equal(SEA_HEIGHT, 5668);
});

test("band rectangles sit at their worked-out positions", () => {
  const rects = bandRects();
  assert.deepEqual(
    [rects[0], rects[1], rects[9], rects[10]].map(({ y, height }) => ({ y, height })),
    [
      { y: 0, height: 60 }, // 0–30 m
      { y: 60, height: 240 }, // 30–150 m
      { y: 2700, height: 1000 }, // 4,000–6,000 m
      { y: 3700, height: 1968 }, // 6,000–10,935 m
    ],
  );
});

test("band rectangles tile the sea with no gaps", () => {
  const rects = bandRects();
  let y = 0;
  for (const rect of rects) {
    assert.equal(rect.y, y);
    y += rect.height;
  }
  assert.equal(y, SEA_HEIGHT);
});

test("band rectangles scale to a given height", () => {
  const rects = bandRects(SEA_HEIGHT / 2);
  assert.deepEqual({ y: rects[1].y, height: rects[1].height }, { y: 30, height: 120 });
  assert.equal(rects.at(-1)!.y + rects.at(-1)!.height, SEA_HEIGHT / 2);
});

test("an overlap makes each rectangle taller, except the last", () => {
  const rects = bandRects(SEA_HEIGHT, { overlap: 1 });
  assert.equal(rects[0].height, 61);
  assert.equal(rects.at(-1)!.height, 1968);
});

test("ticks every 100 m run from the surface to the bottom", () => {
  const list = ticks(100);
  assert.equal(list.length, 110); // 0, 100, … 10,900
  assert.deepEqual(list[0], { depth: 0, y: 0 });
  assert.deepEqual(list[5], { depth: 500, y: 700 });
  assert.equal(list.at(-1)!.depth, 10900);
});

test("the colour bands end at the bottom of the sea", () => {
  assert.equal(BANDS.at(-1)!.to, MAX_DEPTH);
});

test("yToDepth undoes depthToY across every scale change", () => {
  for (const depth of [0, 150, 200, 640, 1000, 4800, 6000, 7000, 8000, 10935]) {
    assert.ok(Math.abs(yToDepth(depthToY(depth)) - depth) < 1e-9, `${depth} m`);
  }
  assert.equal(yToDepth(400), 200);
  assert.equal(yToDepth(SEA_HEIGHT + 100), MAX_DEPTH);
});
