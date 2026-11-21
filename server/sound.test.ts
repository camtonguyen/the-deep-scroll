import assert from "node:assert/strict";
import { test } from "node:test";
import { handleSound } from "./sound";

const get = (range?: string) => handleSound(new Request("http://x/api/sound", range ? { headers: { range } } : undefined));

test("the whole file, then a range, then a bad range", async () => {
  const whole = await get();
  assert.equal(whole.status, 200);
  const total = (await whole.arrayBuffer()).byteLength;
  const part = await get("bytes=0-9");
  assert.equal(part.status, 206);
  assert.equal(part.headers.get("content-range"), `bytes 0-9/${total}`);
  assert.equal((await part.arrayBuffer()).byteLength, 10);
  assert.equal((await get(`bytes=${total + 5}-`)).status, 416);
});
