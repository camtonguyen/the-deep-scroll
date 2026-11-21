import assert from "node:assert/strict";
import { test } from "node:test";
import { atmAt, checkVisitor, lightAt, scaleToDepth, tempAt } from "./portable";
import { VISITOR_RULES } from "./visitor-form";

// The page gets these functions as source text: run that text the way the page does (no module scope around it).
const page = new Function(
  [scaleToDepth, tempAt, lightAt, atmAt, checkVisitor].join("\n") + "; return {scaleToDepth,tempAt,lightAt,atmAt,checkVisitor}",
)();

test("the page's copy has no helper the module scope would have supplied", () => {
  for (const fn of [scaleToDepth, tempAt, lightAt, atmAt, checkVisitor]) assert.doesNotMatch(String(fn), /__name|__vi_/);
});

test("the page's checkVisitor answers like the server's", () => {
  const inputs = [
    { name: " Ada ", email: "ada@example.org" },
    { name: "\u0007 ", email: "nope" },
    { name: "A".repeat(61), email: "" },
    { name: "Bo", email: "a@" + "b".repeat(130) + ".co" },
    { name: "Bo", email: "" },
    null,
  ];
  for (const input of inputs)
    for (const requireEmail of [false, true])
      assert.deepEqual(
        page.checkVisitor(input, "today", VISITOR_RULES, requireEmail),
        checkVisitor(input, "today", VISITOR_RULES, requireEmail),
      );
});

test("a required email must be typed", () => {
  const r = checkVisitor({ name: "Ada", email: "" }, "x", VISITOR_RULES, true);
  assert.deepEqual(r, { ok: false, errors: { email: VISITOR_RULES.messages.emailRequired } });
});

test("scale, temperature, light and pressure rules agree with the page's copy", () => {
  const scale = [
    [0, 10, 2],
    [10, 20, 1],
  ];
  const temps = [
    [0, 20],
    [10, 10],
  ];
  const light = [
    [0, "sun"],
    [5, "dim"],
  ] as [number, string][];
  for (const y of [-1, 0, 5, 20, 25, 30]) assert.equal(page.scaleToDepth(y, scale, 99), scaleToDepth(y, scale, 99));
  assert.equal(scaleToDepth(31, scale, 99), 99);
  for (const d of [-5, 0, 5, 10, 50]) assert.equal(page.tempAt(d, temps), tempAt(d, temps));
  assert.equal(tempAt(5, temps), 15);
  assert.equal(tempAt(-5, temps), 20);
  assert.equal(lightAt(7, light), "dim");
  assert.equal(atmAt(20, 10), 3);
});
