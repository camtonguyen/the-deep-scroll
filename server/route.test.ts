import assert from "node:assert/strict";
import { test } from "node:test";
import { route } from "./route";

const ok = () => new Response("ok");
const req = (init: RequestInit & { ip?: string }, url = "http://x/api/t") =>
  new Request(url, { ...init, headers: { "x-forwarded-for": init.ip ?? "9.9.9.9", ...init.headers } });

test("a wrong method is a 405 with Allow, as text for GET routes and JSON for POST routes", async () => {
  const get = await route({ method: "GET" }, ok)(req({ method: "POST" }));
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("allow"), "GET, HEAD");
  const post = await route({ method: "POST" }, ok)(req({ method: "GET" }));
  assert.equal(post.status, 405);
  assert.deepEqual(await post.json(), { error: "Use POST." });
  assert.equal((await route({ method: "GET" }, ok)(req({ method: "HEAD" }))).status, 200);
});

test("the 11th request from one address in a minute is a 429, in the route's own bucket", async () => {
  const a = route({ method: "GET", bucket: "t-a", plain: true }, ok);
  const b = route({ method: "GET", bucket: "t-b" }, ok);
  const codes = [];
  for (let i = 0; i < 11; i++) codes.push((await a(req({ ip: "8.8.8.8" }))).status);
  assert.deepEqual(codes.slice(-2), [200, 429]);
  assert.equal((await a(req({ ip: "8.8.8.8" }))).headers.get("content-type"), "text/plain");
  assert.equal((await b(req({ ip: "8.8.8.8" }))).status, 200);
});

test("a POST body is capped and parsed before the handler sees it", async () => {
  const seen: unknown[] = [];
  const handler = route({ method: "POST", maxBody: 20 }, ({ body }) => (seen.push(body), new Response("ok")));
  assert.equal((await handler(req({ method: "POST", body: "{" }))).status, 400);
  assert.equal((await handler(req({ method: "POST", body: JSON.stringify({ a: "x".repeat(30) }) }))).status, 413);
  assert.equal((await handler(req({ method: "POST", body: '{"a":1}' }))).status, 200);
  assert.deepEqual(seen, [{ a: 1 }]);
});
