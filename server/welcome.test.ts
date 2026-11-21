import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import type { Mail } from "./mail";
import { createWelcomeHandler, handleWelcome } from "./welcome";

const post = (body: unknown, ip: string) =>
  handleWelcome(
    new Request("http://localhost/api/welcome", { method: "POST", headers: { "x-forwarded-for": ip }, body: JSON.stringify(body) }),
  );

/** Run `fn` with these environment variables (undefined = unset), then put every one back. */
async function withEnv(vars: Record<string, string | undefined>, fn: () => Promise<void>) {
  const before = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  const apply = (values: Record<string, string | undefined>) =>
    Object.entries(values).forEach(([k, v]) => (v === undefined ? delete process.env[k] : (process.env[k] = v)));
  apply(vars);
  try {
    await fn();
  } finally {
    apply(before);
  }
}

const noMail = { BREVO_API_KEY: undefined, MAIL_FROM: undefined, SITE_URL: undefined };
const sentEmail = () => readFileSync(new URL("../out/welcome-email.html", import.meta.url), "utf8");

test("without mail credentials the email is saved, not sent, and the answer says so", () =>
  withEnv(noMail, async () => {
    const res = await post({ name: "Ada Marlowe", email: "ada@example.org" }, "10.1.0.1");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.sent, false);
    assert.match(body.message, /not set up/);
  }));

test("a bad or missing address is refused", async () => {
  assert.ok((await (await post({ name: "Ada", email: "nope" }, "10.1.0.2")).json()).errors.email);
  assert.equal((await post({ name: "Ada" }, "10.1.0.2")).status, 400);
});

test("one address gets 2 emails a minute", async () => {
  const codes = [];
  for (let i = 0; i < 3; i++) codes.push((await post({ name: "Bo", email: "bo@example.org" }, "10.1.0.3")).status);
  assert.deepEqual(codes, [200, 200, 429]);
});

test("the email's button downloads the signed certificate, centered", () =>
  withEnv({ ...noMail, SITE_URL: "https://example.test/" }, async () => {
    await post({ name: "Ada Marlowe", email: "ada@example.org" }, "10.1.0.4");
    const html = sentEmail();
    assert.match(html.replaceAll("&nbsp;", " ").replaceAll(String.fromCharCode(160), " "), /Download your dive certificate/);
    assert.match(html, /href="https:\/\/example\.test\/api\/certificate\?name=Ada\+Marlowe&amp;date=[^"]+&amp;sig=[0-9a-f]{64}"/);
    assert.equal((await post({ email: "ada@example.org" }, "10.1.0.5")).status, 400);
  }));

test("the date in the link is today's, whatever the client sends", () =>
  withEnv(noMail, async () => {
    await post({ name: "Ada Marlowe", email: "ada@example.org", date: "1 January 1900" }, "10.1.0.6");
    assert.doesNotMatch(sentEmail(), /1\+January\+1900/);
  }));

test("in production the link needs CERTIFICATE_SECRET and SITE_URL, or nothing is sent", async () => {
  const production = { ...noMail, NODE_ENV: "production" };
  await withEnv({ ...production, CERTIFICATE_SECRET: undefined, SITE_URL: "https://example.test" }, async () => {
    assert.equal((await post({ name: "Ada", email: "p1@example.org" }, "10.1.0.7")).status, 500);
  });
  await withEnv({ ...production, CERTIFICATE_SECRET: "s3cret", SITE_URL: undefined }, async () => {
    assert.equal((await post({ name: "Ada", email: "p2@example.org" }, "10.1.0.8")).status, 500);
  });
  await withEnv({ ...production, CERTIFICATE_SECRET: "s3cret", SITE_URL: "https://example.test" }, async () => {
    assert.equal((await post({ name: "Ada", email: "p3@example.org" }, "10.1.0.9")).status, 200);
  });
});

test("a mailer passed in gets the email: no files, no provider", () =>
  withEnv(noMail, async () => {
    const sent: Mail[] = [];
    const handler = createWelcomeHandler(async (mail) => (sent.push(mail), "sent"));
    const res = await handler(
      new Request("http://localhost/api/welcome", {
        method: "POST",
        headers: { "x-forwarded-for": "10.1.0.20" },
        body: JSON.stringify({ name: "Ada Marlowe", email: "mailer@example.org" }),
      }),
    );
    const answer = await res.json();
    assert.equal(answer.sent, true, JSON.stringify(answer));
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, "mailer@example.org");
    assert.match(sent[0].html, /\/api\/certificate\?name=Ada\+Marlowe/);
  }));

test("a mailer that fails is a 502, not a crash", () =>
  withEnv(noMail, async () => {
    const handler = createWelcomeHandler(async () => {
      throw new Error("provider down");
    });
    const res = await handler(
      new Request("http://localhost/api/welcome", {
        method: "POST",
        headers: { "x-forwarded-for": "10.1.0.21" },
        body: JSON.stringify({ name: "Ada", email: "ada2@example.org" }),
      }),
    );
    assert.equal(res.status, 502);
  }));
