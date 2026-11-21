/** Small response helpers every API route shares. */

/** Extra response headers. */
export type HeaderMap = Record<string, string>;

export const json = (body: unknown, status: number, headers: HeaderMap = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

export const text = (body: string, status: number, headers: HeaderMap = {}) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store", ...headers } });

/** The 429 for a client that used up its allowance (the same words on every route). */
export const tooMany = (asText = false) =>
  asText
    ? text("Too many requests. Try again in a minute.", 429, { "Retry-After": "60" })
    : json({ error: "Too many requests. Try again in a minute." }, 429, { "Retry-After": "60" });
