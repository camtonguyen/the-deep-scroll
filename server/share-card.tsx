import { renderImage } from "@hyper-elements/react/image";
import ShareCard from "@/modules/share-card";
import { shareDepth, shareName } from "@/shared/lib/visitor";
import { loadFonts } from "./fonts";
import { onlyGet, text, tooMany } from "./http";
import { allow, clientIp } from "./rate-limit";

/** GET /api/share-card?name=&depth= → the visitor's share card as a PNG. Same name rules as the certificate; the card never changes for the same query, so it is cached. */
export async function handleShareCard(request: Request): Promise<Response> {
  const bad = onlyGet(request);
  if (bad) return bad;
  // Its own bucket: the certificate and the card should not use up each other's allowance.
  if (!allow(`card:${clientIp(request)}`)) return tooMany(true);

  const params = new URL(request.url).searchParams;
  const name = shareName(params.get("name"));
  if (name === null) return text("That name is too long.", 400);

  const { image } = await renderImage(<ShareCard name={name} depth={shareDepth(params.get("depth"))} />, { fonts: await loadFonts() });
  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}
