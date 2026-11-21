import { renderImage } from "@hyper-elements/react/image";
import { EMAIL_ART, EmailArt, type EmailArtId } from "@/modules/welcome-email";
import { loadFonts } from "./fonts";
import { onlyGet } from "./http";

/** GET /api/email-art?id=hero|logo|anglerfish|dumbo|snailfish → one picture of the welcome email as a PNG. Fixed set of ids, so it is cached. */
export async function handleEmailArt(request: Request): Promise<Response> {
  const bad = onlyGet(request);
  if (bad) return bad;
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!Object.hasOwn(EMAIL_ART, id)) return new Response("Unknown picture.", { status: 404 });

  const { image } = await renderImage(<EmailArt id={id as EmailArtId} />, { fonts: await loadFonts() });
  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}
