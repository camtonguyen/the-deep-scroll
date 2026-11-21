import assert from "node:assert/strict";
import { test } from "node:test";
import { handleWelcome } from "./welcome";

const post = (body: unknown, ip: string) =>
  handleWelcome(
    new Request("http://localhost/api/welcome", { method: "POST", headers: { "x-forwarded-for": ip }, body: JSON.stringify(body) }),
  );

test("without mail credentials the email is saved, not sent", async () => {
  delete process.env.BREVO_API_KEY;
  const res = await post({ name: "Ada Marlowe", email: "ada@example.org" }, "10.1.0.1");
  assert.equal(res.status, 200);
  assert.match((await res.json()).message, /not set up/);
});

test("a bad or missing address is refused", async () => {
  assert.ok((await (await post({ name: "Ada", email: "nope" }, "10.1.0.2")).json()).errors.email);
  assert.equal((await post({ name: "Ada" }, "10.1.0.2")).status, 400);
});

test("one address gets 2 emails a minute", async () => {
  const codes = [];
  for (let i = 0; i < 3; i++) codes.push((await post({ name: "Bo", email: "bo@example.org" }, "10.1.0.3")).status);
  assert.deepEqual(codes, [200, 200, 429]);
});
