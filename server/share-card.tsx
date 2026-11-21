import ShareCard from "@/modules/share-card";
import { shareDepth, shareName } from "@/shared/lib/share-link";
import { text } from "./http";
import { renderFile } from "./render-file";
import { route } from "./route";

/** GET /api/share-card?name=&depth= → the visitor's share card as a PNG. Same name rules as the certificate; the card never changes for the same query, so it is cached. */
export const handleShareCard = route({ method: "GET", bucket: "card", plain: true }, async ({ url }) => {
  const name = shareName(url.searchParams.get("name"));
  if (name === null) return text("That name is too long.", 400);

  const { bytes, type } = await renderFile(<ShareCard name={name} depth={shareDepth(url.searchParams.get("depth"))} />, "Canvas");
  return new Response(bytes, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=86400, s-maxage=86400" } });
});
