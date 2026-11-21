import assert from "node:assert/strict";
import { test } from "node:test";
import { certificateNumber, cleanText, fitFontSize, MESSAGES, validateCertificateRequest, visitorDepth } from "./visitor";

test("a depth is clamped to the sea and rounded", () => {
  assert.deepEqual([-5, 150.6, 99999].map(visitorDepth), [0, 151, 10935]);
});

test("long names get smaller type, never below the minimum", () => {
  assert.equal(fitFontSize("Ada Marlowe", 64, 30), 64);
  assert.equal(fitFontSize("A".repeat(32), 64, 30), 32);
  assert.equal(fitFontSize("A".repeat(200), 64, 30), 30);
});

test("text is cleaned of control characters and extra spaces", () => {
  assert.equal(cleanText("  Ada\u0000 \n\tMarlowe  "), "Ada Marlowe");
  assert.equal(cleanText(42), "");
});

test("the certificate form: name required, email optional, blank date is today", () => {
  assert.deepEqual(validateCertificateRequest({ name: " Ada ", email: "", date: "" }, "1 May 2026"), {
    ok: true,
    value: { name: "Ada", email: "", date: "1 May 2026" },
  });
  assert.deepEqual(validateCertificateRequest({ name: "\u0007 ", email: "nope" }, "x"), {
    ok: false,
    errors: { name: MESSAGES.nameRequired, email: MESSAGES.emailBad },
  });
  assert.equal(validateCertificateRequest({ name: "A".repeat(61) }, "x").ok, false);
  assert.equal(validateCertificateRequest({ name: "A".repeat(60), email: "a@b.co" }, "x").ok, true);
  assert.equal(validateCertificateRequest(null, "x").ok, false);
});

test("a certificate number is the depth plus five stable digits", () => {
  const a = certificateNumber("Ada Marlowe", 10935, "1 May 2026");
  assert.match(a, /^HS-10935-\d{5}$/);
  assert.equal(a, certificateNumber("Ada Marlowe", 10935, "1 May 2026"));
  assert.notEqual(a, certificateNumber("Ada Marlowe", 10935, "2 May 2026"));
});
