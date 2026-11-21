import { json, tooMany } from "./http";
import { allow, clientIp } from "./rate-limit";

export interface RouteOptions {
  method: "GET" | "POST";
  /** Rate-limit bucket name; each route has its own so one cannot use up another's allowance. Omit for no limit. */
  bucket?: string;
  /** Errors from the guards (405, 429) as plain text, for routes the browser loads directly (images, files). */
  plain?: boolean;
  /** POST only: the largest body, in characters. */
  maxBody?: number;
}

export interface RouteContext {
  request: Request;
  url: URL;
  /** POST only: the parsed JSON body (`unknown`: the route validates it). */
  body: unknown;
}

/**
 * Every API route goes through here: the method check, the per-client rate limit and, for POST, the size cap and JSON
 * parse, in that order, with the same error answers on every route. The handler gets only a request that passed.
 */
export function route(options: RouteOptions, handle: (context: RouteContext) => Promise<Response> | Response) {
  return async (request: Request): Promise<Response> => {
    const get = options.method === "GET";
    if (get ? request.method !== "GET" && request.method !== "HEAD" : request.method !== "POST")
      return get
        ? new Response("Use GET.", { status: 405, headers: { Allow: "GET, HEAD" } })
        : json({ error: "Use POST." }, 405, { Allow: "POST" });
    if (options.bucket && !allow(`${options.bucket}:${clientIp(request)}`)) return tooMany(options.plain);

    let body: unknown;
    if (!get) {
      const raw = await request.text();
      if (raw.length > (options.maxBody ?? 2000)) return json({ error: "That request is too big." }, 413);
      try {
        body = JSON.parse(raw);
      } catch {
        return json({ error: "Send the form as JSON." }, 400);
      }
    }
    return handle({ request, url: new URL(request.url), body });
  };
}
