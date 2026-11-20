import assert from "node:assert/strict";
import { test } from "node:test";
import { handleCertificate } from "./certificate";

const post = (body: unknown, ip: string) =>
  handleCertificate(
    new Request("http://localhost/api/certificate", {
      method: "POST",
      headers: { "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

test("a valid form returns a PDF download", async () => {
  const res = await post({ name: "Ada Marlowe", email: "ada@example.org", date: "1 May 2026" }, "10.0.0.1");
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

test("bad input is refused with a message, not rendered", async () => {
  const noName = await post({ name: "   " }, "10.0.0.2");
  assert.equal(noName.status, 400);
  assert.ok((await noName.json()).errors.name);
  assert.equal((await post("not json", "10.0.0.2")).status, 400);
  assert.equal((await post({ name: "x".repeat(3000) }, "10.0.0.2")).status, 413);
  assert.equal((await handleCertificate(new Request("http://localhost/api/certificate"))).status, 405);
});

test("one client gets 10 requests a minute", async () => {
  const codes = [];
  for (let i = 0; i < 11; i++) codes.push((await post({ name: "" }, "10.0.0.3")).status);
  assert.deepEqual(codes.slice(9), [400, 429]);
});
