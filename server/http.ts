/** Small response helpers every API route shares. */

export const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

export const text = (body: string, status: number, headers: Record<string, string> = {}) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store", ...headers } });

/** A 405 unless this is a GET (or HEAD). Use as: `const bad = onlyGet(request); if (bad) return bad;` */
export function onlyGet(request: Request): Response | null {
  return request.method === "GET" || request.method === "HEAD"
    ? null
    : new Response("Use GET.", { status: 405, headers: { Allow: "GET, HEAD" } });
}

/** A 405 unless this is a POST. */
export function onlyPost(request: Request): Response | null {
  return request.method === "POST" ? null : json({ error: "Use POST." }, 405, { Allow: "POST" });
}

/** The 429 for a client that used up its allowance (the same words on every route). */
export const tooMany = (asText = false) =>
  asText
    ? text("Too many requests. Try again in a minute.", 429, { "Retry-After": "60" })
    : json({ error: "Too many requests. Try again in a minute." }, 429, { "Retry-After": "60" });
