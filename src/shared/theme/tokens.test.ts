import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";

const SRC = new URL("../../", import.meta.url);
const COLOR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/;

function files(dir: URL): URL[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(new URL(`${entry.name}/`, dir)) : [new URL(entry.name, dir)],
  );
}

test("every colour is written in theme/tokens.ts and nowhere else", () => {
  const strays = files(SRC)
    .filter((file) => /\.tsx?$/.test(file.pathname) && !/tokens(\.test)?\.ts$/.test(file.pathname))
    .filter((file) => COLOR.test(readFileSync(file, "utf8")))
    .map((file) => file.pathname.split("/src/")[1]);
  assert.deepEqual(strays, []);
});
