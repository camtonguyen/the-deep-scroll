import assert from "node:assert/strict";
import { test } from "node:test";
import { yToDepth } from "@/shared/lib/sea";
import { readoutText, temperatureC } from "@/shared/lib/readout";
import { formatNumber, pressureAtm } from "@/shared/lib/format";
import { DIVE_DATA, diveScript, MATHS } from "./script";

// The script runs in the browser, so check its copy of the maths against the shared code.
const maths = new Function("D", `${MATHS}; return {yToDepth,temp,light,atm,loud,slow,tint,approach}`)(DIVE_DATA);

test("the script's scale, temperature and pressure match shared/lib", () => {
  for (const y of [0, 150, 400, 900, 1200, 3700, 4200, 5000, 5668]) {
    assert.ok(Math.abs(maths.yToDepth(y) - yToDepth(y)) < 1e-9, `y ${y}`);
  }
  for (const d of [0, 100, 600, 1000, 4000, 10935]) {
    assert.ok(Math.abs(maths.temp(d) - temperatureC(d)) < 1e-9, `temp ${d}`);
    assert.ok(Math.abs(maths.atm(d) - pressureAtm(d)) < 1e-9, `atm ${d}`);
    assert.equal(readoutText(d).endsWith(maths.light(d)), true);
  }
});

test("the script is valid JavaScript", () => {
  assert.doesNotThrow(() => new Function(diveScript()));
});

test("the bubbles are silent when still, and louder the faster the diver moves", () => {
  assert.equal(maths.loud(0), 0);
  assert.equal(maths.loud(4), 0);
  assert.ok(maths.loud(10) >= 0.35 && maths.loud(10) < maths.loud(600));
  assert.ok(maths.loud(600) < maths.loud(5000));
  assert.equal(maths.loud(5000), 1);
});

test("the wheel slows a little at a stop and runs free in between", () => {
  const [first] = DIVE_DATA.stopYs;
  assert.equal(maths.slow(first), DIVE_DATA.slowMin);
  assert.ok(maths.slow(first + 10) > DIVE_DATA.slowMin && maths.slow(first + 10) < 1);
  assert.equal(maths.slow(-5000), 1);
});

test("the water darkens with depth up to a ceiling", () => {
  assert.equal(maths.tint(0), 0);
  assert.ok(maths.tint(300) < maths.tint(800));
  assert.equal(maths.tint(DIVE_DATA.tintDepth), DIVE_DATA.tintMax);
  assert.equal(maths.tint(10935), DIVE_DATA.tintMax);
});

test("easing moves toward the target, never past it, and faster for a longer step", () => {
  const a = maths.approach(0, 100, 16, 100);
  assert.ok(a > 0 && a < 100);
  assert.ok(maths.approach(0, 100, 64, 100) > a);
  assert.ok(Math.abs(maths.approach(0, 100, 5000, 100) - 100) < 1e-6);
  assert.equal(maths.approach(50, 50, 16, 100), 50);
});

test("the script formats numbers like shared/lib/format", () => {
  const fmt = new Function(diveScript().match(/var fmt=[^;]*;/)![0] + "return fmt")();
  for (const n of [0, 999.5, 1000, 3447.4, 10935]) assert.equal(fmt(n), formatNumber(n));
});
