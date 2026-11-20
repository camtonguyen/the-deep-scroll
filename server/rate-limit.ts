/**
 * At most LIMIT requests per client in WINDOW_MS, counted in this process's memory.
 * Upgrade path: on a serverless host every instance has its own counters, so the real limit is
 * LIMIT x instances. Swap `hits` for a shared store (KV or Redis, keyed by IP) before real traffic.
 */
const LIMIT = 10;
const WINDOW_MS = 60_000;

const hits = new Map<string, number[]>();

export function allow(client: string, now = Date.now()): boolean {
  const recent = (hits.get(client) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(client, recent);
    return false;
  }
  hits.set(client, [...recent, now]);
  if (hits.size > 5000) for (const [key, times] of hits) if (now - (times.at(-1) ?? 0) >= WINDOW_MS) hits.delete(key);
  return true;
}

/** The caller's address: the first `x-forwarded-for` entry (set by the host's proxy), else one shared bucket. */
export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
