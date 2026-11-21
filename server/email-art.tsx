import { EMAIL_ART, EmailArt, type EmailArtId } from "@/modules/welcome-email";
import { renderFile } from "./render-file";
import { route } from "./route";

/** GET /api/email-art?id=hero|logo|anglerfish|dumbo|snailfish → one picture of the welcome email as a PNG. Fixed set of ids, so it is cached. */
export const handleEmailArt = route({ method: "GET" }, async ({ url }) => {
  const id = url.searchParams.get("id") ?? "";
  if (!Object.hasOwn(EMAIL_ART, id)) return new Response("Unknown picture.", { status: 404 });

  const { bytes, type } = await renderFile(<EmailArt id={id as EmailArtId} />, "Canvas");
  return new Response(bytes, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=86400, s-maxage=86400" } });
});
