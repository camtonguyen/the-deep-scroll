/**
 * The certificate link in the welcome email: /api/certificate?name=…&date=…&sig=…
 * The signature (HMAC-SHA256, hex) covers the cleaned name and the date, so only links we sent work and
 * the date is the day the visitor signed up. Nothing is stored; the PDF is rendered when the link is opened.
 */
export const today = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const DEV_SECRET = "dev-only-certificate-secret";
let warned = false;

const inProduction = () => process.env.NODE_ENV === "production";

/** The signing secret. In production it must be set: the dev fallback is public, so anyone could sign a link with it. */
async function key(usage: "sign" | "verify") {
  const secret = process.env.CERTIFICATE_SECRET;
  if (!secret && inProduction()) throw new Error("CERTIFICATE_SECRET is not set");
  if (!secret && !warned) {
    warned = true;
    console.log("certificate links signed with the dev secret: set CERTIFICATE_SECRET");
  }
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret || DEV_SECRET), { name: "HMAC", hash: "SHA-256" }, false, [usage]);
}

/**
 * The address the link points at: SITE_URL without a trailing slash. Without it the request's address is used in dev only,
 * because on a host the Host header can be set by the caller, which would put their address in a signed link.
 */
export function siteOrigin(request: Request): string {
  const configured = process.env.SITE_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  if (inProduction()) throw new Error("SITE_URL is not set");
  return new URL(request.url).origin;
}

// Control characters are already stripped from both fields, so a newline cannot appear inside either.
const message = (name: string, date: string) => new TextEncoder().encode(`${name}\n${date}`);

const toHex = (bytes: ArrayBuffer) => [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (hex: string) => new Uint8Array(/^(?:[0-9a-f]{2})+$/i.test(hex) ? hex.match(/../g)!.map((h) => parseInt(h, 16)) : []);

export async function signCertificate(name: string, date: string): Promise<string> {
  return toHex(await crypto.subtle.sign("HMAC", await key("sign"), message(name, date)));
}

/** Constant-time check of a signature from a link. */
export async function verifyCertificate(name: string, date: string, sig: string): Promise<boolean> {
  const bytes = fromHex(sig);
  return bytes.length > 0 && crypto.subtle.verify("HMAC", await key("verify"), bytes, message(name, date));
}

/** The full download link for one visitor. */
export async function certificateLink(origin: string, name: string, date: string): Promise<string> {
  const query = new URLSearchParams({ name, date, sig: await signCertificate(name, date) });
  return `${origin}/api/certificate?${query}`;
}
