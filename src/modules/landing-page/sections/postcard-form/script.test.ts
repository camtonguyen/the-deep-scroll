import assert from "node:assert/strict";
import { test } from "node:test";
import { postcardScript } from "./script";

test("the form script is valid JavaScript and carries the shared check, with no helper from this module's scope", () => {
  const source = postcardScript();
  assert.doesNotThrow(() => new Function(source));
  assert.match(source, /function checkVisitor/);
  assert.doesNotMatch(source, /__name|__vi_/);
});
