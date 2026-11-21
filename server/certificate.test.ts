import assert from "node:assert/strict";
import { test } from "node:test";
import { certificateLink } from "./certificate-link";
import { handleCertificate } from "./certificate";

const get = (url: string, ip: string) => handleCertificate(new Request(url, { headers: { "x-forwarded-for": ip } }));
const link = (name: string, date = "1 May 2026") => certificateLink("http://localhost", name, date);

test("a signed link returns a PDF download", async () => {
  const res = await get(await link("Ada Marlowe"), "10.0.0.1");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "application/pdf");
  assert.match(res.headers.get("content-disposition") ?? "", /^attachment/);
  assert.equal(
    Buffer.from(await res.arrayBuffer())
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
});

test("a missing, wrong or reused signature is refused", async () => {
  const good = new URL(await link("Ada Marlowe"));
  const swap = (key: string, value: string) => {
    const url = new URL(good);
    url.searchParams.set(key, value);
    return url.href;
  };
  assert.equal((await get("http://localhost/api/certificate?name=Ada&date=1%20May%202026", "10.0.0.2")).status, 403);
  assert.equal((await get(swap("name", "Bob"), "10.0.0.2")).status, 403);
  assert.equal((await get(swap("date", "2 May 2026"), "10.0.0.2")).status, 403);
  assert.equal((await get(swap("sig", "zz"), "10.0.0.2")).status, 403);
});

test("bad input is refused, not rendered", async () => {
  assert.equal((await get(await link("x".repeat(61)), "10.0.0.4")).status, 400);
  assert.equal((await get("http://localhost/api/certificate", "10.0.0.4")).status, 400);
  assert.equal((await handleCertificate(new Request("http://localhost/api/certificate", { method: "POST" }))).status, 405);
});

test("one client gets 10 requests a minute", async () => {
  const codes = [];
  for (let i = 0; i < 11; i++) codes.push((await get("http://localhost/api/certificate", "10.0.0.3")).status);
  assert.deepEqual(codes.slice(9), [400, 429]);
});

test("in production, with no secret, links are not checked against the public dev secret", async () => {
  const url = await link("Ada Marlowe");
  const before = [process.env.NODE_ENV, process.env.CERTIFICATE_SECRET];
  process.env.NODE_ENV = "production";
  delete process.env.CERTIFICATE_SECRET;
  try {
    assert.equal((await get(url, "10.0.0.5")).status, 500);
  } finally {
    process.env.NODE_ENV = before[0];
    if (before[1] === undefined) delete process.env.CERTIFICATE_SECRET;
    else process.env.CERTIFICATE_SECRET = before[1];
  }
});
