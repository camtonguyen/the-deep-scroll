import assert from "node:assert/strict";
import { test } from "node:test";
import { yToDepth } from "@/shared/lib/sea";
import { readoutText, temperatureC } from "@/shared/lib/readout";
import { pressureAtm } from "@/shared/lib/format";
import { DIVE_DATA, diveScript, MATHS } from "./script";

// The script runs in the browser, so check its copy of the maths against the shared code.
const maths = new Function("D", `${MATHS}; return {yToDepth,temp,light,atm}`)(DIVE_DATA);

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
