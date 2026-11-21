import { renderImage } from "@hyper-elements/react/image";
import ShareCard from "@/modules/share-card";
import { shareDepth, shareName } from "@/shared/lib/visitor";
import { loadFonts } from "./fonts";
import { allow, clientIp } from "./rate-limit";

const text = (body: string, status: number, headers: Record<string, string> = {}) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store", ...headers } });

/** GET /api/share-card?name=&depth= → the visitor's share card as a PNG. Same name rules as the certificate; the card never changes for the same query, so it is cached. */
export async function handleShareCard(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return text("Use GET.", 405, { Allow: "GET, HEAD" });
  // Its own bucket: the certificate and the card should not use up each other's allowance.
  if (!allow(`card:${clientIp(request)}`)) return text("Too many requests. Try again in a minute.", 429, { "Retry-After": "60" });

  const params = new URL(request.url).searchParams;
  const name = shareName(params.get("name"));
  if (name === null) return text("That name is too long.", 400);

  const { image } = await renderImage(<ShareCard name={name} depth={shareDepth(params.get("depth"))} />, { fonts: await loadFonts() });
  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}
