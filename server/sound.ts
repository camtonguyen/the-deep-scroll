import { readFile } from "node:fs/promises";
import { type HeaderMap, onlyGet } from "./http";

const FILE = new URL("../src/shared/sounds/bubble-underwater.mp3", import.meta.url);

/** GET /api/sound → the underwater loop. Safari only plays audio from a server that answers Range requests, so this does (one range, no multi-range). */
export async function handleSound(request: Request): Promise<Response> {
  const bad = onlyGet(request);
  if (bad) return bad;
  const bytes = new Uint8Array(await readFile(FILE));
  const headers: HeaderMap = {
    "Content-Type": "audio/mpeg",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  };
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  if (!range || (!range[1] && !range[2])) return new Response(request.method === "HEAD" ? null : bytes, { headers });

  const start = range[1] ? Number(range[1]) : Math.max(0, bytes.length - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(Number(range[2]), bytes.length - 1) : bytes.length - 1;
  if (start > end || start >= bytes.length)
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${bytes.length}` } });
  return new Response(request.method === "HEAD" ? null : bytes.slice(start, end + 1), {
    status: 206,
    headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${bytes.length}` },
  });
}
