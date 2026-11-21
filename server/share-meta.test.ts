import assert from "node:assert/strict";
import { test } from "node:test";
import { withShareMeta } from "./share-meta";
import { handleShareCard } from "./share-card";

const page = "<html><head><title>x</title></head><body></body></html>";

test("the page gets absolute og:image and twitter tags, with the visitor's name escaped", () => {
  const html = withShareMeta(page, new URL('http://h.test/?name=A"<b>'), "https://site.test");
  assert.match(html, /property="og:image" content="https:\/\/site\.test\/api\/share-card\?name=A%22%3Cb%3E"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.ok(html.indexOf("og:title") < html.indexOf("</head>"));
});

test("no name: the plain card", () => {
  assert.match(withShareMeta(page, new URL("http://h.test/"), "https://site.test"), /content="https:\/\/site\.test\/api\/share-card"/);
});

test("the card route returns a cached PNG, and refuses a long name and POST", async () => {
  const get = (path: string, init?: RequestInit) =>
    handleShareCard(new Request(`http://h.test/api/share-card${path}`, { headers: { "x-forwarded-for": "10.9.9.9" }, ...init }));
  const ok = await get("?name=Ada&depth=500");
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get("content-type"), "image/png");
  assert.match(ok.headers.get("cache-control") ?? "", /max-age/);
  assert.equal(
    Buffer.from(await ok.arrayBuffer())
      .subarray(1, 4)
      .toString(),
    "PNG",
  );
  assert.equal((await get(`?name=${"x".repeat(61)}`)).status, 400);
  assert.equal((await get("", { method: "POST" })).status, 405);
});
